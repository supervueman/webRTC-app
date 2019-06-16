<template lang="pug">
  button.button(@click="onClick") {{text}}
</template>

<script>
export default {
  name: "CommonButton",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    }
  }
};
</script>

<style lang="sass">
@import "@/assets/sass/_vars.sass"

.button
  // Display block
  display: flex
  justify-content: center
  align-items: center

  // Border block
  border-radius: 0px
  border: 1px solid $pink

  // Color
  background-color: $dark
  color: $green

  // Font block
  font-size: 16px
  text-transform: uppercase

  // Margin/Padding block
  padding: 10px 20px
  margin: 10px

  //Animation block
  transition: border-color 0.3s, background-color 0.3s, color 0.3s, box-shadow 0.3s, text-shadow 0.3s

  // Effect block
  box-shadow: 0 0 10px rgba($pink ,0.5)

  // Other block
  cursor: pointer

  // Hover
  &:hover
    // Border block
    border-color: $green

    // Color block
    color: $pink

    // Effect block
    box-shadow: 0 0 10px rgba($green ,0.5)
    text-shadow: 1px 1px 1px $green, 0 0 1em $pink
</style>

