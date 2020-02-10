const IS_PROD = process.env.NODE_ENV === 'production';

if (window.__POWERED_BY_QIANKUN__) {
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = IS_PROD ? `${process.env.PUBLIC_URL}/` : '/';
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
