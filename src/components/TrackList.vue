<template>
  <div class="track-list-wrapper">
    <div class="track-list">
      <router-link v-for="track in tracks"
                   :key="track.id" :to="{ name: 'recommendations', params: { trackId: track.id } }">
        <track-card class="track-list-card" :class="{ active: $store.state.activeTrack === track.id }" :track="track"
                    :form="'rec'"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import TrackCard from "@/components/TrackCard";

export default {
  props: ['tracks'],
  name: "TrackList",
  components: {TrackCard},
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

a
  text-decoration: none

.track-list-wrapper
  min-height: 140px

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
