<template lang="pug">
  section.main-sect(v-if="profile")
    .container
      video#localVideo
      video#remoteVideo
      button#callButton(@click="startStream") ✆
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

    socketActivate() {
      this.socket = io.connect("http://localhost:3000", { port: 3000 });

      this.socket.on("message", function(message) {
        if (message.type === "offer") {
          this.pc.setRemoteDescription(new SessionDescription(message));
          createAnswer();
        } else if (message.type === "answer") {
          this.pc.setRemoteDescription(new SessionDescription(message));
        } else if (message.type === "candidate") {
          const candidate = new IceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate
          });
          this.pc.addIceCandidate(candidate);
        }
      });
    },
    gotStream(stream) {
      const PeerConnection =
        window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      const IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
      const SessionDescription =
        window.mozRTCSessionDescription || window.RTCSessionDescription;
      document.getElementById("callButton").style.display = "inline-block";

      const video = document.getElementById("localVideo");

      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(stream);
      }

      video.play();

      this.pc = new PeerConnection(null);
      this.pc.addStream(stream);
      this.pc.onicecandidate = this.gotIceCandidate;
      this.pc.onaddstream = this.gotRemoteStream;

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
    createAnswer() {
      this.pc.createAnswer(
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
    gotRemoteStream(event) {
      try {
        document.getElementById("remoteVideo").srcObject = event.stream;
      } catch (error) {
        document.getElementById("remoteVideo").src = window.URL.createObjectURL(
          event.stream
        );
      }

      document.getElementById("remoteVideo").play();
    },

    sendMessage(message) {
      this.socket.emit("message", message);
    }
  }
};
</script>

<style lang="sass">
  video
    width: 100%
    -webkit-filter: contrast(1.5) hue-rotate(150deg) saturate(2.2)
</style>

