<template>
  <transition name="fade">
    <div class="message-box-wrapper" v-if="visible && message">
      <div class="message-box">
      <span class="message-box__text">
        {{ message }}
      </span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MessageModal",
  props: {
    message: String,
    timeout: Number
  },
  data() {
    return {
      visible: false,
    }
  },
  watch: {
    message: function (newVal) {
      if (newVal) {
        this.visible = true
        setTimeout(this.hide, this.timeout)
      }
    },
  },
  methods: {
    hide: function () {
      this.visible = false
      this.$emit('clearMessage')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../variables"
.message-box-wrapper
  position: fixed
  left: calc(50% - 150px)
  bottom: 10px
  height: 50px
  z-index: 100

  .message-box
    width: 100%
    height: 100%
    border-radius: 10px
    background: $spotify-color-blue
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    padding: 0 50px

    .message-box__text
      font-family: inherit
      font-weight: 600
      font-size: 0.9em

.fade-enter-active, .fade-leave-active
  transition: opacity .2s
.fade-enter, .fade-leave-to
  opacity: 0

</style>