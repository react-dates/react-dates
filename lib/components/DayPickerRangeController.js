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

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

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

var _isInclusivelyAfterDay = _interopRequireDefault(require("../utils/isInclusivelyAfterDay"));

var _isNextDay = _interopRequireDefault(require("../utils/isNextDay"));

var _isSameDay = _interopRequireDefault(require("../utils/isSameDay"));

var _isAfterDay = _interopRequireDefault(require("../utils/isAfterDay"));

var _isBeforeDay = _interopRequireDefault(require("../utils/isBeforeDay"));

var _getVisibleDays = _interopRequireDefault(require("../utils/getVisibleDays"));

var _isDayVisible = _interopRequireDefault(require("../utils/isDayVisible"));

var _getSelectedDateOffset = _interopRequireDefault(require("../utils/getSelectedDateOffset"));

var _toISODateString = _interopRequireDefault(require("../utils/toISODateString"));

var _modifiers = require("../utils/modifiers");

var _DisabledShape = _interopRequireDefault(require("../shapes/DisabledShape"));

var _FocusedInputShape = _interopRequireDefault(require("../shapes/FocusedInputShape"));

var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));

var _DayOfWeekShape = _interopRequireDefault(require("../shapes/DayOfWeekShape"));

var _CalendarInfoPositionShape = _interopRequireDefault(require("../shapes/CalendarInfoPositionShape"));

var _constants = require("../constants");

var _DayPicker = _interopRequireDefault(require("./DayPicker"));

