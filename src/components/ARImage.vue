<template>
  <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
  <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
  <a-scene embedded
           arjs='sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;'>
    <a-assets>
      <video id="test"
             muted
             src="../assets/giphy.gif"
             autoplay
             loop="true"></video>
    </a-assets>
    <a-marker type='barcode' value='7'>
      <a-video src="#test" rotation="90 180 0"
               play="true"
               muted
               autoplay
               scale="-1"
               width="5"
               height="5"
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
      let v = document.querySelector('#test');
      v.play();
      console.log(v)
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
