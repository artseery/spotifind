<template>
  <div class="trackCard" @click="getRecommendations">
    <div class="trackCard-artists">
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
      </div>
    </div>
  </div>
</template>

<script>
import spotifyApiMixin from "@/mixins/spotifyApiMixin";

export default {
  name: "TrackCard",
  mixins: [spotifyApiMixin],
  props: {
    track: Object
  },
  methods: {
    getRecommendations: function () {
      this.getRecommendationsData(this.track.id)
    }
  }
}
</script>

<style lang="sass" scoped>
.trackCard
  border: 1px solid lightgrey

  .trackCard-artists
    height: 100%

    .track-image-wrapper
      width: 220px
      height: 220px
      overflow: hidden
      display: flex
      flex-direction: row
      justify-content: center

      .track-image
        height: 100%
        width: auto

    .track-info
      height: 50px
      .track-artist-wrapper, .track-name-wrapper
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

        .track-artist
          height: 100%

  .track-image
    width: 100%
</style>