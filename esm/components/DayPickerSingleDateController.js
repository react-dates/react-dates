import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import shallowEqual from "enzyme-shallow-equal";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import values from 'object.values';
import isTouchDevice from 'is-touch-device';
import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';
import isDayVisible from '../utils/isDayVisible';
import getVisibleDays from '../utils/getVisibleDays';
import toISODateString from '../utils/toISODateString';
import { addModifier as _addModifier, deleteModifier as _deleteModifier } from '../utils/modifiers';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';
import { HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE, INFO_POSITION_BOTTOM, NAV_POSITION_TOP } from '../constants';
import DayPicker from './DayPicker';
import getPooledMoment from '../utils/getPooledMoment';

// Default value of the date property. Represents the state
// when there is no date selected.
// TODO: use null
var DATE_UNSET_VALUE = undefined;
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  date: momentPropTypes.momentObj,
  minDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,
  onDateChange: PropTypes.func,
  allowUnselect: PropTypes.bool,
  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,
  keepOpenOnDateSelect: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,
  // DayPicker props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  verticalHeight: nonNegativeInteger,
  noBorder: PropTypes.bool,
  verticalBorderSpacing: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,
  horizontalMonthPadding: nonNegativeInteger,
  dayPickerNavigationInlineStyles: PropTypes.object,
  navPosition: NavPositionShape,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  renderNavPrevButton: PropTypes.func,
  renderNavNextButton: PropTypes.func,
  noNavButtons: PropTypes.bool,
  noNavNextButton: PropTypes.bool,
  noNavPrevButton: PropTypes.bool,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,
  onTab: PropTypes.func,
  onShiftTab: PropTypes.func,
  // i18n
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,
  isRTL: PropTypes.bool
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
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  daySize: DAY_SIZE,
  verticalHeight: null,
  noBorder: false,
  verticalBorderSpacing: undefined,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,
  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
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
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  // accessibility
  onBlur: function onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,
  onTab: function onTab() {},
  onShiftTab: function onShiftTab() {},
  // i18n
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,
  isRTL: false
};
var DayPickerSingleDateController = /*#__PURE__*/function (_ref2, _ref) {
  _inheritsLoose(DayPickerSingleDateController, _ref2);
  var _proto = DayPickerSingleDateController.prototype;
  _proto[_ref] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  function DayPickerSingleDateController(props) {
    var _this;
    _this = _ref2.call(this, props) || this;
    _this.isTouchDevice = false;
    _this.today = moment();
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
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind(_assertThisInitialized(_this));
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind(_assertThisInitialized(_this));
    _this.onDayClick = _this.onDayClick.bind(_assertThisInitialized(_this));
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_assertThisInitialized(_this));
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_assertThisInitialized(_this));
    _this.onMonthChange = _this.onMonthChange.bind(_assertThisInitialized(_this));
    _this.onYearChange = _this.onYearChange.bind(_assertThisInitialized(_this));
    _this.onGetNextScrollableMonths = _this.onGetNextScrollableMonths.bind(_assertThisInitialized(_this));
    _this.onGetPrevScrollableMonths = _this.onGetPrevScrollableMonths.bind(_assertThisInitialized(_this));
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind(_assertThisInitialized(_this));
    return _this;
  }
  _proto.componentDidMount = function componentDidMount() {
    this.isTouchDevice = isTouchDevice();
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
    if (numberOfMonths !== prevNumberOfMonths || enableOutsideDays !== prevEnableOutsideDays || initialVisibleMonth !== prevInitialVisibleMonth && !prevFocused && focused || prevDate && prevDate.diff(date) && !isDayVisible(date, prevCurrentMonth, numberOfMonths)) {
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
      values(visibleDays).forEach(function (days) {
        Object.keys(days).forEach(function (day) {
          var momentObj = getPooledMoment(day);
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
    var today = moment();
    if (!isSameDay(this.today, today)) {
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
    this.today = moment();
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
    var prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays);
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
    var nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays);
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
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var newVisibleDays = getVisibleDays(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
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
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var newVisibleDays = getVisibleDays(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths);
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
    var newVisibleDays = getVisibleDays(nextMonth, numberOfMonths, enableOutsideDays, true);
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
    var newVisibleDays = getVisibleDays(firstPreviousMonth, numberOfMonths, enableOutsideDays, true);
    this.setState({
      currentMonth: firstPreviousMonth.clone(),
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), this.getModifiers(newVisibleDays))
    });
  };
  _proto.getFirstDayOfWeek = function getFirstDayOfWeek() {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    if (firstDayOfWeek == null) {
      return moment.localeData().firstDayOfWeek();
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
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }
      var viableDays = days.filter(function (day) {
        return !_this3.isBlocked(day) && isAfterDay(day, focusedDate);
      });
      if (viableDays.length > 0) {
        var _viableDays = _slicedToArray(viableDays, 1);
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
        modifiers[month][toISODateString(day)] = _this4.getModifiersForDay(day);
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
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var visibleDays = this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths));
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
    return isDayVisible(date, visibleMonth, numberOfMonths, enableOutsideDays);
  };
  _proto.addModifier = function addModifier(updatedDays, day, modifier) {
    return _addModifier(updatedDays, day, modifier, this.props, this.state);
  };
  _proto.deleteModifier = function deleteModifier(updatedDays, day, modifier) {
    return _deleteModifier(updatedDays, day, modifier, this.props, this.state);
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
    return isSameDay(day, hoverDate);
  };
  _proto.isSelected = function isSelected(day) {
    var date = this.props.date;
    return isSameDay(day, date);
  };
  _proto.isToday = function isToday(day) {
    return isSameDay(day, this.today);
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
    return /*#__PURE__*/React.createElement(DayPicker, {
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
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
export { DayPickerSingleDateController as default };
DayPickerSingleDateController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerSingleDateController.defaultProps = defaultProps;