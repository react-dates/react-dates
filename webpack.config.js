var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var SRC_DIR = path.resolve(__dirname, 'src/');

var pkg = require('./package.json');

var config = {
  entry: {
    index: SRC_DIR + '/index.js',
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]/index.js',
    library: [pkg.name, '[name]'],
    libraryTarget: "umd"
  },
  module : {
    rules : [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          path.resolve(__dirname, './css/'),
          path.resolve(__dirname, './src/fonts/fonts.css'),
          path.resolve(__dirname, './src/styles/reset.css'),
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [
          path.resolve(__dirname, '../css/'),
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['airbnb'],
            },
          },
        ],
      },
      {
        test : /\.js?/,
        include : SRC_DIR,
        use : 'babel-loader',
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

 module.exports = config;
