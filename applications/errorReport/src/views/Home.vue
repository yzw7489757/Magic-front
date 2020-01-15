<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <y-modal :visible="open" @hide="hideModal" defaultWidth="400px">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </y-modal>
    <el-button @click="open=true"></el-button>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'
export default {
  name: 'home',
  data() {
    return {
      open: false
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    hideModal() {
      this.open = false
    }
  },
  mounted() {

  }
}
</script>
