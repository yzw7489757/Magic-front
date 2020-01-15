<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">Simple Table</h4>
      <div class="card-category"> Here is a subtitle for this table</div>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name:'card' 
  }
</script>

<style lang="scss" scoped>
.card{
  position: relative;
  display: flex;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  border-radius: 6px;
  color: #333;
  background: #fff;
  width: 100%;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  &-header{
    position: relative;
    border-radius: 3px;
    padding: 15px;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(156,39,176,.4);
    background: linear-gradient(60deg,#ab47bc,#8e24aa);
    border-bottom: none;
    margin: -20px 15px 0;
    color: #fff;
  }
  &-title{
    margin-bottom: 3px;
    text-decoration: none;
    line-height: 1.4em;
    font-family: Roboto,Helvetica,Arial,sans-serif;
  }
  &-category{
    color: hsla(0,0%,100%,.8);
  }
  &-body{
    padding: .9375rem 20px;
    position: relative;
  }
}
</style>