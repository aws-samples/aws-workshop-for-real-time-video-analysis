---
title : "7. Search Away!"
weight : 80
---

Now that you have all the components created and configured, you can take this setup for a spin.

## Head back to the front-end application
* Refer to step 12 of [section 5.12](../frontend/) where you had launched preview of the application in your browser. Head back to this preview.

![Frontend App](/static/images/07/01.png)

* Here you will see the following options-
    * **Search Labels**: This is where you type the entities to search for within your video streams. The application would fetch the values and video frames based on the the labels detected from your video stream.
    * **Start and End Date**: You can select the time period within which you'd want to search for the detected entities.
* Try searching for something that could have been there in the video stream. If it was detected, you'll get an option in form of a drop down menu that you can click on.

![Frontend App Headphones Searchbar](/static/images/07/02.png)

* You should see the results in a similar format-

![Frontend App Headphones Search](/static/images/07/03.png)

You can search for other entities similarly.

*With this we have concluded the workshop!*

---

In real-life scenarios, the webRTC stream that we simulated through our browser and system's camera and microphone could be replaced with any other source that supports webRTC streaming. These could be mobile devices, Raspberry Pi with USB cameras or even CCTV or IP cameras that support WebRTC streaming.

You can also experiment with adding more functionalities such as setting alerts to highlight specific tagged objects once they are detected by Amazon Rekognition Video.

## Resources

You can also refer to these resources for more details on working with webRTC using Amazon Kinesis Video Streams as well as the other services used throughout the workshop -
* [Amazon Kinesis Video Streams WebRTC Developer Guide](https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/what-is-kvswebrtc.html)
* [Enabling video chats using Amazon Kinesis Video Streams for WebRTC](https://aws.amazon.com/blogs/media/enabling-video-chats-using-amazon-kinesis-video-streams-for-webrtc/)
* [Connect your camera using Amazon Kinesis Video Streams for WebRTC in 10 minutes](https://www.youtube.com/watch?v=8GZDmdBwVqU)
* [Setting up your Amazon Rekognition Video and Amazon Kinesis resources](https://docs.aws.amazon.com/rekognition/latest/dg/setting-up-your-amazon-rekognition-streaming-video-resources.html)
* [Working with streaming video events](https://docs.aws.amazon.com/rekognition/latest/dg/streaming-video.html)
* And if you have any questions, feel free to search for them or post them here on [AWS re\:Post](https://repost.aws/).
