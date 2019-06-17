<template lang="pug">
  header.toolbar
    .container.d-flex.align-center
      .logo
        h3
          router-link.logo-link(to="/") WebRTC
      common-link(
        link="/streamers"
        text="Streamers"
        v-if="profileId !== ''"
      )
      .divider
      common-link(
        link="/signin"
        text="Sign in"
        v-if="profileId === ''"
      )
      common-link(
        link="/signup"
        text="Sign up"
        v-if="profileId === ''"
      )
      common-link(
        link="/profile"
        text="Profile"
        v-if="profileId !== ''"
      )
      .link(
        @click="logout"
        v-if="profileId !== ''"
      ) Logout
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    profileId: {
      type: String,
      default: ""
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("authenticate/logout");
      this.$router.push("/signin");
    }
  }
};
</script>

<style lang="sass">
@import "@/assets/sass/_vars.sass"
.toolbar
  // Position block
  position: fixed
  top: 0
  left: 0
  z-index: 100

  // Size block
  width: 100%
  height: 50px
  
  // Display block
  display: flex
  align-items: center
  justify-content: flex-start

  // Color block
  background-color: #030823

  // Effect block
  box-shadow: 0 0 10px rgba($pink ,0.5)

  .link:last-child
    // Margin/Padding block
    margin-right: 0

.logo
  // Margin/Padding block
  margin-right: 20px
  &-link
    // Display block
    display: flex
    align-items: center

    // Color block
    color: $green

.divider
  // Size block
  flex: 1

</style>

