import React from 'react';

var CloseButton = function () {
  function CloseButton(props) {
    return React.createElement(
      'svg',
      props,
      React.createElement('path', {
        fillRule: 'evenodd',
        d: 'M11.53.47a.75.75 0 0 0-1.061 0l-4.47 4.47L1.529.47A.75.75 0 1 0 .468 1.531l4.47 4.47-4.47 4.47a.75.75 0 1 0 1.061 1.061l4.47-4.47 4.47 4.47a.75.75 0 1 0 1.061-1.061l-4.47-4.47 4.47-4.47a.75.75 0 0 0 0-1.061z'
      })
    );
  }

  return CloseButton;
}();

CloseButton.defaultProps = {
  viewBox: '0 0 12 12'
};


export default CloseButton;