# Search Processor Lambda Function
This repository contains code for lambda function written in python 3.11 and it makes calls to opensearch index with some query parameters and get the data back.This lambda function is created for below workshop on real time video analysis on kinesis video stream using Amazon rekognition. For details of workshop please visit below URL:

<Workshop URL>

## Pacakaging the lambda code for deployment
To run the workshop, this is not required as workshop uses pre built zip files already however in case you want to customize the lambda code, you can use below instructions to create new zip file:

To package this lambda function code, please make sure that you have python 3.7 onwards and pip installed on your machine. Once you have prerequisites ready take the clone of the repository using git then go to root of the project and create a new directory using:

`mkdir package`

Go to root of project run below command in terminal:

`pip install --target ./package requests`

Run below command to create a zip file

`cd package`
`zip -r ../search_processor.zip .`

Now package the main python file to zip created above:
`cd ..`
`zip search_processor.zip main.py`

This will create a lambda zip file and can be deployed to AWS enviornment.
