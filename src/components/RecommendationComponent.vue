<template>
  <div class="recommendations-wrapper">
    <transition name="fade-slide" mode="out-in">
      <recommendation-list v-if="$store.state.recommendations  && !$store.state.loading.recs"
                           :tracks="$store.state.recommendations.tracks"/>
    </transition>
    <transition name="fade" mode="out-in">
      <loading-component v-if="$store.state.loading.recs"/>
    </transition>
    <!--    <filters-block class="filters-block" @updateRecommendations="updateRecommendations"></filters-block>-->
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import RecommendationList from "@/components/RecommendationsList";
import LoadingComponent from "@/components/LoadingComponent";
// import FiltersBlock from "@/components/FiltersBlock";

export default {
  name: "RecommendationsComponent",
  components: {LoadingComponent, RecommendationList},
  props: ['trackId', 'popularity'],
  mixins: [spotifyApiMixin],
  methods: {
    getRecomendations: async function () {
      let features = await this.getAudioFeatures(this.$store.state.activeTrack)
      features.popularity = 100
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(this.$store.state.filters)) {
        await this.$store.dispatch('setFilterValuesByKey', [key, features[key]])
      }
      await this.$store.dispatch('updateRecomendations', await this.getRecommendationsData(this.$store.state.activeTrack, this.$store.state.filters))
    },
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
  position: relative
  width: 100%
  max-height: 100vh

  .search-box
    width: 800px

  .filters-block
    position: fixed
    right: 20px
    width: 240px

.fade-slide-enter-active, .fade-slide-leave-active
  transition: all .2s ease

.fade-slide-enter, .fade-slide-leave-to
  opacity: 0
  transform: translateY(-20px)

.fade-enter-active
  transition: all .2s ease

.fade-enter, .fade-leave-to
  opacity: 0

.fade-enter-to, .fade-leave
  transition-delay: .1s

</style>