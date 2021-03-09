<template>
  <div class="search-wrapper">
    <search-box class="search-box"/>
    <track-list class="search-track-list" v-if="$store.state.foundResults && $store.state.searchInputFocused"
                :tracks="$store.state.foundResults.tracks.items"/>
  </div>
</template>

<script>

import SearchBox from "@/components/SearchBox";
import TrackList from "@/components/TrackList";

export default {
  name: "SearchComponent",
  components: {TrackList, SearchBox}
}
</script>

<style lang="sass" scoped>
@import "../variables"

.search-wrapper
  flex-shrink: 0
  width: 500px
  max-height: 100vh

  .search-box
    width: 100%

  .search-track-list
    z-index: 100
    position: absolute
    width: 460px
    max-height: 404px
    min-height: 0
    margin-top: 20px
    margin-left: 20px
    background: black
    overflow: auto
    -ms-overflow-style: none
    scrollbar-width: none
</style>