<template>
  <div class="track-list-wrapper">
    <div class="track-list">
      <vue-custom-scrollbar class="scroll-area">
        <router-link v-for="track in tracks"
                     :key="track.id" :to="{ name: 'recommendations', params: { trackId: track.id } }"
                     class="track-card__link">
          <track-card class="track-list-card" :class="{ active: $route.params.trackId === track.id }" :track="track"
                      :form="'rec'"/>
        </router-link>
      </vue-custom-scrollbar>
    </div>
  </div>
</template>

<script>
import TrackCard from "@/components/TrackCard";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  props: ['tracks'],
  name: "TrackList",
  components: {TrackCard, vueCustomScrollbar},
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
  position: absolute
  width: 100%
  top: 44px
  z-index: 99
  .scroll-area
    max-height: 250px
    height: 250px
  .track-list
    display: block
    height: 100%
    border-top: 1px solid $background-color-accessory

    .track-card__link
      &:focus
        outline: 1px dotted white

    .track-list-card
      margin-bottom: 4px

    &:first-child
      border-top: none

    &::-webkit-scrollbar
      width: 0
      background: transparent

.filters-block
  margin-top: 20px

</style>
