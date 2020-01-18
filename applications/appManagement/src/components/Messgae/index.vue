<template>
  <transition name="msg" @after-leave="handleAfterLeave">
    <div class="y-message"
      :class="type"
      v-show="show"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <svg-icon class="close" icon-class="msg-close" @click.native="show=false"></svg-icon>
      <span class="text">{{text}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      animateTime: 500, // 动画时间
      show: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'info',
      validator: val => ['info', 'success', 'warning', 'error', 'primary'].includes(val)
    },
    callback: {
      type: Function,
      default: () => () => {}
    },
    text: {
      type: String,
      default: () => ''
    },
    duration: {
      type: Number,
      default: () => 3000
    }
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    clearTimer() {
      clearTimeout(this.timeout)
    },
    startTimer() {
      this.timeout = setTimeout(() => {
        this.show = false
        this.callback()
      }, this.duration + this.animateTime)
    }
  },
  mounted() {
    this.show = true
    this.startTimer()
  }
}
</script>

<style lang="scss">
.msg-enter-active,
.msg-leave-active {
  transition: all .5s cubic-bezier(.42, 0, .58, 1);
}
.msg-enter,
.msg-leave-to {
  top:0 !important;
  opacity: 0;
}
.y-message {
  position: fixed;
  text-align: center;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
  padding: 20px 15px;
  min-width: 300px;
  color: rgba(255, 255, 255, 0.7);
  background: #f5f5f5;
  font-size: 14px;
  line-height: 20px;
  z-index: 1000;
  border: 0;
  border-radius: 3px;
  color: #fff;
  &.info {
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,188,212,.4);
    background-color: #00cae3;
  }
  &.success {
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(76,175,80,.4);
    background-color: #55b559;
  }
  &.error {
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(244,67,54,.4);
    background-color: #f55145;
  }
  &.warning {
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(255,152,0,.4);
    background-color: #ff9e0f;
  }
  &.primary {
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(156,39,176,.4);
    background-color: #a72abd;
  }
  .close{
    position: absolute;
    right:4px;
    top:4px;
    cursor: pointer;
    font-size: 14px;
  }
}

</style>
