<template>
  <div class="recommendations-wrapper">
    <track-list v-if="recommendations" :tracks="recommendations.tracks"></track-list>
    <filters-block class="filters-block" @updateRecommendations="updateRecommendations"></filters-block>
  </div>
</template>

<script>
import TrackList from "@/components/TrackList";
import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import FiltersBlock from "@/components/FiltersBlock";

export default {
  name: "RecommendationsComponent",
  components: {FiltersBlock, TrackList},
  props: ['trackId', 'popularity'],
  mixins: [spotifyApiMixin],
  data() {
    return {
      recommendations: null
    }
  },
  methods: {
    getRecomendations: async function () {
      let features = await this.getAudioFeatures(this.trackId)
      features.popularity = 100
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(this.$store.state.filters)) {
        await this.$store.dispatch('setFilterValuesByKey', [key, features[key]])
      }
      this.recommendations = await this.getRecommendationsData(this.trackId, this.$store.state.filters)
      //Переделать логику, данные поиска и редомендаций должны быть в одной переменной, что бы можно было работать и с поиском и с реками
      console.log('recs:', this.recommendations)
    },
    updateRecommendations: function (newRecommendations) {
      this.recommendations = newRecommendations
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
  flex-direction: row
  justify-content: center
  //align-items: center
  width: 100%

  .search-box
    width: 800px
  .filters-block
    position: fixed
    right: 20px
    width: 240px
</style>