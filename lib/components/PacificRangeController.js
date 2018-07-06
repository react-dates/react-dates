Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _object = require('object.values');

var _object2 = _interopRequireDefault(_object);

var _isTouchDevice = require('is-touch-device');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _isNextDay = require('../utils/isNextDay');

var _isNextDay2 = _interopRequireDefault(_isNextDay);

var _isSameDay = require('../utils/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _isAfterDay = require('../utils/isAfterDay');

var _isAfterDay2 = _interopRequireDefault(_isAfterDay);

var _isBeforeDay = require('../utils/isBeforeDay');

var _isBeforeDay2 = _interopRequireDefault(_isBeforeDay);

var _getVisibleDays = require('../utils/getVisibleDays');

var _getVisibleDays2 = _interopRequireDefault(_getVisibleDays);

var _isDayVisible = require('../utils/isDayVisible');

var _isDayVisible2 = _interopRequireDefault(_isDayVisible);

var _getSelectedDateOffset = require('../utils/getSelectedDateOffset');

var _getSelectedDateOffset2 = _interopRequireDefault(_getSelectedDateOffset);

var _toISODateString = require('../utils/toISODateString');

var _toISODateString2 = _interopRequireDefault(_toISODateString);

var _toISOMonthString = require('../utils/toISOMonthString');

var _toISOMonthString2 = _interopRequireDefault(_toISOMonthString);

var _DisabledShape = require('../shapes/DisabledShape');

var _DisabledShape2 = _interopRequireDefault(_DisabledShape);

var _FocusedInputShape = require('../shapes/FocusedInputShape');

var _FocusedInputShape2 = _interopRequireDefault(_FocusedInputShape);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _DayOfWeekShape = require('../shapes/DayOfWeekShape');

var _DayOfWeekShape2 = _interopRequireDefault(_DayOfWeekShape);

var _CalendarInfoPositionShape = require('../shapes/CalendarInfoPositionShape');

var _CalendarInfoPositionShape2 = _interopRequireDefault(_CalendarInfoPositionShape);

var _DayPickerRangeController = require('./DayPickerRangeController');

var _DayPickerRangeController2 = _interopRequireDefault(_DayPickerRangeController);

var _constants = require('../constants');

var _DayPicker = require('./DayPicker');

var _DayPicker2 = _interopRequireDefault(_DayPicker);

var _icon = require('./../pacificComponents/icon.js');

var _icon2 = _interopRequireDefault(_icon);

var _back = require('./../pacificComponents/back.js');

var _back2 = _interopRequireDefault(_back);

require('./../fonts/fonts.css');

require('./../styles/reset.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)({
  startDate: _reactMomentProptypes2['default'].momentObj,
  endDate: _reactMomentProptypes2['default'].momentObj,
  onDatesChange: _propTypes2['default'].func,
  startDateOffset: _propTypes2['default'].func,
  endDateOffset: _propTypes2['default'].func,

  focusedInput: _FocusedInputShape2['default'],
  onFocusChange: _propTypes2['default'].func,
  onClose: _propTypes2['default'].func,

  keepOpenOnDateSelect: _propTypes2['default'].bool,
  minimumNights: _propTypes2['default'].number,
  disabled: _DisabledShape2['default'],
  isOutsideRange: _propTypes2['default'].func,
  isDayBlocked: _propTypes2['default'].func,
  isDayHighlighted: _propTypes2['default'].func,

  // DayPicker props
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes2['default'].func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes2['default'].func, 'renderMonthText', 'renderMonthElement'),
  enableOutsideDays: _propTypes2['default'].bool,
  numberOfMonths: _propTypes2['default'].number,
  orientation: _ScrollableOrientationShape2['default'],
  withPortal: _propTypes2['default'].bool,
  initialVisibleMonth: _propTypes2['default'].func,
  hideKeyboardShortcutsPanel: _propTypes2['default'].bool,
  daySize: _airbnbPropTypes.nonNegativeInteger,
  noBorder: _propTypes2['default'].bool,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,

  navPrev: _propTypes2['default'].node,
  navNext: _propTypes2['default'].node,
  noNavButtons: _propTypes2['default'].bool,

  onPrevMonthClick: _propTypes2['default'].func,
  onNextMonthClick: _propTypes2['default'].func,
  onOutsideClick: _propTypes2['default'].func,
  renderCalendarDay: _propTypes2['default'].func,
  renderDayContents: _propTypes2['default'].func,
  renderCalendarInfo: _propTypes2['default'].func,
  calendarInfoPosition: _CalendarInfoPositionShape2['default'],
  firstDayOfWeek: _DayOfWeekShape2['default'],
  verticalHeight: _airbnbPropTypes.nonNegativeInteger,
  transitionDuration: _airbnbPropTypes.nonNegativeInteger,

  // accessibility
  onBlur: _propTypes2['default'].func,
  isFocused: _propTypes2['default'].bool,
  showKeyboardShortcuts: _propTypes2['default'].bool,

  // i18n
  monthFormat: _propTypes2['default'].string,
  weekDayFormat: _propTypes2['default'].string,
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.DayPickerPhrases)),
  dayAriaLabelFormat: _propTypes2['default'].string,

  isRTL: _propTypes2['default'].bool
});

