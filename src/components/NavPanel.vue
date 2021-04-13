<template>
  <div class="nav-wrapper">
    <div class="nav">
      <div class="nav-logo">
        <img class="spotifind-logo" src="../assets/SpotifindLogoV3White.png"/>
      </div>
      <div class="nav-content">
        <search-component class="item search-wrapper"></search-component>
        <div class="auth item">
          <div v-if="!accessData()"
               @click="redirectToAuth" class="auth-nologon">
            <img class="auth-nologon icon" src="../assets/login-icon.png"/>
          </div>
          <div v-else class="auth-logon">
            <img class="auth-logon icon" v-if="user_data && user_data.images[0]"
                 :src="user_data.images[0].url"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent"
import { redirectToSpotifyAuth } from "@/utils";

export default {
  name: "NavPanel",
  components: {SearchComponent},
  data() {
    return {
      user_data: null
    }
  },
  created() {
    if(window.localStorage.user_data) {
      this.user_data = JSON.parse(window.localStorage.user_data)
    }
    window.addEventListener('setUserData', () => {
      console.log('user_data:', this.user_data)
      this.user_data = JSON.parse(window.localStorage.user_data)
    })
  },
  methods: {
    accessData: function () {
      console.log(window.localStorage.access_data)
      return window.localStorage.access_data
    },
    redirectToAuth: function () {
      redirectToSpotifyAuth()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"

.nav-wrapper
  height: $nav-panel-height
  width: 100%
  background: $background-color-dark
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
    position: relative

    .nav-logo
      height: 40px

      .spotifind-logo
        height: 100%

    .nav-content
      display: flex
      flex-direction: row
      align-items: center
      height: 40px
      position: relative

      .search-wrapper
        width: 500px

      .auth
        width: 40px
        height: 100%

        .icon
          border-radius: 100%
          height: 100%

        .auth-nologon, .auth-logon
          cursor: pointer
          height: 100%

      .item
        margin: 0 4px

+tablet
  .nav-wrapper
    .nav
      .nav-content
        width: 100%
        margin: 0 10px

        .item
          position: relative

        .search-wrapper
          width: 100%

    .nav-logo
      display: none


</style>