<template>
  <div class="ar-image">
    <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
    <a-scene embedded arjs>
      <a-marker type='barcode' value='7'>
        <a-image position='0 0.5 0' src="https://leonardo.osnova.io/c1dc6c04-f22e-5941-b499-b1bde35636ec/"></a-image>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {
  name: "ARImage"
}
</script>

<style lang="sass" scoped>
.ar-image
  display: flex
  width: 500px
  height: 500px
  background: white
</style>
