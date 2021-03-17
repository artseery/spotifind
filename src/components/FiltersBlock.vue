<template>
  <div class="filters-wrapper">
    <div class="filters">
      <div class="filters-grid">
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
      <div v-if="$store.state.SpotifyAuth.access_data.access_token"
           class="button_add_playlist-wrapper" @click="createRecsPlaylist">
        <button class="button_add_playlist">Add playlist</button> <!--Переписать кнопку в отдельный компонент-->
      </div>
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
      let recommendations = await this.getRecommendationsData(this.$store.state.activeTrack.id, this.$store.state.filters)
      await this.$store.dispatch('updateRecomendations', recommendations)
    },
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"
.filters-wrapper
  height: auto
  padding-top: $padding-page-default

  .filters
    font-weight: 600
    background: $background-color-dark
    padding: 20px
    font-size: 0.8em
    color: $font-color-accessory
  .filters-grid
    display: grid
    grid-template-columns: min-content min-content
    grid-column-gap: 10px
    grid-row-gap: 10px

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
      background: $background-color-main
      border-radius: 20px
      padding: 2px 5px
      position: relative
      width: 50px
      color: $font-color-accessory
      font-family: inherit
      font-weight: 600

    &:focus
      outline: none

  .button_add_playlist-wrapper
    margin-top: 20px
    .button_add_playlist
      background-color: $spotify-color
      font-weight: 600
      color: $font-color-main
      outline: none
      border: none
      font-family: inherit
      border-radius: 30px
      height: 40px
      width: 100%
      transition: background-color .2s ease

      &:hover
        background-color: $spotify-color-light

  input[type=range]
    background: transparent
    width: 120px
    height: 10px

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