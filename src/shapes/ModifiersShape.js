import PropTypes from 'prop-types';
import { and } from 'airbnb-prop-types';

export default and([
  PropTypes.instanceOf(Set),
  function modifiers(props, propName, ...rest) {
    const { [propName]: propValue } = props;
    let firstError;
    [...propValue].some((v, i) => {
      const fakePropName = `${propName}: index ${i}`;
      firstError = PropTypes.string.isRequired(
        { [fakePropName]: v },
        fakePropName,
        ...rest,
      );
      return firstError != null;
    });
    return firstError == null ? null : firstError;
  },
], 'Modifiers (Set of Strings)');
