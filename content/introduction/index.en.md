---
title : "0. Introduction"
weight : 10
---

## Reference Architecture and Solution Flow

![Reference Architecture](/static/images/architecture.png)

For this workshop, you'll use Amazon Kinesis Video Streams (Amazon KVS) with WebRTC to stream and store videos from your laptop's camera into [Amazon Simple Storage Service (Amazon S3)](https://aws.amazon.com/s3/). Amazon Rekognition Video would then conduct stored video analysis to analyze your videos and detect objects, scenes, landmarks, text or activities etc. The captured entities would be stored as images, for future reference, back into Amazon S3 and output would be stored into Amazon OpenSearch Service. And lastly, you'll be able to search for detected entities through a Node.js based front-end application.

Few things to note:
* Videos would be stored in Amazon S3 only till the duration of the session. And would be deleted as soon as the session ends.
* Please ensure that you use Google Chrome browser at all times to follow through the instructions.
* Amazon Kinesis Video Streams ingestion via WebRTC is available in preview in the US West (Oregon) region. So the workshop would be run in the `us-west-2` region. Please ensure you are creating resources as per the instructions in US West (Oregon) only.

This section provides an introductory level overview of WebRTC protocols, Kinesis Video Streams WebRTC components, Rekognition Stored Video Analysis and OpenSearch. You can either start by reviewing these key concepts that'd help you build applications using Kinesis Video Streams for WebRTC or skip to the next section '[Accessing Workshop Studio](../accessing-workshop-studio/)' to directly get started with the workshop.

::alert[Currently this workshop can only be executed through Workshop Studio accounts in AWS-run events. Running the workshop as-is in your own AWS Account will not work.]{header="Please Note"}
