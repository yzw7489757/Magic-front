// const path = require('path');
const { name } = require('./package');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const port = process.env.PORT; // dev port
const protocol = process.env.REACT_APP_PROTOCOL
const IS_PROD = process.env.NODE_ENV === 'production'
const address = IS_PROD ? process.env.REACT_APP_DOMAIN : `localhost:${port}`

module.exports = {
  webpack: function override(config, env) {
    const copyConfig = { ...config };
    copyConfig.output.library = `${name}-[name]`;
    copyConfig.output.libraryTarget = 'umd';
    copyConfig.output.jsonpFunction = `webpackJsonp_${name}`;

    if(IS_PROD){
      copyConfig.devtool = false
      copyConfig.plugins.push(new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        publicPath: `${protocol}://${address}/`,
        moduleFilenameTemplate: '[resource-path]',
        // append: `\n//# sourceMappingURL=${protocol}://${address}/[url]`
      }))
      copyConfig.optimization.minimizer.push(new UglifyJsPlugin({ sourceMap: true }))
    }
    return copyConfig;
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
