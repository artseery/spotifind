<template>
  <div class="track-card-wrapper"
       :class="{ sqr: form === 'sqr', rec: form === 'rec', filter_panel: filter_panel }"
       @mousedown="form === 'sqr' ? openInSpotify($event, track.uri) : ''"
  > <!--Дать уже норм названия классам-->
    <div class="track-card" :class="{ active: ($route.params.trackId=== track.id && !filter_panel)}">
      <div class="track-card-inner">
        <div class="track-image-wrapper">
          <img v-if="form === 'rec'" class="track-image" :src="track.album.images[1].url" alt="Обложка композиции"/>
          <div class="card-hover-wrapper">
            <card-hover v-if="form === 'sqr'" :image-src="track.album.images[1].url"/>
          </div>
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
                <img class="spotify-logo"
                     :src="(($store.state.activeTrack.id === track.id) && !filter_panel) ? spotify_logo_white : spotify_logo_default"
                     alt="Open in app"/>
            </div>
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
import spotify_logo_white from '../assets/spotify_white.png'
import CardHover from "@/components/CardHover";

export default {
  name: "TrackCard",
  components: {CardHover},
  mixins: [spotifyApiMixin],
  props: {
    track: Object,
    form: String,
    filter_panel: Boolean
  },
  data() {
    return {
      spotify_logo_black,
      spotify_logo_white,
      spotify_logo_default
    }
  },
  methods: {
    openInSpotify: function (event, uri) {
      event.stopPropagation()
      window.open(uri, "_self")
    },
    openInApp: function (track_uri) {
      location.href = track_uri
    },
  }
}
// TODO Переписать этот компонент с нормальными входными параметрами или разделить
</script>

<style lang="sass" scoped>
@import "../variables"

.track-card-wrapper
  cursor: pointer

.rec
  height: calc(#{$track-card-height} + 1px)
  transition: background-color .1s ease
  border-radius: 0
  border-bottom: 1px solid $background-color-accessory
  background-color: #0c0c0c
  user-select: none
  width: 100%

  &:last-child
    border-bottom: none
    height: $track-card-height

  &:hover
    background-color: $background-color-accessory

  & > .track-card
    border-radius: 0
    height: 100%
    display: flex
    flex-direction: row
    align-items: center
    background-color: inherit

    //Мб лого споти добавить анимацию

    &.active
      background-color: $spotify-color
      transition: background-color .2s ease

    & a
      text-decoration: none

    .track-card-inner
      width: 100%
      height: 100%
      align-items: center
      display: flex
      flex-direction: row

      .track-image-wrapper
        height: 100%
        width: $track-card-height
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        flex-shrink: 0

        .track-image
          height: $track-card-height / 1.2
          width: auto
          border-radius: 0

      .track-artist-wrapper, .track-name-wrapper
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

      .track-info
        display: grid
        width: 100%
        height: 100%
        grid-template-columns: 1fr $track-card-spotify-logo-size
        grid-auto-rows: 50% 50%
        grid-column-gap: 50px
        padding: 0 20px

        .track-name-wrapper
          display: flex
          flex-direction: row
          align-items: flex-end
          grid-column-start: 1
          grid-column-end: 2
          grid-row-start: 1
          grid-row-end: 2

          .track-name
            font-weight: 800
            font-size: 1em
            color: $font-color-main
            text-overflow: ellipsis
            white-space: nowrap
            overflow: hidden

        .track-artist-wrapper
          grid-column-start: 1
          grid-column-end: 2
          grid-row-start: 2
          grid-row-end: 3

          .track-artist
            font-size: 0.9em
            color: $font-color-accessory

        .track-uri-wrapper
          margin: auto
          grid-column-start: 2
          grid-column-end: 3
          grid-row-start: 1
          grid-row-end: 3

          .track-uri
            .spotify-logo
              height: $track-card-spotify-logo-size
              width: $track-card-spotify-logo-size

    .track-image
      width: 100%


//квадрат
.sqr
  width: 100%

  & a
    text-decoration: none

  .track-card-inner
    .track-image-wrapper
      width: 100%
      height: 100%
      flex-shrink: 0
      .card-hover-wrapper
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
        font-weight: 400
        font-size: 1em

        .track-artist
          color: $font-color-accessory

      .track-uri-wrapper

        .track-uri
          .spotify-logo
            height: $track-card-spotify-logo-size
            width: $track-card-spotify-logo-size

  .track-image
    width: 100%
+tablet
  .sqr
    .track-card-inner
      .track-image-wrapper
        .card-hover-wrapper
          width: 100px
          height: 100px
      .track-info
        font-size: 0.8em

.filter_panel
  background-color: $background-color-dark
  border-bottom: 2px solid $spotify-color

  &:hover
    background-color: $background-color-dark

  .track-info
    padding: 0 10px 0 0 !important
    grid-column-gap: 10px !important

    .track-name
      font-size: 0.9em !important

    .track-artist
      font-size: 0.8em !important
</style>
