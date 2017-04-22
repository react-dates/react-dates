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
    // require("jquery") is external and available
    //  on the global var jQuery
    jquery: 'jQuery',
    moment: 'moment'
  },  
  output: {
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
            __SERVER__: false,
            __CLIENT__: true,
            __DEBUG__: false,
            __DEV__: false,
            __PRODUCTION__: true,
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),   
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        screw_ie8: true, // Inferno doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    // new ExtractTextPlugin('css/[name].css'),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    // new ManifestPlugin({
    //   fileName: 'asset-manifest.json'
    // })
  ]
};
