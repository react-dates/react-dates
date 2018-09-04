import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class BaseClass extends (React.PureComponent || React.Component) {
  [!React.PureComponent && 'shouldComponentUpdate'](nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
}

export const pureComponentAvailable = typeof React.PureComponent !== 'undefined';
export default BaseClass;
