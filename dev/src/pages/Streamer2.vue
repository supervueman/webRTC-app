<template lang="pug">
  div
    video#remoteVideo(autoplay muted)
</template>

<script>
import io from "socket.io-client";

export default {
  mounted() {
    const PeerConnection =
      window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
    const SessionDescription =
      window.mozRTCSessionDescription || window.RTCSessionDescription;

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.webkitGetUserMedia;

    let pc;

    pc = new PeerConnection(null);

    pc.onicecandidate = gotIceCandidate;
    pc.onaddstream = gotRemoteStream;

    function createAnswer() {
      pc.createAnswer(
        gotLocalDescription,
        error => {
          console.log(error);
        },
        { mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true } }
      );
    }

    function gotLocalDescription(description) {
      pc.setLocalDescription(description);
      sendMessage(description);
    }

    function gotIceCandidate(event) {
      if (event.candidate) {
        sendMessage({
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        });
      }
    }

    function gotRemoteStream(event) {
      const video = document.getElementById("remoteVideo");
      try {
        video.srcObject = event.stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(event.stream);
      }
      pc.addStream(event.stream);
    }

    ////////////////////////////////////////////////
    // Socket.io

    const socket = io.connect(process.env.VUE_APP_SERVER_URL_DEV);

    function sendMessage(message) {
      socket.emit("message", message);
    }

    socket.on("message", message => {
      if (message.type === "offer") {
        pc.setRemoteDescription(new SessionDescription(message));
        createAnswer();
      } else if (message.type === "answer") {
        pc.setRemoteDescription(new SessionDescription(message));
      } else if (message.type === "candidate") {
        const candidate = new IceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        pc.addIceCandidate(candidate);
      }
    });
  }
};
</script>

<style lang="sass">
video
  width: 100%
</style>

