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

import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';

import toISODateString from '../utils/toISODateString';
import toISOMonthString from '../utils/toISOMonthString';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE, INFO_POSITION_BOTTOM } from '../constants';

import DayPicker from './DayPicker';
import OutsideClickHandler from './OutsideClickHandler';

var propTypes = forbidExtraProps({
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func,

  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
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
  firstDayOfWeek: DayOfWeekShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  verticalHeight: nonNegativeInteger,
  noBorder: PropTypes.bool,
  transitionDuration: nonNegativeInteger,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

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

  // i18n
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,

  isRTL: PropTypes.bool
});

var defaultProps = {
  date: undefined, // TODO: use null
  onDateChange: function () {
    function onDateChange() {}

    return onDateChange;
  }(),


  focused: false,
  onFocusChange: function () {
    function onFocusChange() {}

    return onFocusChange;
  }(),
  onClose: function () {
    function onClose() {}

    return onClose;
  }(),


  keepOpenOnDateSelect: false,
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
  firstDayOfWeek: null,
  daySize: DAY_SIZE,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,

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

  onOutsideClick: null,

  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,

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

var DayPickerSingleDateController = function (_React$Component) {
  _inherits(DayPickerSingleDateController, _React$Component);

  function DayPickerSingleDateController(props) {
    _classCallCheck(this, DayPickerSingleDateController);

    var _this = _possibleConstructorReturn(this, (DayPickerSingleDateController.__proto__ || Object.getPrototypeOf(DayPickerSingleDateController)).call(this, props));

    _this.isTouchDevice = false;
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
      hovered: function () {
        function hovered(day) {
          return _this.isHovered(day);
        }

        return hovered;
      }(),
      selected: function () {
        function selected(day) {
          return _this.isSelected(day);
        }

        return selected;
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

    _this.state = {
      hoverDate: null,
      currentMonth: currentMonth,
      visibleDays: visibleDays
    };

    _this.onDayMouseEnter = _this.onDayMouseEnter.bind(_this);
    _this.onDayMouseLeave = _this.onDayMouseLeave.bind(_this);
    _this.onDayClick = _this.onDayClick.bind(_this);

    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_this);
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_this);

    _this.getFirstFocusableDay = _this.getFirstFocusableDay.bind(_this);
    return _this;
  }

  _createClass(DayPickerSingleDateController, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.isTouchDevice = isTouchDevice();
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var date = nextProps.date,
            focused = nextProps.focused,
            isOutsideRange = nextProps.isOutsideRange,
            isDayBlocked = nextProps.isDayBlocked,
            isDayHighlighted = nextProps.isDayHighlighted,
            initialVisibleMonth = nextProps.initialVisibleMonth,
            numberOfMonths = nextProps.numberOfMonths,
            enableOutsideDays = nextProps.enableOutsideDays;
        var visibleDays = this.state.visibleDays;


        var recomputeOutsideRange = false;
        var recomputeDayBlocked = false;
        var recomputeDayHighlighted = false;

        if (isOutsideRange !== this.props.isOutsideRange) {
          this.modifiers['blocked-out-of-range'] = function (day) {
            return isOutsideRange(day);
          };
          recomputeOutsideRange = true;
        }

        if (isDayBlocked !== this.props.isDayBlocked) {
          this.modifiers['blocked-calendar'] = function (day) {
            return isDayBlocked(day);
          };
          recomputeDayBlocked = true;
        }

        if (isDayHighlighted !== this.props.isDayHighlighted) {
          this.modifiers['highlighted-calendar'] = function (day) {
            return isDayHighlighted(day);
          };
          recomputeDayHighlighted = true;
        }

        var recomputePropModifiers = recomputeOutsideRange || recomputeDayBlocked || recomputeDayHighlighted;

        if (numberOfMonths !== this.props.numberOfMonths || enableOutsideDays !== this.props.enableOutsideDays || initialVisibleMonth !== this.props.initialVisibleMonth && !this.props.focused && focused) {
          var newMonthState = this.getStateForNewMonth(nextProps);
          var currentMonth = newMonthState.currentMonth;
          visibleDays = newMonthState.visibleDays;

          this.setState({
            currentMonth: currentMonth,
            visibleDays: visibleDays
          });
        }

        var didDateChange = date !== this.props.date;
        var didFocusChange = focused !== this.props.focused;

        var modifiers = {};

        if (didDateChange) {
          modifiers = this.deleteModifier(modifiers, this.props.date, 'selected');
          modifiers = this.addModifier(modifiers, date, 'selected');
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
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'componentWillUpdate',
    value: function () {
      function componentWillUpdate() {
        this.today = moment();
      }

      return componentWillUpdate;
    }()
  }, {
    key: 'onDayClick',
    value: function () {
      function onDayClick(day, e) {
        if (e) e.preventDefault();
        if (this.isBlocked(day)) return;
        var _props = this.props,
            onDateChange = _props.onDateChange,
            keepOpenOnDateSelect = _props.keepOpenOnDateSelect,
            onFocusChange = _props.onFocusChange,
            onClose = _props.onClose;


        onDateChange(day);
        if (!keepOpenOnDateSelect) {
          onFocusChange({ focused: false });
          onClose({ date: day });
        }
      }

      return onDayClick;
    }()
  }, {
    key: 'onDayMouseEnter',
    value: function () {
      function onDayMouseEnter(day) {
        if (this.isTouchDevice) return;
        var _state = this.state,
            hoverDate = _state.hoverDate,
            visibleDays = _state.visibleDays;


        var modifiers = this.deleteModifier({}, hoverDate, 'hovered');
        modifiers = this.addModifier(modifiers, day, 'hovered');

        this.setState({
          hoverDate: day,
          visibleDays: _objectAssign({}, visibleDays, modifiers)
        });
      }

      return onDayMouseEnter;
    }()
  }, {
    key: 'onDayMouseLeave',
    value: function () {
      function onDayMouseLeave() {
        var _state2 = this.state,
            hoverDate = _state2.hoverDate,
            visibleDays = _state2.visibleDays;

        if (this.isTouchDevice || !hoverDate) return;

        var modifiers = this.deleteModifier({}, hoverDate, 'hovered');

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
        var _props2 = this.props,
            onPrevMonthClick = _props2.onPrevMonthClick,
            numberOfMonths = _props2.numberOfMonths,
            enableOutsideDays = _props2.enableOutsideDays;
        var _state3 = this.state,
            currentMonth = _state3.currentMonth,
            visibleDays = _state3.visibleDays;


        var newVisibleDays = {};
        Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach(function (month) {
          newVisibleDays[month] = visibleDays[month];
        });

        var prevMonth = currentMonth.clone().subtract(1, 'month');
        var prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays);

        this.setState({
          currentMonth: prevMonth,
          visibleDays: _objectAssign({}, newVisibleDays, this.getModifiers(prevMonthVisibleDays))
        }, function () {
          onPrevMonthClick(prevMonth.clone());
        });
      }

      return onPrevMonthClick;
    }()
  }, {
    key: 'onNextMonthClick',
    value: function () {
      function onNextMonthClick() {
        var _props3 = this.props,
            onNextMonthClick = _props3.onNextMonthClick,
            numberOfMonths = _props3.numberOfMonths,
            enableOutsideDays = _props3.enableOutsideDays;
        var _state4 = this.state,
            currentMonth = _state4.currentMonth,
            visibleDays = _state4.visibleDays;


        var newVisibleDays = {};
        Object.keys(visibleDays).sort().slice(1).forEach(function (month) {
          newVisibleDays[month] = visibleDays[month];
        });

        var nextMonth = currentMonth.clone().add(numberOfMonths, 'month');
        var nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays);

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
    key: 'getFirstFocusableDay',
    value: function () {
      function getFirstFocusableDay(newMonth) {
        var _this3 = this;

        var _props4 = this.props,
            date = _props4.date,
            numberOfMonths = _props4.numberOfMonths;


        var focusedDate = newMonth.clone().startOf('month');
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
            date = nextProps.date,
            numberOfMonths = nextProps.numberOfMonths,
            enableOutsideDays = nextProps.enableOutsideDays;

        var initialVisibleMonthThunk = initialVisibleMonth || (date ? function () {
          return date;
        } : function () {
          return _this6.today;
        });
        var currentMonth = initialVisibleMonthThunk();
        var visibleDays = this.getModifiers(getVisibleDays(currentMonth, numberOfMonths, enableOutsideDays));
        return { currentMonth: currentMonth, visibleDays: visibleDays };
      }

      return getStateForNewMonth;
    }()
  }, {
    key: 'addModifier',
    value: function () {
      function addModifier(updatedDays, day, modifier) {
        var _props5 = this.props,
            numberOfVisibleMonths = _props5.numberOfMonths,
            enableOutsideDays = _props5.enableOutsideDays,
            orientation = _props5.orientation;
        var _state5 = this.state,
            firstVisibleMonth = _state5.currentMonth,
            visibleDays = _state5.visibleDays;


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
    key: 'deleteModifier',
    value: function () {
      function deleteModifier(updatedDays, day, modifier) {
        var _props6 = this.props,
            numberOfVisibleMonths = _props6.numberOfMonths,
            enableOutsideDays = _props6.enableOutsideDays,
            orientation = _props6.orientation;
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
    key: 'isBlocked',
    value: function () {
      function isBlocked(day) {
        var _props7 = this.props,
            isDayBlocked = _props7.isDayBlocked,
            isOutsideRange = _props7.isOutsideRange;

        return isDayBlocked(day) || isOutsideRange(day);
      }

      return isBlocked;
    }()
  }, {
    key: 'isHovered',
    value: function () {
      function isHovered(day) {
        var _ref = this.state || {},
            hoverDate = _ref.hoverDate;

        return isSameDay(day, hoverDate);
      }

      return isHovered;
    }()
  }, {
    key: 'isSelected',
    value: function () {
      function isSelected(day) {
        return isSameDay(day, this.props.date);
      }

      return isSelected;
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
        var _props8 = this.props,
            numberOfMonths = _props8.numberOfMonths,
            orientation = _props8.orientation,
            monthFormat = _props8.monthFormat,
            renderMonth = _props8.renderMonth,
            navPrev = _props8.navPrev,
            navNext = _props8.navNext,
            withPortal = _props8.withPortal,
            focused = _props8.focused,
            enableOutsideDays = _props8.enableOutsideDays,
            hideKeyboardShortcutsPanel = _props8.hideKeyboardShortcutsPanel,
            daySize = _props8.daySize,
            firstDayOfWeek = _props8.firstDayOfWeek,
            renderCalendarDay = _props8.renderCalendarDay,
            renderDayContents = _props8.renderDayContents,
            renderCalendarInfo = _props8.renderCalendarInfo,
            calendarInfoPosition = _props8.calendarInfoPosition,
            isFocused = _props8.isFocused,
            isRTL = _props8.isRTL,
            phrases = _props8.phrases,
            dayAriaLabelFormat = _props8.dayAriaLabelFormat,
            onOutsideClick = _props8.onOutsideClick,
            onBlur = _props8.onBlur,
            showKeyboardShortcuts = _props8.showKeyboardShortcuts,
            weekDayFormat = _props8.weekDayFormat,
            verticalHeight = _props8.verticalHeight,
            noBorder = _props8.noBorder,
            transitionDuration = _props8.transitionDuration;
        var _state7 = this.state,
            currentMonth = _state7.currentMonth,
            visibleDays = _state7.visibleDays;


        var dayPickerComponent = React.createElement(DayPicker, {
          orientation: orientation,
          enableOutsideDays: enableOutsideDays,
          modifiers: visibleDays,
          numberOfMonths: numberOfMonths,
          onDayClick: this.onDayClick,
          onDayMouseEnter: this.onDayMouseEnter,
          onDayMouseLeave: this.onDayMouseLeave,
          onPrevMonthClick: this.onPrevMonthClick,
          onNextMonthClick: this.onNextMonthClick,
          monthFormat: monthFormat,
          withPortal: withPortal,
          hidden: !focused,
          hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
          initialVisibleMonth: function () {
            function initialVisibleMonth() {
              return currentMonth;
            }

            return initialVisibleMonth;
          }(),
          firstDayOfWeek: firstDayOfWeek,
          navPrev: navPrev,
          navNext: navNext,
          renderMonth: renderMonth,
          renderCalendarDay: renderCalendarDay,
          renderDayContents: renderDayContents,
          renderCalendarInfo: renderCalendarInfo,
          calendarInfoPosition: calendarInfoPosition,
          isFocused: isFocused,
          getFirstFocusableDay: this.getFirstFocusableDay,
          onBlur: onBlur,
          phrases: phrases,
          daySize: daySize,
          isRTL: isRTL,
          showKeyboardShortcuts: showKeyboardShortcuts,
          weekDayFormat: weekDayFormat,
          dayAriaLabelFormat: dayAriaLabelFormat,
          verticalHeight: verticalHeight,
          noBorder: noBorder,
          transitionDuration: transitionDuration
        });

        if (onOutsideClick) {
          return React.createElement(
            OutsideClickHandler,
            {
              onOutsideClick: onOutsideClick
            },
            dayPickerComponent
          );
        }

        return dayPickerComponent;
      }

      return render;
    }()
  }]);

  return DayPickerSingleDateController;
}(React.Component);

export default DayPickerSingleDateController;


DayPickerSingleDateController.propTypes = propTypes;
DayPickerSingleDateController.defaultProps = defaultProps;