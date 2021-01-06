<template>
  <div class="search-wrapper">
    <input class="search-input" v-model="fieldData"/>
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
      type: 'track,album,artist,playlist,show,episode'
    }
  },
  watch: {
    fieldData: function (value) {
      this.search(value)
    }
  },
  methods: {
    search: function (value) {
      if (value) {
        this.getData('search' + '?q=' + value + '&type=' + this.type)
        //Тип задаем сами в будущем
      }
    }
  },
}
</script>

<style scoped lang="sass">
.search-wrapper
  width: 100%
  .search-input
    height: 50px
    width: 100%
    padding: 10px
    border: 1px solid #b0b0b0
    border-radius: 50px
</style>