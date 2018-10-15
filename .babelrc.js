/* eslint global-require: 0, import/no-extraneous-dependencies: 0 */

module.exports = (api) => {
  api.assertVersion(7);

  if (!api.env(['test', 'development', 'production', 'cjs', 'esm'])) {
    return {};
  }

  const isTestEnv = api.env('test');

  const removePropTypes = api.env(['production', 'cjs', 'esm']);

  return {
    presets: [
      [require('babel-preset-airbnb'), { removePropTypes }],
    ],
    plugins: [
      [require('babel-plugin-inline-react-svg'), { svgo: false }],
      [
        require('babel-plugin-transform-replace-object-assign'),
        { moduleSpecifier: 'object.assign' },
      ],
      ...(isTestEnv ? [require('babel-plugin-istanbul')] : []),
    ],
  };
};
