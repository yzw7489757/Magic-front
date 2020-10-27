<template>
  <div class="y-form-item" :class="{'hasError':hasError}">
    <label :class="{'y-form-item-label-required':isRequired && identification}" />
    <span v-if="label" :class="{'y-form-item-label':true,'hasLabel':label.trim()}" :style="{ width: form.labelWidth }">{{label}}</span>
    <div class="y-form-item-validate" :class="activeClass">
      <slot></slot>
      <div class="y-form-item-message" v-if="hasError">
        <svg-icon icon-class="error" class="error-icon"></svg-icon> {{validateMessage}}
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter'
import Schema from 'async-validator'

export default {
  name: 'y-form-item',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    },
    identification: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop]
    },
    activeClass() {
      return [this.validateState]
    },
    hasError() {
      return this.validateState === 'error'
    }
  },
  data() {
    return {
      initialValue: '', // 储存默认值
      isRequired: false, // 当前的是否有问题
      validateState: '', // 是否校验成功
      validateMessage: '' // 校验失败文案
    }
  },
  methods: {
    /**
     * 绑定事件 进行是否 required 校验
     */
    setRules() {
      const that = this
      const rules = this.getRules() // 拿到父组件过滤后当前需要使用的规则
      if (rules.length) {
        // every 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）
        // some 只要有一个符合就返回true
        this.isRequired = rules.some(rule => rule.required)
        // 如果当前校验规则中有必填项，则标记出来
      }
      /**
       * blur 事件
       */
      this.$on('on-form-blur', that.onFieldBlur)
      /**
       * change 事件
       */
      this.$on('on-form-change', that.onFieldChange)
    },
    /**
     * 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
     */
    getRules() {
      const that = this
      let { rules } = that.form
      rules = rules ? rules[that.prop] : []
      return [].concat(rules || []) // 这种写法可以让规则肯定是一个数组的形式
    },
    /**
     * Blur 进行表单验证
     */
    onFieldBlur() {
      this.validation('blur')
    },
    /**
     * change 进行表单验证
     */
    onFieldChange() {
      this.validation('change')
    },
    /**
     * 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
     */
    getFilteredRule(trigger) {
      const rules = this.getRules()
      // !res.trigger 没有调用方式的时候默认就校验的
      // filter 过滤出当前需要的规则
      return rules.filter(
        res => !res.trigger || res.trigger.indexOf(trigger) !== -1
      )
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validation(trigger, callback = function () {}) {
      // blur 和 change 是否有当前方式的规则
      const rules = this.getFilteredRule(trigger)
      // 判断当前是否有规则
      if (!rules || rules.length === 0) {
        return
      }
      // 设置状态为校验中
      // async-validator的使用形式
      this.validateState = 'validating'
      const validator = new Schema({ [this.prop]: rules })
      // firstFields: true 只会校验一个
      validator.validate(
        { [this.prop]: this.fieldValue },
        { firstFields: true },
        (errors, fields) => {
          this.validateState = !errors ? 'success' : 'error'
          this.validateMessage = errors ? errors[0].message : ''
          callback(this.validateMessage)
        }
      )
    },
    /**
     * 清空当前的 form-item
     */
    resetField() {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
    }
  },
  // 组件渲染时，将实例缓存在 Form 中
  mounted() {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch('y-form', 'on-form-item-add', this)
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue
      // 添加表单校验
      this.setRules()
    }
  },
  // 组件销毁前，将实例从 Form 的缓存中移除
  beforeDestroy() {
    this.dispatch('y-form', 'on-form-item-remove', this)
  }
}
</script>

<style scoped lang="scss">
$error: #f56c6c;
$info: #67c23a;

.y-form-item-validate{
  position: relative;
  &.success /deep/.yinput{
    border-color: $info;
  }
  &.error /deep/.yinput{
    border-color: $error;
  }
  &.error /deep/.yselect .dropdown-toggle{
    background-image: linear-gradient($error, $error), linear-gradient(#f55145, #f55145);
  }
  &.err /deep/ .yselect{
    background-image: linear-gradient($info, $info), linear-gradient($info, $info);
  }
}
.y-form-item {
  margin-bottom: 12px;
  &.hasError{
    margin-bottom: calc(12px + 1em);
  }
  &-label{
    text-align: right;
    vertical-align: middle;
    float: none;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  &.hasLabel{
    &::after{
        content:'：';
        font-size: 1em;
        color: inherit;
        vertical-align: middle;
        font:inherit;
      }
    }
  }
}
.y-form-item-label-required:before {
  content: "*";
  color: $error;
}
.error-icon {
  fill: $error;
  margin-right: 5px;
}
.y-form-item-message {
  position: absolute;
  bottom: -5px;
  transform: translateY(100%);
  color: $error;
  margin-top: 5px;
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
