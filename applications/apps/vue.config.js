// eslint-disable all
const path = require('path');
const webpack = require('webpack');
const { name } = require('./package');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isPROD = process.env.NODE_ENV === 'production';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const productionGzipExtensions = ['js', 'css'];

const port = 7101; // dev port
const address = isPROD ? process.env.VUE_APP_DOMAIN : `localhost:${port}`

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // devtool: false,
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
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  // 自定义webpack配置
  configureWebpack: (config) => {
    // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    // types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.devtool = false;
    config.resolve.alias['@'] = resolve('src');
    config.output.library= `${name}-[name]`;
    config.output.libraryTarget= 'umd';
    config.output.jsonpFunction= `webpackJsonp_${name}`;
    config.optimization.minimize = true
    // config.optimization.minimizer = [
    //   new UglifyJsPlugin({
    //       sourceMap: true,
    //   })
    // ]
    if(isPROD) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
        }),
        new OptimizeCSSAssetsPlugin(),
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240,
          minRatio: 0.8,
        }),
        new webpack.SourceMapDevToolPlugin({
          filename: '[file].map',
          publicPath: `//${address}/`,
          moduleFilenameTemplate: '[resource-path]',
          // append: `\n//# sourceMappingURL=${protocol}://${address}/[url]`
        })
      )
    }
  }
};
