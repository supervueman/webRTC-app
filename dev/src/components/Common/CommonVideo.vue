<template lang="pug">
  video#video
</template>

<script>
export default {
  name: "Video"
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
</style>
