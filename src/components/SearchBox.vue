<template>
  <div class="search-input-wrapper">
    <input placeholder="Search" class="search-input" v-model="fieldData"/>
  </div>
</template>

<script>

import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  mixins: [spotifyApiMixin],

  name: "SearchBox",
  data() {
    return {
      fieldData: '',
      type: 'track' //для разных видов поиска можно менять
    }
  },
  watch: {
    fieldData: function (value) {
      this.$store.dispatch('chooseActiveTrack', null)
      this.search(value)
    }
  },
  methods: {
    search: function (value) {
      if (value) {
        this.getSearchData(value,  this.type)
        //Тип задаем сами в будущем
      }
      else {
        this.$store.dispatch('updateResults', null)
      }
    }
  },
}
</script>

<style scoped lang="sass">
@import "../variables.sass"

.search-input-wrapper
  width: 100%
  margin-bottom: 20px
  .search-input
    height: 50px
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
      background-color: $background-color-main
</style>