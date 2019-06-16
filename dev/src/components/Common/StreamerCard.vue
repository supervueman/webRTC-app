<template lang="pug">
  router-link(:to="`/streamers/1`").card
    .card-image
      img(:src="image")
    .card-text {{text}}
</template>

<script>
export default {
  name: "StreamerCard",
  props: {
    image: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="sass">
@import "@/assets/sass/_vars.sass"

.card
  // Display block
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center

  // Color
  background-color: $dark
  color: $green

  // Margin/Padding block
  margin: 10px

  // Border block
  border: 1px solid $yellow

  // Effect block
  box-shadow: 0 0 10px rgba($yellow ,0.5)
  &-image
    // Size block
    width: 100%
    img
      // Size block
      width: 100%
  &-text
    // Display block
    display: flex
    align-items: center
    justify-content: center

    // Font block
    font-size: 16px
    text-align: center

    // Margin/Padding block
    margin-top: 10px
</style>

