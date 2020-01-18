<template>
  <span class="bedge bedge-wrap">
    <span :class="{'bedge-dot':true,'bedge-processing':running,'bedge-frozen':!running}"></span>
    <span class="bedge-text">{{text}}</span>
  </span>
</template>

<script>
export default {
  name: 'badeg',
  props: {
    text: {
      type: String,
      default: () => ''
    },
    running: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss" scoped>
.bedge{
  &-wrap{
    vertical-align: middle;
    font-size: 14px;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    color: unset;
    line-height: inherit;
  }
  &-processing {
    position: relative;
    background-color: #1890ff;
    &::after{
      position: absolute;
      top: -1px;
      left: -1px;
      width: 100%;
      height: 100%;
      border: 1px solid #1890ff;
      border-radius: 50%;
      animation: runningAnimation 1.2s infinite ease-in-out;
      content: '';
    }
  }
  &-text{
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
  &-dot{
    position:relative;
    top: -1px;
    color: unset;
    display: inline-block;
    width: 6px;
    height: 6px;
    vertical-align: middle;
    border-radius: 50%;
    font-size: 14px;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    ::selection{
      color: #fff;
      background: #1890ff;
    }
  }
  &-frozen{
    background-color: #d9d9d9;
  }
}

@keyframes runningAnimation {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}
</style>
