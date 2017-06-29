const path = require('path');
const fs = require('fs');

const srcFolder = path.join(__dirname, 'src', 'components');
const components = fs.readdirSync(srcFolder);

const files = [];
const entries = {};
components.forEach(component => {
  const name = component.split('.')[0];
  const file = `./src/components/${name}`;
  files.push(file);
  entries[name] = file;
});

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'lib/components/'),
    libraryTarget: 'commonjs2',
  },
  externals(context, request, callback) {
    // Do not treat icon files as external
    if (files.indexOf(request) > -1) {
      return callback(null, false);
    }
    // Do not treat SVG files as external
    if (/svg$/.test(request)) {
      return callback(null, false);
    }
    // Treat all other files as external
    return callback(null, true);
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['airbnb']
        }
      },
      {
        test: /\.jsx/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['airbnb']
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['airbnb']
            }
          },
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true
            }
          }
        ],
        include: path.join(__dirname, 'src'),
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
