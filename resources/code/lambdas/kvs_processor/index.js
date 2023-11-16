const fs = require('fs');
const AWS = require('aws-sdk')
const { RekognitionClient, StartLabelDetectionCommand } = require("@aws-sdk/client-rekognition");




exports.handler = async (event, context, callback) => {

  console.log('Kinesis Video Stream Processor Lambda Started')
  const streamName = process.env.KVS_STREAM_NAME
  const snsTopicArn = process.env.SNS_TOPIC_NAME
  const roleArn = process.env.REK_ROLE_ARN
  const region = "us-west-2"
  const bucketName = process.env.S3_BUCKET_NAME
  const rekClient = new RekognitionClient({ region: region });

  const kinesisvideo = new AWS.KinesisVideo();
  let params = {
    APIName: "GET_CLIP",
    StreamName: streamName
  };
  const endpoint = await kinesisvideo.getDataEndpoint(params).promise();
  const kinesisvideoarchivedmedia = new AWS.KinesisVideoArchivedMedia({ endpoint: endpoint.DataEndpoint });

  let startTime = new Date()
  let start_ts = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(),
    startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
  let end_ts = new Date(start_ts.valueOf())
  end_ts.setMinutes(end_ts.getMinutes())
  start_ts.setMinutes(start_ts.getMinutes() - 1)

  params = {
    ClipFragmentSelector: {
      FragmentSelectorType: "PRODUCER_TIMESTAMP",
      TimestampRange: {
        EndTimestamp: end_ts,
        StartTimestamp: start_ts
      }
    },
    StreamName: streamName
  };
  console.log('Fetching Video clip incrementally from Kinesis Video Stream')
  const data = await kinesisvideoarchivedmedia.getClip(params).promise();
  const s3 = new AWS.S3();
  const fileName = "test" + "_" + start_ts.getTime() + ".mp4"


  console.log(`Storing the fetched clip to Amazon S3 for further processing with filename ${fileName}`)
  let promise = new Promise((resolve, reject) => {
    s3.upload({
      Bucket: bucketName,
      Key: fileName,
      Body: data.Payload
    }, async (err, data) => {
      if (err) {
        console.error('Error while storing video clip to Amazon S3')
        console.error(err);
        reject()
      } else {
        console.log(`Video Clip uploaded successfully to Amazon S3 bucket`);
        console.log(`Invoking Amazon Rekognition to anlayze the video clip`);
        const labelDetectionResponse = await rekClient.send(new StartLabelDetectionCommand({
          Video: { S3Object: { Bucket: bucketName, Name: fileName } },
          MinConfidence: 80,
          NotificationChannel: { RoleArn: roleArn, SNSTopicArn: snsTopicArn }
        }));
        const startJobId = labelDetectionResponse.JobId
        console.log(`Amazon Rekognition Job for Label Analysis is submitted with JobID: ${startJobId}`)
        resolve()
      }
    });
  });
  try {
    await promise;
  } catch (err) {
    console.log('Error happened in current execution, it could be due to no live stream ruuning. Exiting..')
    return { doContinue: false }
  }
  console.log('Processing Successful for current execution, Returning back to Orchestrator step function for further processing')
  return { doContinue: true }
}
