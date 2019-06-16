<template lang="pug">
  section.main-sect(v-if="profile")
    .container
      video#video
</template>

<script>
export default {
  name: "Profile",
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
    navigator.getUserMedia(
      { audio: true, video: true },
      this.gotStream,
      this.streamError
    );
  },
  methods: {
    gotStream(stream) {
      const video = document.getElementById("video");
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = window.URL.createObjectURL(stream);
      }
      video.play();
    },

    streamError(error) {
      console.log(error);
    }
  }
};
</script>

<style lang="sass">
  #video
    width: 100%
</style>

