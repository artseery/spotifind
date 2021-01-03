<template>
  <div class="search-wrapper">
    <input v-model="fieldData"/>
  </div>
</template>

<script>

export default {
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
      console.log(value)
    }
  },
}
</script>

<style scoped lang="sass">

</style>