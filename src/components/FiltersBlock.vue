<template>
  <div class="filters-wrapper">
    <track-card v-if="track.album" class="filter-active-card" :filter_panel="true" :form="'rec'" :track="track"/>
    <div class="filters">
      <div class="filters-grid">
        <template v-for="(item, key) in $store.state.filters">
          <span @click="changeFilterState(item, key)" :key="'name'+key" class="filter-name"
                :class="{ 'disabled': !item.enabled }">
            {{ key }}
          </span>
          <div class="filters-inputs" :key="key">
            <div class="range-wrapper">
              <input class="filter range" id="size" type="range" min="0" :max="key==='tempo' ? 300 : 1.0"
                     :step="key==='tempo'? 1 : 0.01" :value="item.value"
                     @change="filterValueChange(key, item.value, $event)"
                     :class="{ 'disabled': !item.enabled }" :disabled="!item.enabled"/>
            </div>
            <input class="filter input"
                   :value="key==='tempo' ? Math.floor(Number(parseFloat(item.value))) : Number(parseFloat(item.value).toFixed(2))"
                   @change="filterValueChange(key, item.value, $event)" :disabled="!item.enabled"
                   :class="{ 'disabled': !item.enabled, 'tempo': key==='tempo', 'maxOne': key !=='tempo' }"
            >
          </div>
        </template>
      </div>
      <div class="multiselect-wrapper">
        <multiselect placeholder="Pick genres" :value="$store.state.selected_genres" :options="$store.state.genres"
                     @input="selectGenres" :max="3" :multiple="true" :taggable="true" :tagPlaceholder="'Not found'"
                     :selectLabel="'Select'" :deselectLabel="'Remove'" :tagPosition="'bottom'"
        >

          <span slot="maxElements">Max genres selected</span>
        </multiselect>
      </div>
      <div v-if="$store.state.logged"
           class="button_add_playlist-wrapper">
        <button class="button_add_playlist" @click="createRecsPlaylist" :disabled="loading"
                :class="{ 'loading': loading }">
          <loading-component :size="20" :thickness="2" :color-main="'#6bbeec'" :color-part="'#2b74d2'" v-if="loading"/>
          <span v-else>Add playlist</span>
        </button>
        <!--Переписать кнопку в отдельный компонент-->
      </div>
    </div>
    <message-modal :message="message" :timeout="2000" @clearMessage="message = null"></message-modal>
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import TrackCard from "@/components/TrackCard";
import Multiselect from 'vue-multiselect'
import Inputmask from "inputmask"
import MessageModal from "@/components/MessageModal";
import LoadingComponent from "@/components/LoadingComponent";

export default {
  name: "FiltersBlock",
  components: {LoadingComponent, MessageModal, TrackCard, Multiselect},
  mixins: [spotifyApiMixin],
  props: {
    track_id: String,
  },
  data() {
    return {
      im: new Inputmask('decimal', {rightAlign: false, min: 0, max: 1}),
      imTempo: new Inputmask('integer', {rightAlign: false, min: 0, max: 300}),
      message: '',
      loading: false,
      track: {}
    }
  },
  created() {
     this.getTrackById(this.$route.params.trackId).then(response => {
       this.track = response.data
       this.$store.dispatch('chooseActiveTrack', this.track)
    })
  },
  mounted() {
    this.im.mask(document.getElementsByClassName("input maxOne"))
    this.imTempo.mask(document.getElementsByClassName('tempo'))
  },
  methods: {
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
      let recommendations = await this.getRecommendationsData(this.$route.params.trackId, this.$store.state.filters)
      this.$store.dispatch('updateRecommendations', recommendations)
    },
    selectGenres: function (genres) {
      this.$store.dispatch('selectGenres', genres)
      this.updateRecommendations()
    },
  },
  watch: {
    '$route.params.trackId': function () {
      this.getTrackById(this.$route.params.trackId).then(response => {
        this.track = response.data
        this.$store.commit('initFilters')
      })
    }
  }
}
</script>

<style lang="sass">
@import "../multiselectStyles.sass"
@import "../variables"

.filters-wrapper
  height: auto
  max-width: 300px
  padding: $padding-page-default $padding-page-default 0 0

  .filters
    font-weight: 600
    background: $background-color-dark
    padding: 14px
    font-size: 0.8em
    color: $font-color-accessory

  .filters-grid
    display: grid
    align-items: center
    grid-template-columns: min-content min-content
    grid-column-gap: 10px
    grid-row-gap: 2px

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
    padding: 0 6px
    border: 1px solid $spotify-color
    cursor: pointer

    &.disabled
      border-color: $font-color-accessory-dark
      background-color: transparent
      color: $font-color-accessory-dark

      &:hover
        border-color: $font-color-accessory
        color: $font-color-accessory

  .filters-inputs
    display: flex
    flex-direction: column
    align-items: center

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
        &::-webkit-slider-runnable-track
          background: $background-color-main

        &::-moz-range-track
          background: $background-color-main

        &::-webkit-slider-thumb
          background: $background-color-accessory

        &::-moz-range-thumb
          background: $background-color-accessory

  .range-wrapper
    height: 24px


    &:focus
      outline: none

  .button_add_playlist-wrapper
    margin-top: 20px
    width: 100%

    .button_add_playlist
      position: relative
      cursor: pointer
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

      &.loading
        &:hover
          background-color: $spotify-color

      &:hover
        background-color: $spotify-color-light

  .multiselect-wrapper
    margin-top: 10px

  input[type=range]
    background: transparent
    width: 120px
    -webkit-appearance: none

  input[type=range]::-webkit-slider-runnable-track
    transition: all .2s ease
    width: 100%
    height: 3px
    cursor: pointer
    background: $spotify-color
    border-radius: 2px
    border: none

    &.disabled
      background: black

  input[type=range]::-webkit-slider-thumb
    border: none
    height: 12px
    width: 12px
    border-radius: 7px
    background: white
    cursor: pointer
    transition: all .2s ease
    margin-top: -5px
    -webkit-appearance: none

  input[type=range]::-moz-range-track
    transition: all .2s ease
    width: 100%
    height: 3px
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

+tablet
  .filters-wrapper
    max-width: 100%
    width: 100%
    padding: 10px 10px

    .filters
      display: flex
      flex-direction: column
      align-items: center

      .filters-grid
        width: 100%
        grid-template-columns: min-content 1fr

      .multiselect-wrapper
        width: 100%

      .range-wrapper
        width: 100%

        input[type=range]
          width: 100%

</style>
