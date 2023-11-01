import boto3
import json
import logging
from botocore.auth import SigV4Auth
from botocore.awsrequest import AWSRequest
import requests
import os

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
session = boto3.Session()
credentials = session.get_credentials()
creds = credentials.get_frozen_credentials()

region = 'us-west-2'
service = 'es'

host = os.environ["OPEN_SEARCH_API_URL"]
index = 'entities'
url = 'https://' + host + '/' + index + '/_search'

def signed_request(method, url, data=None, params=None, headers=None):
    request = AWSRequest(method=method, url=url, data=data, params=params, headers=headers)
    SigV4Auth(creds, service, region).add_auth(request)
    return requests.request(method=method, url=url, headers=dict(request.headers), data=data)
    
def lambda_handler(event, context):
    logger.info("Search Processor Lambda Execution Started")
    query_params = event['queryStringParameters']
    query =     ''
    if query_params:
        query = {
            "size": 25,
            "query": {
                "multi_match": {
                    "query": event['queryStringParameters']['q'],
                    "fields": ["name^4"]
                }
            }
        }
    else:
        query= {
            "size": 25,
            "query": {
                "match_all": {}
            }
        }

    headers = { "Content-Type": "application/json" }
    logger.info('Executing query to opensearch index: {query}')
    response=''
    try:
        r = signed_request(method='GET', url=url, data=json.dumps(query), headers=headers)
        logger.info('Search successful, returning response back to caller')
        response = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": '*'
            },
            "isBase64Encoded": False
        }
        response['body'] = r.text
    except:
        logger.info('Search Failed, error while making a call to opensearch index')
        response = {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": '*'
            },
            "isBase64Encoded": False
        }
        response['body'] = 'Error occured while getting results from opensearch index'

    return response