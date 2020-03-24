const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.s?css$/,
      use: ['style-loader', 'raw-loader', 'sass-loader'],
      include: [path.resolve(__dirname, '../css/')],
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
      test: /\.jsx$/,
      use: [
        {
          loader: 'babel-loader',
          query: {
            presets: ['airbnb'],
          },
        },
      ],
    },
  );
  config.resolve.extensions = ['.js', '.jsx'];
  return config;
};
