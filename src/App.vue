<template>
  <div id="app">
    <div class="page-wrapper">
      <search-box class="search-box"></search-box>
      <track-list></track-list>
    </div>
  </div>
</template>

<script>

import SearchBox from "@/components/SearchBox";
import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import TrackList from "@/components/TrackList";

export default {
  mixins: [spotifyApiMixin],
  name: 'App',
  components: {
    TrackList,
    SearchBox
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
  #app, .page-wrapper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    .search-box
      width: 800px
</style>
