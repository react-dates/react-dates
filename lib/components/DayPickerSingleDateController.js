"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _moment = _interopRequireDefault(require("moment"));

var _object = _interopRequireDefault(require("object.values"));

var _isTouchDevice = _interopRequireDefault(require("is-touch-device"));

var _defaultPhrases = require("../defaultPhrases");

var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));

var _isSameDay = _interopRequireDefault(require("../utils/isSameDay"));

var _isAfterDay = _interopRequireDefault(require("../utils/isAfterDay"));

var _isDayVisible = _interopRequireDefault(require("../utils/isDayVisible"));

var _getVisibleDays = _interopRequireDefault(require("../utils/getVisibleDays"));

var _toISODateString = _interopRequireDefault(require("../utils/toISODateString"));

var _modifiers = require("../utils/modifiers");

var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));

var _DayOfWeekShape = _interopRequireDefault(require("../shapes/DayOfWeekShape"));

var _CalendarInfoPositionShape = _interopRequireDefault(require("../shapes/CalendarInfoPositionShape"));

var _NavPositionShape = _interopRequireDefault(require("../shapes/NavPositionShape"));

var _constants = require("../constants");

var _DayPicker = _interopRequireDefault(require("./DayPicker"));

var _getPooledMoment = _interopRequireDefault(require("../utils/getPooledMoment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Default value of the date property. Represents the state
// when there is no date selected.
// TODO: use null
var DATE_UNSET_VALUE = undefined;
var propTypes = process.env.NODE_ENV !== "production" ? (0, _airbnbPropTypes.forbidExtraProps)({
  date: _reactMomentProptypes["default"].momentObj,
  minDate: _reactMomentProptypes["default"].momentObj,
  maxDate: _reactMomentProptypes["default"].momentObj,
  onDateChange: _propTypes["default"].func,
  allowUnselect: _propTypes["default"].bool,
  focused: _propTypes["default"].bool,
  onFocusChange: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  keepOpenOnDateSelect: _propTypes["default"].bool,
  isOutsideRange: _propTypes["default"].func,
  isDayBlocked: _propTypes["default"].func,
  isDayHighlighted: _propTypes["default"].func,
  // DayPicker props
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: _propTypes["default"].func,
  enableOutsideDays: _propTypes["default"].bool,
  numberOfMonths: _propTypes["default"].number,
  orientation: _ScrollableOrientationShape["default"],
  withPortal: _propTypes["default"].bool,
  initialVisibleMonth: _propTypes["default"].func,
  firstDayOfWeek: _DayOfWeekShape["default"],
  hideKeyboardShortcutsPanel: _propTypes["default"].bool,
  daySize: _airbnbPropTypes.nonNegativeInteger,
  verticalHeight: _airbnbPropTypes.nonNegativeInteger,
  noBorder: _propTypes["default"].bool,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,
  transitionDuration: _airbnbPropTypes.nonNegativeInteger,
  horizontalMonthPadding: _airbnbPropTypes.nonNegativeInteger,
  dayPickerNavigationInlineStyles: _propTypes["default"].object,
  navPosition: _NavPositionShape["default"],
  navPrev: _propTypes["default"].node,
  navNext: _propTypes["default"].node,
  renderNavPrevButton: _propTypes["default"].func,
  renderNavNextButton: _propTypes["default"].func,
  noNavButtons: _propTypes["default"].bool,
  noNavNextButton: _propTypes["default"].bool,
  noNavPrevButton: _propTypes["default"].bool,
  onPrevMonthClick: _propTypes["default"].func,
  onNextMonthClick: _propTypes["default"].func,
  onOutsideClick: _propTypes["default"].func,
  renderCalendarDay: _propTypes["default"].func,
  renderDayContents: _propTypes["default"].func,
  renderCalendarInfo: _propTypes["default"].func,
  calendarInfoPosition: _CalendarInfoPositionShape["default"],
  // accessibility
  onBlur: _propTypes["default"].func,
  isFocused: _propTypes["default"].bool,
  showKeyboardShortcuts: _propTypes["default"].bool,
  onTab: _propTypes["default"].func,
  onShiftTab: _propTypes["default"].func,
  // i18n
  monthFormat: _propTypes["default"].string,
  weekDayFormat: _propTypes["default"].string,
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DayPickerPhrases)),
  dayAriaLabelFormat: _propTypes["default"].string,
  isRTL: _propTypes["default"].bool
}) : {};
var defaultProps = {
  date: DATE_UNSET_VALUE,
  minDate: null,
  maxDate: null,
  onDateChange: function onDateChange() {},
  allowUnselect: false,
  focused: false,
  onFocusChange: function onFocusChange() {},
  onClose: function onClose() {},
  keepOpenOnDateSelect: false,
  isOutsideRange: function isOutsideRange() {},
  isDayBlocked: function isDayBlocked() {},
  isDayHighlighted: function isDayHighlighted() {},
  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  daySize: _constants.DAY_SIZE,
  verticalHeight: null,
  noBorder: false,
  verticalBorderSpacing: undefined,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,
  dayPickerNavigationInlineStyles: null,
  navPosition: _constants.NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  noNavButtons: false,
  noNavNextButton: false,
  noNavPrevButton: false,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onOutsideClick: function onOutsideClick() {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  renderMonthElement: null,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  // accessibility
  onBlur: function onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,
  onTab: function onTab() {},
  onShiftTab: function onShiftTab() {},
  // i18n
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: _defaultPhrases.DayPickerPhrases,
  dayAriaLabelFormat: undefined,
  isRTL: false
};

var DayPickerSingleDateController = /*#__PURE__*/function (_ref2, _ref) {
  (0, _inheritsLoose2["default"])(DayPickerSingleDateController, _ref2);
  var _proto = DayPickerSingleDateController.prototype;

  _proto[_ref] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };

  function DayPickerSingleDateController(props) {
    var _this;

    _this = _ref2.call(this, props) || this;
    _this.isTouchDevice = false;
    _this.today = (0, _moment["default"])();
    _this.modifiers = {
      today: function today(day) {
        return _this.isToday(day);
      },
      blocked: function blocked(day) {
        return _this.isBlocked(day);
      },
      'blocked-calendar': function blockedCalendar(day) {
        return props.isDayBlocked(day);
      },
      'blocked-out-of-range': function blockedOutOfRange(day) {
        return props.isOutsideRange(day);
      },
      'highlighted-calendar': function highlightedCalendar(day) {
        return props.isDayHighlighted(day);
      },
      valid: function valid(day) {
        return !_this.isBlocked(day);
      },
      hovered: function hovered(day) {
        return _this.isHovered(day);
      },
      selected: function selected(day) {
        return _this.isSelected(day);
      },
      'first-day-of-week': function firstDayOfWeek(day) {
        return _this.isFirstDayOfWeek(day);
      },
      'last-day-of-week': function lastDayOfWeek(day) {
        return _this.isLastDayOfWeek(day);
      }
    };

    var _this$getStateForNewM = _this.getStateForNewMonth(props),
        currentMonth = _this$getStateForNewM.currentMonth,
        visibleDays = _this$getStateForNewM.visibleDays;

    _this.state = {
      hoverDate: null,
      currentMonth: currentMonth,
      visibleDays: visibleDays,
      disablePrev: _this.shouldDisableMonthNavigation(props.minDate, currentMonth),
      disableNext: _this.shouldDisableMonthNavigation(props.maxDate, currentMonth)
    };
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDayClick = _this.onDayClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onNextMonthClick = _this.onNextMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onMonthChange = _this.onMonthChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onYearChange = _this.onYearChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onGetNextScrollableMonths = _this.onGetNextScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onGetPrevScrollableMonths = _this.onGetPrevScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  _proto.componentDidMount = function componentDidMount() {
    this.isTouchDevice = (0, _isTouchDevice["default"])();
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var date = nextProps.date,
        focused = nextProps.focused,
        isOutsideRange = nextProps.isOutsideRange,
        isDayBlocked = nextProps.isDayBlocked,
        isDayHighlighted = nextProps.isDayHighlighted,
        initialVisibleMonth = nextProps.initialVisibleMonth,
        numberOfMonths = nextProps.numberOfMonths,
        enableOutsideDays = nextProps.enableOutsideDays;
    var _this$props = this.props,
        prevIsOutsideRange = _this$props.isOutsideRange,
        prevIsDayBlocked = _this$props.isDayBlocked,
        prevIsDayHighlighted = _this$props.isDayHighlighted,
        prevNumberOfMonths = _this$props.numberOfMonths,
        prevEnableOutsideDays = _this$props.enableOutsideDays,
        prevInitialVisibleMonth = _this$props.initialVisibleMonth,
        prevFocused = _this$props.focused,
        prevDate = _this$props.date;
    var visibleDays = this.state.visibleDays;
    var recomputeOutsideRange = false;
    var recomputeDayBlocked = false;
    var recomputeDayHighlighted = false;

    if (isOutsideRange !== prevIsOutsideRange) {
      this.modifiers['blocked-out-of-range'] = function (day) {
        return isOutsideRange(day);
      };

      recomputeOutsideRange = true;
    }

    if (isDayBlocked !== prevIsDayBlocked) {
      this.modifiers['blocked-calendar'] = function (day) {
        return isDayBlocked(day);
      };

      recomputeDayBlocked = true;
    }

    if (isDayHighlighted !== prevIsDayHighlighted) {
      this.modifiers['highlighted-calendar'] = function (day) {
        return isDayHighlighted(day);
      };

      recomputeDayHighlighted = true;
    }

    var recomputePropModifiers = recomputeOutsideRange || recomputeDayBlocked || recomputeDayHighlighted;
    var prevCurrentMonth = this.state.currentMonth;

    if (numberOfMonths !== prevNumberOfMonths || enableOutsideDays !== prevEnableOutsideDays || initialVisibleMonth !== prevInitialVisibleMonth && !prevFocused && focused || prevDate && prevDate.diff(date) && !(0, _isDayVisible["default"])(date, prevCurrentMonth, numberOfMonths)) {
      var newMonthState = this.getStateForNewMonth(nextProps);
      var currentMonth = newMonthState.currentMonth;
      visibleDays = newMonthState.visibleDays;
      this.setState({
        currentMonth: currentMonth,
        visibleDays: visibleDays
      });
    }

    var didDateChange = date !== prevDate;
    var didFocusChange = focused !== prevFocused;
    var modifiers = {};

    if (didDateChange) {
      modifiers = this.deleteModifier(modifiers, prevDate, 'selected');
      modifiers = this.addModifier(modifiers, date, 'selected');
    }

    if (didFocusChange || recomputePropModifiers) {
      (0, _object["default"])(visibleDays).forEach(function (days) {
        Object.keys(days).forEach(function (day) {
          var momentObj = (0, _getPooledMoment["default"])(day);

          if (_this2.isBlocked(momentObj)) {
            modifiers = _this2.addModifier(modifiers, momentObj, 'blocked');
          } else {
            modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked');
          }

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'blocked-out-of-range');
            } else {
              modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'blocked-calendar');
            } else {
              modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked-calendar');
            }
          }

          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(momentObj)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'highlighted-calendar');
            } else {
              modifiers = _this2.deleteModifier(modifiers, momentObj, 'highlighted-calendar');
            }
          }
        });
      });
    }

    var today = (0, _moment["default"])();

    if (!(0, _isSameDay["default"])(this.today, today)) {
      modifiers = this.deleteModifier(modifiers, this.today, 'today');
      modifiers = this.addModifier(modifiers, today, 'today');
      this.today = today;
    }

    if (Object.keys(modifiers).length > 0) {
      this.setState({
        visibleDays: _objectSpread(_objectSpread({}, visibleDays), modifiers)
      });
    }
  };

  _proto.componentWillUpdate = function componentWillUpdate() {
    this.today = (0, _moment["default"])();
  };

  _proto.onDayClick = function onDayClick(day, e) {
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;
    var _this$props2 = this.props,
        allowUnselect = _this$props2.allowUnselect,
        onDateChange = _this$props2.onDateChange,
        keepOpenOnDateSelect = _this$props2.keepOpenOnDateSelect,
        onFocusChange = _this$props2.onFocusChange,
        onClose = _this$props2.onClose;
    var clickedDay = allowUnselect && this.isSelected(day) ? DATE_UNSET_VALUE : day;
    onDateChange(clickedDay);

    if (!keepOpenOnDateSelect) {
      onFocusChange({
        focused: false
      });
      onClose({
        date: clickedDay
      });
    }
  };

  _proto.onDayMouseEnter = function onDayMouseEnter(day) {
    if (this.isTouchDevice) return;
    var _this$state = this.state,
        hoverDate = _this$state.hoverDate,
        visibleDays = _this$state.visibleDays;
    var modifiers = this.deleteModifier({}, hoverDate, 'hovered');
    modifiers = this.addModifier(modifiers, day, 'hovered');
    this.setState({
      hoverDate: day,
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), modifiers)
    });
  };

  _proto.onDayMouseLeave = function onDayMouseLeave() {
    var _this$state2 = this.state,
        hoverDate = _this$state2.hoverDate,
        visibleDays = _this$state2.visibleDays;
    if (this.isTouchDevice || !hoverDate) return;
    var modifiers = this.deleteModifier({}, hoverDate, 'hovered');
    this.setState({
      hoverDate: null,
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), modifiers)
    });
  };

  _proto.onPrevMonthClick = function onPrevMonthClick() {
    var _this$props3 = this.props,
        enableOutsideDays = _this$props3.enableOutsideDays,
        maxDate = _this$props3.maxDate,
        minDate = _this$props3.minDate,
        numberOfMonths = _this$props3.numberOfMonths,
        onPrevMonthClick = _this$props3.onPrevMonthClick;
    var _this$state3 = this.state,
        currentMonth = _this$state3.currentMonth,
        visibleDays = _this$state3.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var prevMonth = currentMonth.clone().subtract(1, 'month');
    var prevMonthVisibleDays = (0, _getVisibleDays["default"])(prevMonth, 1, enableOutsideDays);
    var newCurrentMonth = currentMonth.clone().subtract(1, 'month');
    this.setState({
      currentMonth: prevMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread(_objectSpread({}, newVisibleDays), this.getModifiers(prevMonthVisibleDays))
    }, function () {
      onPrevMonthClick(prevMonth.clone());
    });
  };

  _proto.onNextMonthClick = function onNextMonthClick() {
    var _this$props4 = this.props,
        enableOutsideDays = _this$props4.enableOutsideDays,
        maxDate = _this$props4.maxDate,
        minDate = _this$props4.minDate,
        numberOfMonths = _this$props4.numberOfMonths,
        onNextMonthClick = _this$props4.onNextMonthClick;
    var _this$state4 = this.state,
        currentMonth = _this$state4.currentMonth,
        visibleDays = _this$state4.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var nextMonth = currentMonth.clone().add(numberOfMonths, 'month');
    var nextMonthVisibleDays = (0, _getVisibleDays["default"])(nextMonth, 1, enableOutsideDays);
    var newCurrentMonth = currentMonth.clone().add(1, 'month');
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread(_objectSpread({}, newVisibleDays), this.getModifiers(nextMonthVisibleDays))
    }, function () {
      onNextMonthClick(newCurrentMonth.clone());
    });
  };

  _proto.onMonthChange = function onMonthChange(newMonth) {
    var _this$props5 = this.props,
        numberOfMonths = _this$props5.numberOfMonths,
        enableOutsideDays = _this$props5.enableOutsideDays,
        orientation = _this$props5.orientation;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var newVisibleDays = (0, _getVisibleDays["default"])(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };

  _proto.onYearChange = function onYearChange(newMonth) {
    var _this$props6 = this.props,
        numberOfMonths = _this$props6.numberOfMonths,
        enableOutsideDays = _this$props6.enableOutsideDays,
        orientation = _this$props6.orientation;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var newVisibleDays = (0, _getVisibleDays["default"])(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };

  _proto.onGetNextScrollableMonths = function onGetNextScrollableMonths() {
    var _this$props7 = this.props,
        numberOfMonths = _this$props7.numberOfMonths,
        enableOutsideDays = _this$props7.enableOutsideDays;
    var _this$state5 = this.state,
        currentMonth = _this$state5.currentMonth,
        visibleDays = _this$state5.visibleDays;
    var numberOfVisibleMonths = Object.keys(visibleDays).length;
    var nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
    var newVisibleDays = (0, _getVisibleDays["default"])(nextMonth, numberOfMonths, enableOutsideDays, true);
    this.setState({
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), this.getModifiers(newVisibleDays))
    });
  };

  _proto.onGetPrevScrollableMonths = function onGetPrevScrollableMonths() {
    var _this$props8 = this.props,
        numberOfMonths = _this$props8.numberOfMonths,
        enableOutsideDays = _this$props8.enableOutsideDays;
    var _this$state6 = this.state,
        currentMonth = _this$state6.currentMonth,
        visibleDays = _this$state6.visibleDays;
    var firstPreviousMonth = currentMonth.clone().subtract(numberOfMonths, 'month');
    var newVisibleDays = (0, _getVisibleDays["default"])(firstPreviousMonth, numberOfMonths, enableOutsideDays, true);
    this.setState({
      currentMonth: firstPreviousMonth.clone(),
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), this.getModifiers(newVisibleDays))
    });
  };

  _proto.getFirstDayOfWeek = function getFirstDayOfWeek() {
    var firstDayOfWeek = this.props.firstDayOfWeek;

    if (firstDayOfWeek == null) {
      return _moment["default"].localeData().firstDayOfWeek();
    }

    return firstDayOfWeek;
  };

  _proto.getFirstFocusableDay = function getFirstFocusableDay(newMonth) {
    var _this3 = this;

    var _this$props9 = this.props,
        date = _this$props9.date,
        numberOfMonths = _this$props9.numberOfMonths;
    var focusedDate = newMonth.clone().startOf('month').hour(12);

    if (date) {
      focusedDate = date.clone();
    }

    if (this.isBlocked(focusedDate)) {
      var days = [];
      var lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      var currentDay = focusedDate.clone();

      while (!(0, _isAfterDay["default"])(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      var viableDays = days.filter(function (day) {
        return !_this3.isBlocked(day) && (0, _isAfterDay["default"])(day, focusedDate);
      });

      if (viableDays.length > 0) {
        var _viableDays = (0, _slicedToArray2["default"])(viableDays, 1);

        focusedDate = _viableDays[0];
      }
    }

    return focusedDate;
  };

  _proto.getModifiers = function getModifiers(visibleDays) {
    var _this4 = this;

    var modifiers = {};
    Object.keys(visibleDays).forEach(function (month) {
      modifiers[month] = {};
      visibleDays[month].forEach(function (day) {
        modifiers[month][(0, _toISODateString["default"])(day)] = _this4.getModifiersForDay(day);
      });
    });
    return modifiers;
  };

  _proto.getModifiersForDay = function getModifiersForDay(day) {
    var _this5 = this;

    return new Set(Object.keys(this.modifiers).filter(function (modifier) {
      return _this5.modifiers[modifier](day);
    }));
  };

  _proto.getStateForNewMonth = function getStateForNewMonth(nextProps) {
    var _this6 = this;

    var initialVisibleMonth = nextProps.initialVisibleMonth,
        date = nextProps.date,
        numberOfMonths = nextProps.numberOfMonths,
        orientation = nextProps.orientation,
        enableOutsideDays = nextProps.enableOutsideDays;
    var initialVisibleMonthThunk = initialVisibleMonth || (date ? function () {
      return date;
    } : function () {
      return _this6.today;
    });
    var currentMonth = initialVisibleMonthThunk();
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var visibleDays = this.getModifiers((0, _getVisibleDays["default"])(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths));
    return {
      currentMonth: currentMonth,
      visibleDays: visibleDays
    };
  };

  _proto.shouldDisableMonthNavigation = function shouldDisableMonthNavigation(date, visibleMonth) {
    if (!date) return false;
    var _this$props10 = this.props,
        numberOfMonths = _this$props10.numberOfMonths,
        enableOutsideDays = _this$props10.enableOutsideDays;
    return (0, _isDayVisible["default"])(date, visibleMonth, numberOfMonths, enableOutsideDays);
  };

  _proto.addModifier = function addModifier(updatedDays, day, modifier) {
    return (0, _modifiers.addModifier)(updatedDays, day, modifier, this.props, this.state);
  };

  _proto.deleteModifier = function deleteModifier(updatedDays, day, modifier) {
    return (0, _modifiers.deleteModifier)(updatedDays, day, modifier, this.props, this.state);
  };

  _proto.isBlocked = function isBlocked(day) {
    var _this$props11 = this.props,
        isDayBlocked = _this$props11.isDayBlocked,
        isOutsideRange = _this$props11.isOutsideRange;
    return isDayBlocked(day) || isOutsideRange(day);
  };

  _proto.isHovered = function isHovered(day) {
    var _ref3 = this.state || {},
        hoverDate = _ref3.hoverDate;

    return (0, _isSameDay["default"])(day, hoverDate);
  };

  _proto.isSelected = function isSelected(day) {
    var date = this.props.date;
    return (0, _isSameDay["default"])(day, date);
  };

  _proto.isToday = function isToday(day) {
    return (0, _isSameDay["default"])(day, this.today);
  };

  _proto.isFirstDayOfWeek = function isFirstDayOfWeek(day) {
    return day.day() === this.getFirstDayOfWeek();
  };

  _proto.isLastDayOfWeek = function isLastDayOfWeek(day) {
    return day.day() === (this.getFirstDayOfWeek() + 6) % 7;
  };

  _proto.render = function render() {
    var _this$props12 = this.props,
        numberOfMonths = _this$props12.numberOfMonths,
        orientation = _this$props12.orientation,
        monthFormat = _this$props12.monthFormat,
        renderMonthText = _this$props12.renderMonthText,
        renderWeekHeaderElement = _this$props12.renderWeekHeaderElement,
        dayPickerNavigationInlineStyles = _this$props12.dayPickerNavigationInlineStyles,
        navPosition = _this$props12.navPosition,
        navPrev = _this$props12.navPrev,
        navNext = _this$props12.navNext,
        renderNavPrevButton = _this$props12.renderNavPrevButton,
        renderNavNextButton = _this$props12.renderNavNextButton,
        noNavButtons = _this$props12.noNavButtons,
        noNavPrevButton = _this$props12.noNavPrevButton,
        noNavNextButton = _this$props12.noNavNextButton,
        onOutsideClick = _this$props12.onOutsideClick,
        onShiftTab = _this$props12.onShiftTab,
        onTab = _this$props12.onTab,
        withPortal = _this$props12.withPortal,
        focused = _this$props12.focused,
        enableOutsideDays = _this$props12.enableOutsideDays,
        hideKeyboardShortcutsPanel = _this$props12.hideKeyboardShortcutsPanel,
        daySize = _this$props12.daySize,
        firstDayOfWeek = _this$props12.firstDayOfWeek,
        renderCalendarDay = _this$props12.renderCalendarDay,
        renderDayContents = _this$props12.renderDayContents,
        renderCalendarInfo = _this$props12.renderCalendarInfo,
        renderMonthElement = _this$props12.renderMonthElement,
        calendarInfoPosition = _this$props12.calendarInfoPosition,
        isFocused = _this$props12.isFocused,
        isRTL = _this$props12.isRTL,
        phrases = _this$props12.phrases,
        dayAriaLabelFormat = _this$props12.dayAriaLabelFormat,
        onBlur = _this$props12.onBlur,
        showKeyboardShortcuts = _this$props12.showKeyboardShortcuts,
        weekDayFormat = _this$props12.weekDayFormat,
        verticalHeight = _this$props12.verticalHeight,
        noBorder = _this$props12.noBorder,
        transitionDuration = _this$props12.transitionDuration,
        verticalBorderSpacing = _this$props12.verticalBorderSpacing,
        horizontalMonthPadding = _this$props12.horizontalMonthPadding;
    var _this$state7 = this.state,
        currentMonth = _this$state7.currentMonth,
        disableNext = _this$state7.disableNext,
        disablePrev = _this$state7.disablePrev,
        visibleDays = _this$state7.visibleDays;
    return /*#__PURE__*/_react["default"].createElement(_DayPicker["default"], {
      orientation: orientation,
      enableOutsideDays: enableOutsideDays,
      modifiers: visibleDays,
      numberOfMonths: numberOfMonths,
      onDayClick: this.onDayClick,
      onDayMouseEnter: this.onDayMouseEnter,
      onDayMouseLeave: this.onDayMouseLeave,
      onPrevMonthClick: this.onPrevMonthClick,
      onNextMonthClick: this.onNextMonthClick,
      onMonthChange: this.onMonthChange,
      onYearChange: this.onYearChange,
      onGetNextScrollableMonths: this.onGetNextScrollableMonths,
      onGetPrevScrollableMonths: this.onGetPrevScrollableMonths,
      monthFormat: monthFormat,
      withPortal: withPortal,
      hidden: !focused,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      initialVisibleMonth: function initialVisibleMonth() {
        return currentMonth;
      },
      firstDayOfWeek: firstDayOfWeek,
      onOutsideClick: onOutsideClick,
      dayPickerNavigationInlineStyles: dayPickerNavigationInlineStyles,
      navPosition: navPosition,
      disablePrev: disablePrev,
      disableNext: disableNext,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      noNavButtons: noNavButtons,
      noNavNextButton: noNavNextButton,
      noNavPrevButton: noNavPrevButton,
      renderMonthText: renderMonthText,
      renderWeekHeaderElement: renderWeekHeaderElement,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      calendarInfoPosition: calendarInfoPosition,
      isFocused: isFocused,
      getFirstFocusableDay: this.getFirstFocusableDay,
      onBlur: onBlur,
      onTab: onTab,
      onShiftTab: onShiftTab,
      phrases: phrases,
      daySize: daySize,
      isRTL: isRTL,
      showKeyboardShortcuts: showKeyboardShortcuts,
      weekDayFormat: weekDayFormat,
      dayAriaLabelFormat: dayAriaLabelFormat,
      verticalHeight: verticalHeight,
      noBorder: noBorder,
      transitionDuration: transitionDuration,
      verticalBorderSpacing: verticalBorderSpacing,
      horizontalMonthPadding: horizontalMonthPadding
    });
  };

  return DayPickerSingleDateController;
}(_react["default"].PureComponent || _react["default"].Component, !_react["default"].PureComponent && "shouldComponentUpdate");

exports["default"] = DayPickerSingleDateController;
DayPickerSingleDateController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerSingleDateController.defaultProps = defaultProps;