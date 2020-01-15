<template>
  <transition name="msg" @after-leave="handleAfterLeave">
    <div class="y-message"
      :class="type"
      v-show="show"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <svg-icon class="close" icon-class="close" @click.native="show=false"></svg-icon>
      <span class="text">{{text}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'message',
  data() {
    return {
      animateTime: 700, // 动画时间
      duration: 3000, // 显示的时间
      show: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'info',
      validator: val => ['info', 'success', 'warning', 'error'].includes(val)
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    clearTimer() {
      clearTimeout(this.timeout)
    },
    startTimer() {
      this.timeout = setTimeout(() => {
        this.show = false
      }, this.duration + this.animateTime);
    }
  },
  mounted() {
    this.show = true
    this.startTimer()
  }
};
</script>

<style lang="scss">
.msg-enter-active,
.msg-leave-active {
  transition: all .7s cubic-bezier(.42, 0, .58, 1);
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
  min-width: 300px;
  padding: 10px 20px;
  color: rgba(255, 255, 255, 0.7);
  background: #f5f5f5;
  font-size: 14px;
  line-height: 1.4;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  &.info {
    background: #909399;
  }
  &.success {
    background: #67c23a;
  }
  &.error {
    background: #f56c6c;
  }
  &.warning {
    background: #e6a23c;
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