var defaultProps = {
  startDate: undefined, // TODO: use null
  endDate: undefined, // TODO: use null
  onDatesChange: function () {
    function onDatesChange() {}

    return onDatesChange;
  }(),

  startDateOffset: undefined,
  endDateOffset: undefined,

  focusedInput: null,
  onFocusChange: function () {
    function onFocusChange() {}

    return onFocusChange;
  }(),
  onClose: function () {
    function onClose() {}

    return onClose;
  }(),


  keepOpenOnDateSelect: false,
  minimumNights: 1,
  disabled: false,
  isOutsideRange: function () {
    function isOutsideRange() {}

    return isOutsideRange;
  }(),
  isDayBlocked: function () {
    function isDayBlocked() {}

    return isDayBlocked;
  }(),
  isDayHighlighted: function () {
    function isDayHighlighted() {}

    return isDayHighlighted;
  }(),


  // DayPicker props
  renderMonthText: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  daySize: _constants.DAY_SIZE,

  navPrev: null,
  navNext: null,
  noNavButtons: false,

  onPrevMonthClick: function () {
    function onPrevMonthClick() {}

    return onPrevMonthClick;
  }(),
  onNextMonthClick: function () {
    function onNextMonthClick() {}

    return onNextMonthClick;
  }(),
  onOutsideClick: function () {
    function onOutsideClick() {}

    return onOutsideClick;
  }(),


  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  renderMonthElement: null,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  firstDayOfWeek: null,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,

  // accessibility
  onBlur: function () {
    function onBlur() {}

    return onBlur;
  }(),

  isFocused: false,
  showKeyboardShortcuts: false,

  // i18n
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: _defaultPhrases.DayPickerPhrases,
  dayAriaLabelFormat: undefined,

  isRTL: false
};

_moment2['default'].updateLocale('en', {
  week: {
    dow: 0
  },
  weekdaysMin: 'M_T_W_T_F_S_S'.split('_')
});

var _require = require('./../styles/vars'),
    colors = _require.colors;

var icon = _react2['default'].createElement(_icon2['default'], {
  icon: function () {
    function icon(color) {
      return _react2['default'].createElement(_back2['default'], { fill: color });
    }

    return icon;
  }(),
  color: colors.colorN5,
  hoverColor: colors.colorBlack
});

var navPrevStyle = {
  position: 'absolute',
  top: '0',
  left: '12px'
};

var navPrev = _react2['default'].createElement(
  'div',
  { style: navPrevStyle },
  icon
);

var navNextStyle = {
  position: 'absolute',
  top: '0',
  right: '12px',
  transform: 'rotate(180deg)'
};

var navNext = _react2['default'].createElement(
  'div',
  { style: navNextStyle },
  icon
);

var renderMonthText = function renderMonthText(m) {
  return m.format('MMMM, YYYY');
};

var PacificRangeController = function PacificRangeController(props) {
  return _react2['default'].createElement(_DayPickerRangeController2['default'], _extends({}, props, {
    numberOfMonths: 1,
    renderMonthText: renderMonthText,
    verticalBorderSpacing: 4,
    navPrev: navPrev,
    navNext: navNext,
    daySize: 25
  }));
};

PacificRangeController.propTypes = propTypes;
PacificRangeController.defaultProps = defaultProps;

exports['default'] = PacificRangeController;