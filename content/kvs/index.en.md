---
title : "3. Create Kinesis Video Stream Resources"
weight : 40
---

As described in the '[Kinesis Video Streams with WebRTC Components](../introduction/kvs/)' section, signaling channel is required to establish peer-to-peer connection when you want to enable live-streaming of video. And video stream is a KVS resource that enables you to transport live video data, store it, and make the data available for consumption both in real time and on a batch or ad hoc basis. In this section, you will create a signaling channel and a video stream in KVS and initiate live streaming from your laptop's camera through Chrome browser. You'll also test the Media Playback via KVS Video Stream console to verify the connectivity.

Please make sure you are in the **US West (Oregon)** region for all steps.

### Creating a signaling channel:
1. In the AWS Management Console, open the [Kinesis Video Streams console](https://us-west-2.console.aws.amazon.com/kinesisvideo/home?region=us-west-2#/)

2. In the left navigation, click **Signaling channels**. And then click **Create signaling channel**.

![KVS Signaling Channel](/static/images/03/01.png)

3. On the **Create a new signaling channel** page, type the name for the signaling channel. For this workshop you can use :code[StreamChannel]{showCopyAction=true}. Leave the default **Time-to-live (Ttl)** value as 60 seconds.

![KVS Signaling Channel Settings](/static/images/03/02.png)

4. Click **Create signaling channel**.

5. Once the signaling channel is created, review the details on the channel's details page. Make note of the **Signaling channel ARN**.

---
### Creating a video stream:
6. In the left navigation pane, select **Video streams**. Click **Create video stream**.

![KVS Video Stream](/static/images/03/03.png)

7. On the **Create a new video stream** page, type a name for this stream. For this workshop you can use :code[WebRTCStream]{showCopyAction=true}. Use the default configuration for other parameters.

![KVS Video Stream Settings](/static/images/03/04.png)

8. Click **Create video stream**.

9. Once the stream is created, review the details on the **Video Streams** page. Make note of the **Video stream ARN**.
---
### Ingest Media:

10. Open the [Kinesis Video Streams WebRTC Test Page](https://awslabs.github.io/amazon-kinesis-video-streams-webrtc-sdk-js/examples/index.html). You'll use this page to initiate the video stream from your system. This page has been created for testing purposes using the [Amazon Kinesis Video Streams WebRTC SDK for JavaScript](https://github.com/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js).

![KVS Test Page](/static/images/03/05.png)

11. Set the values as following on this test page -
	* **Region**: :code[us-west-2]{showCopyAction=true}
	* **Access Key ID**: Refer to Step 7 of this [section](../accessing-workshop-studio/) to go to the `Get AWS CLI credentials` option. This would be located on the bottom-left corner of the Workshop Studio Event Dashboard. Copy the value within the double quotes corresponding to **AWS_ACCESS_KEY_ID** (as shown in screenshot below) and paste here on the Test Page.

	![KVS Test Page Access Credentials](/static/images/03/051.png)

	* **Secret Access Key**: Follow the same step mentioned above and get the AWS_SECRET_ACCESS_KEY.
	* **Session Token**: Follow the same step mentioned above and get the AWS_SESSION_TOKEN.
	::alert[While this is marked as an 'Optional' field, it is important to provide the value for the Session Token for connection to be setup for this workshop]{header="Please Note"}
	* **Channel Name**: :code[StreamChannel]{showCopyAction=true} or as described when creating the signaling channel.
	* Verify that **Send Video** and **Send Audio** options are enabled under **Tracks**. If not checked already then **please make sure you enable both.**

	![KVS Tracks](/static/images/03/08.png)

	* Expand **'WebRTC Ingestion and Storage'** and provide :code[WebRTCStream]{showCopyAction=true} as the Stream name (or as described when creating the video stream).
	* Click on **Update Media Storage Configuration**. *(You can verify if the configuration was updated successfully or not by scrolling down to the Logs section and looking for the success message as shown in screenshot below)*

	![KVS Update Storage Config](/static/images/03/09.png)

	* Scroll back to the **'WebRTC Ingestion and Storage'** section and enable the **Ingestion and storage peer joins automatically** option by ticking the checkbox

	![KVS Test Setup](/static/images/03/07.png)

12. Click on the **Start Master** button located right above the **Logs** section. It may ask you to **Allow Access** for your browser to access your system's camera and microphone. Please select **Allow** to proceed.

---
### View Media:
13. In the [Kinesis Video Streams console](https://us-west-2.console.aws.amazon.com/kinesisvideo/home?region=us-west-2#/), on the left navigation pane, click **Video streams**.

14. Click on the video stream created before (`WebRTCStream` if you gave the same name as suggested in steps above).

15. Expand the **Media playback** option.

![KVS Media Playback](/static/images/03/06.png)

16. Wait for a few seconds and you should now be able to see the video stream coming in from your laptop's camera. *(Ignore the Download SDK pop-up and in case it persists then just refresh the KVS Video Streams Console page once)*

After viewing the video stream, you can go back to the Kinesis Video Streams WebRTC Test Page and click on `Stop Master` for now.
