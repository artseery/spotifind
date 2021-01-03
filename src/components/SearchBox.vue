<template>
  <div class="search-wrapper">
    <input v-model="fieldData"/>
  </div>
</template>

<script>

import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  mixins: [spotifyApiMixin],

  name: "SearchBox",
  data() {
    return {
      fieldData: ''
    }
  },
  watch: {
    fieldData: function (value) {
      this.search(value)
    }
  },
  methods: {
    search: function (value) {
      this.getData('search', value, 'track,album,artist,playlist,show,episode')
      //Тип задаем сами в будущем
    }
  },
}
</script>

<style scoped lang="sass">

</style>