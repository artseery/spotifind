<template>
  <div id="app">
    <search-box></search-box>
  </div>
</template>

<script>

import SearchBox from "@/components/SearchBox";
import loginMixin from "@/mixins/loginMixin";

export default {
  mixins: [loginMixin],
  name: 'App',
  components: {
    SearchBox
  },
  mounted() {
    this.login()
  }
}
</script>

<style lang="sass">
*
  box-sizing: border-box

html, body, #app
  margin: 0
  padding: 0
</style>
