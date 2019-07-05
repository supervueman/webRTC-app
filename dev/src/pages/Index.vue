<template lang="pug">
  div
    video(id="localVideo" autoplay muted)
    video(id="remoteVideo" autoplay muted)
    button(id="callButton") Click
</template>

<script>
import io from "socket.io-client";

export default {
  mounted() {
    var PeerConnection =
      window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
    var SessionDescription =
      window.mozRTCSessionDescription || window.RTCSessionDescription;
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.webkitGetUserMedia;

    var pc; // PeerConnection

    document.getElementById("callButton").addEventListener("click", function() {
      createOffer();
    });

    // Step 1. getUserMedia
    navigator.getUserMedia({ audio: true, video: true }, gotStream, function(
      error
    ) {
      console.log(error);
    });

    function gotStream(stream) {
      document.getElementById("callButton").style.display = "inline-block";
      try {
        document.getElementById("localVideo").srcObject = stream;
      } catch (error) {
        document.getElementById("localVideo").src = window.URL.createObjectURL(
          stream
        );
      }

      pc = new PeerConnection(null);
      pc.addStream(stream);
      pc.onicecandidate = gotIceCandidate;
      pc.onaddstream = gotRemoteStream;
    }

    // Step 2. createOffer
    function createOffer() {
      pc.createOffer(
        gotLocalDescription,
        function(error) {
          console.log(error);
        },
        { mandatory: { OfferToReceiveAudio: false, OfferToReceiveVideo: true } }
      );
    }

    // Step 3. createAnswer
    function createAnswer() {
      pc.createAnswer(
        gotLocalDescription,
        function(error) {
          console.log(error);
        },
        { mandatory: { OfferToReceiveAudio: false, OfferToReceiveVideo: true } }
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
      console.log(event);
      try {
        document.getElementById("remoteVideo").srcObject = event.stream;
      } catch (error) {
        document.getElementById("remoteVideo").src = window.URL.createObjectURL(
          event.stream
        );
      }
    }

    ////////////////////////////////////////////////
    // Socket.io

    var socket = io.connect(process.env.VUE_APP_SERVER_URL_DEV);

    function sendMessage(message) {
      socket.emit("message", message);
    }

    socket.on("message", function(message) {
      console.log(message);
      if (message.type === "offer") {
        pc.setRemoteDescription(new SessionDescription(message));
        createAnswer();
      } else if (message.type === "answer") {
        pc.setRemoteDescription(new SessionDescription(message));
      } else if (message.type === "candidate") {
        var candidate = new IceCandidate({
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

