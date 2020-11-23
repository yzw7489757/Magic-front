const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('path');

const base = require('./webpack.base');
const { library } = require('./library');
const externals = require('./externals');
const { name, version } = require('../package.json')

const umdConfig = {
  ...base,

  mode: process.env.BUILD_ENV ? 'production' : 'none',

  devtool: 'none',
}

module.exports = {
  ...umdConfig,

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          extractComments: false,
          compress: {
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.dir'] // 移除特定 console 函数调用
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },

  externals: {
    ...externals,
  },

  entry: {
    'index': resolve(__dirname, '../src/index.tsx'),
  },

  output: {
    library,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, '../lib'),
  },

  plugins: [
    new webpack.BannerPlugin({banner: `${name}@${version}`}),
    new MiniCssExtractPlugin({}),
    !!process.env.HTTPS && new BundleAnalyzerPlugin()
  ].filter(Boolean),
};
