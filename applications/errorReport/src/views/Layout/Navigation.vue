<template>
  <nav class="nav">
    <div class="nav-info">
      <h3>User Profile</h3>
    </div>
    <div class="nav-operation">

    </div>
  </nav>
</template>
<script>
export default {
  name:'Navigation',
  data(){
    return {}
  }
}
</script>

<style lang="scss" scoped>
.nav{
  position: absolute;
  right: 0;
  left: 0;
  top:0;
  display:flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: flex-start;
  margin-bottom: 0;
  background-color: transparent;
  width: 100%;
  padding-top: 10px;
  padding: .625rem 0;
  color: #555;
  z-index: 2;
  &-info{
    display: inline-flex;
    align-items: center;
    h3{
      position: relative;
      color: inherit;
      height: 50px;
      font-size: 1.125rem;
      line-height: 30px;
      padding: .625rem 0;
      font-weight: 300;
      margin:0 1rem;
      white-space: nowrap;
    }
  }
  &-operation{
    display: flex;
    flex-basis: auto;
    justify-content: flex-end;
    flex-grow: 1;
    align-items: center
  }
}
</style>