<template>
  <div id="app">
    <div class="page-wrapper">
      <nav-panel></nav-panel>
      <div class="content-wrapper">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import NavPanel from "@/components/NavPanel";

export default {
  components: {NavPanel},
  mixins: [spotifyApiMixin],
  name: 'App',
  created() {
    this.getAvailableGenres()
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
    .content-wrapper
      position: relative
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

</style>
