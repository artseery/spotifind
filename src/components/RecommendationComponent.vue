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
  beforeRouteEnter (to, from, next) {
    next(vm => {
     if (window.localStorage.recommendations_data) {
       let data = JSON.parse(window.localStorage.getItem('recommendations_data'))
       vm.$store.dispatch('setRecommendationsDataFromStore', data).then(() => {
         window.localStorage.removeItem('recommendations_data')
         console.log('cleared')
       })
     }
    })
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