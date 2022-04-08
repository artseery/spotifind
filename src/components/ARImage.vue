<template>
  <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
  <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
  <a-scene embedded
           renderer="logarithmicDepthBuffer: true;"
           arjs="trackingMethod: best; debugUIEnabled: false; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960;">
    <a-marker preset="hiro">
      <a-entity
          position="0 0 0"
          scale="0.5 0.5 0.5"
          gltf-model="https://raw.githubusercontent.com/artseery/spotifind/master/public/scene/scene.gltf"
      ></a-entity>
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
</template>

<script>
export default {
  name: "ARImage",
  mounted() {
    document.querySelector('a-scene').addEventListener('markerFound', () => {
      console.log('Marker found')
    })
    document.querySelector('a-scene').addEventListener('model-loaded', () => {
      console.log('Model loaded')
    })
  }
}
</script>

<style lang="sass">

.content-wrapper
  display: block !important
  height: 100% !important
  background: transparent !important

#app
  background: transparent !important

html
  overflow: hidden !important
  display: block
</style>
