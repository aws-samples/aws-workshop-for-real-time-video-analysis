import base64
import datetime
import json
import logging
import os

import boto3
import requests
from requests_aws4auth import AWS4Auth

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Get OpenSearch service settings from environmental variables
es_url = os.environ["OPEN_SEARCH_API_URL"]
region = os.environ["AWS_REGION"]


# Get credentials
credentials = boto3.Session().get_credentials()
aws_auth = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    region,
    "es",
    session_token=credentials.token,
)
client = boto3.client("rekognition")


def process_record(record):
    logger.info("Rekognition Processor Execution Started")
    message = record["Sns"]["Message"]
    json_message = json.loads(message)
    logger.info("Input Payload: {json_message}")
    s3_bucket_name = json_message["Video"]["S3Bucket"]
    s3_object_name = json_message["Video"]["S3ObjectName"]
    base_ts = json_message["Timestamp"]
    job_id = json_message["JobId"]
    logger.info("Job Id: {job_id}")

    logger.info("Start Label Detection for current Job")
    response = client.get_label_detection(JobId=job_id)

    for label_detection in response["Labels"]:
        label = label_detection["Label"]

        name = label["Name"]
        timestamp = str(label_detection["Timestamp"])
        confidence = str(label["Confidence"])
        destination_bucket = s3_bucket_name
        video_clip_name = s3_object_name
        data = {
            "base_timestamp": base_ts,
            "ts": timestamp,
            "name": name,
            "confidence": confidence,
            "destinationBucket": destination_bucket,
            "videoClipName": video_clip_name,
        }
        logger.info("Saving all identified labels from current job to opensearch index")
        response = requests.post(
            f"https://{es_url}/entities/_doc/",
            auth=aws_auth,
            headers={"Content-Type": "application/json"},
            json=data,
            timeout=60,
        )
        logger.info(
            f"Result after saving to opensearch: code={response.status_code}, response={response.text}"
        )
    else:
        logger.info(f"No Labels detected")


def lambda_handler(event, context):
    for record in event["Records"]:
        process_record(record)
    return {"result": "ok"}
