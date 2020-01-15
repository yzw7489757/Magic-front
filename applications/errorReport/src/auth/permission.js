import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getToken, removeToken, removeUserInfo, getUserInfo } from '@/utils/auth.js';

// NProgress.configure({ showSpinner: false })

function hasPermission(roles, permissionRoles) {
  if (!permissionRoles || permissionRoles.length === 0) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login', '/404'];

let registerRouterFresh = true;

const limitRoute = router => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
      // determine if there has token
      /* has token */
      if (to.path === '/login') {
        next({ path: '/home' });
      } else {
        next();
      }
    } else {
      /* has no token */
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next();
      } else {
        Message({
          message: '请登录',
          type: 'error',
          duration: 2000,
        });
        next('/login'); // 否则全部重定向到登录测试页
        NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  });

  router.afterEach(() => {
    NProgress.done(); // finish progress bar
  });
};

export default limitRoute;
