// Don't load svg strings into tests
require.extensions['.svg'] = (obj) => {
  obj.exports = () => (
    <svg>SVG_TEST_STUB</svg>
  );
};
