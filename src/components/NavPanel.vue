<template>
  <div class="nav-wrapper">
    <div class="nav">
      <div class="nav-logo">
        <img class="spotifind-logo" src="../assets/SpotifindLogoV3White.png"/>
      </div>
      <div class="nav-content">
        <div v-if="!$store.state.SpotifyAuth.access_data.access_token" @click="$store.dispatch('SpotifyAuth/redirectToSpotifyAuth')">
          Auth
        </div>
        <div v-else>Authorized</div>
        <search-component></search-component>
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent";
export default {
name: "NavPanel",
  components: {SearchComponent}
}
</script>

<style lang="sass" scoped>
@import "../variables"

.nav-wrapper
  height: 80px
  width: 100%
  background: black
  display: flex
  flex-direction: row
  justify-content: center
  .nav
    max-width: $content-width
    width: 100%
    height: 100%
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .nav-logo
      height: 40px
      .spotifind-logo
        height: 100%
    .nav-content
      display: flex
      flex-direction: row
      align-items: center

</style>