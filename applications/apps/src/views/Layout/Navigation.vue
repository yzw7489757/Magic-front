<template>
  <nav class="nav">
    <div class="nav-info">
      <h3 class="nav-title">{{$route.meta ? $route.meta.title : ''}}</h3>
    </div>
    <div class="nav-operation">

    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navigation',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.nav{
  display:flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: flex-start;
  background-color: transparent;
  width: 100%;
  padding: 10px 0;
  color: #555;
  z-index: 2;
  box-sizing: content-box;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  &-info{
    display: inline-flex;
    align-items: center;
    .nav-title{
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
