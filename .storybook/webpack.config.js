const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test:   /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
        include: path.resolve(__dirname, '../css/')
      },
      {
        test: /\.svg$/,
        loader: 'babel!react-svg'
      },
      { test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader', 'resolve-url-loader' ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          useRelativePath: true
         }
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
