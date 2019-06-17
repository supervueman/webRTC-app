<template lang="pug">
  section.main-sect(v-if="profile")
    .container
      common-video#video
      common-button(
        text="See stream"
        @onClick="seeStream"
      )
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Streamer",
  data() {
    return {
      pc: null,
      socket: null
    };
  },
  computed: {
    profile() {
      return this.$store.getters["authenticate/getProfile"];
    }
  },

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

    const pc = new PeerConnection(null);

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

    function gotRemoteStream(event) {
      const video = document.getElementById("video");
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
      } else if (message.type === "candidate") {
        const candidate = new IceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
        });
        pc.addIceCandidate(candidate);
      }
    });
  },

  methods: {
    seeStream() {
      const video = document.getElementById("video");
      console.log(video);
      video.play();
    }
  }
};
</script>

<style lang="sass">
</style>

