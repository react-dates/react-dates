/* eslint no-param-reassign:0, import/no-extraneous-dependencies:0 */
const path = require('path');
const webpack = require('webpack');

module.exports = (config) => {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'sinon', 'chai'],

    files: ['test/browser-main.js'],

    webpack: {
      mode: 'development',
      externals: {
        sinon: true,
      },
      plugins: [
        // https://github.com/cheeriojs/cheerio/issues/836
        new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, (result) => {
          if (/cheerio/.test(result.context)) {
            result.request = './package.json';
          }
        }),
      ],
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [
              path.join(__dirname, 'src'),
              path.join(__dirname, 'test'),
              require.resolve('airbnb-js-shims'),
            ],
            options: {
              presets: [
                // setting modules to false so it does not transform twice
                ['airbnb', { modules: false }],
                // transform to cjs so sinon can stub properly
                ['@babel/preset-env', { modules: 'cjs' }],
              ],
            },
          },

          // Inject the Airbnb shims into the bundle
          { test: /test\/_helpers/, loader: 'imports-loader?shims=airbnb-js-shims' },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },

    webpackMiddleware: {
      progress: false,
      stats: false,
      debug: false,
      quiet: true,
    },

    preprocessors: {
      'test/**/*': ['webpack'],
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Firefox'],

    singleRun: true,

    concurrency: Infinity,
  });
};
