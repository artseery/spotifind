<template>
  <div class="filters-wrapper">
    <div class="filters">
      <div v-for="(value, key) in $store.state.filters" :key="key">{{ key }}
        <div class="range-wrapper">
          <input id="size" type="range" min="0.0" :max="key==='tempo' ? 300 : 1.0" step="0.01" :value="value" @change="filterValueChange(key, value, $event)"/>
          <input class="filter-input" :value="value" @change="filterValueChange(key, value, $event)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  name: "FiltersBlock",
  mixins: [spotifyApiMixin],
  methods: {
    // eslint-disable-next-line no-unused-vars
    filterValueChange: async function (key, value, event) {
      await this.$store.dispatch('changeFilterValuesByKey', [key, event.target.value])
      let recommendations = await this.getRecommendationsData(this.$route.params.trackId, this.$store.state.filters)
      this.$emit('updateRecommendations', recommendations)
    }
  }
}
</script>

<style lang="sass" scoped>
.range-wrapper
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: flex-start
.filter-input
  border: none
  &:focus
    outline: none
</style>