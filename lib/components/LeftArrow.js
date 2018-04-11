Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LeftArrow = function () {
  function LeftArrow(props) {
    return _react2['default'].createElement(
      'svg',
      props,
      _react2['default'].createElement('path', {
        d: 'M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z'
      })
    );
  }

  return LeftArrow;
}();

LeftArrow.defaultProps = {
  viewBox: '0 0 1000 1000'
};
exports['default'] = LeftArrow;