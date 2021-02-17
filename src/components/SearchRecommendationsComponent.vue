<template>
  <div class="search-recommendations-wrapper">
    <search-component/>
    <recommendations-component/>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent";
import RecommendationsComponent from "@/components/RecommendationComponent";

export default {
  name: "SearchRecommendationsComponent",
  components: {RecommendationsComponent, SearchComponent}
}
</script>

<style scoped lang="sass">
.search-recommendations-wrapper
  width: 100%
  height: 100%
  display: flex
  flex-direction: row

</style>