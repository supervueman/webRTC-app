<template lang="pug">
  section.main-sect(v-if="profile")
    .container
      common-video#video(autoplay muted)
      common-button(
        text="Start stream"
        @onClick="seeStream"
      )
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Profile",
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

    pc.onaddstream = gotRemoteStream;

    navigator.getUserMedia({ audio: false, video: true }, gotStream, error => {
      console.log(error);
    });

    function gotStream(stream) {
      const video = document.getElementById("video");

      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(stream);
      }

      pc.addStream(stream);
    }

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
      console.log(message);
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
      video.play();
    }
  }
};
</script>
