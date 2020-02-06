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
        path: 'project',
        name: 'project',
        meta: {
          title: '应用信息'
        },
        redirect: { name: 'projectList' },
        component: () => import('@/views/Project/index'),
        children: [
          {
            path: 'list',
            name: 'projectList',
            component: () => import('@/views/Project/ProjectList'),
            meta: {
              title: '应用列表'
            }
          },
          {
            path: 'detail/:id',
            name: 'projectDetail',
            component: () => import('@/views/Project/ProjectDetail'),
            meta: {
              title: '应用详情'
            }
          }
        ]
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
        path: '/*',
        hidden: true,
        meta: {
          title: '404'
        },
        component: () => import('@/views/NotFound/index')
      }
    ]
  },
  {
    path: '/*',
    hidden: true,
    meta: {
      title: '404'
    },
    component: () => import('@/views/NotFound/index')
  },
  {
    path: '/',
    redirect: '/views/home',
    hidden: true
  }
]

export default routes
