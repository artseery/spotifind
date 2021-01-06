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
      type: 'track' //для разных видов поиска можно менять
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
.search-wrapper
  width: 100%
  padding: 10px 0
  .search-input
    height: 50px
    width: 100%
    padding: 10px
    border: 1px solid #b0b0b0
    border-radius: 50px
</style>