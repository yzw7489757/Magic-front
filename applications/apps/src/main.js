import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './public-path'
import '@/style/index.less'
import routes from './router'
import store from './store'
import './utils/captureDOM'
import '@/components/index'
import limitRoute from './auth/permission'
import filter from './filter/index'
import { name } from '../package.json'
import Antd from 'ant-design-vue';

const IS_PROD = process.env.NODE_ENV === 'production'

Vue.config.productionTip = IS_PROD
Vue.use(Antd);
Vue.use(filter)

export let router = null
let instance = null
function render() {
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? `/${name}` : '/',
    mode: 'history',
    routes
  })
  limitRoute(router)

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  // console.log('vue app bootstraped')
}

export async function mount(props) {
  // console.log('props from main framework', props)
  render()
}

export async function unmount() {
  instance.$msg.destory()
  instance.$destroy()
  instance = null
  router = null
}
