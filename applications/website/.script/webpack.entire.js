const { resolve } = require('path');
const {library} = require('./library');
const base = require('./webpack.base');
const externals = require('./externals');

module.exports = {
  ...base,

  mode: process.env.BUILD_ENV ? 'production' : 'none',

  entry: {
    index: resolve(__dirname, '../src/index.tsx'),
  },

  output: {
    library,
    libraryTarget: 'umd',
    filename: 'umd.js',
    path: resolve(__dirname, '../lib'),
  },

  devtool: 'source-map',

  externals: {
    ...externals,
    // '@ali/mirror-form': false // 不需要 external 的配置
  }
}
