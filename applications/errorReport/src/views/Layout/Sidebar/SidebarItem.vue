<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.hidden">
        <router-link
          v-if=" item.children &&  item.children.length === 1 && !item.children[0].children && !item.alwaysShow"
          :to="item.path+'/' + item.children[0].path"
          :key="item.children[0].name">
          <el-menu-item
            :index="item.path+'/'+item.children[0].path"
            class='submenu-title-noDropdown'
          >
            <svg-icon
              v-if="item.children[0].meta && item.children[0].meta.icon"
              :icon-class="item.children[0].meta.icon"
            ></svg-icon>
            <span v-if="item.children[0].meta&&item.children[0].meta.title"
            >{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>
        <router-link
          v-else-if="!item.children && !item.hidden"
          :to="item.path"
          :key="item.name">
          <el-menu-item 
            :index="item.name || item.path" :key="item.name"
          >
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        </router-link>
        <template
          v-else-if="item.notGroup && item.children"
          v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="child.children && child.children.length > 0"
                :routes="[child]"
                :key="child.path">
              </sidebar-item>
              <router-link
                v-else
                :to="item.path + '/' + child.path"
                :key="child.name"
              >
                <el-menu-item
                  :index="item.path + '/' + child.path"
                  v-if="child.meta  && child.meta.title"
                >
                  <svg-icon
                    v-if="child.meta && child.meta.icon"
                    :icon-class="child.meta.icon"
                  ></svg-icon>
                  <span v-if="child.meta && child.meta.title"
                  >{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        <el-submenu
          v-else
          :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <svg-icon
              v-if="item.meta && item.meta.icon"
              :icon-class="item.meta.icon"
            ></svg-icon>
            <span
              v-if="item.meta && item.meta.title"
            >{{item.meta.title}}</span>
          </template>
          <template
            v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="child.children && child.children.length > 0"
                :routes="[child]"
                :key="child.path">
              </sidebar-item>
              <router-link
                v-else
                :to="item.path + '/' + child.path"
                :key="child.name"
              >
                <el-menu-item
                  :index="item.path + '/' + child.path"
                  v-if="child.meta  && child.meta.title"
                >
                  <svg-icon
                    v-if="child.meta && child.meta.icon"
                    :icon-class="child.meta.icon"
                  ></svg-icon>
                  <span v-if="child.meta && child.meta.title"
                  >{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-submenu>
        
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',

  props: {
    routes: {
      type: Array
    },
  }
}
</script>
