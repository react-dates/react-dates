import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export const pureComponentAvailable = typeof React.PureComponent !== 'undefined';

const baseClass = (pureComponent = pureComponentAvailable) => {
  if (pureComponent) {
    if (!React.PureComponent) {
      throw new ReferenceError('withStyles() pureComponent option requires React 15.3.0 or later');
    }

    return React.PureComponent;
  }

  return class BaseClass extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
  };
};

export default baseClass();
