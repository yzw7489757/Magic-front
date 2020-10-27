<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <ul v-if="!item.hidden && item.notGroup && item.children" :key="item.path">
        <template
          v-for="child in item.children">
            <template v-if="!child.hidden">
                <li
                  :key="item.path + '/' + child.path"
                  :class="{'menu-item':true, 'active': defaultActive.indexOf(item.path + '/' + child.path) !== -1}"
                  v-if="child.meta  && child.meta.title">
                  <router-link
                    class="menu-link"
                    :to="item.path + '/' + child.path"
                    :key="child.name">
                      <svg-icon
                        class="menu-icon"
                        v-if="child.meta && child.meta.icon"
                        :icon-class="child.meta.icon"/>
                      <div
                      class="menu-title"
                      v-if="child.meta && child.meta.title"
                      >{{child.meta.title}}
                      </div>
                  </router-link>
                </li>
            </template>
          </template>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SideBarNav',

  props: {
    routes: {
      type: Array
    },
    'default-active': {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.menu{
  &-link{
    display:block;
    margin: 10px 15px 0;
    border-radius: 3px;
    color: #3c4858;
    padding-left: 10px;
    padding-right: 10px;
    text-transform: capitalize;
    font-size: 13px;
    padding: 10px 15px;
    transition:  background-color .15s ease-in;
  }
  &-icon{
    float:left;
    margin-right:15px;
    line-height:30px;
    font-size:24px;
    color:#a9afbb;
  }
  &-title{
    line-height: 30px;
    font-size: 14px;
    position: relative;
    display: block;
    height: auto;
    white-space: nowrap;
    transition: all .3s linear;
  }
  &-item.active &-icon{
    color: #fff;
  }
  &-item.active &-link{
    background-color: #9c27b0;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(156,39,176,.4);
    color: #fff;
  }
}

</style>
