import React from 'react';

var LeftArrow = function () {
  function LeftArrow(props) {
    return React.createElement(
      'svg',
      props,
      React.createElement('path', {
        d: 'M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z'
      })
    );
  }

  return LeftArrow;
}();

LeftArrow.defaultProps = {
  viewBox: '0 0 1000 1000'
};


export default LeftArrow;