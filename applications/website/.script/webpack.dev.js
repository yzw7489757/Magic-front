const { resolve } = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const {name} = require('../package.json');
const WebpackBar = require('webpackbar')
const { baseConfig, envInjector } = require('./webpack.base');
const {library} = require('./library');
const externals = require('./externals');

const IN_HTTPS = !!process.env.HTTPS;

const devBaseConfig = {
  ...baseConfig,
  mode: 'development',
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: resolve(__dirname, '../demo'),
    https: IN_HTTPS,
    port: 7103,
    host: '0.0.0.0',
    stats: 'minimal',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  devtool: 'cheap-module-eval-source-map',

  externals: {
    // ...externals,
    // [name]: {
    //   root: library,
    //   commonjs2: name,
    //   commonjs: name,
    //   amd: library,
    // },
  },
};

module.exports = [{
  ...devBaseConfig,

  entry: {
    index: resolve(__dirname, '../src/index.tsx'),
  },
  
  plugins: [
    ...devBaseConfig.plugins,
    envInjector('development'),
    new WebpackBar({
      name
    })
  ],
  
  output: {
    library,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, '../lib')
  },
}]
