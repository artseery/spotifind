<template>
  <div class="filters-wrapper">
    <track-card class="filter-active-card" :filter_panel="true" :form="'rec'" :track="$store.state.activeTrack"/>
    <div class="filters">
      <div class="filters-grid">
        <template v-for="(item, key) in $store.state.filters">
          <span @click="changeFilterState(item, key)" :key="'name'+key" class="filter-name"
                :class="{ 'disabled': !item.enabled }">
            {{ key }}
          </span>
          <div class="filters-inputs" :key="key">
            <div>
              <input class="filter range" id="size" type="range" min="0.0" :max="key==='tempo' ? 300 : 1.0"
                     step="0.01" :value="item.value"
                     @change="filterValueChange(key, item.value, $event)"
                     :class="{ 'disabled': !item.enabled }" :disabled="!item.enabled"/>
            </div>
            <input class="filter input" :value="Number(parseFloat(item.value).toFixed(2))"
                   @change="filterValueChange(key, item.value, $event)" :disabled="!item.enabled"
                   :class="{ 'disabled': !item.enabled }"
            >
          </div>
        </template>
      </div>
      <div v-if="$store.state.spotifyAuth.access_data.access_token"
           class="button_add_playlist-wrapper">
        <button class="button_add_playlist" @click="createRecsPlaylist">Add playlist</button>
        <!--Переписать кнопку в отдельный компонент-->
        <!--Добавить список жанров-->
      </div>
    </div>
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import TrackCard from "@/components/TrackCard";

export default {
  name: "FiltersBlock",
  components: {TrackCard},
  mixins: [spotifyApiMixin],
  props: {
    track_id: String
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    filterValueChange: async function (key, value, event) {
      await this.$store.dispatch('setFilterValuesByKey', [key, event.target.value])
      await this.updateRecommendations()
    },
    changeFilterState: function (item, key) {
      let newState = !item.enabled
      this.$store.dispatch('changeFilterState', [key, newState])
      this.updateRecommendations()
    },
    updateRecommendations: async function () {
      let recommendations = await this.getRecommendationsData(this.$store.state.activeTrack.id, this.$store.state.filters)
      this.$store.dispatch('updateRecommendations', recommendations)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"
.filters-wrapper
  height: auto
  max-width: 300px
  padding: $padding-page-default $padding-page-default 0 0

  .filters
    font-weight: 600
    background: $background-color-dark
    padding: 16px
    font-size: 0.8em
    color: $font-color-accessory

  .filters-grid
    display: grid
    align-items: center
    grid-template-columns: min-content min-content
    grid-column-gap: 10px
    grid-row-gap: 10px

  .filter-name
    user-select: none
    height: 30px
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    background-color: $spotify-color
    transition: all .2s ease
    color: white
    border-radius: 30px
    padding: 0 10px
    border: 2px solid $spotify-color
    cursor: pointer

    &.disabled
      background-color: transparent
      color: $font-color-accessory

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
      color: $font-color-main
      font-family: inherit
      font-weight: 600
      transition: all .2s ease
      &.disabled
        background-color: $background-color-main
        color: $font-color-accessory

    &.range
      &.disabled
        &::-webkit-slider-runnable-track, &::-moz-range-track
          background: $background-color-main
        &::-webkit-slider-thumb, &::-moz-range-thumb
          background: $background-color-accessory


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
    transition: all .2s ease
    width: 100%
    height: 4px
    cursor: pointer
    background: $spotify-color
    border-radius: 2px
    border: none
    &.disabled
      background: black

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
    transition: all .2s ease
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