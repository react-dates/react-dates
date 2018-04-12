var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

import _objectAssign from 'object.assign';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import values from 'object.values';
import isTouchDevice from 'is-touch-device';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';
import isBeforeDay from '../utils/isBeforeDay';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';

import getSelectedDateOffset from '../utils/getSelectedDateOffset';

import toISODateString from '../utils/toISODateString';
import toISOMonthString from '../utils/toISOMonthString';

import DisabledShape from '../shapes/DisabledShape';
import FocusedInputShape from '../shapes/FocusedInputShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';

import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE, INFO_POSITION_BOTTOM } from '../constants';

import DayPicker from './DayPicker';

var propTypes = forbidExtraProps({
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,

  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  disabled: DisabledShape,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  renderMonth: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  noBorder: PropTypes.bool,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  firstDayOfWeek: DayOfWeekShape,
  verticalHeight: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,

  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,

  // i18n
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,

  isRTL: PropTypes.bool
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
  renderMonth: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  daySize: DAY_SIZE,

  navPrev: null,
  navNext: null,

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
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  firstDayOfWeek: null,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,

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
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,

  isRTL: false
};

var getChooseAvailableDatePhrase = function getChooseAvailableDatePhrase(phrases, focusedInput) {
  if (focusedInput === START_DATE) {
    return phrases.chooseAvailableStartDate;
  } else if (focusedInput === END_DATE) {
    return phrases.chooseAvailableEndDate;
  }
  return phrases.chooseAvailableDate;
};

var DayPickerRangeController = function (_React$Component) {
  _inherits(DayPickerRangeController, _React$Component);

  function DayPickerRangeController(props) {
    _classCallCheck(this, DayPickerRangeController);

    var _this = _possibleConstructorReturn(this, (DayPickerRangeController.__proto__ || Object.getPrototypeOf(DayPickerRangeController)).call(this, props));

    _this.isTouchDevice = isTouchDevice();
    _this.today = moment();
    _this.modifiers = {
      today: function () {
        function today(day) {
          return _this.isToday(day);
        }

        return today;
      }(),
      blocked: function () {
        function blocked(day) {
          return _this.isBlocked(day);
        }

        return blocked;
      }(),
      'blocked-calendar': function () {
        function blockedCalendar(day) {
          return props.isDayBlocked(day);
        }

        return blockedCalendar;
      }(),
      'blocked-out-of-range': function () {
        function blockedOutOfRange(day) {
          return props.isOutsideRange(day);
        }

        return blockedOutOfRange;
      }(),
      'highlighted-calendar': function () {
        function highlightedCalendar(day) {
          return props.isDayHighlighted(day);
        }

        return highlightedCalendar;
      }(),
      valid: function () {
        function valid(day) {
          return !_this.isBlocked(day);
        }

        return valid;
      }(),
      'selected-start': function () {
        function selectedStart(day) {
          return _this.isStartDate(day);
        }

        return selectedStart;
      }(),
      'selected-end': function () {
        function selectedEnd(day) {
          return _this.isEndDate(day);
        }

        return selectedEnd;
      }(),
      'blocked-minimum-nights': function () {
        function blockedMinimumNights(day) {
          return _this.doesNotMeetMinimumNights(day);
        }

        return blockedMinimumNights;
      }(),
      'selected-span': function () {
        function selectedSpan(day) {
          return _this.isInSelectedSpan(day);
        }

        return selectedSpan;
      }(),
      'last-in-range': function () {
        function lastInRange(day) {
          return _this.isLastInRange(day);
        }

        return lastInRange;
      }(),
      hovered: function () {
        function hovered(day) {
          return _this.isHovered(day);
        }

        return hovered;
      }(),
      'hovered-span': function () {
        function hoveredSpan(day) {
          return _this.isInHoveredSpan(day);
        }

        return hoveredSpan;
      }(),
      'hovered-offset': function () {
        function hoveredOffset(day) {
          return _this.isInHoveredSpan(day);
        }

        return hoveredOffset;
      }(),
      'after-hovered-start': function () {
        function afterHoveredStart(day) {
          return _this.isDayAfterHoveredStartDate(day);
        }

        return afterHoveredStart;
      }(),
      'first-day-of-week': function () {
        function firstDayOfWeek(day) {
          return _this.isFirstDayOfWeek(day);
        }

        return firstDayOfWeek;
      }(),
      'last-day-of-week': function () {
        function lastDayOfWeek(day) {
          return _this.isLastDayOfWeek(day);
        }

        return lastDayOfWeek;
      }()
    };

    var _this$getStateForNewM = _this.getStateForNewMonth(props),
        currentMonth = _this$getStateForNewM.currentMonth,
        visibleDays = _this$getStateForNewM.visibleDays;

    // initialize phrases
    // set the appropriate CalendarDay phrase based on focusedInput


    var chooseAvailableDate = getChooseAvailableDatePhrase(props.phrases, props.focusedInput);

    _this.state = {
      hoverDate: null,
      currentMonth: currentMonth,
      phrases: _objectAssign({}, props.phrases, {
        chooseAvailableDate: chooseAvailableDate
      }),
      visibleDays: visibleDays
    };

    _this.onDayClick = _this.onDayClick.bind(_this);
    _this.onDayMouseEnter = _this.onDayMouseEnter.bind(_this);
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind(_this);
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_this);
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_this);
    _this.onMultiplyScrollableMonths = _this.onMultiplyScrollableMonths.bind(_this);
    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind(_this);
    _this.setDayPickerRef = _this.setDayPickerRef.bind(_this);
    return _this;
  }

  _createClass(DayPickerRangeController, [{
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var startDate = nextProps.startDate,
            endDate = nextProps.endDate,
            focusedInput = nextProps.focusedInput,
            minimumNights = nextProps.minimumNights,
            isOutsideRange = nextProps.isOutsideRange,
            isDayBlocked = nextProps.isDayBlocked,
            isDayHighlighted = nextProps.isDayHighlighted,
            phrases = nextProps.phrases,
            initialVisibleMonth = nextProps.initialVisibleMonth,
            numberOfMonths = nextProps.numberOfMonths,
            enableOutsideDays = nextProps.enableOutsideDays;
        var _props = this.props,
            prevStartDate = _props.startDate,
            prevEndDate = _props.endDate,
            prevFocusedInput = _props.focusedInput,
            prevMinimumNights = _props.minimumNights,
            prevIsOutsideRange = _props.isOutsideRange,
            prevIsDayBlocked = _props.isDayBlocked,
            prevIsDayHighlighted = _props.isDayHighlighted,
            prevPhrases = _props.phrases,
            prevInitialVisibleMonth = _props.initialVisibleMonth,
            prevNumberOfMonths = _props.numberOfMonths,
            prevEnableOutsideDays = _props.enableOutsideDays;
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

        if (minimumNights > 0 || minimumNights !== prevMinimumNights) {
          if (didFocusChange || didStartDateChange) {
            var _startSpan2 = prevStartDate || this.today;
            modifiers = this.deleteModifierFromRange(modifiers, _startSpan2, _startSpan2.clone().add(minimumNights, 'days'), 'blocked-minimum-nights');
          }

          if (startDate && focusedInput === END_DATE) {
            modifiers = this.addModifierToRange(modifiers, startDate, startDate.clone().add(minimumNights, 'days'), 'blocked-minimum-nights');
          }
        }

        if (didFocusChange || recomputePropModifiers) {
          values(visibleDays).forEach(function (days) {
            Object.keys(days).forEach(function (day) {
              var momentObj = moment(day);

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
            visibleDays: _objectAssign({}, visibleDays, modifiers)
          });
        }

        if (didFocusChange || phrases !== prevPhrases) {
          // set the appropriate CalendarDay phrase based on focusedInput
          var chooseAvailableDate = getChooseAvailableDatePhrase(phrases, focusedInput);

          this.setState({
            phrases: _objectAssign({}, phrases, {
              chooseAvailableDate: chooseAvailableDate
            })
          });
        }
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'onDayClick',
    value: function () {
      function onDayClick(day, e) {
        var _props2 = this.props,
            keepOpenOnDateSelect = _props2.keepOpenOnDateSelect,
            minimumNights = _props2.minimumNights,
            onBlur = _props2.onBlur,
            focusedInput = _props2.focusedInput,
            onFocusChange = _props2.onFocusChange,
            onClose = _props2.onClose,
            onDatesChange = _props2.onDatesChange,
            startDateOffset = _props2.startDateOffset,
            endDateOffset = _props2.endDateOffset,
            disabled = _props2.disabled;


        if (e) e.preventDefault();
        if (this.isBlocked(day)) return;

        var _props3 = this.props,
            startDate = _props3.startDate,
            endDate = _props3.endDate;


        if (startDateOffset || endDateOffset) {
          startDate = getSelectedDateOffset(startDateOffset, day);
          endDate = getSelectedDateOffset(endDateOffset, day);

          if (!keepOpenOnDateSelect) {
            onFocusChange(null);
            onClose({ startDate: startDate, endDate: endDate });
          }
        } else if (focusedInput === START_DATE) {
          var lastAllowedStartDate = endDate && endDate.clone().subtract(minimumNights, 'days');
          var isStartDateAfterEndDate = isBeforeDay(lastAllowedStartDate, day) || isAfterDay(startDate, endDate);
          var isEndDateDisabled = disabled === END_DATE;

          if (!isEndDateDisabled || !isStartDateAfterEndDate) {
            startDate = day;
            if (isStartDateAfterEndDate) {
              endDate = null;
            }
          }

          if (isEndDateDisabled && !isStartDateAfterEndDate) {
            onFocusChange(null);
            onClose({ startDate: startDate, endDate: endDate });
          } else if (!isEndDateDisabled) {
            onFocusChange(END_DATE);
          }
        } else if (focusedInput === END_DATE) {
          var firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

          if (!startDate) {
            endDate = day;
            onFocusChange(START_DATE);
          } else if (isInclusivelyAfterDay(day, firstAllowedEndDate)) {
            endDate = day;
            if (!keepOpenOnDateSelect) {
              onFocusChange(null);
              onClose({ startDate: startDate, endDate: endDate });
            }
          } else if (disabled !== START_DATE) {
            startDate = day;
            endDate = null;
          }
        }

        onDatesChange({ startDate: startDate, endDate: endDate });
        onBlur();
      }

      return onDayClick;
    }()
  }, {
    key: 'onDayMouseEnter',
    value: function () {
      function onDayMouseEnter(day) {
        if (this.isTouchDevice) return;
        var _props4 = this.props,
            startDate = _props4.startDate,
            endDate = _props4.endDate,
            focusedInput = _props4.focusedInput,
            minimumNights = _props4.minimumNights,
            startDateOffset = _props4.startDateOffset,
            endDateOffset = _props4.endDateOffset;
        var _state = this.state,
            hoverDate = _state.hoverDate,
            visibleDays = _state.visibleDays;

        var dateOffset = null;

        if (focusedInput) {
          var hasOffset = startDateOffset || endDateOffset;
          var modifiers = {};

          if (hasOffset) {
            var start = getSelectedDateOffset(startDateOffset, day);
            var end = getSelectedDateOffset(endDateOffset, day, function (rangeDay) {
              return rangeDay.add(1, 'day');
            });

            dateOffset = {
              start: start,
              end: end
            };

            if (this.state.dateOffset && this.state.dateOffset.start && this.state.dateOffset.end) {
              modifiers = this.deleteModifierFromRange(modifiers, this.state.dateOffset.start, this.state.dateOffset.end, 'hovered-offset');
            }
            modifiers = this.addModifierToRange(modifiers, start, end, 'hovered-offset');
          }

          if (!hasOffset) {
            modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');
            modifiers = this.addModifier(modifiers, day, 'hovered');

            if (startDate && !endDate && focusedInput === END_DATE) {
              if (isAfterDay(hoverDate, startDate)) {
                var endSpan = hoverDate.clone().add(1, 'day');
                modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
              }

              if (!this.isBlocked(day) && isAfterDay(day, startDate)) {
                var _endSpan2 = day.clone().add(1, 'day');
                modifiers = this.addModifierToRange(modifiers, startDate, _endSpan2, 'hovered-span');
              }
            }

            if (!startDate && endDate && focusedInput === START_DATE) {
              if (isBeforeDay(hoverDate, endDate)) {
                modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
              }

              if (!this.isBlocked(day) && isBeforeDay(day, endDate)) {
                modifiers = this.addModifierToRange(modifiers, day, endDate, 'hovered-span');
              }
            }

            if (startDate) {
              var startSpan = startDate.clone().add(1, 'day');
              var _endSpan3 = startDate.clone().add(minimumNights + 1, 'days');
              modifiers = this.deleteModifierFromRange(modifiers, startSpan, _endSpan3, 'after-hovered-start');

              if (isSameDay(day, startDate)) {
                var newStartSpan = startDate.clone().add(1, 'day');
                var newEndSpan = startDate.clone().add(minimumNights + 1, 'days');
                modifiers = this.addModifierToRange(modifiers, newStartSpan, newEndSpan, 'after-hovered-start');
              }
            }
          }

          this.setState({
            hoverDate: day,
            dateOffset: dateOffset,
            visibleDays: _objectAssign({}, visibleDays, modifiers)
          });
        }
      }

      return onDayMouseEnter;
    }()
  }, {
    key: 'onDayMouseLeave',
    value: function () {
      function onDayMouseLeave(day) {
        var _props5 = this.props,
            startDate = _props5.startDate,
            endDate = _props5.endDate,
            minimumNights = _props5.minimumNights;
        var _state2 = this.state,
            hoverDate = _state2.hoverDate,
            visibleDays = _state2.visibleDays,
            dateOffset = _state2.dateOffset;

        if (this.isTouchDevice || !hoverDate) return;

        var modifiers = {};
        modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');

        if (dateOffset) {
          modifiers = this.deleteModifierFromRange(modifiers, this.state.dateOffset.start, this.state.dateOffset.end, 'hovered-offset');
        }

        if (startDate && !endDate && isAfterDay(hoverDate, startDate)) {
          var endSpan = hoverDate.clone().add(1, 'day');
          modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
        }

        if (!startDate && endDate && isAfterDay(endDate, hoverDate)) {
          modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
        }

        if (startDate && isSameDay(day, startDate)) {
          var startSpan = startDate.clone().add(1, 'day');
          var _endSpan4 = startDate.clone().add(minimumNights + 1, 'days');
          modifiers = this.deleteModifierFromRange(modifiers, startSpan, _endSpan4, 'after-hovered-start');
        }

        this.setState({
          hoverDate: null,
          visibleDays: _objectAssign({}, visibleDays, modifiers)
        });
      }

      return onDayMouseLeave;
    }()
  }, {
    key: 'onPrevMonthClick',
    value: function () {
      function onPrevMonthClick() {
        var _props6 = this.props,
            onPrevMonthClick = _props6.onPrevMonthClick,
            numberOfMonths = _props6.numberOfMonths,
            enableOutsideDays = _props6.enableOutsideDays;
        var _state3 = this.state,
            currentMonth = _state3.currentMonth,
            visibleDays = _state3.visibleDays;


        var newVisibleDays = {};
        Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach(function (month) {
          newVisibleDays[month] = visibleDays[month];
        });

        var prevMonth = currentMonth.clone().subtract(2, 'months');
        var prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays, true);

        var newCurrentMonth = currentMonth.clone().subtract(1, 'month');
        this.setState({
          currentMonth: newCurrentMonth,
          visibleDays: _objectAssign({}, newVisibleDays, this.getModifiers(prevMonthVisibleDays))
        }, function () {
          onPrevMonthClick(newCurrentMonth.clone());
        });
      }

      return onPrevMonthClick;
    }()
  }, {
    key: 'onNextMonthClick',
    value: function () {
      function onNextMonthClick() {
        var _props7 = this.props,
            onNextMonthClick = _props7.onNextMonthClick,
            numberOfMonths = _props7.numberOfMonths,
            enableOutsideDays = _props7.enableOutsideDays;
        var _state4 = this.state,
            currentMonth = _state4.currentMonth,
            visibleDays = _state4.visibleDays;


        var newVisibleDays = {};
        Object.keys(visibleDays).sort().slice(1).forEach(function (month) {
          newVisibleDays[month] = visibleDays[month];
        });

        var nextMonth = currentMonth.clone().add(numberOfMonths + 1, 'month');
        var nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays, true);

        var newCurrentMonth = currentMonth.clone().add(1, 'month');
        this.setState({
          currentMonth: newCurrentMonth,
          visibleDays: _objectAssign({}, newVisibleDays, this.getModifiers(nextMonthVisibleDays))
        }, function () {
          onNextMonthClick(newCurrentMonth.clone());
        });
      }

      return onNextMonthClick;
    }()
  }, {
    key: 'onMultiplyScrollableMonths',
    value: function () {
      function onMultiplyScrollableMonths() {
        var _props8 = this.props,
            numberOfMonths = _props8.numberOfMonths,
            enableOutsideDays = _props8.enableOutsideDays;
        var _state5 = this.state,
            currentMonth = _state5.currentMonth,
            visibleDays = _state5.visibleDays;


        var numberOfVisibleMonths = Object.keys(visibleDays).length;
        var nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
        var newVisibleDays = getVisibleDays(nextMonth, numberOfMonths, enableOutsideDays, true);

        this.setState({
          visibleDays: _objectAssign({}, visibleDays, this.getModifiers(newVisibleDays))
        });
      }

      return onMultiplyScrollableMonths;
    }()
  }, {
    key: 'getFirstFocusableDay',
    value: function () {
      function getFirstFocusableDay(newMonth) {
        var _this3 = this;

        var _props9 = this.props,
            startDate = _props9.startDate,
            endDate = _props9.endDate,
            focusedInput = _props9.focusedInput,
            minimumNights = _props9.minimumNights,
            numberOfMonths = _props9.numberOfMonths;


        var focusedDate = newMonth.clone().startOf('month');
        if (focusedInput === START_DATE && startDate) {
          focusedDate = startDate.clone();
        } else if (focusedInput === END_DATE && !endDate && startDate) {
          focusedDate = startDate.clone().add(minimumNights, 'days');
        } else if (focusedInput === END_DATE && endDate) {
          focusedDate = endDate.clone();
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
            return !_this3.isBlocked(day);
          });

          if (viableDays.length > 0) {
            var _viableDays = _slicedToArray(viableDays, 1);

            focusedDate = _viableDays[0];
          }
        }

        return focusedDate;
      }

      return getFirstFocusableDay;
    }()
  }, {
    key: 'getModifiers',
    value: function () {
      function getModifiers(visibleDays) {
        var _this4 = this;

        var modifiers = {};
        Object.keys(visibleDays).forEach(function (month) {
          modifiers[month] = {};
          visibleDays[month].forEach(function (day) {
            modifiers[month][toISODateString(day)] = _this4.getModifiersForDay(day);
          });
        });

        return modifiers;
      }

      return getModifiers;
    }()
  }, {
    key: 'getModifiersForDay',
    value: function () {
      function getModifiersForDay(day) {
        var _this5 = this;

        return new Set(Object.keys(this.modifiers).filter(function (modifier) {
          return _this5.modifiers[modifier](day);
        }));
      }

      return getModifiersForDay;
    }()
  }, {
    key: 'getStateForNewMonth',
    value: function () {
      function getStateForNewMonth(nextProps) {
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
        var visibleDays = this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays, withoutTransitionMonths));
        return { currentMonth: currentMonth, visibleDays: visibleDays };
      }

      return getStateForNewMonth;
    }()
  }, {
    key: 'setDayPickerRef',
    value: function () {
      function setDayPickerRef(ref) {
        this.dayPicker = ref;
      }

      return setDayPickerRef;
    }()
  }, {
    key: 'addModifier',
    value: function () {
      function addModifier(updatedDays, day, modifier) {
        var _props10 = this.props,
            numberOfVisibleMonths = _props10.numberOfMonths,
            enableOutsideDays = _props10.enableOutsideDays,
            orientation = _props10.orientation;
        var _state6 = this.state,
            firstVisibleMonth = _state6.currentMonth,
            visibleDays = _state6.visibleDays;


        var currentMonth = firstVisibleMonth;
        var numberOfMonths = numberOfVisibleMonths;
        if (orientation !== VERTICAL_SCROLLABLE) {
          currentMonth = currentMonth.clone().subtract(1, 'month');
          numberOfMonths += 2;
        }
        if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
          return updatedDays;
        }

        var iso = toISODateString(day);

        var updatedDaysAfterAddition = _objectAssign({}, updatedDays);
        if (enableOutsideDays) {
          var monthsToUpdate = Object.keys(visibleDays).filter(function (monthKey) {
            return Object.keys(visibleDays[monthKey]).indexOf(iso) > -1;
          });

          updatedDaysAfterAddition = monthsToUpdate.reduce(function (days, monthIso) {
            var month = updatedDays[monthIso] || visibleDays[monthIso];
            var modifiers = new Set(month[iso]);
            modifiers.add(modifier);
            return _objectAssign({}, days, _defineProperty({}, monthIso, _objectAssign({}, month, _defineProperty({}, iso, modifiers))));
          }, updatedDaysAfterAddition);
        } else {
          var monthIso = toISOMonthString(day);
          var month = updatedDays[monthIso] || visibleDays[monthIso];

          var modifiers = new Set(month[iso]);
          modifiers.add(modifier);
          updatedDaysAfterAddition = _objectAssign({}, updatedDaysAfterAddition, _defineProperty({}, monthIso, _objectAssign({}, month, _defineProperty({}, iso, modifiers))));
        }

        return updatedDaysAfterAddition;
      }

      return addModifier;
    }()
  }, {
    key: 'addModifierToRange',
    value: function () {
      function addModifierToRange(updatedDays, start, end, modifier) {
        var days = updatedDays;

        var spanStart = start.clone();
        while (isBeforeDay(spanStart, end)) {
          days = this.addModifier(days, spanStart, modifier);
          spanStart = spanStart.clone().add(1, 'day');
        }

        return days;
      }

      return addModifierToRange;
    }()
  }, {
    key: 'deleteModifier',
    value: function () {
      function deleteModifier(updatedDays, day, modifier) {
        var _props11 = this.props,
            numberOfVisibleMonths = _props11.numberOfMonths,
            enableOutsideDays = _props11.enableOutsideDays,
            orientation = _props11.orientation;
        var _state7 = this.state,
            firstVisibleMonth = _state7.currentMonth,
            visibleDays = _state7.visibleDays;


        var currentMonth = firstVisibleMonth;
        var numberOfMonths = numberOfVisibleMonths;
        if (orientation !== VERTICAL_SCROLLABLE) {
          currentMonth = currentMonth.clone().subtract(1, 'month');
          numberOfMonths += 2;
        }
        if (!day || !isDayVisible(day, currentMonth, numberOfMonths, enableOutsideDays)) {
          return updatedDays;
        }

        var iso = toISODateString(day);

        var updatedDaysAfterDeletion = _objectAssign({}, updatedDays);
        if (enableOutsideDays) {
          var monthsToUpdate = Object.keys(visibleDays).filter(function (monthKey) {
            return Object.keys(visibleDays[monthKey]).indexOf(iso) > -1;
          });

          updatedDaysAfterDeletion = monthsToUpdate.reduce(function (days, monthIso) {
            var month = updatedDays[monthIso] || visibleDays[monthIso];
            var modifiers = new Set(month[iso]);
            modifiers['delete'](modifier);
            return _objectAssign({}, days, _defineProperty({}, monthIso, _objectAssign({}, month, _defineProperty({}, iso, modifiers))));
          }, updatedDaysAfterDeletion);
        } else {
          var monthIso = toISOMonthString(day);
          var month = updatedDays[monthIso] || visibleDays[monthIso];

          var modifiers = new Set(month[iso]);
          modifiers['delete'](modifier);
          updatedDaysAfterDeletion = _objectAssign({}, updatedDaysAfterDeletion, _defineProperty({}, monthIso, _objectAssign({}, month, _defineProperty({}, iso, modifiers))));
        }

        return updatedDaysAfterDeletion;
      }

      return deleteModifier;
    }()
  }, {
    key: 'deleteModifierFromRange',
    value: function () {
      function deleteModifierFromRange(updatedDays, start, end, modifier) {
        var days = updatedDays;

        var spanStart = start.clone();
        while (isBeforeDay(spanStart, end)) {
          days = this.deleteModifier(days, spanStart, modifier);
          spanStart = spanStart.clone().add(1, 'day');
        }

        return days;
      }

      return deleteModifierFromRange;
    }()
  }, {
    key: 'doesNotMeetMinimumNights',
    value: function () {
      function doesNotMeetMinimumNights(day) {
        var _props12 = this.props,
            startDate = _props12.startDate,
            isOutsideRange = _props12.isOutsideRange,
            focusedInput = _props12.focusedInput,
            minimumNights = _props12.minimumNights;

        if (focusedInput !== END_DATE) return false;

        if (startDate) {
          var dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
          return dayDiff < minimumNights && dayDiff >= 0;
        }
        return isOutsideRange(moment(day).subtract(minimumNights, 'days'));
      }

      return doesNotMeetMinimumNights;
    }()
  }, {
    key: 'isDayAfterHoveredStartDate',
    value: function () {
      function isDayAfterHoveredStartDate(day) {
        var _props13 = this.props,
            startDate = _props13.startDate,
            endDate = _props13.endDate,
            minimumNights = _props13.minimumNights;

        var _ref = this.state || {},
            hoverDate = _ref.hoverDate;

        return !!startDate && !endDate && !this.isBlocked(day) && isNextDay(hoverDate, day) && minimumNights > 0 && isSameDay(hoverDate, startDate);
      }

      return isDayAfterHoveredStartDate;
    }()
  }, {
    key: 'isEndDate',
    value: function () {
      function isEndDate(day) {
        return isSameDay(day, this.props.endDate);
      }

      return isEndDate;
    }()
  }, {
    key: 'isHovered',
    value: function () {
      function isHovered(day) {
        var _ref2 = this.state || {},
            hoverDate = _ref2.hoverDate;

        var focusedInput = this.props.focusedInput;

        return !!focusedInput && isSameDay(day, hoverDate);
      }

      return isHovered;
    }()
  }, {
    key: 'isInHoveredSpan',
    value: function () {
      function isInHoveredSpan(day) {
        var _props14 = this.props,
            startDate = _props14.startDate,
            endDate = _props14.endDate;

        var _ref3 = this.state || {},
            hoverDate = _ref3.hoverDate;

        var isForwardRange = !!startDate && !endDate && (day.isBetween(startDate, hoverDate) || isSameDay(hoverDate, day));
        var isBackwardRange = !!endDate && !startDate && (day.isBetween(hoverDate, endDate) || isSameDay(hoverDate, day));

        var isValidDayHovered = hoverDate && !this.isBlocked(hoverDate);

        return (isForwardRange || isBackwardRange) && isValidDayHovered;
      }

      return isInHoveredSpan;
    }()
  }, {
    key: 'isInSelectedSpan',
    value: function () {
      function isInSelectedSpan(day) {
        var _props15 = this.props,
            startDate = _props15.startDate,
            endDate = _props15.endDate;

        return day.isBetween(startDate, endDate);
      }

      return isInSelectedSpan;
    }()
  }, {
    key: 'isLastInRange',
    value: function () {
      function isLastInRange(day) {
        return this.isInSelectedSpan(day) && isNextDay(day, this.props.endDate);
      }

      return isLastInRange;
    }()
  }, {
    key: 'isStartDate',
    value: function () {
      function isStartDate(day) {
        return isSameDay(day, this.props.startDate);
      }

      return isStartDate;
    }()
  }, {
    key: 'isBlocked',
    value: function () {
      function isBlocked(day) {
        var _props16 = this.props,
            isDayBlocked = _props16.isDayBlocked,
            isOutsideRange = _props16.isOutsideRange;

        return isDayBlocked(day) || isOutsideRange(day) || this.doesNotMeetMinimumNights(day);
      }

      return isBlocked;
    }()
  }, {
    key: 'isToday',
    value: function () {
      function isToday(day) {
        return isSameDay(day, this.today);
      }

      return isToday;
    }()
  }, {
    key: 'isFirstDayOfWeek',
    value: function () {
      function isFirstDayOfWeek(day) {
        var firstDayOfWeek = this.props.firstDayOfWeek;

        return day.day() === (firstDayOfWeek || moment.localeData().firstDayOfWeek());
      }

      return isFirstDayOfWeek;
    }()
  }, {
    key: 'isLastDayOfWeek',
    value: function () {
      function isLastDayOfWeek(day) {
        var firstDayOfWeek = this.props.firstDayOfWeek;

        return day.day() === ((firstDayOfWeek || moment.localeData().firstDayOfWeek()) + 6) % 7;
      }

      return isLastDayOfWeek;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props17 = this.props,
            numberOfMonths = _props17.numberOfMonths,
            orientation = _props17.orientation,
            monthFormat = _props17.monthFormat,
            renderMonth = _props17.renderMonth,
            navPrev = _props17.navPrev,
            navNext = _props17.navNext,
            onOutsideClick = _props17.onOutsideClick,
            withPortal = _props17.withPortal,
            enableOutsideDays = _props17.enableOutsideDays,
            firstDayOfWeek = _props17.firstDayOfWeek,
            hideKeyboardShortcutsPanel = _props17.hideKeyboardShortcutsPanel,
            daySize = _props17.daySize,
            focusedInput = _props17.focusedInput,
            renderCalendarDay = _props17.renderCalendarDay,
            renderDayContents = _props17.renderDayContents,
            renderCalendarInfo = _props17.renderCalendarInfo,
            calendarInfoPosition = _props17.calendarInfoPosition,
            onBlur = _props17.onBlur,
            isFocused = _props17.isFocused,
            showKeyboardShortcuts = _props17.showKeyboardShortcuts,
            isRTL = _props17.isRTL,
            weekDayFormat = _props17.weekDayFormat,
            dayAriaLabelFormat = _props17.dayAriaLabelFormat,
            verticalHeight = _props17.verticalHeight,
            noBorder = _props17.noBorder,
            transitionDuration = _props17.transitionDuration;
        var _state8 = this.state,
            currentMonth = _state8.currentMonth,
            phrases = _state8.phrases,
            visibleDays = _state8.visibleDays;


        return React.createElement(DayPicker, {
          ref: this.setDayPickerRef,
          orientation: orientation,
          enableOutsideDays: enableOutsideDays,
          modifiers: visibleDays,
          numberOfMonths: numberOfMonths,
          onDayClick: this.onDayClick,
          onDayMouseEnter: this.onDayMouseEnter,
          onDayMouseLeave: this.onDayMouseLeave,
          onPrevMonthClick: this.onPrevMonthClick,
          onNextMonthClick: this.onNextMonthClick,
          onMultiplyScrollableMonths: this.onMultiplyScrollableMonths,
          monthFormat: monthFormat,
          renderMonth: renderMonth,
          withPortal: withPortal,
          hidden: !focusedInput,
          initialVisibleMonth: function () {
            function initialVisibleMonth() {
              return currentMonth;
            }

            return initialVisibleMonth;
          }(),
          daySize: daySize,
          onOutsideClick: onOutsideClick,
          navPrev: navPrev,
          navNext: navNext,
          renderCalendarDay: renderCalendarDay,
          renderDayContents: renderDayContents,
          renderCalendarInfo: renderCalendarInfo,
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
          noBorder: noBorder,
          transitionDuration: transitionDuration
        });
      }

      return render;
    }()
  }]);

  return DayPickerRangeController;
}(React.Component);

export default DayPickerRangeController;


DayPickerRangeController.propTypes = propTypes;
DayPickerRangeController.defaultProps = defaultProps;