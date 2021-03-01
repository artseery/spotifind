<template>
  <div class="search-wrapper">
    <search-box class="search-box"/>
    <track-list v-if="$store.state.foundResults" :tracks="$store.state.foundResults.tracks.items"/>
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
  width: 690px
  max-height: 100vh
  padding: $padding-page-default
  border-right: 2px solid $background-color-accessory
  min-height: 100%
  .search-box
    width: 100%
</style>