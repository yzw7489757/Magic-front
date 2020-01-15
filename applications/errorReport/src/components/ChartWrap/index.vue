<template>
  <div class="chart-wrap boxshadow">
    <div class="chart-wrap_header">
      <h2 class="chart-wrap_title">{{title}}
          <svg-icon v-if="tip" v-popover:popover icon-class="shuoming"></svg-icon>
      </h2>
      <slot name="timer"></slot>
      <svg-icon icon-class="quanping" class="headIcon" @click.native="triggerToToggleFullScreen"></svg-icon>
    </div>
    <div class="chart-wrap_conent clearfix" >
      <fullscreen ref="fullscreen" @change="fullScreenOnChange" class="screenWrap">
        <slot></slot>
      </fullscreen>
    </div>
    <el-popover
      ref="popover"
      placement="top-start"
      :title="title"
      trigger="hover">
      <div v-html="tip"></div>
    </el-popover>
  </div>
</template>

<script>
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
Vue.use(fullscreen)

export default {
  name: "ChartWrap",
  data() {
    return {}
  },
  props: {
    title: String,
    default: function() {
      return ""
    },
    tip: {
      type: String,
      default: function() {
        return ''
      }
    },
    full: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    target: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  computed: {
    ...mapGetters(['fullScreen'])
  },
  methods: {
    ...mapActions({
      fullScreenOnChange: 'ChangeFullStatus'
    }),
    triggerToToggleFullScreen () {
      if (this.target) {
        this.$refs['fullscreen'].toggle(this.$el.querySelector(this.target))
      } else {
        this.$refs['fullscreen'].toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.chart-wrap {
  margin-bottom: 15px;
  background: #fff;
  position: relative;
  &_header {
    box-sizing: content-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
  }
  &_title {
    padding: 16px 24px;
    font: normal 500 16px/24px black, PingFangSC-Medium;
    color: rgba(0, 0, 0, 0.85);
  }
  &_conent {
    padding: 10px 20px;
    position: relative;
  }
  .headIcon {
    position: absolute;
    width: 20px;
    height: 20px;
    opacity: 0.2;
    top: 17px;
    right: 10px;
    &:hover {
      opacity: 1;
    }
  }
  .fullscreen {
    background: #fff !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
