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
  components: {TrackCard}
}
</script>

<style lang="sass" scoped>
.trackList-wrapper
  width: 690px
  display: flex
  flex-direction: row
  justify-content: center

  .trackList
    display: grid
    grid-template-columns: repeat(3, 220px)
    grid-auto-rows: 270px
    grid-gap: 10px


</style>