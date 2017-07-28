import PropTypes from 'prop-types';

export default function getPhrasePropTypes(defaultPhrases) {
  return Object.keys(defaultPhrases)
    .reduce((phrases, key) => ({ ...phrases, [key]: PropTypes.node }), {});
}
