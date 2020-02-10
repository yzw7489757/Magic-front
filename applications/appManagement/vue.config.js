// eslint-disable all
const path = require('path');
const webpack = require('webpack');
const { name } = require('./package');

const isPROD = process.env.NODE_ENV === 'production';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const productionGzipExtensions = ['js', 'css'];

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 7101; // dev port

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // publicPath: isPROD ? `/${name}/` : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  // productionSourceMap: false,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  devServer: {
    // host: '0.0.0.0',
    open: false,
    hot: true,
    disableHostCheck: true,
    port,
    progress: true,
    noInfo: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // proxy: 'http://127.0.0.1/'
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    // pathRewrite: {
    //   '/dev': ''
    // }
    //   },
    // }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    plugins: [
      isPROD &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
        }),
      isPROD && new OptimizeCSSAssetsPlugin(),
      isPROD &&
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240,
          minRatio: 0.8,
        }),
    ].filter(Boolean),
  },
};
