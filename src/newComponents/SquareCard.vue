<template>
  <div class="square-track-card-wrapper">
    <div class="square-track-card" @click="openInSpotify($event, track.uri)">
      <card-hover class="square-track-card-inner" :image-src="track.album.images[1].url"/>
      <div class="square-track-card-title">
        {{track.name}}
      </div>
      <div class="square-track-card-artists">
        <span class="artists-item" :key="i" v-for="(artist, i) in track.artists">
          <!--eslint-disable-next-line-->
          {{ artist.name }}{{ i < track.artists.length - 1 ? ', ' : '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import CardHover from "@/components/CardHover";
export default {
  name: "squareCard",
  props: {
    track: Object,
  },
  components: {
    CardHover
  },
  methods: {
    openInSpotify: function (e, uri) {
      window.open(uri, "_self")
    },
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"

.square-track-card
  height: auto
  width: 200px
  cursor: pointer
  .square-track-card-inner
    height: 200px
    width: 200px
  &-title
    font-size: 18px
    margin-top: 8px
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
    max-width: 200px
  &-artists
    font-size: 14px
    text-overflow: ellipsis
    overflow: hidden
    max-width: 200px
    margin-top: 2px
    .artists-item
      display: inline
      white-space: nowrap
      color: $font-color-accessory
+tablet
  .square-track-card
    width: 100px
    .square-track-card-inner
      height: 100px
      width: 100px
      font-size: 0.8em
</style>
