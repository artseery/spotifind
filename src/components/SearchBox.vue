<template>
  <div class="search-input-wrapper">
    <input @focus="$store.dispatch('searchInputFocus', true)"
           @click="onClick"
           placeholder="Search" class="search-input" @input="onInput" :value="fieldData"/>
    <track-list class="search-track-list" v-if="$store.state.foundResults && $store.state.searchInputFocused"
                :tracks="$store.state.foundResults.tracks.items"/>
  </div>
</template>

<script>

import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import TrackList from "@/components/TrackList";

export default {
  mixins: [spotifyApiMixin],
  components: {
    TrackList
  },
  name: "SearchBox",
  data() {
    return {
      fieldData: '',
      type: 'track' //для разных видов поиска можно менять
    }
  },
  watch: {
    fieldData: function (value) {
      this.search(value)
    }
  },
  mounted() {
    document.getElementById('app').addEventListener('click', () => {
      this.$store.dispatch('searchInputFocus', false)
    })
  },
  methods: {
    search: function (value) {
      if (value) {
        this.getSearchData(value, this.type)
        //Тип задаем сами в будущем
      } else {
        this.$store.dispatch('updateResults', null)
      }
    },
    onInput: function (event) {
      this.$store.dispatch('searchInputFocus', true)
      this.fieldData = event.target.value
    },
    onClick: function (event) {
      this.$store.dispatch('searchInputFocus', true)
      event.stopPropagation()
    }
  }
}
</script>

<style scoped lang="sass">
@import "../variables.sass"

.search-input-wrapper
  width: 100%
  position: relative

  .search-input
    height: 40px
    width: 100%
    padding: 10px 20px
    border: 2px solid $background-color-accessory
    border-radius: 50px
    background-color: $background-color-accessory
    color: white
    transition: all .2s ease
    font-weight: 800
    font-size: 0.9em

    &:focus
      border-color: $spotify-color
      background-color: #0c0c0c
</style>
