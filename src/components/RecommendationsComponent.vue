<template>
  <div class="recommendations-wrapper">
    <track-list v-if="recommendations" :tracks="recommendations.tracks"></track-list>
  </div>
</template>

<script>
import TrackList from "@/components/TrackList";
import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  name: "RecommendationsComponent",
  components: {TrackList},
  props: ['trackId'],
  mixins: [spotifyApiMixin],
  data() {
    return {
      recommendations: null
    }
  },
  methods: {
    getRecomendations: async function () {
      this.recommendations = await this.getRecommendationsData(this.trackId)
      console.log('recs:', this.recommendations)
    }
  },
  created: function () {
    this.getRecomendations()
  },
  watch: {
    trackId: function () {
      this.getRecomendations()
    }
  }
}
</script>

<style lang="sass" scoped>
.recommendations-wrapper
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  .search-box
    width: 800px
</style>