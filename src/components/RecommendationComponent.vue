<template>
  <div class="recommendations-wrapper">
    <filters-block v-if="$store.state.recommendations"/>
    <div class="recommendations-list-wrapper">
      <transition name="fade-slide" mode="out-in">
        <recommendation-list :tracks="$store.state.recommendations.tracks"
                             v-if="$store.state.recommendations"/>
      </transition>
      <transition name="fade" mode="out-in">
        <loading-component v-if="isLoading"/>
      </transition>
    </div>
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin"
import RecommendationList from "@/components/RecommendationsList"
import LoadingComponent from "@/components/LoadingComponent"
import FiltersBlock from "@/components/FiltersBlock"

export default {
  name: "RecommendationsComponent",
  components: {FiltersBlock, LoadingComponent, RecommendationList},
  props: ['trackId', 'popularity'],
  mixins: [spotifyApiMixin],
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    this.getRecommendations().then(() => {
      this.isLoading = false
    })
  },
  mounted() {
    if (window.localStorage.recommendations_data) {
      let data = JSON.parse(window.localStorage.getItem('recommendations_data'))
      this.$store.dispatch('setRecommendationsDataFromStore', data).then(() => {
        window.localStorage.removeItem('recommendations_data')
        console.log('Recs data cleared from storage')
      })
    }
  },
  methods: {
    getRecommendations: async function () {
      let features = await this.getAudioFeatures(this.$route.params.trackId)
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(this.$store.state.filters)) {
        await this.$store.dispatch('setFilterValuesByKey', [key, features[key]])
      }
      await this.$store.dispatch('updateRecommendations', await this.getRecommendationsData(this.$route.params.trackId, this.$store.state.filters))
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

  .recommendations-list-wrapper
    width: 100%
    height: 100%
    position: relative

  .search-box
    width: 800px

+tablet
  .recommendations-wrapper
    flex-direction: column
    align-items: center
    width: 100%

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
