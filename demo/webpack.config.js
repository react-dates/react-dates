var webpack = require('webpack');
var path = require('path');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './app.js',
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    moment: 'moment'
  },  
  target: 'web',
  output: {
    publicPath: 'build',
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         enforce: 'pre',
         loader: 'eslint-loader'
      },    
      {
        test:   /\.scss$/,
        loaders: ['style-loader', 'raw-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../css/')
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: [
          ['inferno', { imports: true }],
          'syntax-jsx'
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
            __SERVER__: false,
            __CLIENT__: true,
            __DEBUG__: true,
            __DEV__: true,
            __PRODUCTION__: false,
            'NODE_ENV': JSON.stringify(
                process.env.NODE_ENV || 'development'
            ),            
            'process.env': {
              NODE_ENV: JSON.stringify('development')
            }
    }),    
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin()
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
