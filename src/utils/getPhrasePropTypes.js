import { PropTypes } from 'react';

export default function getPhrasePropTypes(defaultPhrases) {
  return Object.keys(defaultPhrases)
    .reduce((phrases, key) => ({
      ...phrases,
      [key]: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
    }), {});
}
