# Front End for Real Time Video Analytics
This repository contains front end app code developed using React.js of below workshop on real time video analysis on kinesis video stream using Amazon rekognition. For details of workshop please visit below URL:

<Workshop URL>


# Running the Application Locally
To run the front end application please make sure that you have node/npm installed on your machine. Once you have prerequisites ready take the clone of the repository using git and install all the dependencies using

`npm install`

Before starting the application, it needs url of backend api's and cloudfront(CDN) to serve the videos. You can get those URL's as per the instructions in the workshop and then populate `config.js` with the same.


and then start the application using

`npm start`

This will launch the React based application in browser at http://localhost:3000

# Building the application for prod deployment
To create a production build run

`npm build`

This will create a production ready build and you can deploy it to destination using any CI/CD pipeline or manually as per you need.
