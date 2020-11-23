const webpack = require('webpack');
const { resolve } = require('path');

const { name, version } = require('../package.json')
const { library } = require('./library');
// const Dotenv = require('dotenv-webpack');
const getClientEnvironment = require('./envs/index')
// style files regexes
const nonCssModuleRegex = /\.(less|css)$/;
const cssModuleRegex = /\.module\.(less|css)$/;

// const modeConfig = env => resolve(__dirname, `./envs/.${env}.env`)

const getStyleLoader = enableCssModule => {
  const moduleOption = enableCssModule ? {
    modules: true,
    localIdentName: '[local]___[hash:base64:5]',
  } : {}

  return ([
    {
      loader: 'style-loader',
      options: { injectType: 'singletonStyleTag' }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        ...moduleOption,
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
        javascriptEnabled: true,
        ...moduleOption,
      },
    },
  ]
  )
}

const base = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    library,
    libraryTarget: 'umd',
    filename: '[name].js',
    path: resolve(__dirname, '../lib')
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                // ["import", {
                //   "libraryName": "antd",
                //   "libraryDirectory": "es",
                //   "style": true,
                // }],
                ["@babel/proposal-decorators", { "legacy": true }],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-async-generator-functions',
                "@babel/plugin-proposal-optional-chaining",
                ['@babel/plugin-transform-runtime', {
                  'regenerator': true,
                  'helpers': false
                }],
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              quiet: true,
              failOnError: false,
              fix: true
            }
          }
        ]
      },
      {
        oneOf: [
          {
            test: nonCssModuleRegex,
            exclude: cssModuleRegex,
            use: getStyleLoader(false)
          },
          {
            test: cssModuleRegex,
            use: getStyleLoader(true)
          }
        ]
      }
    ],
  },

  plugins: [
    new webpack.BannerPlugin({banner: `${name}@${version}`}),
  ],
}

module.exports = {
  baseConfig: base,
  envInjector: (mode) => {
    const env = getClientEnvironment('/', mode)
    return new webpack.DefinePlugin(env.stringified)
    // new Dotenv({
    //   path: modeConfig(env), // load this now instead of the ones in '.env'
    //   safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    //   allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
    //   systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    //   silent: true, // hide any errors
    //   defaults: false // load '.env.defaults' as the default values if empty.
    // })
  }
};
