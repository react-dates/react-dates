Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _FocusedInputShape = require('../shapes/FocusedInputShape');

var _FocusedInputShape2 = _interopRequireDefault(_FocusedInputShape);

var _OrientationShape = require('../shapes/OrientationShape');

var _OrientationShape2 = _interopRequireDefault(_OrientationShape);

var _AnchorDirectionShape = require('../shapes/AnchorDirectionShape');

var _AnchorDirectionShape2 = _interopRequireDefault(_AnchorDirectionShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  startDate: _reactMomentProptypes2['default'].momentObj,
  endDate: _reactMomentProptypes2['default'].momentObj,
  focusedInput: _FocusedInputShape2['default'],
  minimumNights: _react.PropTypes.number,
  isDayBlocked: _react.PropTypes.func,
  isOutsideRange: _react.PropTypes.func,
  enableOutsideDays: _react.PropTypes.bool,
  reopenPickerOnClearDates: _react.PropTypes.bool,
  numberOfMonths: _react.PropTypes.number,
  showClearDates: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,

  orientation: _OrientationShape2['default'],
  anchorDirection: _AnchorDirectionShape2['default'],
  // portal options
  withPortal: _react.PropTypes.bool,
  withFullScreenPortal: _react.PropTypes.bool,

  startDateId: _react.PropTypes.string,
  startDatePlaceholderText: _react.PropTypes.string,
  endDateId: _react.PropTypes.string,
  endDatePlaceholderText: _react.PropTypes.string,

  initialVisibleMonth: _react.PropTypes.func,
  onDatesChange: _react.PropTypes.func,
  onFocusChange: _react.PropTypes.func,
  onPrevMonthClick: _react.PropTypes.func,
  onNextMonthClick: _react.PropTypes.func,

  // i18n
  displayFormat: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  monthFormat: _react.PropTypes.string,
  phrases: _react.PropTypes.shape({
    closeDatePicker: _react.PropTypes.node,
    clearDates: _react.PropTypes.node
  })
};