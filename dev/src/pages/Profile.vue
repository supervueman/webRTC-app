<template lang="pug">
  section.main-sect(v-if="profile")
    .container
      video#video
      common-button(
        text="Start stream"
        @onClick="startStream"
      )
</template>

<script>
import io from "socket.io-client";
export default {
  name: "Profile",
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

  methods: {
    startStream() {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia;

      // Step 1. getUserMedia
      navigator.getUserMedia(
        { audio: false, video: true },
        this.gotStream,
        error => {
          console.log(error);
        }
      );
    },

    createPeerConnection() {
      const PeerConnection =
        window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      const IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
      const SessionDescription =
        window.mozRTCSessionDescription || window.RTCSessionDescription;
      this.pc = new PeerConnection(null);
    },

    gotStream(stream) {
      this.createPeerConnection();
      const video = document.getElementById("video");

      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(stream);
      }

      video.play();

      this.pc.addStream(stream);
      this.pc.onicecandidate = this.gotIceCandidate;

      this.createOffer();
      this.socketActivate();
    },

    createOffer() {
      this.pc.createOffer(
        this.gotLocalDescription,
        function(error) {
          console.log(error);
        },
        { mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true } }
      );
    },

    gotLocalDescription(description) {
      this.pc.setLocalDescription(description);
      this.sendMessage(description);
    },

    gotIceCandidate(event) {
      if (event.candidate) {
        this.sendMessage({
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        });
      }
    },

    socketActivate() {
      this.socket = io.connect(process.env.VUE_APP_SERVER_URL_DEV);

      this.socket.on("message", function(message) {
        if (message.type === "offer") {
          this.pc.setRemoteDescription(new SessionDescription(message));
          createAnswer();
        } else if (message.type === "candidate") {
          const candidate = new IceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate
          });
          this.pc.addIceCandidate(candidate);
        }
      });
    },

    sendMessage(message) {
      this.socket.emit("message", message);
    }
  }
};
</script>

<style lang="sass">
@import "@/assets/sass/_vars.sass"
#video
  // Size block
  width: 100%

  // Color block
  background-color: $dark

  // Border block
  border: 3px solid $dark
  border-top-color: $pink
  border-bottom-color: $green
  border-right-color: $yellow
  border-left-color: $blue

  // Effect block
  // filter: contrast(1.5) hue-rotate(150deg) saturate(2.2)
</style>

