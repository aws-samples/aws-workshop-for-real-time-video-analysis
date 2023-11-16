---
title : "Kinesis Video Streams with WebRTC Components"
weight : 12
---

Kinesis Video Streams provides a standards compliant WebRTC implementation as a fully-managed capability. You can use this capability to securely live stream media or perform two-way audio or video interaction between any camera IoT device and WebRTC compliant mobile or web players. As a fully-managed capability, you do not have to build, operate, or scale any WebRTC related cloud infrastructure such as signaling or media relay servers to securely stream media across applications and devices.

Kinesis Video Streams provides managed end-points for WebRTC signaling that allows applications to securely connect with each other for peer-to-peer live media streaming. Next, it includes managed end-points for TURN that enables media relay via the cloud when applications cannot stream peer-to-peer media. It also includes managed end-points for STUN that enables applications to discover their public IP address when they are located behind a NAT or a firewall. Additionally, it provides easy to use SDKs to enable camera IoT devices with WebRTC capabilities. Finally, it provides client SDKs for Android, iOS, and for Web applications to integrate Kinesis Video Streams WebRTC signaling, TURN, and STUN capabilities with any WebRTC compliant mobile or web player.


## Signaling Channel

The primary component provided by KVS WebRTC is the signaling server termed the Signaling Channel. A signaling channel is a resource that enables applications to discover, set up, control, and terminate a peer-to-peer connection by exchanging signaling messages. Signaling messages are metadata that two applications exchange with each other to establish peer-to-peer connectivity. This metadata includes local media information such as media codecs and codec parameters, and possible network candidate paths for the two applications to connect with each other for live streaming.

The signaling component manages the WebRTC signaling endpoints that allow applications to securely connect with each other for peer-to-peer live media streaming. The signaling component includes the [Amazon Kinesis Video Signaling REST APIs](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_Signaling_Channels.html) and a set of [Websocket APIs](https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/kvswebrtc-websocket-apis.html).

## Peer

Any device or application (for example, a mobile or web application, webcam, home security camera, baby monitor, etc.) that is configured for real-time, two-way streaming through a Kinesis Video Streams with WebRTC.

### Master

A peer that initiates the connection and is connected to the signaling channel with the ability to discover and exchange media with any of the signaling channel's connected viewers. Devices will initiate by connecting with the signaling channel via the `ConnectAsMaster` websocket API: https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/kvswebrtc-websocket-apis-2.html .

### Viewer

A peer that is connected to the signaling channel with the ability to discover and exchange media only with the signaling channel's master. A viewer cannot discover or interact with other viewers through a given signaling channel. A signaling channel can have up to 10 connected viewers. Devices and/or applications will initate by connecting with the signaling channel via the `ConnectAsViewer` websocket API: https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/kvswebrtc-websocket-apis-1.html .

## Data Channel

Kinesis Video Streams with WebRTC supports data channels, which allows devices and applications to transmit commands or other information in a peer-to-peer connection distinct from the media channel.

## Kinesis Video Streams WebRTC SDKs

Kinesis Video Streams with WebRTC includes SDKs to build embedded applications in C, web applications in Javascript, and mobile applications for Android and iOS. The SDKs also contain sample applications to allow you to quickly build prototypes.
