<template>
  <div class="modal-vue">
    <div
      class="modal-vue-wrapper"
      :class="[animationParent,{'modal-vue-wrapper-show' : open}]"
      v-show="isOpen"
    >
      <div
        :class="['modal-vue-overlay']"
        @click="$emit('hide')"
        :style="{backgroundColor:bgOverlay}"
      ></div>
      <div
        :class="['modal-vue-panel',animationPanel,{'modal-vue-show':open}]"
        :style="{width:width,backgroundColor:bgPanel}"
      >
        <div class="modal-vue---close-icon" @click="$emit('hide')" v-if="showCloseButton">
          <slot name="close-icon">
           <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 294.843 294.843" xml:space="preserve" width="25px" height="25px"><g><path d="M147.421,0C66.133,0,0,66.133,0,147.421s66.133,147.421,147.421,147.421c38.287,0,74.567-14.609,102.159-41.136   c2.389-2.296,2.464-6.095,0.167-8.483c-2.295-2.388-6.093-2.464-8.483-0.167c-25.345,24.367-58.672,37.786-93.842,37.786   C72.75,282.843,12,222.093,12,147.421S72.75,12,147.421,12s135.421,60.75,135.421,135.421c0,16.842-3.052,33.273-9.071,48.835   c-1.195,3.091,0.341,6.565,3.432,7.761c3.092,1.193,6.565-0.341,7.761-3.432c6.555-16.949,9.879-34.836,9.879-53.165   C294.843,66.133,228.71,0,147.421,0z" fill="#91DC5A"></path> <path d="M167.619,160.134c-2.37-2.319-6.168-2.277-8.485,0.09c-2.318,2.368-2.277,6.167,0.09,8.485l47.236,46.236   c1.168,1.143,2.683,1.712,4.197,1.712c1.557,0,3.113-0.603,4.288-1.803c2.318-2.368,2.277-6.167-0.09-8.485L167.619,160.134z" fill="#91DC5A"></path> <path d="M125.178,133.663c1.171,1.171,2.707,1.757,4.243,1.757s3.071-0.586,4.243-1.757c2.343-2.343,2.343-6.142,0-8.485   L88.428,79.942c-2.343-2.343-6.143-2.343-8.485,0c-2.343,2.343-2.343,6.142,0,8.485L125.178,133.663z" fill="#91DC5A"></path> <path d="M214.9,79.942c-2.343-2.343-6.143-2.343-8.485,0L79.942,206.415c-2.343,2.343-2.343,6.142,0,8.485   c1.171,1.171,2.707,1.757,4.243,1.757s3.071-0.586,4.243-1.757L214.9,88.428C217.243,86.084,217.243,82.286,214.9,79.942z" fill="#91DC5A"></path></g></svg>
          </slot>
        </div>
        <div class="modal-vue--content" :class="{'space-content':!zeroSpace}">
          <div class="modal-vue--content-panel" :class="{'space-content':!zeroSpace}">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "y-modal",
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    resizeWidth: {
      type: Object
    },
    animationPanel: {
      type: String,
      required: false,
      default: "modal-fade"
    },
    bgOverlay: {
      type: String,
      required: false,
      default: "#fff"
    },
    bgPanel: {
      type: String,
      required: false,
      default: "rgba(255, 255, 255, 0.57)"
    },
    animationParent: {
      type: String,
      required: false,
      default: "modal-fade"
    },
    defaultWidth: {
      type: String,
      required: false,
      default: "80%"
    },
    closeScroll: {
      type: Boolean,
      required: false,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      required: false,
      default: true
    },
    zeroSpace: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      width: this.defaultWidth || "80%",
      open: false,
      isOpen: false,
      isShowCloseButton: true,
      backups: {
        body: {
          height: null,
          overflow: null,
          paddingRight: null
        }
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.openModal()
      } else {
        if (this.closeScroll) {
          this._unlockBody()
        }
        this.open = false
        setTimeout(() => (this.isOpen = false), 300)
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth)
    window.removeEventListener("resize", this.getWindowHeight)
  },
  destroyed() {
    if (this.open) {
      if (this.closeScroll) {
        this._unlockBody()
      }
      this.open = false
      setTimeout(() => (this.isOpen = false), 300)
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.visible) {
        this.openModal()
      }
      window.addEventListener("resize", this.getWindowWidth)
      window.addEventListener("resize", this.getWindowHeight)
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },
  methods: {
    openModal() {
      this.isOpen = true
      setTimeout(() => (this.open = true), 30)
      if (this.closeScroll) {
        this._lockBody()
      }
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight
    },
    getWindowWidth(event) {
      if (this.resizeWidth && Object.keys(this.resizeWidth).length > 0) {
        this.windowWidth = document.documentElement.clientWidth
        var filter = Object.keys(this.resizeWidth).find(
          f => f >= this.windowWidth
        )
        if (filter) {
          this.width = this.resizeWidth[filter]
        } else {
          this.width = this.defaultWidth
        }
      }
    },
    _lockBody() {
      this.backups.body.height = document.body.style.height
      this.backups.body.overflow = document.body.style.overflow
      document.body.style.paddingRight = "15px"
      document.body.style.height = "100%"
      document.body.style.overflow = "hidden"
    },
    _unlockBody() {
      document.body.style.height = this.backups.body.height
      document.body.style.overflow = this.backups.body.overflow
      document.body.style.paddingRight = this.backups.body.paddingRight
    }
  }
}
</script>

<style lang="scss">
.modal-vue {
  &-wrapper {
    position: absolute;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    z-index: 99;
    transform: translate3D(0, 0, 0);
    transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);

    &.modal-fade {
      opacity: 0.1;
      visibility: hidden;
    }
    &.modal-scale {
      transform: scale(-1, 1);
    }
  }
  &-wrapper-show {
    &.modal-fade,
    &.modal-scale {
      visibility: visible;
      opacity: 1;
      transform: translate3D(0, 0, 0);
    }
    visibility: visible;
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }
  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9001;
    font-size: 14px;
    z-index: 999;
  }
  &---close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
  &-panel {
    z-index: 999;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 8px 46px rgba(0, 0, 0, 0.08),
      0px 2px 6px rgba(0, 0, 0, 0.03);
    position: absolute;
    max-height: 100vh;
    // overflow-y: auto;
    border-radius: 2px;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    opacity: 0;
    transition-property: transform, opacity, width;
    transition-duration: 0.3s;
    transition-delay: 0.05s;
    transition-timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
    &.modal-fade {
      transform: scale(1) translate(0, -50%);
    }
    &.modal-rotate {
      transform: rotate(45deg) translate(0, -50%);
    }
    &.modal-slide-right {
      transform: translate(100px, -50%);
    }
    &.modal-slide-left {
      transform: translate(-100px, -50%);
    }
    &.modal-slide-top {
      transform: translate(0, -100%);
    }
    &.modal-slide-bottom {
      transform: translate(0, 100%);
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar {
      width: 6px;
      height: 5px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #41b9d2;
    }
  }
  &--content {
    display: flex;
    align-items: center;
    line-height: 1.5;
    &.space-content {
      padding: 36px 20px 24px;
    }
  }
  &--content-panel {
    display: block;
    text-align: justify;
    font-size: 16px;
    flex-grow: 1;
    &.space-content {
      padding-top: 5px;
      padding-bottom: 10px;
    }
  }
  .modal-vue-show {
    transform: translate(0, -50%) !important;
    opacity: 1 !important;
  }
}
</style>
