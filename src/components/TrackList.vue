<template>
  <div class="trackList-wrapper">
    <div class="trackList">
      <track-card v-for="track in tracks" :key="track.id" :track="track">
      </track-card>
    </div>
  </div>
</template>

<script>
import TrackCard from "@/components/TrackCard";

export default {
  props: ['tracks'],
  name: "TrackList",
  components: {TrackCard},
}
</script>

<style lang="sass" scoped>
.trackList-wrapper
  width: 100%
  max-height: calc(100vh - 60px)
  overflow: auto
  -ms-overflow-style: none
  scrollbar-width: none
  &::-webkit-scrollbar
    width: 0
    background: transparent
  .trackList
    display: block
</style>