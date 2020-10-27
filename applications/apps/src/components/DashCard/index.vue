<template>
  <div class="card card-stats">
    <div class="card-header" :data-background-color="theme">
      <svg-icon :iconClass="headIcon" class="card-icon" />
    </div>
    <div class="card-content">
      <p class="category">{{category}}</p>
      <h3 class="title">{{value}} <small>{{unit}}</small></h3>
    </div>
    <div class="card-footer">
      <div class="stats">
        <p><svg-icon :iconClass="footerIcon" class="footer-icon"/>{{footerContent}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashCard',
  props: {
    theme: {
      type: String,
      validator: (value) => {
        return ['info', 'warn', 'danger', 'success'].includes(value)
      },
      default: () => 'info'
    },
    category: {
      type: String,
      required: true,
      validator: (str) => !!str
    },
    unit: {
      type: String,
      default: () => ''
    },
    value: {
      type: String,
      required: true,
      validator: (str) => !!str
    },
    headIcon: {
      type: String,
      required: true
    },
    footerIcon: {
      type: String,
      default: () => 'title'
    },
    footerContent: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/style/mixin.less";

.card{
  display: inline-block;
  position: relative;
  width: 100%;
  margin: 25px 0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
  &-header{
    margin: -20px 15px 0;
    border-radius: 3px;
    padding: 15px;
    float:left;
    text-align:center;
    color:#fff;
    .card-icon{
      .text(36px, 56px, #fff);
      width: 56px;
      height: 56px;
    }
    &[data-background-color="warn"]{
      background: linear-gradient(60deg, #ffa726, #fb8c00);
      box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);
    }
    &[data-background-color="success"]{
      background: linear-gradient(60deg,#66bb6a,#43a047);
      box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(76,175,80,.4);
    }
    &[data-background-color="danger"]{
      background: linear-gradient(60deg,#ef5350,#e53935);
      box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(244,67,54,.4);
    }
    &[data-background-color="info"]{
      background: linear-gradient(60deg,#26c6da,#00acc1);
      box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,188,212,.4);
    }
  }
  &-content{
    text-align: right;
    padding:10px 20px 15px 20px;
    .category{
      .text(16px, 1.6em, #999);
    }
    .title{
      .title(1.825em, 1.5em, inherit, 500,'"Roboto", "Helvetica", "Arial", sans-serif' );
      min-height: 32px;
      white-space: nowrap;
      small{
        .text(65%, 1, #777, 400);
      }
    }
  }
  &-footer{
    margin: 0 20px 10px;
    padding-top: 10px;
    border-top: 1px solid #eeeeee;
    .stats{
      .text(12px, 20px, #999);
      display:inline-block;
    }
  }
  .footer-icon{
    font-size:20px;
    vertical-align: middle;
  }
}

</style>
