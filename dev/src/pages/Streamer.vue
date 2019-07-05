<template lang="pug">
  section(v-if="profile")
    .container
      common-video#video(autoplay muted)
      common-button#callButton(
        text="See stream"
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

    let pc = new PeerConnection(null);

    pc.onicecandidate = gotIceCandidate;
    pc.onaddstream = gotRemoteStream;

    document
      .getElementById("callButton")
      .addEventListener("click", createOffer);

    function gotRemoteStream(event) {
      const video = document.getElementById("video");
      try {
        video.srcObject = event.stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(event.stream);
      }
      pc.addStream(event.stream);
    }

    function createOffer() {
      pc.createOffer(
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

    ////////////////////////////////////////////////
    // Socket.io

    const socket = io.connect(process.env.VUE_APP_SERVER_URL_DEV);

    function sendMessage(message) {
      socket.emit("message", message);
    }

    socket.on("message", message => {
      if (message.type === "answer") {
        pc.setRemoteDescription(new SessionDescription(message));
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

