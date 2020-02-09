const { name } = require('../package')

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = '/' + name
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
