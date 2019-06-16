<template lang="pug">
  router-link.link(:to="link") {{text}}
</template>

<script>
export default {
  name: "CommonLink",
  props: {
    link: {
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
.link
  // Position block
  position: relative

  // Font block
  font-size: 16px

  // Color block
  color: $green

  // Margin/Padding block
  margin: 10px

  // Other block
  cursor: pointer

  // Pseudo block
  &::after, &::before
    // Content block
    content: ''

    // Position block
    position: absolute
    bottom: 0

    // Size block
    width: 0
    height: 1px

    // Color block
    background-color: $pink

    // Animation block
    transition: width 0.1s ease-in-out

  // Edit pseudo block
  &::before
    // Position block
    left: 0
  &::after
    // Position block
    right: 0

    // Color block
    background-color: $blue

  // Hover block
  &:hover
    &::after, &::before
      // Size block
      width: 50%
</style>

