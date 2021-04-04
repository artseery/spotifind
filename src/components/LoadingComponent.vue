<template>
  <div class="load-wrapper">
    <div class="load-icon-wrapper" :style="circleSize(size)">
      <div class="circle load-circle" :style="circleStyle(thickness, colorMain)"></div>
      <div class="circle load-circle-part" :style="circlePartsStyle(thickness, colorPart, circleParts)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent",
  props: {
    size: {
      type: Number,
      default: 30
    },
    thickness: {
      type: Number,
      default: 4
    },
    colorMain: {
      type: String,
      default: '#23D460'
    },
    colorPart: {
      type: String,
      default: '#1DB954'
    },
    circleParts: {
      type: Array,
      maxLength: 4,
      default: () => {
        return ['right', 'bottom']
      }
    }
  },
  methods: {
    circleSize: function (size) {
      return `width: ${size}px; height: ${size}px;`
    },
    circleThickness: function (thickness) {
      return `border-width: ${thickness}px;`
    },
    circlePartsColor: function (colorPart, circleParts) {
      let styleSting = ''
      circleParts.forEach((part) => {
        styleSting += `border-${part}-color: ${colorPart};`
      })
      return styleSting
    },
    circleStyle: function (thickness, colorMain) {
      return this.circleThickness(thickness) + `border-color: ${colorMain};`
    },
    circlePartsStyle: function (thickness, colorPart, circleParts) {
      return this.circleThickness(thickness) + this.circlePartsColor(colorPart, circleParts)
    }
  }
}
</script>

<style lang="sass" scoped>
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
  left: 0
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
      border-right-color: transparent
      border-left-color: transparent
      border-bottom-color: transparent
      border-top-color: transparent
</style>