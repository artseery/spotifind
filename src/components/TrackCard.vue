<template>
  <div class="trackCard" @click="form === 'rec' ? $store.dispatch('chooseActiveTrack', track.id) : openInApp(track.uri)"
       :class="{ active: $store.state.activeTrack === track.id, sqr: form === 'sqr', rec: form === 'rec' }">
    <div class="trackCard-inner">
      <div class="track-image-wrapper">
        <img class="track-image" :src="track.album.images[1].url" alt="Обложка композиции"/>
      </div>
      <div class="track-info">
        <div class="track-name-wrapper">
          <span class="track-name">{{ track.name }}</span>
        </div>
        <div class="track-artist-wrapper">
            <span class="track-artist" v-for="(artist, i) in track.artists" :key="artist.id">
              <!--eslint-disable-next-line-->
               {{ artist.name }}{{ i < track.artists.length - 1 ? ', ' : '' }}
            </span>
        </div>
        <div class="track-uri-wrapper" v-if="form === 'rec'">
          <div class="track-uri">
            <a :href="track.uri" @click="stopPropagation($event)">
              <img class="spotify-logo"
                   :src="$store.state.activeTrack === track.id ? spotify_logo_black : spotify_logo_default"
                   alt="Open in app"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";
import spotify_logo_default from '../assets/spotify.png'
import spotify_logo_black from '../assets/spotify_black.png'

export default {
  name: "TrackCard",
  mixins: [spotifyApiMixin],
  props: {
    track: Object,
    form: String
  },
  data() {
    return {
      spotify_logo_black,
      spotify_logo_default
    }
  },
  methods: {
    stopPropagation: function (event) {
      event.stopPropagation()
    },
    openInApp: function (track_uri) {
      location.href = track_uri
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"
.rec
  height: 140px
  display: flex
  flex-direction: row
  align-items: center
  border-bottom: 1px solid $background-color-accessory
  background-color: inherit
  transition: all .2s ease
  //Мб лого споти добавить анимацию

  &:first-child
    border-top: 1px solid $background-color-accessory

  &:last-child
    //margin-bottom: 20px

  & a
    text-decoration: none

  .trackCard-inner
    width: 100%
    height: 100px
    align-items: center
    display: flex
    flex-direction: row
    margin: 0 20px

    .track-image-wrapper
      width: 100px
      height: 100px
      display: flex
      flex-direction: row
      justify-content: center

      .track-image
        height: 100%
        width: auto

    .track-artist-wrapper, .track-name-wrapper
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

    .track-info
      display: grid
      width: 100%
      height: 100%
      grid-template-columns: 1fr $track-card-spotify-logo-size
      grid-auto-rows: 50px auto
      margin-left: 20px

      .track-name-wrapper
        display: flex
        grid-column-start: 1
        grid-column-end: 2
        grid-row-start: 1
        grid-row-end: 2

        .track-name
          align-self: end
          font-weight: 800
          font-size: 1.1em
          color: $font-color-main

      .track-artist-wrapper
        grid-column-start: 1
        grid-column-end: 2
        grid-row-start: 2
        grid-row-end: 3

        .track-artist
          color: $font-color-accessory

      .track-uri-wrapper
        grid-column-start: 2
        grid-column-end: 3
        grid-row-start: 1
        grid-row-end: 2

        .track-uri
          .spotify-logo
            height: $track-card-spotify-logo-size
            width: $track-card-spotify-logo-size

  .track-image
    width: 100%

  &.active
    background: $spotify-color

//квадрат
.sqr
  width: 200px

  & a
    text-decoration: none

  .trackCard-inner

    .track-image-wrapper
      width: 200px
      height: 200px

      .track-image
        height: 100%
        width: auto

    .track-artist-wrapper, .track-name-wrapper
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

    .track-info
      margin-top: 10px
      width: 100%
      height: 100%


      .track-name-wrapper
        margin-bottom: 6px

        .track-name
          font-weight: 800
          font-size: 1.1em
          color: $font-color-main

      .track-artist-wrapper
        margin-bottom: 4px

        .track-artist
          color: $font-color-accessory

      .track-uri-wrapper

        .track-uri
          .spotify-logo
            height: $track-card-spotify-logo-size
            width: $track-card-spotify-logo-size

  .track-image
    width: 100%

</style>