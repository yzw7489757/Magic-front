import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
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
        path: 'apps',
        name: 'apps',
        meta: {
          title: '应用信息'
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/views/apps',
            redirect: '/views/apps/list'
          },
          {
            path: '/views/apps/list',
            name: 'appList',
            component: () => import('@/views/Apps/List'),
            meta: {
              title: '应用列表'
            }
          },
          {
            path: '/views/apps/config/:id',
            name: 'app-config',
            component: () => import('@/views/Apps/Config'),
            meta: {
              title: '应用详情'
            }
          }
        ]
      },
      // {
      //   path: 'list',
      //   name: 'performanceList',
      //   meta: {
      //     title: '监控列表'
      //   },
      //   component: () => import('@/views/Performance/index')
      // },
      {
        path: '*',
        hidden: true,
        meta: {
          title: '404'
        },
        component: () => import('@/views/NotFound')
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    meta: {
      title: '404'
    },
    component: () => import('@/views/NotFound')
  }
]

export default routes
