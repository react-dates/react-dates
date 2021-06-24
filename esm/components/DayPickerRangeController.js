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
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isWithinInterval from 'date-fns/isWithinInterval';
import differenceInDays from 'date-fns/differenceInDays';
import isDate from 'date-fns/isDate';
import addHours from 'date-fns/addHours';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isAfterDay from '../utils/isAfterDay';
import isBeforeDay from '../utils/isBeforeDay';
import getLocale from '../utils/getLocale';
import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';
import isPreviousDay from '../utils/isPreviousDay';
import getSelectedDateOffset from '../utils/getSelectedDateOffset';
import toISODateString from '../utils/toISODateString';
import { addModifier as _addModifier, deleteModifier as _deleteModifier } from '../utils/modifiers';
import DisabledShape from '../shapes/DisabledShape';
import FocusedInputShape from '../shapes/FocusedInputShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE, INFO_POSITION_BOTTOM, NAV_POSITION_TOP } from '../constants';
import DayPicker from './DayPicker';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onDatesChange: PropTypes.func,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,
  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  disabled: DisabledShape,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,
  getMinNightsForHoverDate: PropTypes.func,
  daysViolatingMinNightsCanBeClicked: PropTypes.bool,
  // DayPicker props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  noBorder: PropTypes.bool,
  verticalBorderSpacing: nonNegativeInteger,
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
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  firstDayOfWeek: DayOfWeekShape,
  verticalHeight: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,
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
  startDate: null,
  endDate: null,
  onDatesChange: function onDatesChange() {},
  startDateOffset: undefined,
  endDateOffset: undefined,
  minDate: null,
  maxDate: null,
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
  daysViolatingMinNightsCanBeClicked: false,
  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  daySize: DAY_SIZE,
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
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
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
  monthFormat: 'MMMM yyyy',
  weekDayFormat: 'eee',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,
  isRTL: false,
  locale: null
};

var getChooseAvailableDatePhrase = function getChooseAvailableDatePhrase(phrases, focusedInput) {
  if (focusedInput === START_DATE) {
    return phrases.chooseAvailableStartDate;
  }

  if (focusedInput === END_DATE) {
    return phrases.chooseAvailableEndDate;
  }

  return phrases.chooseAvailableDate;
};
/** @extends React.Component */


