<template>
  <div class="load-wrapper">
    <div class="load-icon-wrapper">
      <div class="circle load-circle"></div>
      <div class="circle load-circle-part"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent"
}
</script>

<style lang="sass" scoped>
$load-icon-size: 26px
@import "../variables"
@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
.load-wrapper
  z-index: 100
  width: 100%
  height: 100%
  position: absolute
  top: 0
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  .load-icon-wrapper
    width: 30px
    height: 30px
    position: relative
    .circle
      width: 100%
      height: 100%
      border-radius: 15px
    .load-circle
      border: 4px solid $spotify-color-light
    .load-circle-part
      position: absolute
      animation: spin .8s linear infinite
      left: 0
      top: 0
      border-width: 4px
      border-style: solid
      border-right-color: $spotify-color
      border-left-color: transparent
      border-bottom-color: $spotify-color
      border-top-color: transparent
</style>