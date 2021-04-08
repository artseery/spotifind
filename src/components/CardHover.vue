<template>
  <div class="tw-lift">
    <div class="tw-lift__card" :style="backgroundStyle(cardColor)">
      <img v-if="imageSrc" :src="imageSrc" class="tw-lift__card__image"/>
    </div>
    <div class="tw-lift__substrate" :style="backgroundStyle(substrateColor)"></div>
    <div class="tw-lift__corner tw-lift__corner--top-left" :style="cornerStyle(substrateColor, 'right')"></div>
    <div class="tw-lift__corner tw-lift__corner--bottom-right" :style="cornerStyle(substrateColor, 'top')"></div>
  </div>
</template>

<script>
export default {
  name: "CardHover",
  props: {
    'substrateColor': {type: String, default: '#1db954'},
    'cardColor': {type: String, default: '#1db954'},
    'imageSrc': {type: String, default: null}
  },
  methods: {
    backgroundStyle: function (color) {
      return 'background-color: ' + color
    },
    cornerStyle: function (color, side) {
      return `border-${side}-color: ${color}`
    }
  }
}
</script>

<style scoped lang="sass">
@import "../variables"

$lift: 6px
$timeFunction: .2s
$cardWidth: 200px
$cardHeight: 300px
.tw-lift
  position: relative
  height: 100%
  width: 100%
  &:hover
    .tw-lift__card
      transform: translate($lift, -$lift)
    .tw-lift__corner--top-left
      transform: translateY(-$lift*2) scale(1)
    .tw-lift__corner--bottom-right
      transform: translateX($lift*2) scale(1)
  &__card
    width: 100%
    height: 100%
    position: absolute
    z-index: 2
    transition: transform $timeFunction ease-in-out
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    // padding: 10px
    &__image
      object-fit: cover
      width: 100%
      height: 100%
  &__substrate
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    z-index: 1
  &__corner
    position: absolute
    width: 0
    height: 0
    transition: transform $timeFunction ease-in-out
  &__corner--top-left
    top: $lift
    left: 0
    border-bottom: $lift solid transparent
    border-right: $lift solid $spotify-color
    border-top: $lift solid transparent
    transform-origin: left center
    transform: translateY(-$lift*2) scale(0)
  &__corner--bottom-right
    right: $lift
    bottom: 0
    border-left: $lift solid transparent
    border-right: $lift solid transparent
    border-top: $lift solid $spotify-color
    transform-origin: bottom center
    transform: translateX($lift*2) scale(0)
</style>