<template>
  <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
  <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
  <a-scene
      vr-mode-ui="enabled: false;"
      renderer="logarithmicDepthBuffer: true;"
      embedded
      arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
  >
    <a-assets>
      <img id="test" width="984" height="774"
           src="../assets/pitsa.png"/>
      <img id="test1" width="106" height="98"
           src="../assets/heart1.png"/>
      <img id="test2" width="173" height="161"
           src="../assets/heart2.png"/>
      <img id="test3" width="890" height="206"
           src="../assets/text.png"/>
    </a-assets>
      <!-- a-nft is the anchor that defines an Image Tracking entity -->
      <!-- on 'url' use the path to the Image Descriptors created before. -->
      <!-- the path should end with the name without the extension e.g. if file is 'pinball.fset' the path should end with 'pinball' -->
      <a-nft
          type="nft"
          url="../assets/card"
          smooth="true"
          smoothCount="10"
          smoothTolerance=".01"
          smoothThreshold="5"
      >
        <!-- as a child of the a-nft entity, you can define the content to show. here's a GLTF model entity -->
        <a-image src="#test" rotation="90 180 0"
                 scale="1"
                 width="1"
                 height="1"
                 position="0 0 0"/>
      </a-nft>
      <!-- static camera that moves according to the device movemenents -->
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
