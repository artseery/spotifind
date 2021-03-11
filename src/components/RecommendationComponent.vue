<template>
  <div class="recommendations-wrapper">
    <filters-block v-if="$store.state.recommendations"/>
    <div class="recommendations-list-wrapper">
      <transition name="fade-slide" mode="out-in">
        <recommendation-list :tracks="$store.state.recommendations.tracks"
                             v-if="$store.state.recommendations  && !$store.state.loading.recs"/>
      </transition>
      <transition name="fade" mode="out-in">
        <loading-component v-if="$store.state.loading.recs"/>
      </transition>
    </div>
    <!--    <filters-block class="filters-block" @updateRecommendations="updateRecommendations"></filters-block>-->
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import RecommendationList from "@/components/RecommendationsList";
import LoadingComponent from "@/components/LoadingComponent";
import FiltersBlock from "@/components/FiltersBlock";
// import FiltersBlock from "@/components/FiltersBlock";

export default {
  name: "RecommendationsComponent",
  components: {FiltersBlock, LoadingComponent, RecommendationList},
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
    //this.getRecomendations()
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
  display: flex
  position: relative
  width: $content-width
  height: 100%
  -ms-overflow-style: none
  scrollbar-width: none
  overflow: auto

  .recommendations-list-wrapper
    width: 100%
    position: relative

  .search-box
    width: 800px

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