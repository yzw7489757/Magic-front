// const path = require('path');
const { name } = require('./package');

module.exports = {
  webpack: function override(config, env) {
    const copyConfig = { ...config };
    copyConfig.output.library = `${name}-[name]`;
    copyConfig.output.libraryTarget = 'umd';
    // copyConfig.output.path = path.resolve(__dirname, 'dist');
    copyConfig.output.publicPath = env === 'production' ? `/magic-${name}/` : '/';
    copyConfig.output.jsonpFunction = `webpackJsonp_${name}`;
    return config;
  },
  devServer(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.open = false;
      config.hot = false;
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
