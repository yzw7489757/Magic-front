<template>
  <button class="y-button"  :class="activeClass" @click="$emit('click')" :disabled="disabled||loading">
    <svg-icon class="icon" v-if="icon&&!loading" :icon-class="icon" />
    <svg-icon class="loading icon" v-if="loading" icon-class="loading"></svg-icon>
    <span class="content">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    type: {
      type: String,
      default: 'primary',
      validator(val) {
        return ['primary', 'info', 'danger', 'warning', 'success', 'plain'].includes(val)
      }
    },
    iconPosition: {
      type: String,
      default: 'right',
      validator(value) {
        return value === 'left' || value === 'right'
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small',
      validator(str) {
        return ['small', 'big', 'mini'].includes(str)
      }
    },
    animationClass: {
      type: String,
      default: 'out-ripple'
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    activeClass() {
      const {
        iconPosition, animationClass, size, disabled, type
      } = this
      return {
        [`icon-${iconPosition}`]: true, [animationClass]: !disabled, [`${size}-button`]: true, disabled, [`${type}-button`]: true
      }
    },
  }
};
</script>

<style lang="scss" scoped>
$button-color-white: rgba(255,255,255,.9);
$button-color: #606266;
$primary:#ffd800;
$success:#67C23A;
$warning:#E6A23C;
$danger:#F56C6C;
$info:#909399;
$plain:#FFFFFF;
$plain-border-color:#dcdfe6;
.y-button {
  box-sizing: border-box;
  font-size: var(--font-size);
  color: $button-color;
  border-radius: var(--border-radius);
  background: var(--button-bg);
  display: inline-block;
  cursor: pointer;
  outline: none;
  border:1px solid transparent;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  -webkit-appearance: none;
  white-space: nowrap;
  transition:all .1s;
  &:focus {
    outline: none;
  }
  &:active{
    outline: none;
  }
  &::-moz-focus-inner {
    border: 0;
  }
  & + & {
    margin-left: 10px;
  }
  &:hover {
    color: var(--border-color-hover);
    border-color: var(--border-color-hover);
  }
  &.mini-button{
    padding: 5px 5px;
  }
  &.small-button{
    padding: 7px 8px;
  }
  &.disabled{
    cursor:not-allowed;
    opacity: .7;
  }
  &.big-button{
    padding: 10px 8px;
  }
  &:active {
    background-color: var(--button-active-bg);
  }
  &.primary-button{
    color:$button-color;
    background-color:$primary;
    border-color:$primary;
    &:hover{
      background-color:rgba($primary,.7);
      border-color:rgba($primary,.7);
    }
  }
  &.info-button{
    color:$button-color-white;
    background-color:$info;
    border-color:$info;
    &:hover{
      background-color:rgba($info,.7);
      border-color:rgba($info,.7);
    }
  }
  &.warning-button{
    color:$button-color-white;
    background-color:$warning;
    border-color:$warning;
    &:hover{
      background-color:rgba($warning,.7);
      border-color:rgba($warning,.7);
    }
  }
  &.danger-button{
    color:$button-color-white;
    background-color:$danger;
    border-color:$danger;
    &:hover{
      background-color:rgba($danger,.7);
      border-color:rgba($danger,.7);
    }
  }
  &.success-button{
    color:$button-color-white;
    background-color:$success;
    border-color:$success;

    &:hover{
      background-color:rgba($primary,.7);
      border-color:rgba($primary,.7);
    }
  }
  &.plain-button{
    color:$button-color;
    background-color:$plain;
    border-color:$plain-border-color;
    &:hover{
      background-color:rgba($plain,.7);
      border-color:rgba($plain-border-color,.8);
    }
  }
  > .content {
    order: 2;
  }
  > .icon {
    order: 1;
    margin-right: .1em;
  }
  &.icon-right {
    > .content {
      order: 1;
    }
    > .icon {
      order: 2;
      margin-left: .1em;
      margin-right: 0;
    }
  }
  @keyframes rotate {
    0%{
      transform: rotate(0deg);
    }
    50%{
      transform: rotate(120deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  .loading{
    animation: rotate 1s linear infinite;
  }
}
</style>