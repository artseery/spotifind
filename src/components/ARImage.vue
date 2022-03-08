<template>
  <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
  <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
  <a-scene embedded arjs='sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;'>
    <a-assets>
      <img id="test"
           src="../assets/pitsa.png"/>
    </a-assets>
    <a-marker
        type="barcode"
        value="7"
    >
      <a-image src="#test" rotation="90 180 0"
               scale="1"
               width="1"
               height="1"
               position="0 0 0"/>
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
