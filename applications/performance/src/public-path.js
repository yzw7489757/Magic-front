const IS_PROD = process.env.NODE_ENV === 'production';
const domain = process.env.APP_DOMAIN;

if (window.__POWERED_BY_QIANKUN__) {
  if (IS_PROD) {
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = `//${domain}/`;
  }
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
