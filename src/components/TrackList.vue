<template>
  <div class="track-list-wrapper">
    <div class="track-list">
      <track-card class="track-list-card" :class="{ active: $store.state.activeTrack === track.id }" v-for="track in tracks"
                  :key="track.id" :track="track" :form="'rec'"/>
    </div>
  </div>
</template>

<script>
import TrackCard from "@/components/TrackCard";

export default {
  props: ['tracks'],
  name: "TrackList",
  components: { TrackCard},
  computed: {
    activeTrack: function () {
      const activeTrackArray = this.tracks.filter(track => track.id === this.$store.state.activeTrack.id)
      return activeTrackArray[0]
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"

.track-list-wrapper
  min-height: 140px
  box-shadow: 0 0 4px 0 $spotify-color

  .track-list
    display: block
    height: 100%
    border-top: 1px solid $background-color-accessory
    &:first-child
      border-top: none

    &::-webkit-scrollbar
      width: 0
      background: transparent

.filters-block
  margin-top: 20px

</style>