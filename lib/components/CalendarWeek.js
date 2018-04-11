Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = CalendarWeek;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _airbnbPropTypes = require('airbnb-prop-types');

var _CalendarDay = require('./CalendarDay');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

var _CustomizableCalendarDay = require('./CustomizableCalendarDay');

var _CustomizableCalendarDay2 = _interopRequireDefault(_CustomizableCalendarDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)({
  children: (0, _airbnbPropTypes.or)([(0, _airbnbPropTypes.childrenOfType)(_CalendarDay2['default']), (0, _airbnbPropTypes.childrenOfType)(_CustomizableCalendarDay2['default'])]).isRequired
});

function CalendarWeek(_ref) {
  var children = _ref.children;

  return _react2['default'].createElement(
    'tr',
    null,
    children
  );
}

CalendarWeek.propTypes = propTypes;