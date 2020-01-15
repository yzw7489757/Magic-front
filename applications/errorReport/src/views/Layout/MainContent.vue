<template>
  <section class="main-content">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'mainContent',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.main-content{
  margin-top:70px;
  padding: 30px 15px;
  min-height: calc(100vh - 123px);
}
</style>
