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
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.webkitGetUserMedia;

    const PeerConnection =
      window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
    const SessionDescription =
      window.mozRTCSessionDescription || window.RTCSessionDescription;

    let pc; // PeerConnection

    pc = new PeerConnection(null);
    pc.onaddstream = gotRemoteStream;
    pc.onicecandidate = gotIceCandidate;

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
      console.log(event.stream);
      const video = document.getElementById("video");
      try {
        video.srcObject = event.stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(event.stream);
      }
    }

    function createAnswer() {
      pc.createAnswer(
        gotLocalDescription,
        function(error) {
          console.log(error);
        },
        { mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true } }
      );
    }

    const socket = io.connect(process.env.VUE_APP_SERVER_URL_DEV);

    function sendMessage(message) {
      socket.emit("message", message);
    }

    socket.on("message", function(message) {
      // console.log(message);
      if (message.type === "offer") {
        console.log("offer");
        pc.setRemoteDescription(new SessionDescription(message));
        createAnswer();
      } else if (message.type === "answer") {
        console.log("answer");
        pc.setRemoteDescription(new SessionDescription(message));
      } else if (message.type === "candidate") {
        console.log(message);
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

