import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import shallowEqual from "enzyme-shallow-equal";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import values from 'object.values';
import isTouchDevice from 'is-touch-device';
import startOfDay from 'date-fns/startOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import getLocale from '../utils/getLocale';
import { addModifier as _addModifier, deleteModifier as _deleteModifier } from '../utils/modifiers';
import toISODateString from '../utils/toISODateString';
import getVisibleDays from '../utils/getVisibleDays';
import isAfterDay from '../utils/isAfterDay';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import { DayPickerPhrases } from '../defaultPhrases';
import { HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE, INFO_POSITION_BOTTOM, NAV_POSITION_TOP } from '../constants';
import DayPicker from './DayPicker';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  date: PropTypes.object,
  onDateChange: PropTypes.func,
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
  isRTL: PropTypes.bool,
  locale: PropTypes.string
}) : {};
var defaultProps = {
  date: undefined,
  // TODO: use null
  onDateChange: function onDateChange() {},
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
  monthFormat: 'MMMM yyyy',
  weekDayFormat: 'eee',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,
  isRTL: false,
  locale: null
};
/** @extends React.Component */

var DayPickerSingleDateController = /*#__PURE__*/function (_ref) {
  _inheritsLoose(DayPickerSingleDateController, _ref);

  var _proto = DayPickerSingleDateController.prototype;

  _proto[!React.PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };

  function DayPickerSingleDateController(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    _this.isTouchDevice = false;
    _this.today = addHours(startOfDay(new Date()), 12);
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
      visibleDays: visibleDays
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

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
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

    if (numberOfMonths !== prevNumberOfMonths || enableOutsideDays !== prevEnableOutsideDays || initialVisibleMonth !== prevInitialVisibleMonth && !prevFocused && focused) {
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
          var dateObj = addHours(startOfDay(parseISO(day)), 12);

          if (_this2.isBlocked(dateObj)) {
            modifiers = _this2.addModifier(modifiers, dateObj, 'blocked');
          } else {
            modifiers = _this2.deleteModifier(modifiers, dateObj, 'blocked');
          }

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(dateObj)) {
              modifiers = _this2.addModifier(modifiers, dateObj, 'blocked-out-of-range');
            } else {
              modifiers = _this2.deleteModifier(modifiers, dateObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(dateObj)) {
              modifiers = _this2.addModifier(modifiers, dateObj, 'blocked-calendar');
            } else {
              modifiers = _this2.deleteModifier(modifiers, dateObj, 'blocked-calendar');
            }
          }

          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(dateObj)) {
              modifiers = _this2.addModifier(modifiers, dateObj, 'highlighted-calendar');
            } else {
              modifiers = _this2.deleteModifier(modifiers, dateObj, 'highlighted-calendar');
            }
          }
        });
      });
    }

    var today = addHours(startOfDay(new Date()), 12);

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

  _proto.UNSAFE_componentWillUpdate = function UNSAFE_componentWillUpdate() {// const today = addHours(startOfDay(new Date()), 12);
  };

  _proto.onDayClick = function onDayClick(day, e) {
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;
    var _this$props2 = this.props,
        onDateChange = _this$props2.onDateChange,
        keepOpenOnDateSelect = _this$props2.keepOpenOnDateSelect,
        onFocusChange = _this$props2.onFocusChange,
        onClose = _this$props2.onClose;
    onDateChange(day);

    if (!keepOpenOnDateSelect) {
      onFocusChange({
        focused: false
      });
      onClose({
        date: day
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
        onPrevMonthClick = _this$props3.onPrevMonthClick,
        numberOfMonths = _this$props3.numberOfMonths,
        enableOutsideDays = _this$props3.enableOutsideDays;
    var _this$state3 = this.state,
        currentMonth = _this$state3.currentMonth,
        visibleDays = _this$state3.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var prevMonth = subMonths(currentMonth, 1);
    var locale = this.props.locale;
    var prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays, true, locale);
    this.setState({
      currentMonth: prevMonth,
      visibleDays: _objectSpread(_objectSpread({}, newVisibleDays), this.getModifiers(prevMonthVisibleDays))
    }, function () {
      onPrevMonthClick(new Date(prevMonth));
    });
  };

  _proto.onNextMonthClick = function onNextMonthClick() {
    var _this$props4 = this.props,
        onNextMonthClick = _this$props4.onNextMonthClick,
        numberOfMonths = _this$props4.numberOfMonths,
        enableOutsideDays = _this$props4.enableOutsideDays;
    var _this$state4 = this.state,
        currentMonth = _this$state4.currentMonth,
        visibleDays = _this$state4.visibleDays;
    var newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach(function (month) {
      newVisibleDays[month] = visibleDays[month];
    });
    var nextMonth = addMonths(currentMonth, numberOfMonths + 1);
    var locale = this.props.locale;
    var nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays, true, locale);
    var newCurrentMonth = addMonths(currentMonth, 1);
    this.setState({
      currentMonth: newCurrentMonth,
      visibleDays: _objectSpread(_objectSpread({}, newVisibleDays), this.getModifiers(nextMonthVisibleDays))
    }, function () {
      onNextMonthClick(new Date(newCurrentMonth));
    });
  };

  _proto.onMonthChange = function onMonthChange(newMonth) {
    var _this$props5 = this.props,
        numberOfMonths = _this$props5.numberOfMonths,
        enableOutsideDays = _this$props5.enableOutsideDays,
        orientation = _this$props5.orientation;
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var locale = this.props.locale;
    var newVisibleDays = getVisibleDays(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths, locale);
    this.setState({
      currentMonth: new Date(newMonth),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };

  _proto.onYearChange = function onYearChange(newMonth) {
    var _this$props6 = this.props,
        numberOfMonths = _this$props6.numberOfMonths,
        enableOutsideDays = _this$props6.enableOutsideDays,
        orientation = _this$props6.orientation;
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var locale = this.props.locale;
    var newVisibleDays = getVisibleDays(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths, locale);
    this.setState({
      currentMonth: new Date(newMonth),
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
    var nextMonth = addMonths(currentMonth, numberOfVisibleMonths + 1);
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
    var firstPreviousMonth = subMonths(currentMonth, numberOfMonths);
    var newVisibleDays = getVisibleDays(firstPreviousMonth, numberOfMonths, enableOutsideDays, true);
    this.setState({
      currentMonth: new Date(firstPreviousMonth),
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), this.getModifiers(newVisibleDays))
    });
  };

  _proto.getFirstFocusableDay = function getFirstFocusableDay(newMonth) {
    var _this3 = this;

    var _this$props9 = this.props,
        date = _this$props9.date,
        numberOfMonths = _this$props9.numberOfMonths;
    var focusedDate = startOfMonth(newMonth);

    if (date) {
      focusedDate = new Date(date);
    }

    if (this.isBlocked(focusedDate)) {
      var days = [];
      var lastVisibleDay = endOfMonth(addMonths(newMonth, numberOfMonths - 1));
      var currentDay = new Date(focusedDate);

      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = addDays(currentDay, 1);
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
    var locale = this.props.locale;
    var visibleDays = this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths, locale));
    return {
      currentMonth: currentMonth,
      visibleDays: visibleDays
    };
  };

  _proto.addModifier = function addModifier(updateddays, day, modifier) {
    return _addModifier(updateddays, day, modifier, this.props, this.state);
  };

  _proto.deleteModifier = function deleteModifier(updateddays, day, modifier) {
    return _deleteModifier(updateddays, day, modifier, this.props, this.state);
  };

  _proto.isBlocked = function isBlocked(day) {
    var _this$props10 = this.props,
        isDayBlocked = _this$props10.isDayBlocked,
        isOutsideRange = _this$props10.isOutsideRange;
    return isDayBlocked(day) || isOutsideRange(day);
  };

  _proto.isHovered = function isHovered(day) {
    var _ref2 = this.state || {},
        hoverDate = _ref2.hoverDate;

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
    var _this$props11 = this.props,
        firstDayOfWeek = _this$props11.firstDayOfWeek,
        locale = _this$props11.locale;

    if (firstDayOfWeek) {
      return isSameDay(day, startOfWeek(day, {
        weekStartsOn: firstDayOfWeek
      }));
    }

    return isSameDay(day, startOfWeek(day, {
      locale: getLocale(locale)
    }));
  };

  _proto.isLastDayOfWeek = function isLastDayOfWeek(day) {
    var _this$props12 = this.props,
        firstDayOfWeek = _this$props12.firstDayOfWeek,
        locale = _this$props12.locale;

    if (firstDayOfWeek) {
      return isSameDay(day, endOfWeek(day, {
        weekStartsOn: firstDayOfWeek
      }));
    }

    return isSameDay(day, endOfWeek(day, {
      locale: getLocale(locale)
    }));
  };

  _proto.render = function render() {
    var _this$props13 = this.props,
        numberOfMonths = _this$props13.numberOfMonths,
        orientation = _this$props13.orientation,
        monthFormat = _this$props13.monthFormat,
        renderMonthText = _this$props13.renderMonthText,
        renderWeekHeaderElement = _this$props13.renderWeekHeaderElement,
        dayPickerNavigationInlineStyles = _this$props13.dayPickerNavigationInlineStyles,
        navPosition = _this$props13.navPosition,
        navPrev = _this$props13.navPrev,
        navNext = _this$props13.navNext,
        renderNavPrevButton = _this$props13.renderNavPrevButton,
        renderNavNextButton = _this$props13.renderNavNextButton,
        noNavButtons = _this$props13.noNavButtons,
        noNavPrevButton = _this$props13.noNavPrevButton,
        noNavNextButton = _this$props13.noNavNextButton,
        onOutsideClick = _this$props13.onOutsideClick,
        onShiftTab = _this$props13.onShiftTab,
        onTab = _this$props13.onTab,
        withPortal = _this$props13.withPortal,
        focused = _this$props13.focused,
        enableOutsideDays = _this$props13.enableOutsideDays,
        hideKeyboardShortcutsPanel = _this$props13.hideKeyboardShortcutsPanel,
        daySize = _this$props13.daySize,
        firstDayOfWeek = _this$props13.firstDayOfWeek,
        renderCalendarDay = _this$props13.renderCalendarDay,
        renderDayContents = _this$props13.renderDayContents,
        renderCalendarInfo = _this$props13.renderCalendarInfo,
        renderMonthElement = _this$props13.renderMonthElement,
        calendarInfoPosition = _this$props13.calendarInfoPosition,
        isFocused = _this$props13.isFocused,
        isRTL = _this$props13.isRTL,
        phrases = _this$props13.phrases,
        dayAriaLabelFormat = _this$props13.dayAriaLabelFormat,
        onBlur = _this$props13.onBlur,
        showKeyboardShortcuts = _this$props13.showKeyboardShortcuts,
        weekDayFormat = _this$props13.weekDayFormat,
        verticalHeight = _this$props13.verticalHeight,
        noBorder = _this$props13.noBorder,
        transitionDuration = _this$props13.transitionDuration,
        verticalBorderSpacing = _this$props13.verticalBorderSpacing,
        horizontalMonthPadding = _this$props13.horizontalMonthPadding,
        locale = _this$props13.locale;
    var _this$state7 = this.state,
        currentMonth = _this$state7.currentMonth,
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
      horizontalMonthPadding: horizontalMonthPadding,
      locale: locale
    });
  };

  return DayPickerSingleDateController;
}(React.PureComponent || React.Component);

export { DayPickerSingleDateController as default };
DayPickerSingleDateController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerSingleDateController.defaultProps = defaultProps;