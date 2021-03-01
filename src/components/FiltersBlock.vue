<template>
  <div class="filters-wrapper">
    <div class="filters">
      <template v-for="(value, key) in $store.state.filters">
        <span :key="'name'+key">{{ key }}</span>
        <div class="filters-inputs" :key="key">
          <div>
            <input class="filter range" id="size" type="range" min="0.0" :max="key==='tempo' ? 300 : 1.0"
                   step="0.01" :value="value"
                   @change="filterValueChange(key, value, $event)"/>
          </div>
          <input class="filter input" :value="Number(parseFloat(value).toFixed(2))"
                 @change="filterValueChange(key, value, $event)">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  name: "FiltersBlock",
  mixins: [spotifyApiMixin],
  props: {
    track_id: String
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    filterValueChange: async function (key, value, event) {
      await this.$store.dispatch('changeFilterValuesByKey', [key, event.target.value])
      let recommendations = await this.getRecommendationsData(this.$store.state.activeTrack, this.$store.state.filters)
      await this.$store.dispatch('updateRecomendations', recommendations)
    },
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"

.filters
  display: grid
  grid-template-columns: min-content min-content
  grid-column-gap: 10px
  grid-row-gap: 10px
  font-weight: 600
.filters-inputs
  display: flex
  flex-direction: column
  align-items: center

.range-wrapper
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: flex-start

.filter
  border: none

  &.input
    background: $background-color-accessory
    border-radius: 20px
    padding: 2px 5px
    position: relative
    width: 50px
    color: white
    font-family: inherit
    font-weight: 600

  &:focus
    outline: none

input[type=range]
  background: transparent
  width: 200px
  height: 20px

input[type=range]::-webkit-slider-runnable-track
   width: 100%
   height: 4px
   cursor: pointer
   background: $spotify-color
   border-radius: 2px
   border: none

input[type=range]::-webkit-slider-thumb
  -webkit-appearance: none
  border: none
  height: 12px
  width: 12px
  border-radius: 7px
  background: white
  cursor: pointer
  transition: all .2s ease
  margin-top: -7px


input[type=range]::-moz-range-track
   width: 100%
   height: 4px
   cursor: pointer
   background: $spotify-color
   border-radius: 2px
   border: none

input[type=range]::-moz-range-thumb
   border: none
   height: 12px
   width: 12px
   border-radius: 7px
   background: white
   cursor: pointer
   transition: all .2s ease

input[type=range]:active::-moz-range-thumb
   background: white


</style>