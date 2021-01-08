<template>
  <div class="search-wrapper">
    <search-box class="search-box"></search-box>
    <track-list></track-list>
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
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  .search-box
    width: 800px
</style>