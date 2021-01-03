<template>
  <div id="app">
    <search-box></search-box>
  </div>
</template>

<script>

import SearchBox from "@/components/SearchBox";
import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  mixins: [spotifyApiMixin],
  name: 'App',
  components: {
    SearchBox
  }
}
</script>

<style lang="sass">
*
  box-sizing: border-box

html, body, #app
  margin: 0
  padding: 0
</style>
