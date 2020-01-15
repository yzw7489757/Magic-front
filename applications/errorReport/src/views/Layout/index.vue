<template>
  <div class="app-wrapper">
    <sidebar></sidebar>
    <div class="main-container">
      <navigation></navigation>
      <main-content></main-content>
      <main-footer></main-footer>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/views/Layout/Sidebar/index'
import MainContent from '@/views/Layout/MainContent'
import Navigation from '@/views/Layout/Navigation'
import MainFooter from '@/views/Layout/Footer'

export default {
  name: 'layout',
  components: {
    Navigation,
    Sidebar,
    MainContent,
    MainFooter
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

@import "src/style/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 260px;
  position: relative;
  overflow: hidden;
}

</style>
