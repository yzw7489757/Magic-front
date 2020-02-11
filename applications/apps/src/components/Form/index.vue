<template>
  <form :class="{'y-form':true,'inline':inline}" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'y-form',
  componentName: 'y-form',
  provide() {
    return {
      form: this
    }
  },
  props: {
    // 当前 form 的model
    model: {
      type: Object
    },
    'label-width': {
      type: String,
      default: () => 'auto'
    },
    // 验证
    rules: {
      type: Object
    },
    inline: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      fields: [] // 储存当前的 form-item的实例
    }
  },
  created() {
    // 存当前实例
    const that = this
    this.$on('on-form-item-add', (item) => {
      if (item) {
        that.fields.push(item)
      }
    })
    // 删除当前有的实例
    this.$on('on-form-item-remove', (item) => {
      if (item.prop) {
        // 如果当前没有prop的话表示当前不要进行删除（因为没有注入）
        that.fields.splice(that.fields.indexOf(item), 1)
      }
    })
  },
  methods: {
    /**
     * 清空
     */
    resetFields() {
      // 添加resetFields方法使用的时候调用即可
      /**
       * 当前所有当form-item 进行赋值
       */
      this.fields.forEach((field) => {
        field.resetField()
      })
    },
    /**
     * 校验校验部分方法：支持 Promise
     */
    validateField(props) {
      let valid = true
      props = [].concat(props)
      const fields = this.fields.filter(field => !!~props.indexOf(field.prop))
      if (!fields.length) {
        console.warn('[y-form Warning] please pass correct props!')
        return
      }
      fields.forEach((field) => {
        field.validation('', (err) => {
          if (err) valid = false
        })
      })
      return valid
    },
    /**
     * 校验 公开方法：全部校验数据，支持 Promise
     */
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true
        let count = 0
        this.fields.forEach((field) => {
          field.validation('', (error) => {
            if (error) {
              valid = false
            }
            if (++count === this.fields.length) {
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="scss">
.y-form.inline{
  .y-form-item{
    display: inline-flex;
    align-items: center;
  }
  .y-form-item-label{
    float: left;
  }
}
</style>
