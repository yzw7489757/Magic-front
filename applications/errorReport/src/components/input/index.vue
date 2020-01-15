<template>
    <div class="wrapper">
        <input
        :value="value"
        class="yinput"
        :type="type"
        :class="activeClass"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeholder"
        @change="$emit('change',$event.target.value)"
        @focus="$emit('focus',$event.target.value)"
        @input="handleInput"
        @blur="handleBlur"
        @click="$emit('click',$event.target.value)"
        >
          <div v-if="error" class="error_title y_input_tip" :class="{'tipwrap':tipwrap}">
              <svg-icon icon-class="error" class="icon-error"></svg-icon>
              <span class="error_message">{{error}}</span>
          </div>
          <div  v-if="info" class="info_title y_input_tip" :class="{'tipwrap':tipwrap}">
              <svg-icon icon-class="info" class="icon-info"></svg-icon>
              <span class="info_message">{{info}}</span>
          </div>
          <div  v-if="title" class="title_title y_input_tip" :class="{'tipwrap':tipwrap}">
              <svg-icon icon-class="tips" class="icon-title"></svg-icon>
              <span class="title_message">{{title}}</span>
          </div>
    </div>
</template>
<script>
import Emitter from '@/mixins/emitter';

export default {
  name: 'Y-input',
  mixins: [Emitter],
  data() {
    return {
      defaultValue: this.value
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small',
      validator(str) {
        return ['small', 'big', 'mini'].includes(str)
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputColor: {
      type: Boolean,
      default: true
    },
    error: {
      type: String
    },
    info: {
      type: String
    },
    title: {
      type: String
    },
    tipwrap: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(val) {
      this.defaultValue = val;
    }
  },
  computed: {
    activeClass() {
      const {
        error, title, info, inputColor, size
      } = this
      return {
        error_input: error && inputColor, info_input: info && inputColor, title_input: title && inputColor, [`${size}-input`]: true
      }
    }
  },
  methods: {
    /**
    * change 事件
    * @param event
    */
    handleInput(event) {
      // 当前model 赋值
      this.defaultValue = event.target.value;
      // vue 原生的方法 return 出去
      this.$emit('input', event.target.value);
      // 将当前的值发送到 aiFormItem 进行校验
      this.dispatch('y-form-item', 'on-form-change', event.target.value)
    },
    /**
    * blur 事件
    * @param event
    */
    handleBlur(event) {
      // vue 原生的方法 return 出去
      this.$emit('blur', event.target.value);
      this.dispatch('y-form-item', 'on-form-blur', event.target.value)
    }

  }
};
</script>
<style lang="scss" scoped>
$height: 32px;
$color: #606266;
$border-color: #dcdfe6;
$border-color-hover: #409eff;
$border-radius: 4px;
$font-size: 12px;
$red: #f56c6c;
$info: #67c23a;
$title: #409EFF;
$box-shadow-color: rgba(64, 158, 255, 0.5);
.wrapper {
  display: inline-block;
  font-size: $font-size;
  > input {
    box-sizing: content-box;
    width:calc(100% - 16px);
    color: $color;
    // height: $height;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-size: inherit;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &.small-input{
      padding: 10px 8px;
    }
    &.mini-input{
      padding: 8px 8px;
    }
    &.big-input{
      padding: 12px 8px;
    }
    &:hover {
      border-color: #909399;
    }
    &::placeholder{
      color:rgba(0,0,0,.2)
    }
    &:focus {
      border-color: #409eff;
      box-shadow: inset 0 0px 1px $box-shadow-color;
      outline: none;
    }
    &[disabled] {
      cursor: not-allowed;
      color: #aaa;
      border-color: #aaa;
    }
    &[readonly] {
      cursor: wait;
    }
    &.error_input{
      border-color: $red;
      &:hover{
        box-shadow: none;
      }
    }
    &.info_input{
      border-color: $info;
      &:hover{
        box-shadow: none;
      }
    }
    &.title_input{
      border-color: $title;
      &:hover{
        box-shadow: none;
      }
    }

  }
  .error_title {
    display: inline-flex;
    align-items: center;
    > :not(:last-child){
      margin-right: .5em;
    }
    .icon-error {
      width: 1em;
      height: 1em;
      fill: $red;
    }
    .error_message{
      color:$red;
    }
  }
  .info_title {
    display: inline-flex;
    align-items: center;
    > :not(:last-child){
      margin-right: .5em;
    }
    .icon-info {
      width: 1em;
      height: 1em;
      fill: $info;
    }
    .info_message{
      color:$info;
    }
  }
  .title_title {
    display: inline-flex;
    align-items: center;
    > :not(:last-child){
      margin-right: .5em;
    }
    .icon-title {
      width: 1em;
      height: 1em;
      fill: $title;
    }
    .title-message{
      color:$title;
    }
  }
  .tipwrap{
    display: block;
    margin-top:7px;
  }
}
</style>