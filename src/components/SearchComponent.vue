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
.search-wrapper
  width: 690px
  max-height: 100vh
  padding: 10px 10px 0 10px
  border-right: 2px solid #474747
  min-height: 100%
  .search-box
    width: 100%
</style>