# Kinesis Video Stream Processor Lambda Function
This repository contains code for lambda function written in nodejs 16.x and it extracts video clips from kinesis video stream periodically and stores in s3 buckets and initiates a Amazon Rekognition Stored Video Analysis Job to detect entities in the video clips. This lambda function is created for below workshop on real time video analysis on kinesis video stream using Amazon rekognition. For details of workshop please visit below URL:

<Workshop URL>

## Pacakaging the lambda code for deployment
To run the workshop, this is not required as workshop uses pre built zip files already however in case you want to customize the lambda code, you can use below instructions to create new zip file:

To package this lambda function code, please make sure that you have node/npm installed on your machine. Once you have prerequisites ready take the clone of the repository using git and install all the dependencies using

`npm install`

Once all the packages are installed then create a zip file by going to the root of the project dir and run:

`zip -r kvs_processor.zip *`

This will create a lambda zip file and can be deployed to AWS enviornment.
