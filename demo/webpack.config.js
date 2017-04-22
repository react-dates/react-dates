var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: './app.js',
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    moment: 'moment'
  },  
  output: {
    publicPath: 'build',
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:   /\.scss$/,
        loaders: ['style', 'raw', 'sass'],
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
