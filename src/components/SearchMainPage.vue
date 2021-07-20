<template>
  <div class="main-page-wrapper" :class="{ 'invisible-mobile': $store.state.searchInputFocused || Object.keys($store.state.activeTrack).length !== 0 }">
    <div class="spotifind-logo__big-wrapper">
      <img class="spotifind-logo__big" src="../assets/SpotifindLogoV3White500.png">
    </div>
    <div class="search-wrapper">
      <search-box class="search-box"/>
    </div>
  </div>
</template>

<script>
// TODO Добавить иконку авторизации на главную

import SearchBox from "@/components/SearchBox";

export default {
  name: "SearchMainPage",
  components: {SearchBox},
  created() {
    this.$store.dispatch('chooseActiveTrack', {})
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"

.main-page-wrapper
  position: absolute
  pointer-events: none
  left: 0
  top: 0
  height: 100%
  width: 100%
  display: grid
  justify-items: center
  grid-template-rows: 1fr 1fr

  .spotifind-logo__big-wrapper
    display: flex
    flex-direction: row
    justify-content: center
    align-items: flex-end
    padding: 30px

    .spotifind-logo__big
      width: 400px

  .search-wrapper
    width: 670px
    position: relative
    pointer-events: auto
    .search-box
      width: 100%

    .search-track-list
      z-index: 100
      position: absolute
      width: 630px
      max-height: 404px
      height: 100%
      min-height: 0
      background: black
      overflow: auto
      -ms-overflow-style: none
      scrollbar-width: none
      left: 50%
      transform: translateX(-50%)
      margin-top: 0

+tablet
  .main-page-wrapper
    .search-wrapper
      width: 100%
      padding: 0 4px
      .search-track-list
        width: calc(100% - 40px)
        max-height: 400px
    .spotifind-logo__big-wrapper
      .spotifind-logo__big
        width: 300px
    &.invisible-mobile
      background: $background-color-main
      grid-template-rows: 1fr
      .spotifind-logo__big-wrapper
        display: none
      .search-wrapper
        margin-top: 10px

</style>