var _getPooledMoment = _interopRequireDefault(require("../utils/getPooledMoment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var propTypes = process.env.NODE_ENV !== "production" ? (0, _airbnbPropTypes.forbidExtraProps)({
  startDate: _reactMomentProptypes["default"].momentObj,
  endDate: _reactMomentProptypes["default"].momentObj,
  onDatesChange: _propTypes["default"].func,
  startDateOffset: _propTypes["default"].func,
  endDateOffset: _propTypes["default"].func,
  minDate: _reactMomentProptypes["default"].momentObj,
  maxDate: _reactMomentProptypes["default"].momentObj,
  focusedInput: _FocusedInputShape["default"],
  onFocusChange: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  keepOpenOnDateSelect: _propTypes["default"].bool,
  minimumNights: _propTypes["default"].number,
  disabled: _DisabledShape["default"],
  isOutsideRange: _propTypes["default"].func,
  isDayBlocked: _propTypes["default"].func,
  isDayHighlighted: _propTypes["default"].func,
  getMinNightsForHoverDate: _propTypes["default"].func,
  // DayPicker props
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  enableOutsideDays: _propTypes["default"].bool,
  numberOfMonths: _propTypes["default"].number,
  orientation: _ScrollableOrientationShape["default"],
  withPortal: _propTypes["default"].bool,
  initialVisibleMonth: _propTypes["default"].func,
  hideKeyboardShortcutsPanel: _propTypes["default"].bool,
  daySize: _airbnbPropTypes.nonNegativeInteger,
  noBorder: _propTypes["default"].bool,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,
  horizontalMonthPadding: _airbnbPropTypes.nonNegativeInteger,
  navPrev: _propTypes["default"].node,
  navNext: _propTypes["default"].node,
  noNavButtons: _propTypes["default"].bool,
  onPrevMonthClick: _propTypes["default"].func,
  onNextMonthClick: _propTypes["default"].func,
  onOutsideClick: _propTypes["default"].func,
  renderCalendarDay: _propTypes["default"].func,
  renderDayContents: _propTypes["default"].func,
  renderCalendarInfo: _propTypes["default"].func,
  renderKeyboardShortcutsButton: _propTypes["default"].func,
  calendarInfoPosition: _CalendarInfoPositionShape["default"],
  firstDayOfWeek: _DayOfWeekShape["default"],
  verticalHeight: _airbnbPropTypes.nonNegativeInteger,
  transitionDuration: _airbnbPropTypes.nonNegativeInteger,
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
  startDate: undefined,
  // TODO: use null
  endDate: undefined,
  // TODO: use null
  minDate: null,
  maxDate: null,
  onDatesChange: function onDatesChange() {},
  startDateOffset: undefined,
  endDateOffset: undefined,
  focusedInput: null,
  onFocusChange: function onFocusChange() {},
  onClose: function onClose() {},
  keepOpenOnDateSelect: false,
  minimumNights: 1,
  disabled: false,
  isOutsideRange: function isOutsideRange() {},
  isDayBlocked: function isDayBlocked() {},
  isDayHighlighted: function isDayHighlighted() {},
  getMinNightsForHoverDate: function getMinNightsForHoverDate() {},
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
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onOutsideClick: function onOutsideClick() {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  renderMonthElement: null,
  renderKeyboardShortcutsButton: undefined,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  firstDayOfWeek: null,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,
  horizontalMonthPadding: 13,
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

var getChooseAvailableDatePhrase = function getChooseAvailableDatePhrase(phrases, focusedInput) {
  if (focusedInput === _constants.START_DATE) {
    return phrases.chooseAvailableStartDate;
  }

  if (focusedInput === _constants.END_DATE) {
    return phrases.chooseAvailableEndDate;
  }

  return phrases.chooseAvailableDate;
};

var DayPickerRangeController = /*#__PURE__*/function (_ref) {
  (0, _inheritsLoose2["default"])(DayPickerRangeController, _ref);

  var _super = _createSuper(DayPickerRangeController);

  var _proto = DayPickerRangeController.prototype;

  _proto[!_react["default"].PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };

  function DayPickerRangeController(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    _this.isTouchDevice = (0, _isTouchDevice["default"])();
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
      'selected-start': function selectedStart(day) {
        return _this.isStartDate(day);
      },
      'selected-end': function selectedEnd(day) {
        return _this.isEndDate(day);
      },
      'blocked-minimum-nights': function blockedMinimumNights(day) {
        return _this.doesNotMeetMinimumNights(day);
      },
      'selected-span': function selectedSpan(day) {
        return _this.isInSelectedSpan(day);
      },
      'last-in-range': function lastInRange(day) {
        return _this.isLastInRange(day);
      },
      hovered: function hovered(day) {
        return _this.isHovered(day);
      },
      'hovered-span': function hoveredSpan(day) {
        return _this.isInHoveredSpan(day);
      },
      'hovered-offset': function hoveredOffset(day) {
        return _this.isInHoveredSpan(day);
      },
      'after-hovered-start': function afterHoveredStart(day) {
        return _this.isDayAfterHoveredStartDate(day);
      },
      'first-day-of-week': function firstDayOfWeek(day) {
        return _this.isFirstDayOfWeek(day);
      },
      'last-day-of-week': function lastDayOfWeek(day) {
        return _this.isLastDayOfWeek(day);
      },
      'hovered-start-first-possible-end': function hoveredStartFirstPossibleEnd(day, hoverDate) {
        return _this.isFirstPossibleEndDateForHoveredStartDate(day, hoverDate);
      },
      'hovered-start-blocked-minimum-nights': function hoveredStartBlockedMinimumNights(day, hoverDate) {
        return _this.doesNotMeetMinNightsForHoveredStartDate(day, hoverDate);
      }
    };

    var _this$getStateForNewM = _this.getStateForNewMonth(props),
        currentMonth = _this$getStateForNewM.currentMonth,
        visibleDays = _this$getStateForNewM.visibleDays; // initialize phrases
    // set the appropriate CalendarDay phrase based on focusedInput


    var chooseAvailableDate = getChooseAvailableDatePhrase(props.phrases, props.focusedInput);
    _this.state = {
      hoverDate: null,
      currentMonth: currentMonth,
      phrases: _objectSpread({}, props.phrases, {
        chooseAvailableDate: chooseAvailableDate
      }),
      visibleDays: visibleDays,
      disablePrev: _this.shouldDisableMonthNavigation(props.minDate, currentMonth),
      disableNext: _this.shouldDisableMonthNavigation(props.maxDate, currentMonth)
    };
    _this.onDayClick = _this.onDayClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onNextMonthClick = _this.onNextMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onMonthChange = _this.onMonthChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onYearChange = _this.onYearChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onMultiplyScrollableMonths = _this.onMultiplyScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var startDate = nextProps.startDate,
        endDate = nextProps.endDate,
        focusedInput = nextProps.focusedInput,
        getMinNightsForHoverDate = nextProps.getMinNightsForHoverDate,
        minimumNights = nextProps.minimumNights,
        isOutsideRange = nextProps.isOutsideRange,
        isDayBlocked = nextProps.isDayBlocked,
        isDayHighlighted = nextProps.isDayHighlighted,
        phrases = nextProps.phrases,
        initialVisibleMonth = nextProps.initialVisibleMonth,
        numberOfMonths = nextProps.numberOfMonths,
        enableOutsideDays = nextProps.enableOutsideDays;
    var _this$props = this.props,
        prevStartDate = _this$props.startDate,
        prevEndDate = _this$props.endDate,
        prevFocusedInput = _this$props.focusedInput,
        prevMinimumNights = _this$props.minimumNights,
        prevIsOutsideRange = _this$props.isOutsideRange,
        prevIsDayBlocked = _this$props.isDayBlocked,
        prevIsDayHighlighted = _this$props.isDayHighlighted,
        prevPhrases = _this$props.phrases,
        prevInitialVisibleMonth = _this$props.initialVisibleMonth,
        prevNumberOfMonths = _this$props.numberOfMonths,
        prevEnableOutsideDays = _this$props.enableOutsideDays;
    var hoverDate = this.state.hoverDate;
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
    var didStartDateChange = startDate !== prevStartDate;
    var didEndDateChange = endDate !== prevEndDate;
    var didFocusChange = focusedInput !== prevFocusedInput;

    if (numberOfMonths !== prevNumberOfMonths || enableOutsideDays !== prevEnableOutsideDays || initialVisibleMonth !== prevInitialVisibleMonth && !prevFocusedInput && didFocusChange) {
      var newMonthState = this.getStateForNewMonth(nextProps);
      var currentMonth = newMonthState.currentMonth;
      visibleDays = newMonthState.visibleDays;
      this.setState({
        currentMonth: currentMonth,
        visibleDays: visibleDays
      });
    }

    var modifiers = {};

    if (didStartDateChange) {
      modifiers = this.deleteModifier(modifiers, prevStartDate, 'selected-start');
      modifiers = this.addModifier(modifiers, startDate, 'selected-start');

      if (prevStartDate) {
        var startSpan = prevStartDate.clone().add(1, 'day');
        var endSpan = prevStartDate.clone().add(prevMinimumNights + 1, 'days');
        modifiers = this.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');
      }
    }

    if (didEndDateChange) {
      modifiers = this.deleteModifier(modifiers, prevEndDate, 'selected-end');
      modifiers = this.addModifier(modifiers, endDate, 'selected-end');
    }

    if (didStartDateChange || didEndDateChange) {
      if (prevStartDate && prevEndDate) {
        modifiers = this.deleteModifierFromRange(modifiers, prevStartDate, prevEndDate.clone().add(1, 'day'), 'selected-span');
      }

      if (startDate && endDate) {
        modifiers = this.deleteModifierFromRange(modifiers, startDate, endDate.clone().add(1, 'day'), 'hovered-span');
        modifiers = this.addModifierToRange(modifiers, startDate.clone().add(1, 'day'), endDate, 'selected-span');
      }
    }

    if (!this.isTouchDevice && didStartDateChange && startDate && !endDate) {
      var _startSpan = startDate.clone().add(1, 'day');

      var _endSpan = startDate.clone().add(minimumNights + 1, 'days');

      modifiers = this.addModifierToRange(modifiers, _startSpan, _endSpan, 'after-hovered-start');
    }

    if (prevMinimumNights > 0) {
      if (didFocusChange || didStartDateChange || minimumNights !== prevMinimumNights) {
        var _startSpan2 = prevStartDate || this.today;

        modifiers = this.deleteModifierFromRange(modifiers, _startSpan2, _startSpan2.clone().add(prevMinimumNights, 'days'), 'blocked-minimum-nights');
        modifiers = this.deleteModifierFromRange(modifiers, _startSpan2, _startSpan2.clone().add(prevMinimumNights, 'days'), 'blocked');
      }
    }

    if (didFocusChange || recomputePropModifiers) {
      (0, _object["default"])(visibleDays).forEach(function (days) {
        Object.keys(days).forEach(function (day) {
          var momentObj = (0, _getPooledMoment["default"])(day);
          var isBlocked = false;

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'blocked-out-of-range');
              isBlocked = true;
            } else {
              modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              modifiers = _this2.addModifier(modifiers, momentObj, 'blocked-calendar');
              isBlocked = true;
            } else {
              modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked-calendar');
            }
          }

          if (isBlocked) {
            modifiers = _this2.addModifier(modifiers, momentObj, 'blocked');
          } else {
            modifiers = _this2.deleteModifier(modifiers, momentObj, 'blocked');
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

    if (!this.isTouchDevice && didFocusChange && hoverDate && !this.isBlocked(hoverDate)) {
      var minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);

      if (minNightsForHoverDate > 0 && focusedInput === _constants.END_DATE) {
        modifiers = this.deleteModifierFromRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
        modifiers = this.deleteModifier(modifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end');
      }

      if (minNightsForHoverDate > 0 && focusedInput === _constants.START_DATE) {
        modifiers = this.addModifierToRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
        modifiers = this.addModifier(modifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end');
      }
    }

    if (minimumNights > 0 && startDate && focusedInput === _constants.END_DATE) {
      modifiers = this.addModifierToRange(modifiers, startDate, startDate.clone().add(minimumNights, 'days'), 'blocked-minimum-nights');
      modifiers = this.addModifierToRange(modifiers, startDate, startDate.clone().add(minimumNights, 'days'), 'blocked');
    }

    var today = (0, _moment["default"])();

    if (!(0, _isSameDay["default"])(this.today, today)) {
      modifiers = this.deleteModifier(modifiers, this.today, 'today');
      modifiers = this.addModifier(modifiers, today, 'today');
      this.today = today;
    }

    if (Object.keys(modifiers).length > 0) {
      this.setState({
        visibleDays: _objectSpread({}, visibleDays, {}, modifiers)
      });
    }

    if (didFocusChange || phrases !== prevPhrases) {
      // set the appropriate CalendarDay phrase based on focusedInput
      var chooseAvailableDate = getChooseAvailableDatePhrase(phrases, focusedInput);
      this.setState({
        phrases: _objectSpread({}, phrases, {
          chooseAvailableDate: chooseAvailableDate
        })
      });
    }
  };

  _proto.onDayClick = function onDayClick(day, e) {
    var _this$props2 = this.props,
        keepOpenOnDateSelect = _this$props2.keepOpenOnDateSelect,
        minimumNights = _this$props2.minimumNights,
        onBlur = _this$props2.onBlur,
        focusedInput = _this$props2.focusedInput,
        onFocusChange = _this$props2.onFocusChange,
        onClose = _this$props2.onClose,
        onDatesChange = _this$props2.onDatesChange,
        startDateOffset = _this$props2.startDateOffset,
        endDateOffset = _this$props2.endDateOffset,
        disabled = _this$props2.disabled;
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;
    var _this$props3 = this.props,
        startDate = _this$props3.startDate,
        endDate = _this$props3.endDate;

    if (startDateOffset || endDateOffset) {
      startDate = (0, _getSelectedDateOffset["default"])(startDateOffset, day);
      endDate = (0, _getSelectedDateOffset["default"])(endDateOffset, day);

      if (this.isBlocked(startDate) || this.isBlocked(endDate)) {
        return;
      }

      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });

      if (!keepOpenOnDateSelect) {// onFocusChange(null);
        // onClose({ startDate, endDate });
      }
    } else if (focusedInput === _constants.START_DATE) {
      var lastAllowedStartDate = endDate && endDate.clone().subtract(minimumNights, 'days');
      var isStartDateAfterEndDate = (0, _isBeforeDay["default"])(lastAllowedStartDate, day) || (0, _isAfterDay["default"])(startDate, endDate);
      var isEndDateDisabled = disabled === _constants.END_DATE;

      if (!isEndDateDisabled || !isStartDateAfterEndDate) {
        startDate = day;

        if (isStartDateAfterEndDate) {
          endDate = null;
        }
      }

      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });

      if (isEndDateDisabled && !isStartDateAfterEndDate) {
        // onFocusChange(null);
        onClose({
          startDate: startDate,
          endDate: endDate
        });
      } else if (!isEndDateDisabled) {// onFocusChange(END_DATE);
      }
    } else if (focusedInput === _constants.END_DATE) {
      var firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

      if (!startDate) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
        onFocusChange(_constants.START_DATE);
      } else if ((0, _isInclusivelyAfterDay["default"])(day, firstAllowedEndDate)) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });

        if (!keepOpenOnDateSelect) {
          // onFocusChange(null);
          onClose({
            startDate: startDate,
            endDate: endDate
          });
        }
      } else if (disabled !== _constants.START_DATE) {
        startDate = day;
        endDate = null;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
      } else {
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
      }
    } else {
      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });
    }

    onBlur();
  };

  _proto.onDayMouseEnter = function onDayMouseEnter(day) {
    /* eslint react/destructuring-assignment: 1 */
    if (this.isTouchDevice) return;
    var _this$props4 = this.props,
        startDate = _this$props4.startDate,
        endDate = _this$props4.endDate,
        focusedInput = _this$props4.focusedInput,
        getMinNightsForHoverDate = _this$props4.getMinNightsForHoverDate,
        minimumNights = _this$props4.minimumNights,
        startDateOffset = _this$props4.startDateOffset,
        endDateOffset = _this$props4.endDateOffset;
    var _this$state = this.state,
        hoverDate = _this$state.hoverDate,
        visibleDays = _this$state.visibleDays,
        dateOffset = _this$state.dateOffset;
    var nextDateOffset = null;

    if (focusedInput) {
      var hasOffset = startDateOffset || endDateOffset;
      var modifiers = {};

      if (hasOffset) {
        var start = (0, _getSelectedDateOffset["default"])(startDateOffset, day);
        var end = (0, _getSelectedDateOffset["default"])(endDateOffset, day, function (rangeDay) {
          return rangeDay.add(1, 'day');
        });
        nextDateOffset = {
          start: start,
          end: end
        }; // eslint-disable-next-line react/destructuring-assignment

        if (dateOffset && dateOffset.start && dateOffset.end) {
          modifiers = this.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset');
        }

        modifiers = this.addModifierToRange(modifiers, start, end, 'hovered-offset');
      }

      if (!hasOffset) {
        modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');
        modifiers = this.addModifier(modifiers, day, 'hovered');

        if (startDate && !endDate && focusedInput === _constants.END_DATE) {
          if ((0, _isAfterDay["default"])(hoverDate, startDate)) {
            var endSpan = hoverDate.clone().add(1, 'day');
            modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
          }

          if (!this.isBlocked(day) && (0, _isAfterDay["default"])(day, startDate)) {
            var _endSpan2 = day.clone().add(1, 'day');

            modifiers = this.addModifierToRange(modifiers, startDate, _endSpan2, 'hovered-span');
          }
        }

        if (!startDate && endDate && focusedInput === _constants.START_DATE) {
          if ((0, _isBeforeDay["default"])(hoverDate, endDate)) {
            modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
          }

          if (!this.isBlocked(day) && (0, _isBeforeDay["default"])(day, endDate)) {
            modifiers = this.addModifierToRange(modifiers, day, endDate, 'hovered-span');
          }
        }

        if (startDate) {
          var startSpan = startDate.clone().add(1, 'day');

          var _endSpan3 = startDate.clone().add(minimumNights + 1, 'days');

          modifiers = this.deleteModifierFromRange(modifiers, startSpan, _endSpan3, 'after-hovered-start');

          if ((0, _isSameDay["default"])(day, startDate)) {
            var newStartSpan = startDate.clone().add(1, 'day');
            var newEndSpan = startDate.clone().add(minimumNights + 1, 'days');
            modifiers = this.addModifierToRange(modifiers, newStartSpan, newEndSpan, 'after-hovered-start');
          }
        }

        if (hoverDate && !this.isBlocked(hoverDate)) {
          var minNightsForPrevHoverDate = getMinNightsForHoverDate(hoverDate);

          if (minNightsForPrevHoverDate > 0 && focusedInput === _constants.START_DATE) {
            modifiers = this.deleteModifierFromRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForPrevHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
            modifiers = this.deleteModifier(modifiers, hoverDate.clone().add(minNightsForPrevHoverDate, 'days'), 'hovered-start-first-possible-end');
          }
        }

        if (!this.isBlocked(day)) {
          var minNightsForHoverDate = getMinNightsForHoverDate(day);

          if (minNightsForHoverDate > 0 && focusedInput === _constants.START_DATE) {
            modifiers = this.addModifierToRange(modifiers, day.clone().add(1, 'days'), day.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
            modifiers = this.addModifier(modifiers, day.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end');
          }
        }
      }

      this.setState({
        hoverDate: day,
        dateOffset: nextDateOffset,
        visibleDays: _objectSpread({}, visibleDays, {}, modifiers)
      });
    }
  };

  _proto.onDayMouseLeave = function onDayMouseLeave(day) {
    var _this$props5 = this.props,
        startDate = _this$props5.startDate,
        endDate = _this$props5.endDate,
        focusedInput = _this$props5.focusedInput,
        getMinNightsForHoverDate = _this$props5.getMinNightsForHoverDate,
        minimumNights = _this$props5.minimumNights;
    var _this$state2 = this.state,
        hoverDate = _this$state2.hoverDate,
        visibleDays = _this$state2.visibleDays,
        dateOffset = _this$state2.dateOffset;
    if (this.isTouchDevice || !hoverDate) return;
    var modifiers = {};
    modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');

    if (dateOffset) {
      modifiers = this.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset');
    }

    if (startDate && !endDate && (0, _isAfterDay["default"])(hoverDate, startDate)) {
      var endSpan = hoverDate.clone().add(1, 'day');
      modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
    }

    if (!startDate && endDate && (0, _isAfterDay["default"])(endDate, hoverDate)) {
      modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
    }

    if (startDate && (0, _isSameDay["default"])(day, startDate)) {
      var startSpan = startDate.clone().add(1, 'day');

      var _endSpan4 = startDate.clone().add(minimumNights + 1, 'days');

      modifiers = this.deleteModifierFromRange(modifiers, startSpan, _endSpan4, 'after-hovered-start');
    }

    if (!this.isBlocked(hoverDate)) {
      var minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);

      if (minNightsForHoverDate > 0 && focusedInput === _constants.START_DATE) {
        modifiers = this.deleteModifierFromRange(modifiers, hoverDate.clone().add(1, 'days'), hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-blocked-minimum-nights');
        modifiers = this.deleteModifier(modifiers, hoverDate.clone().add(minNightsForHoverDate, 'days'), 'hovered-start-first-possible-end');
      }
    }

    this.setState({
      hoverDate: null,
      visibleDays: _objectSpread({}, visibleDays, {}, modifiers)
    });
  };

  _proto.onPrevMonthClick = function onPrevMonthClick() {
    var _this$props6 = this.props,
        enableOutsideDays = _this$props6.enableOutsideDays,
        maxDate = _this$props6.maxDate,
        minDate = _this$props6.minDate,
        numberOfMonths = _this$props6.numberOfMonths,
        onPrevMonthClick = _this$props6.onPrevMonthClick;
    var _this$state3 = this.state,
        currentMonth = _this$state3.currentMonth,
        visibleDays = _this$state3.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var prevMonth = currentMonth.clone().subtract(2, 'months');
    var prevMonthVisibleDays = (0, _getVisibleDays["default"])(prevMonth, 1, enableOutsideDays, true);
    var newCurrentMonth = currentMonth.clone().subtract(1, 'month');
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread({}, newVisibleDays, {}, this.getModifiers(prevMonthVisibleDays))
    }, function () {
      onPrevMonthClick(newCurrentMonth.clone());
    });
  };

  _proto.onNextMonthClick = function onNextMonthClick() {
    var _this$props7 = this.props,
        enableOutsideDays = _this$props7.enableOutsideDays,
        maxDate = _this$props7.maxDate,
        minDate = _this$props7.minDate,
        numberOfMonths = _this$props7.numberOfMonths,
        onNextMonthClick = _this$props7.onNextMonthClick;
    var _this$state4 = this.state,
        currentMonth = _this$state4.currentMonth,
        visibleDays = _this$state4.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var nextMonth = currentMonth.clone().add(numberOfMonths + 1, 'month');
    var nextMonthVisibleDays = (0, _getVisibleDays["default"])(nextMonth, 1, enableOutsideDays, true);
    var newCurrentMonth = currentMonth.clone().add(1, 'month');
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shouldDisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shouldDisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread({}, newVisibleDays, {}, this.getModifiers(nextMonthVisibleDays))
    }, function () {
      onNextMonthClick(newCurrentMonth.clone());
    });
  };

  _proto.onMonthChange = function onMonthChange(newMonth) {
    var _this$props8 = this.props,
        numberOfMonths = _this$props8.numberOfMonths,
        enableOutsideDays = _this$props8.enableOutsideDays,
        orientation = _this$props8.orientation;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var newVisibleDays = (0, _getVisibleDays["default"])(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };

  _proto.onYearChange = function onYearChange(newMonth) {
    var _this$props9 = this.props,
        numberOfMonths = _this$props9.numberOfMonths,
        enableOutsideDays = _this$props9.enableOutsideDays,
        orientation = _this$props9.orientation;
    var withoutTransitionMonths = orientation === _constants.VERTICAL_SCROLLABLE;
    var newVisibleDays = (0, _getVisibleDays["default"])(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
    this.setState({
      currentMonth: newMonth.clone(),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };

  _proto.onMultiplyScrollableMonths = function onMultiplyScrollableMonths() {
    var _this$props10 = this.props,
        numberOfMonths = _this$props10.numberOfMonths,
        enableOutsideDays = _this$props10.enableOutsideDays;
    var _this$state5 = this.state,
        currentMonth = _this$state5.currentMonth,
        visibleDays = _this$state5.visibleDays;
    var numberOfVisibleMonths = Object.keys(visibleDays).length;
    var nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
    var newVisibleDays = (0, _getVisibleDays["default"])(nextMonth, numberOfMonths, enableOutsideDays, true);
    this.setState({
      visibleDays: _objectSpread({}, visibleDays, {}, this.getModifiers(newVisibleDays))
    });
  };

  _proto.getFirstFocusableDay = function getFirstFocusableDay(newMonth) {
    var _this3 = this;

    var _this$props11 = this.props,
        startDate = _this$props11.startDate,
        endDate = _this$props11.endDate,
        focusedInput = _this$props11.focusedInput,
        minimumNights = _this$props11.minimumNights,
        numberOfMonths = _this$props11.numberOfMonths;
    var focusedDate = newMonth.clone().startOf('month');

    if (focusedInput === _constants.START_DATE && startDate) {
      focusedDate = startDate.clone();
    } else if (focusedInput === _constants.END_DATE && !endDate && startDate) {
      focusedDate = startDate.clone().add(minimumNights, 'days');
    } else if (focusedInput === _constants.END_DATE && endDate) {
      focusedDate = endDate.clone();
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
        return !_this3.isBlocked(day);
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
        numberOfMonths = nextProps.numberOfMonths,
        enableOutsideDays = nextProps.enableOutsideDays,
        orientation = nextProps.orientation,
        startDate = nextProps.startDate;
    var initialVisibleMonthThunk = initialVisibleMonth || (startDate ? function () {
      return startDate;
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
    var _this$props12 = this.props,
        numberOfMonths = _this$props12.numberOfMonths,
        enableOutsideDays = _this$props12.enableOutsideDays;
    return (0, _isDayVisible["default"])(date, visibleMonth, numberOfMonths, enableOutsideDays);
  };

  _proto.addModifier = function addModifier(updatedDays, day, modifier) {
    return (0, _modifiers.addModifier)(updatedDays, day, modifier, this.props, this.state);
  };

  _proto.addModifierToRange = function addModifierToRange(updatedDays, start, end, modifier) {
    var days = updatedDays;
    var spanStart = start.clone();

    while ((0, _isBeforeDay["default"])(spanStart, end)) {
      days = this.addModifier(days, spanStart, modifier);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  };

  _proto.deleteModifier = function deleteModifier(updatedDays, day, modifier) {
    return (0, _modifiers.deleteModifier)(updatedDays, day, modifier, this.props, this.state);
  };

  _proto.deleteModifierFromRange = function deleteModifierFromRange(updatedDays, start, end, modifier) {
    var days = updatedDays;
    var spanStart = start.clone();

    while ((0, _isBeforeDay["default"])(spanStart, end)) {
      days = this.deleteModifier(days, spanStart, modifier);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  };

  _proto.doesNotMeetMinimumNights = function doesNotMeetMinimumNights(day) {
    var _this$props13 = this.props,
        startDate = _this$props13.startDate,
        isOutsideRange = _this$props13.isOutsideRange,
        focusedInput = _this$props13.focusedInput,
        minimumNights = _this$props13.minimumNights;
    if (focusedInput !== _constants.END_DATE) return false;

    if (startDate) {
      var dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minimumNights && dayDiff >= 0;
    }

    return isOutsideRange((0, _moment["default"])(day).subtract(minimumNights, 'days'));
  };

  _proto.doesNotMeetMinNightsForHoveredStartDate = function doesNotMeetMinNightsForHoveredStartDate(day, hoverDate) {
    var _this$props14 = this.props,
        focusedInput = _this$props14.focusedInput,
        getMinNightsForHoverDate = _this$props14.getMinNightsForHoverDate;
    if (focusedInput !== _constants.END_DATE) return false;

    if (hoverDate && !this.isBlocked(hoverDate)) {
      var minNights = getMinNightsForHoverDate(hoverDate);
      var dayDiff = day.diff(hoverDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minNights && dayDiff >= 0;
    }

    return false;
  };

  _proto.isDayAfterHoveredStartDate = function isDayAfterHoveredStartDate(day) {
    var _this$props15 = this.props,
        startDate = _this$props15.startDate,
        endDate = _this$props15.endDate,
        minimumNights = _this$props15.minimumNights;

    var _ref2 = this.state || {},
        hoverDate = _ref2.hoverDate;

    return !!startDate && !endDate && !this.isBlocked(day) && (0, _isNextDay["default"])(hoverDate, day) && minimumNights > 0 && (0, _isSameDay["default"])(hoverDate, startDate);
  };

  _proto.isEndDate = function isEndDate(day) {
    var endDate = this.props.endDate;
    return (0, _isSameDay["default"])(day, endDate);
  };

  _proto.isHovered = function isHovered(day) {
    var _ref3 = this.state || {},
        hoverDate = _ref3.hoverDate;

    var focusedInput = this.props.focusedInput;
    return !!focusedInput && (0, _isSameDay["default"])(day, hoverDate);
  };

  _proto.isInHoveredSpan = function isInHoveredSpan(day) {
    var _this$props16 = this.props,
        startDate = _this$props16.startDate,
        endDate = _this$props16.endDate;

    var _ref4 = this.state || {},
        hoverDate = _ref4.hoverDate;

    var isForwardRange = !!startDate && !endDate && (day.isBetween(startDate, hoverDate) || (0, _isSameDay["default"])(hoverDate, day));
    var isBackwardRange = !!endDate && !startDate && (day.isBetween(hoverDate, endDate) || (0, _isSameDay["default"])(hoverDate, day));
    var isValidDayHovered = hoverDate && !this.isBlocked(hoverDate);
    return (isForwardRange || isBackwardRange) && isValidDayHovered;
  };

  _proto.isInSelectedSpan = function isInSelectedSpan(day) {
    var _this$props17 = this.props,
        startDate = _this$props17.startDate,
        endDate = _this$props17.endDate;
    return day.isBetween(startDate, endDate, 'days');
  };

  _proto.isLastInRange = function isLastInRange(day) {
    var endDate = this.props.endDate;
    return this.isInSelectedSpan(day) && (0, _isNextDay["default"])(day, endDate);
  };

  _proto.isStartDate = function isStartDate(day) {
    var startDate = this.props.startDate;
    return (0, _isSameDay["default"])(day, startDate);
  };

  _proto.isBlocked = function isBlocked(day) {
    var _this$props18 = this.props,
        isDayBlocked = _this$props18.isDayBlocked,
        isOutsideRange = _this$props18.isOutsideRange;
    return isDayBlocked(day) || isOutsideRange(day) || this.doesNotMeetMinimumNights(day);
  };

  _proto.isToday = function isToday(day) {
    return (0, _isSameDay["default"])(day, this.today);
  };

  _proto.isFirstDayOfWeek = function isFirstDayOfWeek(day) {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    return day.day() === (firstDayOfWeek || _moment["default"].localeData().firstDayOfWeek());
  };

  _proto.isLastDayOfWeek = function isLastDayOfWeek(day) {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    return day.day() === ((firstDayOfWeek || _moment["default"].localeData().firstDayOfWeek()) + 6) % 7;
  };

  _proto.isFirstPossibleEndDateForHoveredStartDate = function isFirstPossibleEndDateForHoveredStartDate(day, hoverDate) {
    var _this$props19 = this.props,
        focusedInput = _this$props19.focusedInput,
        getMinNightsForHoverDate = _this$props19.getMinNightsForHoverDate;
    if (focusedInput !== _constants.END_DATE || !hoverDate || this.isBlocked(hoverDate)) return false;
    var minNights = getMinNightsForHoverDate(hoverDate);
    var firstAvailableEndDate = hoverDate.clone().add(minNights, 'days');
    return (0, _isSameDay["default"])(day, firstAvailableEndDate);
  };

  _proto.render = function render() {
    var _this$props20 = this.props,
        numberOfMonths = _this$props20.numberOfMonths,
        orientation = _this$props20.orientation,
        monthFormat = _this$props20.monthFormat,
        renderMonthText = _this$props20.renderMonthText,
        navPrev = _this$props20.navPrev,
        navNext = _this$props20.navNext,
        noNavButtons = _this$props20.noNavButtons,
        onOutsideClick = _this$props20.onOutsideClick,
        withPortal = _this$props20.withPortal,
        enableOutsideDays = _this$props20.enableOutsideDays,
        firstDayOfWeek = _this$props20.firstDayOfWeek,
        renderKeyboardShortcutsButton = _this$props20.renderKeyboardShortcutsButton,
        hideKeyboardShortcutsPanel = _this$props20.hideKeyboardShortcutsPanel,
        daySize = _this$props20.daySize,
        focusedInput = _this$props20.focusedInput,
        renderCalendarDay = _this$props20.renderCalendarDay,
        renderDayContents = _this$props20.renderDayContents,
        renderCalendarInfo = _this$props20.renderCalendarInfo,
        renderMonthElement = _this$props20.renderMonthElement,
        calendarInfoPosition = _this$props20.calendarInfoPosition,
        onBlur = _this$props20.onBlur,
        onShiftTab = _this$props20.onShiftTab,
        onTab = _this$props20.onTab,
        isFocused = _this$props20.isFocused,
        showKeyboardShortcuts = _this$props20.showKeyboardShortcuts,
        isRTL = _this$props20.isRTL,
        weekDayFormat = _this$props20.weekDayFormat,
        dayAriaLabelFormat = _this$props20.dayAriaLabelFormat,
        verticalHeight = _this$props20.verticalHeight,
        noBorder = _this$props20.noBorder,
        transitionDuration = _this$props20.transitionDuration,
        verticalBorderSpacing = _this$props20.verticalBorderSpacing,
        horizontalMonthPadding = _this$props20.horizontalMonthPadding;
    var _this$state6 = this.state,
        currentMonth = _this$state6.currentMonth,
        phrases = _this$state6.phrases,
        visibleDays = _this$state6.visibleDays,
        disablePrev = _this$state6.disablePrev,
        disableNext = _this$state6.disableNext;
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
      onTab: onTab,
      onShiftTab: onShiftTab,
      onYearChange: this.onYearChange,
      onMultiplyScrollableMonths: this.onMultiplyScrollableMonths,
      monthFormat: monthFormat,
      renderMonthText: renderMonthText,
      withPortal: withPortal,
      hidden: !focusedInput,
      initialVisibleMonth: function initialVisibleMonth() {
        return currentMonth;
      },
      daySize: daySize,
      onOutsideClick: onOutsideClick,
      disablePrev: disablePrev,
      disableNext: disableNext,
      navPrev: navPrev,
      navNext: navNext,
      noNavButtons: noNavButtons,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      renderKeyboardShortcutsButton: renderKeyboardShortcutsButton,
      calendarInfoPosition: calendarInfoPosition,
      firstDayOfWeek: firstDayOfWeek,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      isFocused: isFocused,
      getFirstFocusableDay: this.getFirstFocusableDay,
      onBlur: onBlur,
      showKeyboardShortcuts: showKeyboardShortcuts,
      phrases: phrases,
      isRTL: isRTL,
      weekDayFormat: weekDayFormat,
      dayAriaLabelFormat: dayAriaLabelFormat,
      verticalHeight: verticalHeight,
      verticalBorderSpacing: verticalBorderSpacing,
      noBorder: noBorder,
      transitionDuration: transitionDuration,
      horizontalMonthPadding: horizontalMonthPadding
    });
  };

  return DayPickerRangeController;
}(_react["default"].PureComponent || _react["default"].Component);

exports["default"] = DayPickerRangeController;
DayPickerRangeController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerRangeController.defaultProps = defaultProps;