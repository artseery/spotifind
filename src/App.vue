<template>
  <div id="app">
    <div class="page-wrapper">
      {{ $store.state.filters }}
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
*
  box-sizing: border-box
html
  overflow-y: scroll //Временный фикс скачков из-за скролл бара
html, body, #app
  margin: 0
  padding: 0
  width: 100%
</style>
