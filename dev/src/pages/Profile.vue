<template lang="pug">
  section(v-if="profile")
    .container
      common-video#video
      common-button(
        text="Start stream"
        @onClick="startStream"
      )
      div {{mess}}
</template>

<script>
import io from "socket.io-client";
export default {
  name: "Profile",
  data() {
    return {
      mess: "xcg bfgd"
    };
  },
  computed: {
    profile() {
      return this.$store.getters["authenticate/getProfile"];
    }
  },

  methods: {
    async startStream() {
      const socket = await io.connect(process.env.VUE_APP_SERVER_URL_DEV);

      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia;

      const PeerConnection =
        window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      const IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
      const SessionDescription =
        window.mozRTCSessionDescription || window.RTCSessionDescription;

      let pc;

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

      function gotStream(stream) {
        console.log(stream);
        const video = document.getElementById("video");

        try {
          video.srcObject = stream;
        } catch (error) {
          video.src = window.URL.createObjectURL(stream);
        }

        video.play();

        pc = new PeerConnection(null);
        pc.addStream(stream);
        pc.onicecandidate = gotIceCandidate;

        createOffer();
      }

      navigator.getUserMedia(
        { audio: false, video: true },
        gotStream,
        error => {
          console.log(error);
        }
      );

      function createOffer() {
        pc.createOffer(
          gotLocalDescription,
          function(error) {
            console.log(error);
          },
          {
            mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true }
          }
        );
      }

      function gotLocalDescription(description) {
        pc.setLocalDescription(description);
        sendMessage(description);
      }

      function sendMessage(message) {
        console.log(message);
        socket.emit("message", message);
      }

      await socket.on("message", message => {
        if (message.type === "offer") {
          console.log("offer");
          // pc.setRemoteDescription(new SessionDescription(message));
        } else if (message.type === "candidate") {
          console.log("candidate");
          // const candidate = new IceCandidate({
          //   sdpMLineIndex: message.label,
          //   candidate: message.candidate
          // });
          // pc.addIceCandidate(candidate);
        }
      });
    }
  }
};
</script>
