import React from 'react';

export default function getRenderComponent(Component) {
  return typeof Component === 'string'
    ? Component
    : React.forwardRef((props, ref) => <Component {...props} innerRef={ref} />);
}
