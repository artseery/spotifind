<template>
  <div class="recommendations-list-wrapper">
    <div class="recommendations-list">
      <track-card v-for="track in tracks" :key="track.id" :track="track" :form="'sqr'"/>
    </div>
  </div>
</template>

<script>
import TrackCard from "@/components/TrackCard";

export default {
  props: ['tracks'],
  name: "RecommendationList",
  components: { TrackCard }
}
</script>

<style scoped lang="sass">
@import "../variables"

.recommendations-list-wrapper
  width: 100%
  height: 100vh
  flex-direction: row
  -ms-overflow-style: none
  scrollbar-width: none
  overflow: auto
  &::-webkit-scrollbar
    width: 0
    background: transparent
  .recommendations-list
    display: grid
    grid-auto-flow: row dense
    grid-template-columns: repeat(auto-fill, 200px)
    grid-gap: 30px
    justify-content: center
    padding: $padding-page-default


</style>