import _objectAssign from 'object.assign';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';

export default function getPhrasePropTypes(defaultPhrases) {
  return Object.keys(defaultPhrases).reduce(function (phrases, key) {
    return _objectAssign({}, phrases, _defineProperty({}, key, PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node])));
  }, {});
}