/* eslint-disable consistent-return */
import { isValidElementType } from 'react-is';

const createComponentPropType = isRequired => (
  props,
  propName,
  componentName,
  location,
  propFullName,
) => {
  const prop = `${location} \`${propFullName}\``;
  const comp = `\`${componentName}\``;
  const value = props[propName];

  if (isRequired && value == null) {
    throw new Error(
      `The ${prop} is marked as required in ${comp}, but its value is \`${
        value === null ? 'null' : 'undefined'
      }\``,
    );
  } else if (value && !isValidElementType(value)) {
    return new Error(
      `Invalid prop ${prop} supplied to ${comp}: the prop is not a valid React component`,
    );
  }
};

const componentPropType = createComponentPropType(false);
componentPropType.isRequired = createComponentPropType(true);

export default componentPropType;
