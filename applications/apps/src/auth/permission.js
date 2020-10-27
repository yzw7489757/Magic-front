import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import Message from '@/components/Messgae/index.js'
import { getToken, removeToken, removeUserInfo, getUserInfo } from '@/utils/auth.js'

const whiteList = ['/login','/register','/404']

const limitRoute = router => {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken() && getUserInfo()) {
      // determine if there has token
      /* has token */
      if (to.path === '/login') {
        next({ name: 'home' })
      } else {
        next()
      }
    } else {
      /* has no token */
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        Message.error({
          text: '请登录',
          duration: 2000
        })
        removeToken()
        removeUserInfo()
        next({ name: 'login', query: { from: router.history.pending.fullPath } }) // 重定向到登录页
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  })

  router.afterEach(() => {
    NProgress.done() // finish progress bar
  })
}

export default limitRoute
