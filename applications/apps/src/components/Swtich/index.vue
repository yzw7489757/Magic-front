<template>
  <div class="swtich">
    <p class="swtich-item" :class="{active:Number(value) === 1}" @click="triggerToChangeValue(true)">
      <span>{{openText}}</span>
    </p>
    <p class="swtich-item" :class="{active:Number(value) === 0}" @click="triggerToChangeValue(false)">
      <span>{{closeText}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "swtich",
  props: {
    value: {
      type: [Number, String],
      default: () => 0
    },
    'open-text': {
      type: String,
      default: () => '开'
    },
    'close-text': {
      type: String,
      default: () => '关'
    }
  },
  methods: {
    triggerToChangeValue(status) {
      if (Number(this.value) === status) {
        return false
      }
      this.$emit('onChange', Number(!Number(this.value)))
      this.$emit('input', Number(!Number(this.value)))
    }
  }
}
</script>

<style lang="less" scoped>
.swtich{
  &-item{
    position:relative;
    float:left;
    &>span{
      position: relative;
      display: block;
      padding: 5px 10px;
      line-height: 24px;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
      min-width: 70px;
      text-align: center;
      cursor:pointer;
      transition: all .3s;
    }
    &.active{
      pointer-events:none;
      &>span{
        cursor:not-allowed;
        background-color: #9c27b0;
        color: #FFFFFF;
        box-shadow: 0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2);
      }
    }
  }
}
</style>
