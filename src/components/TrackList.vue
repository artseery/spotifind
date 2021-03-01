<template>
  <div class="track-list-wrapper">
    <div class="track-list">
      <track-card :class="{ active: $store.state.activeTrack === track.id }" v-for="track in computedTracks"
                  :key="track.id" :track="track" :form="'rec'"/>
      <filters-block class="filters-block" v-if="$store.state.activeTrack"></filters-block>
    </div>
  </div>
</template>

<script>
import TrackCard from "@/components/TrackCard";
import FiltersBlock from "@/components/FiltersBlock";

export default {
  props: ['tracks'],
  name: "TrackList",
  components: {FiltersBlock, TrackCard},
  computed: {
    activeTrack: function () {
      const activeTrackArray = this.tracks.filter(track => track.id === this.$store.state.activeTrack)
      return activeTrackArray[0]
    },
    computedTracks: function () {
      if (this.$store.state.activeTrack) {
        return this.tracks.filter(track => track.id === this.$store.state.activeTrack)
      } else {
        return this.tracks
      }
    },
    computedTransition: function () {
      if (this.$store.state.activeTrack) {
        return 'element'
      } else {
        return 'list'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"

.track-list-wrapper
  width: 100%
  min-height: 140px
  position: relative

  .track-list
    display: block
    max-height: calc(100vh - 80px)
    overflow: auto
    -ms-overflow-style: none
    scrollbar-width: none
    border-top: 1px solid $background-color-accessory


    &::-webkit-scrollbar
      width: 0
      background: transparent
.filters-block
  margin-top: 20px

</style>