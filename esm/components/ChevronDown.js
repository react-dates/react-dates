import React from 'react';

var ChevronDown = function () {
  function ChevronDown(props) {
    return React.createElement(
      'svg',
      props,
      React.createElement('path', {
        d: 'M967.5 288.5L514.3 740.7c-11 11-21 11-32 0L29.1 288.5c-4-5-6-11-6-16 0-13 10-23 23-23 6 0 11 2 15 7l437.2 436.2 437.2-436.2c4-5 9-7 16-7 6 0 11 2 16 7 9 10.9 9 21 0 32z'
      })
    );
  }

  return ChevronDown;
}();

ChevronDown.defaultProps = {
  viewBox: '0 0 1000 1000'
};


export default ChevronDown;