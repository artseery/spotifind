<template>
  <div class="recommendations-wrapper">
    <recommendation-list v-if="recommendations" :tracks="recommendations.tracks"></recommendation-list>
<!--    <filters-block class="filters-block" @updateRecommendations="updateRecommendations"></filters-block>-->
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import RecommendationList from "@/components/RecommendationsList";
// import FiltersBlock from "@/components/FiltersBlock";

export default {
  name: "RecommendationsComponent",
  components: {RecommendationList},
  props: ['trackId', 'popularity'],
  mixins: [spotifyApiMixin],
  data() {
    return {
      recommendations: null
    }
  },
  methods: {
    getRecomendations: async function () {
      let features = await this.getAudioFeatures(this.$store.state.activeTrack)
      features.popularity = 100
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(this.$store.state.filters)) {
        await this.$store.dispatch('setFilterValuesByKey', [key, features[key]])
      }
      this.recommendations = await this.getRecommendationsData(this.$store.state.activeTrack, this.$store.state.filters)
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
    '$store.state.activeTrack': function () {
      this.getRecomendations()
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"

.recommendations-wrapper
  width: 100%
  max-height: 100vh
  padding: $padding-page-default

  .search-box
    width: 800px
  .filters-block
    position: fixed
    right: 20px
    width: 240px
</style>