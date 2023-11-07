# Rekognition Processor Lambda Function
This repository contains code for lambda function written in python 3.11 and it gets the labels from Amazon Rekognition service using the job id and then stores all the labels metadata in Opensearch index.This lambda function is created for below workshop on real time video analysis on kinesis video stream using Amazon rekognition. For details of workshop please visit below URL:

<Workshop URL>

## Pacakaging the lambda code for deployment
To run the workshop, this is not required as workshop uses pre built zip files already however in case you want to customize the lambda code, you can use below instructions to create new zip file:

To package this lambda function code, please make sure that you have python 3.7 onwards and pip installed on your machine. Once you have prerequisites ready take the clone of the repository using git then go to root of the project and create a new directory using:

`mkdir package`

Go to root of project run below command in terminal:

`pip install --target ./package requests requests-aws4auth`

Run below command to create a zip file

`cd package`
`zip -r ../rekognition_processor.zip .`

Now package the main python file to zip created above:
`cd ..`
`zip rekognition_processor.zip main.py`

This will create a lambda zip file and can be deployed to AWS enviornment.











