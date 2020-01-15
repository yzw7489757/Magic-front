import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index'),
    hidden: true
  },
  {
    path: '/views',
    component: Layout,
    notGroup: true,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          title: '主页'
        }
      },
      {
        path: 'projectList',
        name: 'projectList',
        meta: {
          title: '应用信息'
        },
        component: () => import('@/views/Project/index')
      },
      {
        path: 'list',
        name: 'performanceList',
        meta: {
          title: '监控列表'
        },
        component: () => import('@/views/Performance/index')
      },
      {
        path: 'detail',
        name: 'detail',
        meta: {
          title: '性能信息'
        },
        component: () => import('../views/About.vue')
      },
      {
        path: 'performance',
        component: Layout,
        meta: {
          title: '性能监控列表'
        }
      }
    ]
  },

  {
    path: '/',
    redirect: '/views/home',
    hidden: true
  }
]

export default routes