var DayPickerRangeController = /*#__PURE__*/function (_ref) {
  _inheritsLoose(DayPickerRangeController, _ref);

  var _proto = DayPickerRangeController.prototype;

  _proto[!React.PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };

  function DayPickerRangeController(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    _this.isTouchDevice = isTouchDevice();
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
      },
      'before-hovered-end': function beforeHoveredEnd(day) {
        return _this.isDayBeforeHoveredEndDate(day);
      },
      'no-selected-start-before-selected-end': function noSelectedStartBeforeSelectedEnd(day) {
        return _this.beforeSelectedEnd(day) && !props.startDate;
      },
      'selected-start-in-hovered-span': function selectedStartInHoveredSpan(day, hoverDate) {
        return _this.isStartDate(day) && isAfterDay(hoverDate, day);
      },
      'selected-start-no-selected-end': function selectedStartNoSelectedEnd(day) {
        return _this.isStartDate(day) && !props.endDate;
      },
      'selected-end-no-selected-start': function selectedEndNoSelectedStart(day) {
        return _this.isEndDate(day) && !props.startDate;
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
      phrases: _objectSpread(_objectSpread({}, props.phrases), {}, {
        chooseAvailableDate: chooseAvailableDate
      }),
      visibleDays: visibleDays,
      disablePrev: _this.shoulddisableMonthNavigation(props.minDate, currentMonth),
      disableNext: _this.shoulddisableMonthNavigation(props.maxDate, currentMonth)
    };
    _this.onDayClick = _this.onDayClick.bind(_assertThisInitialized(_this));
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind(_assertThisInitialized(_this));
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind(_assertThisInitialized(_this));
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_assertThisInitialized(_this));
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_assertThisInitialized(_this));
    _this.onMonthChange = _this.onMonthChange.bind(_assertThisInitialized(_this));
    _this.onYearChange = _this.onYearChange.bind(_assertThisInitialized(_this));
    _this.onGetNextScrollableMonths = _this.onGetNextScrollableMonths.bind(_assertThisInitialized(_this));
    _this.onGetPrevScrollableMonths = _this.onGetPrevScrollableMonths.bind(_assertThisInitialized(_this));
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind(_assertThisInitialized(_this));
    return _this;
  }

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
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
        var startSpan = addDays(prevStartDate, 1);
        var endSpan = addDays(prevStartDate, prevMinimumNights + 1);
        modifiers = this.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');

        if (!endDate || !prevEndDate) {
          modifiers = this.deleteModifier(modifiers, prevStartDate, 'selected-start-no-selected-end');
        }
      }

      if (!prevStartDate && endDate && startDate) {
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-no-selected-start');
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
        values(visibleDays).forEach(function (days) {
          Object.keys(days).forEach(function (day) {
            var dateObj = day;
            modifiers = _this2.deleteModifier(modifiers, dateObj, 'no-selected-start-before-selected-end');
          });
        });
      }
    }

    if (didEndDateChange) {
      modifiers = this.deleteModifier(modifiers, prevEndDate, 'selected-end');
      modifiers = this.addModifier(modifiers, endDate, 'selected-end');

      if (prevEndDate && (!startDate || !prevStartDate)) {
        modifiers = this.deleteModifier(modifiers, prevEndDate, 'selected-end-no-selected-start');
      }
    }

    if (didStartDateChange || didEndDateChange) {
      if (prevStartDate && prevEndDate) {
        modifiers = this.deleteModifierFromRange(modifiers, prevStartDate, addDays(prevEndDate, 1), 'selected-span');
      }

      if (startDate && endDate) {
        modifiers = this.deleteModifierFromRange(modifiers, startDate, addDays(endDate, 1), 'hovered-span');
        modifiers = this.addModifierToRange(modifiers, addDays(startDate, 1), endDate, 'selected-span');
      }

      if (startDate && !endDate) {
        modifiers = this.addModifier(modifiers, startDate, 'selected-start-no-selected-end');
      }

      if (endDate && !startDate) {
        modifiers = this.addModifier(modifiers, endDate, 'selected-end-no-selected-start');
      }

      if (!startDate && endDate) {
        values(visibleDays).forEach(function (days) {
          Object.keys(days).forEach(function (day) {
            var dateObj = day;

            if (isBeforeDay(dateObj, endDate)) {
              modifiers = _this2.addModifier(modifiers, dateObj, 'no-selected-start-before-selected-end');
            }
          });
        });
      }
    }

    if (!this.isTouchDevice && didStartDateChange && startDate && !endDate) {
      var _startSpan = addDays(startDate, 1);

      var _endSpan = addDays(startDate, minimumNights + 1);

      modifiers = this.addModifierToRange(modifiers, _startSpan, _endSpan, 'after-hovered-start');
    }

    if (!this.isTouchDevice && didEndDateChange && !startDate && endDate) {
      var _startSpan2 = subDays(endDate, minimumNights);

      var _endSpan2 = new Date(endDate);

      modifiers = this.addModifierToRange(modifiers, _startSpan2, _endSpan2, 'before-hovered-end');
    }

    if (prevMinimumNights > 0) {
      if (didFocusChange || didStartDateChange || minimumNights !== prevMinimumNights) {
        var _startSpan3 = prevStartDate || this.today;

        modifiers = this.deleteModifierFromRange(modifiers, _startSpan3, addDays(_startSpan3, prevMinimumNights), 'blocked-minimum-nights');
        modifiers = this.deleteModifierFromRange(modifiers, _startSpan3, addDays(_startSpan3, prevMinimumNights), 'blocked');
      }
    }

    if (didFocusChange || recomputePropModifiers) {
      values(visibleDays).forEach(function (days) {
        Object.keys(days).forEach(function (day) {
          var dateObj = addHours(startOfDay(parseISO(day)), 12);
          var isBlocked = false;

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(dateObj)) {
              modifiers = _this2.addModifier(modifiers, dateObj, 'blocked-out-of-range');
              isBlocked = true;
            } else {
              modifiers = _this2.deleteModifier(modifiers, dateObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(dateObj)) {
              modifiers = _this2.addModifier(modifiers, dateObj, 'blocked-calendar');
              isBlocked = true;
            } else {
              modifiers = _this2.deleteModifier(modifiers, dateObj, 'blocked-calendar');
            }
          }

          if (isBlocked) {
            modifiers = _this2.addModifier(modifiers, dateObj, 'blocked');
          } else {
            modifiers = _this2.deleteModifier(modifiers, dateObj, 'blocked');
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

    if (!this.isTouchDevice && didFocusChange && hoverDate && !this.isBlocked(hoverDate)) {
      var minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);

      if (minNightsForHoverDate > 0 && focusedInput === END_DATE) {
        modifiers = this.deleteModifierFromRange(modifiers, addDays(hoverDate, 1), addDays(hoverDate, minNightsForHoverDate), 'hovered-start-blocked-minimum-nights');
        modifiers = this.deleteModifier(modifiers, addDays(hoverDate, minNightsForHoverDate), 'hovered-start-first-possible-end');
      }

      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        modifiers = this.addModifierToRange(modifiers, addDays(hoverDate, 1), addDays(hoverDate, minNightsForHoverDate), 'hovered-start-blocked-minimum-nights');
        modifiers = this.addModifier(modifiers, addDays(hoverDate, minNightsForHoverDate), 'hovered-start-first-possible-end');
      }
    }

    if (minimumNights > 0 && startDate && focusedInput === END_DATE) {
      modifiers = this.addModifierToRange(modifiers, startDate, addDays(startDate, minimumNights), 'blocked-minimum-nights');
      modifiers = this.addModifierToRange(modifiers, startDate, addDays(startDate, minimumNights), 'blocked');
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

    if (didFocusChange || phrases !== prevPhrases) {
      // set the appropriate CalendarDay phrase based on focusedInput
      var chooseAvailableDate = getChooseAvailableDatePhrase(phrases, focusedInput);
      this.setState({
        phrases: _objectSpread(_objectSpread({}, phrases), {}, {
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
        disabled = _this$props2.disabled,
        daysViolatingMinNightsCanBeClicked = _this$props2.daysViolatingMinNightsCanBeClicked;
    if (e) e.preventDefault();
    if (this.isBlocked(day, !daysViolatingMinNightsCanBeClicked)) return;
    var _this$props3 = this.props,
        startDate = _this$props3.startDate,
        endDate = _this$props3.endDate;

    if (startDateOffset || endDateOffset) {
      startDate = getSelectedDateOffset(startDateOffset, day);
      endDate = getSelectedDateOffset(endDateOffset, day);

      if (this.isBlocked(startDate) || this.isBlocked(endDate)) {
        return;
      }

      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });

      if (!keepOpenOnDateSelect) {
        onFocusChange(null);
        onClose({
          startDate: startDate,
          endDate: endDate
        });
      }
    } else if (daysViolatingMinNightsCanBeClicked && this.doesNotMeetMinimumNights(day)) {
      endDate = day;
      onDatesChange({
        startDate: startDate,
        endDate: endDate
      });
    } else if (focusedInput === START_DATE) {
      var lastAllowedStartDate = endDate && subDays(endDate, minimumNights);
      var isStartDateAfterEndDate = isBeforeDay(lastAllowedStartDate, day) || isAfterDay(startDate, endDate);
      var isEndDateDisabled = disabled === END_DATE;

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
        onFocusChange(null);
        onClose({
          startDate: startDate,
          endDate: endDate
        });
      } else if (!isEndDateDisabled) {
        onFocusChange(END_DATE);
      }
    } else if (focusedInput === END_DATE) {
      var firstAllowedEndDate = startDate && addDays(startDate, minimumNights);

      if (!startDate) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });
        onFocusChange(START_DATE);
      } else if (isInclusivelyAfterDay(day, firstAllowedEndDate)) {
        endDate = day;
        onDatesChange({
          startDate: startDate,
          endDate: endDate
        });

        if (!keepOpenOnDateSelect) {
          onFocusChange(null);
          onClose({
            startDate: startDate,
            endDate: endDate
          });
        }
      } else if (disabled !== START_DATE) {
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
        getMinNightsForHoverDate = _this$props4.getMinNightsForHoverDate,
        focusedInput = _this$props4.focusedInput,
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
        var start = getSelectedDateOffset(startDateOffset, day);
        var end = getSelectedDateOffset(endDateOffset, day, function (rangeDay) {
          return addDays(rangeDay, 1);
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

        if (startDate && !endDate && focusedInput === END_DATE) {
          if (isAfterDay(hoverDate, startDate)) {
            var endSpan = addDays(hoverDate, 1);
            modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
          }

          if (isBeforeDay(day, startDate) || isSameDay(day, startDate)) {
            modifiers = this.deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span');
          }

          if (!this.isBlocked(day) && isAfterDay(day, startDate)) {
            var _endSpan3 = addDays(day, 1);

            modifiers = this.addModifierToRange(modifiers, startDate, _endSpan3, 'hovered-span');
            modifiers = this.addModifier(modifiers, startDate, 'selected-start-in-hovered-span');
          }
        }

        if (!startDate && endDate && focusedInput === START_DATE) {
          if (isBeforeDay(hoverDate, endDate)) {
            modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
          }

          if (isAfterDay(day, endDate) || isSameDay(day, endDate)) {
            modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
          }

          if (!this.isBlocked(day) && isBeforeDay(day, endDate)) {
            modifiers = this.addModifierToRange(modifiers, day, endDate, 'hovered-span');
            modifiers = this.addModifier(modifiers, endDate, 'selected-end-in-hovered-span');
          }
        }

        if (startDate) {
          var startSpan = addDays(startDate, 1);

          var _endSpan4 = addDays(startDate, minimumNights + 1);

          modifiers = this.deleteModifierFromRange(modifiers, startSpan, _endSpan4, 'after-hovered-start');

          if (isSameDay(day, startDate)) {
            var newStartSpan = addDays(startDate, 1);
            var newEndSpan = addDays(startDate, minimumNights + 1);
            modifiers = this.addModifierToRange(modifiers, newStartSpan, newEndSpan, 'after-hovered-start');
          }
        }

        if (endDate) {
          var _startSpan4 = subDays(endDate, minimumNights);

          modifiers = this.deleteModifierFromRange(modifiers, _startSpan4, endDate, 'before-hovered-end');

          if (isSameDay(day, endDate)) {
            var _newStartSpan = subDays(endDate, minimumNights);

            modifiers = this.addModifierToRange(modifiers, _newStartSpan, endDate, 'before-hovered-end');
          }
        }

        if (hoverDate && !this.isBlocked(hoverDate)) {
          var minNightsForPrevHoverDate = getMinNightsForHoverDate(hoverDate);

          if (minNightsForPrevHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = this.deleteModifierFromRange(modifiers, addDays(hoverDate, 1), addDays(hoverDate, minNightsForPrevHoverDate), 'hovered-start-blocked-minimum-nights');
            modifiers = this.deleteModifier(modifiers, addDays(hoverDate, minNightsForPrevHoverDate), 'hovered-start-first-possible-end');
          }
        }

        if (!this.isBlocked(day)) {
          var minNightsForHoverDate = getMinNightsForHoverDate(day);

          if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = this.addModifierToRange(modifiers, addDays(day, 1), addDays(day, minNightsForHoverDate), 'hovered-start-blocked-minimum-nights');
            modifiers = this.addModifier(modifiers, addDays(day, minNightsForHoverDate), 'hovered-start-first-possible-end');
          }
        }
      }

      this.setState({
        hoverDate: day,
        dateOffset: nextDateOffset,
        visibleDays: _objectSpread(_objectSpread({}, visibleDays), modifiers)
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

    if (startDate && !endDate) {
      if (isAfterDay(hoverDate, startDate)) {
        var endSpan = addDays(hoverDate, 1);
        modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
      }

      if (isAfterDay(day, startDate)) {
        modifiers = this.deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span');
      }
    }

    if (!startDate && endDate) {
      if (isAfterDay(endDate, hoverDate)) {
        modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
      }

      if (isBeforeDay(day, endDate)) {
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
      }
    }

    if (startDate && isSameDay(day, startDate)) {
      var startSpan = addDays(startDate, 1);

      var _endSpan5 = addDays(startDate, minimumNights + 1);

      modifiers = this.deleteModifierFromRange(modifiers, startSpan, _endSpan5, 'after-hovered-start');
    }

    if (endDate && isSameDay(day, endDate)) {
      var _startSpan5 = subDays(endDate, minimumNights);

      modifiers = this.deleteModifierFromRange(modifiers, _startSpan5, endDate, 'before-hovered-end');
    }

    if (!this.isBlocked(hoverDate)) {
      var minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);

      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        modifiers = this.deleteModifierFromRange(modifiers, addDays(hoverDate, 1), addDays(hoverDate, minNightsForHoverDate), 'hovered-start-blocked-minimum-nights');
        modifiers = this.deleteModifier(modifiers, addDays(hoverDate, minNightsForHoverDate), 'hovered-start-first-possible-end');
      }
    }

    this.setState({
      hoverDate: null,
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), modifiers)
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
    var prevMonth = subMonths(currentMonth, 2);
    var locale = this.props.locale;
    var prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays, true, locale);
    var newCurrentMonth = subMonths(currentMonth, 1);
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shoulddisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shoulddisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread(_objectSpread({}, newVisibleDays), this.getModifiers(prevMonthVisibleDays))
    }, function () {
      onPrevMonthClick(new Date(newCurrentMonth));
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
    var nextMonth = addMonths(currentMonth, numberOfMonths + 1);
    var locale = this.props.locale;
    var nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays, true, locale);
    var newCurrentMonth = addMonths(currentMonth, 1);
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shoulddisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shoulddisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: _objectSpread(_objectSpread({}, newVisibleDays), this.getModifiers(nextMonthVisibleDays))
    }, function () {
      onNextMonthClick(new Date(newCurrentMonth));
    });
  };

  _proto.onMonthChange = function onMonthChange(newMonth) {
    var _this$props8 = this.props,
        numberOfMonths = _this$props8.numberOfMonths,
        enableOutsideDays = _this$props8.enableOutsideDays,
        orientation = _this$props8.orientation;
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var locale = this.props.locale;
    var newVisibleDays = getVisibleDays(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths, locale);
    this.setState({
      currentMonth: new Date(newMonth),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };

  _proto.onYearChange = function onYearChange(newMonth) {
    var _this$props9 = this.props,
        numberOfMonths = _this$props9.numberOfMonths,
        enableOutsideDays = _this$props9.enableOutsideDays,
        orientation = _this$props9.orientation;
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var locale = this.props.locale;
    var newVisibleDays = getVisibleDays(newMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths, locale);
    this.setState({
      currentMonth: new Date(newMonth),
      visibleDays: this.getModifiers(newVisibleDays)
    });
  };

  _proto.onGetNextScrollableMonths = function onGetNextScrollableMonths() {
    var _this$props10 = this.props,
        numberOfMonths = _this$props10.numberOfMonths,
        enableOutsideDays = _this$props10.enableOutsideDays;
    var _this$state5 = this.state,
        currentMonth = _this$state5.currentMonth,
        visibleDays = _this$state5.visibleDays;
    var numberOfVisibleMonths = Object.keys(visibleDays).length;
    var nextMonth = addMonths(currentMonth, numberOfVisibleMonths);
    var locale = this.props.locale;
    var newVisibleDays = getVisibleDays(nextMonth, numberOfMonths, enableOutsideDays, true, locale);
    this.setState({
      visibleDays: _objectSpread(_objectSpread({}, visibleDays), this.getModifiers(newVisibleDays))
    });
  };

  _proto.onGetPrevScrollableMonths = function onGetPrevScrollableMonths() {
    var _this$props11 = this.props,
        numberOfMonths = _this$props11.numberOfMonths,
        enableOutsideDays = _this$props11.enableOutsideDays;
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

    var _this$props12 = this.props,
        startDate = _this$props12.startDate,
        endDate = _this$props12.endDate,
        focusedInput = _this$props12.focusedInput,
        minimumNights = _this$props12.minimumNights,
        numberOfMonths = _this$props12.numberOfMonths;
    var focusedDate = startOfMonth(newMonth);

    if (focusedInput === START_DATE && startDate) {
      focusedDate = new Date(startDate);
    } else if (focusedInput === END_DATE && !endDate && startDate) {
      focusedDate = addDays(startDate, minimumNights);
    } else if (focusedInput === END_DATE && endDate) {
      focusedDate = new Date(endDate);
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
        return !_this3.isBlocked(day);
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
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var locale = this.props.locale;
    var visibleDays = this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths, locale));
    return {
      currentMonth: currentMonth,
      visibleDays: visibleDays
    };
  };

  _proto.shoulddisableMonthNavigation = function shoulddisableMonthNavigation(date, visibleMonth) {
    if (!date) return false;
    var _this$props13 = this.props,
        numberOfMonths = _this$props13.numberOfMonths,
        enableOutsideDays = _this$props13.enableOutsideDays;
    return isDayVisible(date, visibleMonth, numberOfMonths, enableOutsideDays);
  };

  _proto.addModifier = function addModifier(updateddays, day, modifier) {
    return _addModifier(updateddays, day, modifier, this.props, this.state);
  };

  _proto.addModifierToRange = function addModifierToRange(updateddays, start, end, modifier) {
    var days = updateddays;
    var spanStart = new Date(start);

    while (isBeforeDay(spanStart, end)) {
      days = this.addModifier(days, spanStart, modifier);
      spanStart = addDays(spanStart, 1);
    }

    return days;
  };

  _proto.deleteModifier = function deleteModifier(updateddays, day, modifier) {
    return _deleteModifier(updateddays, day, modifier, this.props, this.state);
  };

  _proto.deleteModifierFromRange = function deleteModifierFromRange(updateddays, start, end, modifier) {
    var days = updateddays;
    var spanStart = new Date(start);

    while (isBeforeDay(spanStart, end)) {
      days = this.deleteModifier(days, spanStart, modifier);
      spanStart = addDays(spanStart, 1);
    }

    return days;
  };

  _proto.doesNotMeetMinimumNights = function doesNotMeetMinimumNights(day) {
    var _this$props14 = this.props,
        startDate = _this$props14.startDate,
        isOutsideRange = _this$props14.isOutsideRange,
        focusedInput = _this$props14.focusedInput,
        minimumNights = _this$props14.minimumNights;
    if (focusedInput !== END_DATE) return false;

    if (startDate) {
      var dayDiff = differenceInDays(day, addHours(startOfDay(startDate), 12));
      return dayDiff < minimumNights && dayDiff >= 0;
    }

    return isOutsideRange(subDays(day, minimumNights));
  };

  _proto.doesNotMeetMinNightsForHoveredStartDate = function doesNotMeetMinNightsForHoveredStartDate(day, hoverDate) {
    var _this$props15 = this.props,
        focusedInput = _this$props15.focusedInput,
        getMinNightsForHoverDate = _this$props15.getMinNightsForHoverDate;
    if (focusedInput !== END_DATE) return false;

    if (hoverDate && !this.isBlocked(hoverDate)) {
      var minNights = getMinNightsForHoverDate(hoverDate);
      var dayDiff = differenceInDays(day, addHours(startOfDay(hoverDate), 12));
      return dayDiff < minNights && dayDiff >= 0;
    }

    return false;
  };

  _proto.isDayAfterHoveredStartDate = function isDayAfterHoveredStartDate(day) {
    var _this$props16 = this.props,
        startDate = _this$props16.startDate,
        endDate = _this$props16.endDate,
        minimumNights = _this$props16.minimumNights;

    var _ref2 = this.state || {},
        hoverDate = _ref2.hoverDate;

    return !!startDate && !endDate && !this.isBlocked(day) && isNextDay(hoverDate, day) && minimumNights > 0 && isSameDay(hoverDate, startDate);
  };

  _proto.isEndDate = function isEndDate(day) {
    var endDate = this.props.endDate;
    return isSameDay(day, endDate);
  };

  _proto.isHovered = function isHovered(day) {
    var _ref3 = this.state || {},
        hoverDate = _ref3.hoverDate;

    var focusedInput = this.props.focusedInput;
    return !!focusedInput && isSameDay(day, hoverDate);
  };

  _proto.isInHoveredSpan = function isInHoveredSpan(day) {
    var _this$props17 = this.props,
        startDate = _this$props17.startDate,
        endDate = _this$props17.endDate;

    var _ref4 = this.state || {},
        hoverDate = _ref4.hoverDate;

    var isForwardRange = !!startDate && !endDate && ((hoverDate >= startDate ? isWithinInterval(day, {
      start: startDate,
      end: hoverDate
    }) : false) || isSameDay(hoverDate, day));
    var isBackwardRange = !!endDate && !startDate && ((hoverDate <= endDate ? isWithinInterval(day, {
      start: hoverDate,
      end: endDate
    }) : false) || isSameDay(hoverDate, day));
    var isValiddayHovered = hoverDate && !this.isBlocked(hoverDate);
    return (isForwardRange || isBackwardRange) && isValiddayHovered;
  };

  _proto.isInSelectedSpan = function isInSelectedSpan(day) {
    var _this$props18 = this.props,
        startDate = _this$props18.startDate,
        endDate = _this$props18.endDate;

    if (!isDate(startDate) || !isDate(endDate)) {
      return false;
    }

    return isWithinInterval(day, {
      start: startDate,
      end: endDate
    });
  };

  _proto.isLastInRange = function isLastInRange(day) {
    var endDate = this.props.endDate;
    return this.isInSelectedSpan(day) && isNextDay(day, endDate);
  };

  _proto.isStartDate = function isStartDate(day) {
    var startDate = this.props.startDate;
    return isSameDay(day, startDate);
  };

  _proto.isBlocked = function isBlocked(day) {
    var blockDaysViolatingMinNights = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var _this$props19 = this.props,
        isDayBlocked = _this$props19.isDayBlocked,
        isOutsideRange = _this$props19.isOutsideRange;
    return isDayBlocked(day) || isOutsideRange(day) || blockDaysViolatingMinNights && this.doesNotMeetMinimumNights(day);
  };

  _proto.isToday = function isToday(day) {
    return isSameDay(day, this.today);
  };

  _proto.isFirstDayOfWeek = function isFirstDayOfWeek(day) {
    var _this$props20 = this.props,
        firstDayOfWeek = _this$props20.firstDayOfWeek,
        locale = _this$props20.locale;

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
    var _this$props21 = this.props,
        firstDayOfWeek = _this$props21.firstDayOfWeek,
        locale = _this$props21.locale;

    if (firstDayOfWeek) {
      return isSameDay(day, endOfWeek(day, {
        weekStartsOn: firstDayOfWeek
      }));
    }

    return isSameDay(day, endOfWeek(day, {
      locale: getLocale(locale)
    }));
  };

  _proto.isFirstPossibleEndDateForHoveredStartDate = function isFirstPossibleEndDateForHoveredStartDate(day, hoverDate) {
    var _this$props22 = this.props,
        focusedInput = _this$props22.focusedInput,
        getMinNightsForHoverDate = _this$props22.getMinNightsForHoverDate;
    if (focusedInput !== END_DATE || !hoverDate || this.isBlocked(hoverDate)) return false;
    var minNights = getMinNightsForHoverDate(hoverDate);
    var firstAvailableEndDate = addDays(hoverDate, minNights);
    return isSameDay(day, firstAvailableEndDate);
  };

  _proto.beforeSelectedEnd = function beforeSelectedEnd(day) {
    var endDate = this.props.endDate;
    return isBeforeDay(day, endDate);
  };

  _proto.isDayBeforeHoveredEndDate = function isDayBeforeHoveredEndDate(day) {
    var _this$props23 = this.props,
        startDate = _this$props23.startDate,
        endDate = _this$props23.endDate,
        minimumNights = _this$props23.minimumNights;

    var _ref5 = this.state || {},
        hoverDate = _ref5.hoverDate;

    return !!endDate && !startDate && !this.isBlocked(day) && isPreviousDay(hoverDate, day) && minimumNights > 0 && isSameDay(hoverDate, endDate);
  };

  _proto.render = function render() {
    var _this$props24 = this.props,
        numberOfMonths = _this$props24.numberOfMonths,
        orientation = _this$props24.orientation,
        monthFormat = _this$props24.monthFormat,
        renderMonthText = _this$props24.renderMonthText,
        renderWeekHeaderElement = _this$props24.renderWeekHeaderElement,
        dayPickerNavigationInlineStyles = _this$props24.dayPickerNavigationInlineStyles,
        navPosition = _this$props24.navPosition,
        navPrev = _this$props24.navPrev,
        navNext = _this$props24.navNext,
        renderNavPrevButton = _this$props24.renderNavPrevButton,
        renderNavNextButton = _this$props24.renderNavNextButton,
        noNavButtons = _this$props24.noNavButtons,
        noNavNextButton = _this$props24.noNavNextButton,
        noNavPrevButton = _this$props24.noNavPrevButton,
        onOutsideClick = _this$props24.onOutsideClick,
        withPortal = _this$props24.withPortal,
        enableOutsideDays = _this$props24.enableOutsideDays,
        firstDayOfWeek = _this$props24.firstDayOfWeek,
        renderKeyboardShortcutsButton = _this$props24.renderKeyboardShortcutsButton,
        renderKeyboardShortcutsPanel = _this$props24.renderKeyboardShortcutsPanel,
        hideKeyboardShortcutsPanel = _this$props24.hideKeyboardShortcutsPanel,
        daySize = _this$props24.daySize,
        focusedInput = _this$props24.focusedInput,
        renderCalendarDay = _this$props24.renderCalendarDay,
        renderDayContents = _this$props24.renderDayContents,
        renderCalendarInfo = _this$props24.renderCalendarInfo,
        renderMonthElement = _this$props24.renderMonthElement,
        calendarInfoPosition = _this$props24.calendarInfoPosition,
        onBlur = _this$props24.onBlur,
        onShiftTab = _this$props24.onShiftTab,
        onTab = _this$props24.onTab,
        isFocused = _this$props24.isFocused,
        showKeyboardShortcuts = _this$props24.showKeyboardShortcuts,
        isRTL = _this$props24.isRTL,
        weekDayFormat = _this$props24.weekDayFormat,
        dayAriaLabelFormat = _this$props24.dayAriaLabelFormat,
        verticalHeight = _this$props24.verticalHeight,
        noBorder = _this$props24.noBorder,
        transitionDuration = _this$props24.transitionDuration,
        verticalBorderSpacing = _this$props24.verticalBorderSpacing,
        horizontalMonthPadding = _this$props24.horizontalMonthPadding,
        locale = _this$props24.locale;
    var _this$state7 = this.state,
        currentMonth = _this$state7.currentMonth,
        phrases = _this$state7.phrases,
        visibleDays = _this$state7.visibleDays,
        disablePrev = _this$state7.disablePrev,
        disableNext = _this$state7.disableNext;
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
      onTab: onTab,
      onShiftTab: onShiftTab,
      onYearChange: this.onYearChange,
      onGetNextScrollableMonths: this.onGetNextScrollableMonths,
      onGetPrevScrollableMonths: this.onGetPrevScrollableMonths,
      monthFormat: monthFormat,
      renderMonthText: renderMonthText,
      renderWeekHeaderElement: renderWeekHeaderElement,
      withPortal: withPortal,
      hidden: !focusedInput,
      initialVisibleMonth: function initialVisibleMonth() {
        return currentMonth;
      },
      daySize: daySize,
      onOutsideClick: onOutsideClick,
      disablePrev: disablePrev,
      disableNext: disableNext,
      dayPickerNavigationInlineStyles: dayPickerNavigationInlineStyles,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      noNavButtons: noNavButtons,
      noNavPrevButton: noNavPrevButton,
      noNavNextButton: noNavNextButton,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      renderKeyboardShortcutsButton: renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel: renderKeyboardShortcutsPanel,
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
      horizontalMonthPadding: horizontalMonthPadding,
      locale: locale
    });
  };

  return DayPickerRangeController;
}(React.PureComponent || React.Component);

export { DayPickerRangeController as default };
DayPickerRangeController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPickerRangeController.defaultProps = defaultProps;