<template>
  <div id="app">
    <div class="page-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>

import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  mixins: [spotifyApiMixin],
  name: 'App',
}
</script>

<style lang="sass">
@import variables.sass

*
  box-sizing: border-box !important
html
  overflow-y: scroll //Временный фикс скачков из-за скролл бара
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

input
  font-family: inherit

</style>
