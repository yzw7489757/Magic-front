const pkg = require('../../package.json');

module.exports = {
  PORT: "7103",
  APP_PUBLIC_URL: "/",
  APP_BASE_URL: "/",
  APP_DOMAIN: `//${pkg.name}.localhost.cn/`,
}