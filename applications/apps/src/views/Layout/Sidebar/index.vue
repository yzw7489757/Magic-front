<template>
      <scroll-bar>
          <div class="sidebar-container">
              <div class="logo">
                <router-link to="/" tag="a" class="logo-normal">
                    Creative Magic
                </router-link>
              </div>
              <div class="sidebar-content">
                  <side-bar-nav :default-active="$route.path" :routes="routes" />
              </div>
          </div>
      </scroll-bar>
</template>

<script>
import routes from '@/router/index'
import SideBarNav from './SideBarNav'
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'sidebar',
  components: { SideBarNav, ScrollBar },
  computed: {
    routes() {
      return routes.filter(route => !route.hidden)
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 260px;
  background: #fff;
  box-shadow: 0 16px 38px -12px rgba(0,0,0,.56), 0 4px 25px 0 rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2);
  .svg-icon {
    margin-right: 16px;
  }
}
.logo{
  padding: 15px 0;
  margin: 0;
  display: block;
  position: relative;
  z-index: 4;
  &::after{
    content: "";
    position: absolute;
    bottom: 0;
    right: 15px;
    height: 1px;
    width: calc(100% - 30px);
    background-color: hsla(0,0%,71%,.3);
  }
  &-normal{
    text-transform: uppercase;
    padding: 5px 0;
    font-size: 18px;
    color: #3c4858;
    white-space: nowrap;
    font-weight: 400;
    line-height: 30px;
    overflow: hidden;
    text-align: center;
    display: block;
    transition: all .15s ease-in;
  }
}
.sidebar-content{
  position: relative;
  height: calc(100vh - 75px);
  overflow: auto;
  width: 260px;
  z-index: 4;
  padding-bottom: 30px;
  transition-property: top,bottom,width;
  transition-duration: .2s,.2s,.35s;
  transition-timing-function: linear,linear,ease;
  /deep/.el-menu {
      border: none;
      box-sizing: border-box;
      margin:0 15px;
      &-item{
        margin: 10px 0;
        &:hover{
          background-color: hsla(0,0%,78%,.2) !important;
        }
      }
      .router-link-active{
        &>li{
          box-sizing: border-box;
          background-color: #9c27b0 !important;
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(156,39,176,.4);
          border-radius: 3px;
          text-transform: capitalize;
          font-size: 13px;
        }
      }
    }
}

</style>
