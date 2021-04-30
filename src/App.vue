<template>
  <div id="app">
    <div class="page-wrapper">
      <transition name="fade" mode="out-in">
        <router-view name="navPanel"/>
      </transition>
      <div class="content-wrapper">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  mixins: [spotifyApiMixin],
  name: 'App',
  created() {
    if (!window.localStorage.token) {
      this.getToken()
    }
  },
  mounted() {
    if (!this.$store.state.filters) {
      this.getAvailableGenres()
      this.$store.dispatch('initFilters')
    }
  }
}
</script>

<style lang="sass">
@import variables.sass

*
  box-sizing: border-box !important

html
  overflow-y: scroll
//Временный фикс скачков из-за скролл бара
html, body, #app
  margin: 0
  padding: 0
  width: 100%
  height: 100%
  overflow: auto

input:focus
  outline: none

button:focus
  outline: none

::-moz-focus-inner
  border: none

#app
  background-color: $background-color-main
  color: white
  font-family: "Roboto", sans-serif

  .page-wrapper
    height: 100%
    position: relative

    .content-wrapper
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      -ms-overflow-style: none
      scrollbar-width: none
      overflow: auto
      height: calc(100% - 80px)

input
  font-family: inherit

.fade-enter-active, .fade-leave-active
  transition: .2s all ease

.fade-enter, .fade-leave-to
  opacity: 0

</style>
