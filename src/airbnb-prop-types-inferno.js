import assign from 'object.assign';
import has from 'has';
const zeroWidthSpace = '\u200b';
const semaphore = {};

export function typeOf(child) {
  if (child === null) {
    return 'null';
  }
  if (Array.isArray(child)) {
    return 'array';
  }
  if (typeof child !== 'object') {
    return typeof child;
  }
  if (child.flags) {
    return (child.flags & 3970) ? 'Element' : 'null';
  }
  return child;
}

export function wrapValidator(validator, typeName, typeChecker = null) {
  return assign(validator.bind(), {
    typeName,
    typeChecker,
    isRequired: assign(validator.isRequired.bind(), {
      typeName,
      typeChecker,
      typeRequired: true,
    }),
  });
}

export default function childrenHavePropXorChildren(prop) {
  if (typeof prop !== 'string' && typeof prop !== 'symbol') {
    throw new TypeError('invalid prop: must be string or symbol');
  }

  const validator = function childrenHavePropXorChildrenWithProp({ children }, _, componentName) {

  	return null;
    // const childrenCount = React.Children.count(children);
    // let propCount = 0;
    // let grandchildrenCount = 0;

    // React.Children.forEach(children, (child) => {
    //   if (child.props[prop]) {
    //     propCount += 1;
    //   }
    //   if (React.Children.count(child.props.children)) {
    //     grandchildrenCount += 1;
    //   }
    // });

    // if (
    //   (propCount === childrenCount && grandchildrenCount === 0) ||
    //   (propCount === 0 && grandchildrenCount === childrenCount) ||
    //   (propCount === 0 && grandchildrenCount === 0)
    // ) {
    //   return null;
    // }

    return new TypeError(`\`${componentName}\` requires children to all have prop “${prop}”, all have children, or all have neither.`);
  };
  validator.isRequired = validator;

  return wrapValidator(validator, `childrenHavePropXorChildrenWithProp:${prop}`, prop);
}

export function forbidExtraProps(propTypes) {
  if (!isPlainObject(propTypes)) {
    throw new TypeError('given propTypes must be an object');
  }
  if (has(propTypes, zeroWidthSpace) && !isBranded(propTypes[zeroWidthSpace])) {
    throw new TypeError('Against all odds, you created a propType for a prop named after the zero-width space - which, sadly, conflicts with `forbidExtraProps`');
  }

  return assign({}, propTypes, {
    // eslint-disable-next-line prefer-arrow-callback
    [zeroWidthSpace]: brand(function forbidUnknownProps(props, _, componentName) {
      const unknownProps = Object.keys(props).filter(prop => !has(propTypes, prop));
      if (unknownProps.length > 0) {
        return new TypeError(`${componentName}: unknown props found: ${unknownProps.join(', ')}`);
      }
      return null;
    }),
  });
}

function brand(fn) {
  return assign(fn, { [zeroWidthSpace]: semaphore });
}

function isBranded(value) {
  return value && value[zeroWidthSpace] === semaphore;
}

function isPlainObject(x) {
  return x && typeof x === 'object' && !Array.isArray(x);
}