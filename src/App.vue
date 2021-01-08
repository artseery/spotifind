<template>
  <div id="app">
    <div class="page-wrapper">
      <search-component></search-component>
    </div>
  </div>
</template>

<script>

import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import SearchComponent from "@/components/SearchComponent";

export default {
  mixins: [spotifyApiMixin],
  name: 'App',
  components: {
    SearchComponent,
  }
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
