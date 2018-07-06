Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RightArrow = function () {
  function RightArrow(props) {
    return _react2['default'].createElement(
      'svg',
      props,
      _react2['default'].createElement('path', {
        d: 'M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z'
      })
    );
  }

  return RightArrow;
}();

RightArrow.defaultProps = {
  viewBox: '0 0 1000 1000'
};
exports['default'] = RightArrow;