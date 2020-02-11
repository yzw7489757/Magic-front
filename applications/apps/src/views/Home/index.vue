<template>
  <div class="home">
    <div class="home-header">
      <home-head></home-head>
    </div>
    <div class="home-content">
      <home-content></home-content>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
    }
  },
  components: {
    'home-head': () => import('./components/HomeHead.vue'),
    'home-content': () => import('./components/HomeContent.vue')
  },
  mounted () {
    // this.$msg.success('aaa')
  }
}
</script>
