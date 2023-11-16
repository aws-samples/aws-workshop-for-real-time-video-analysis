---
title : "WebRTC Introduction"
weight : 11
---

WebRTC is an open technology specification for enabling real-time communication (RTC) across browsers and mobile applications via simple APIs. It leverages peering techniques for real-time data exchange between connected peers and provides low media streaming latency required for human-to-human interaction. WebRTC specification includes a set of IETF protocols including Interactive Connectivity Establishment (ICE RFC5245), Traversal Using Relay around NAT (TURN RFC5766), and Session Traversal Utilities for NAT (STUN RFC5389) for establishing peer-to-peer connectivity, in addition to protocol specifications for real-time media and data streaming.

## Signaling server

Establishing a WebRTC connection between two devices requires the use of a signaling server to resolve how to connect them over the internet. A signaling server's job is to serve as an intermediary to allow peers find and establish a connection while minimizing exposure of potentially private information as much as possible.

## Interactive Connectivity Establishment (ICE)

ICE is a framework that allows peers to connect with one another. The framework manages candidate discovery, connectivity checks, keepalives, and more. ICE uses STUN and/or TURN servers to determine ICE candidates comprised of public and private IP addresses and port numbers to use to connect. ICE candidates allow for either TCP or UDP, with UDP generally being preferred.

The following is a sample debug log of ICE candidates exchanged over Kinesis Video Streams WebRTC signaling channels and received by peers:

```
candidate:0 1 UDP 2122252543 192.168.4.105 59029 typ host
candidate:3 1 TCP 2105524479 192.168.4.105 9 typ host tcptype active
candidate:3 2 TCP 2105524478 192.168.4.105 9 typ host tcptype active
candidate:0 1 UDP 2122252543 192.168.4.105 60493 typ host
candidate:0 2 UDP 2122252542 192.168.4.105 64240 typ host
candidate:0 2 UDP 2122252542 192.168.4.105 60817 typ host
candidate:3 1 TCP 2105524479 192.168.4.105 9 typ host tcptype active
candidate:3 2 TCP 2105524478 192.168.4.105 9 typ host tcptype active
candidate:4 1 UDP 8331263 107.21.73.246 55396 typ relay raddr 107.21.73.246 rport 55396
candidate:4 2 UDP 8331262 3.238.128.2 63157 typ relay raddr 3.238.128.2 rport 63157
candidate:4 1 UDP 8331263 3.238.128.2 55555 typ relay raddr 3.238.128.2 rport 55555
candidate:4 1 UDP 8331263 3.238.128.2 65250 typ relay raddr 3.238.128.2 rport 65250
candidate:4 1 UDP 8331263 3.238.128.2 54026 typ relay raddr 3.238.128.2 rport 54026
candidate:4 1 UDP 8331263 107.21.73.246 62490 typ relay raddr 107.21.73.246 rport 62490
candidate:4 2 UDP 8331262 107.21.73.246 49663 typ relay raddr 107.21.73.246 rport 49663
candidate:4 2 UDP 8331262 3.238.128.2 50532 typ relay raddr 3.238.128.2 rport 50532
candidate:4 2 UDP 8331262 107.21.73.246 51215 typ relay raddr 107.21.73.246 rport 51215
```

### Trickle ICE

An extension to the ICE protocol that allows incremental gathering and connectivity checks between peers. Both peers exchange SDP offers without ICE candidates, and ICE candidates are sent via signaling channels as soon as they are discovered, which can shorten the time necessary for ICE processing to complete, improving the time for initializing the peer-to-peer connection.

## Session Traversal Utilities for NAT (STUN)

A protocol that is used by each peer so they can discover their public IP addresses and also determine any restrictions in your router that would prevent a direct connection with a peer.

## Network Address Translation (NAT)

NAT is a method of mapping one IPv4 network address space to another. One example is your home network, where you have a private IP address space and private IP addresses such as 192.168.0.100. Your internet service provider will assign a public IP address to your home network. In order for your devices to communicate with other devices outside of your home network, your router will keep track of a mapping between the public IP address and the private IP address for each device on the network and route requests and responses accordingly. However, some routers will restrict connections to devices on the network, and in this case external requests will be required to use TURN.

## Traversal Using Relays around NAT (TURN)

A server that is used to bypass symmetric NAT restrictions by opening a connection with a TURN server and relaying all information through that server. Using the TURN server to relay the connection information should be used as the fallback approach as it could result in additional latency.

## Session Description Protocol (SDP)

A standard for describing the multimedia content of the connection such as resolution, formats, codecs, encryption, etc. so that both peers can understand each other once the data is transferring.

To learn more about SDP, please see the following resources:
- https://datatracker.ietf.org/doc/html/rfc4566
- https://www.iana.org/assignments/sip-parameters/sip-parameters.xhtml

### SDP Offer

An SDP message sent over the signaling channel by a peer which generates a session description in order to create or modify a session. It describes the aspects of desired media communication. The following is an example of an SDP offer:

```
v=0
  o=alice 2890844526 2890844526 IN IP4 host.atlanta.example.com
  s=
  c=IN IP4 host.atlanta.example.com
  t=0 0
  m=audio 49170 RTP/AVP 99
  a=rtpmap:99 iLBC/8000
  m=video 51372 RTP/AVP 31
  a=rtpmap:31 H261/90000
```

### SDP Answer

An SDP message sent by a peer answerer over the signaling channel in response to an offer received from an offerer. The answer indicates the aspects that are accepted. For example, if all the audio and video streams in the offer are accepted. The following is an example of an SDP answer:

```
v=0
  o=bob 2808844564 2808844564 IN IP4 host.biloxi.example.com
  s=
  c=IN IP4 host.biloxi.example.com
  t=0 0
  m=audio 49172 RTP/AVP 99
  a=rtpmap:99 iLBC/8000
  m=video 51374 RTP/AVP 31
  a=rtpmap:31 H261/90000
```

## Security

WebRTC uses Datagram Transport Layer Security (DTLS) and the Secure Real-time Transport Protocol (SRTP). These pre-existing protocols are used to ensure that sessions are securely negotiated between peers. DTLS is similar to TLS, but it uses UDP instead of TCP. All of the WebRTC related protocols are required to encrypt communications using DTLS, including SRTP and STUN. SRTP is designed for the secure exchange of media between peers, and is the secure version of the Real-time Transport Protocol (RTP). SRTP uses encryption and authentication and further security features such as replay protection.

## WebRTC Connection Flow

The following diagram illustrates the connection flow as it occurs using Kinesis Video Streams for WebRTC.

![webrtc flow](/static/images/webrtcconnectionflow.gif)
