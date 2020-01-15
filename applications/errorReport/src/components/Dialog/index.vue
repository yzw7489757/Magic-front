<template>
  <div class="dialog">
    <div class="dialog__wrapper" v-if="visible" @clcik="closeModal">
      <div class="dialog">
        <div class="dialog__header">
          <div class="dialog__title">{{ title }}</div>
        </div>
        <div class="dialog__body">
          <slot></slot>
        </div>
        <div class="dialog__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
    <div class="modal" v-show="visible"></div>
  </div>
</template>

<script>
export default {
  name: 'y-dialog',
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false) // 传递关闭事件
    },
    closeModal(e) {
      if (this.visible) {
        document.querySelector('.dialog').contains(e.target) ? '' : this.close(); // 判断点击的落点在不在dialog对话框内，如果在对话框外就调用this.close()方法关闭对话框
      }
    }
  }
}
</script>