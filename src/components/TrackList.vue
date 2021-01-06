<template>
  <div class="trackList-wrapper">
    <div class="trackList">
      <track-card></track-card>
      <track-card></track-card>
      <track-card></track-card>
      <track-card></track-card>
      <track-card></track-card>

    </div>
  </div>
</template>

<script>
import TrackCard from "@/components/TrackCard";
export default {
name: "TrackList",
  components: {TrackCard}
}
</script>

<style lang="sass" scoped>
.trackList-wrapper
  width: 690px
  .trackList
    display: grid
    grid-template-columns: repeat(3, 230px)
    grid-auto-rows: 270px


</style>