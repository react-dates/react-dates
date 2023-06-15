import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import shallowEqual from "enzyme-shallow-equal";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';
import OutsideClickHandler from 'react-outside-click-handler';
import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';
import CalendarMonthGrid from './CalendarMonthGrid';
import DayPickerNavigation from './DayPickerNavigation';
import DayPickerKeyboardShortcuts, { TOP_LEFT, TOP_RIGHT, BOTTOM_RIGHT } from './DayPickerKeyboardShortcuts';
import getNumberOfCalendarMonthWeeks from '../utils/getNumberOfCalendarMonthWeeks';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import calculateDimension from '../utils/calculateDimension';
import getActiveElement from '../utils/getActiveElement';
import isDayVisible from '../utils/isDayVisible';
import isSameMonth from '../utils/isSameMonth';
import ModifiersShape from '../shapes/ModifiersShape';
import NavPositionShape from '../shapes/NavPositionShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE, INFO_POSITION_TOP, INFO_POSITION_BOTTOM, INFO_POSITION_BEFORE, INFO_POSITION_AFTER, MODIFIER_KEY_NAMES, NAV_POSITION_TOP, NAV_POSITION_BOTTOM } from '../constants';
var MONTH_PADDING = 23;
var PREV_TRANSITION = 'prev';
var NEXT_TRANSITION = 'next';
var MONTH_SELECTION_TRANSITION = 'month_selection';
var YEAR_SELECTION_TRANSITION = 'year_selection';
var PREV_NAV = 'prev_nav';
var NEXT_NAV = 'next_nav';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps(_objectSpread(_objectSpread({}, withStylesPropTypes), {}, {
  // calendar presentation props
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  onOutsideClick: PropTypes.func,
  hidden: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  renderCalendarInfo: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  isRTL: PropTypes.bool,
  verticalHeight: nonNegativeInteger,
  noBorder: PropTypes.bool,
  transitionDuration: nonNegativeInteger,
  verticalBorderSpacing: nonNegativeInteger,
  horizontalMonthPadding: nonNegativeInteger,
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,
  // navigation props
  dayPickerNavigationInlineStyles: PropTypes.object,
  disablePrev: PropTypes.bool,
  disableNext: PropTypes.bool,
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
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  onGetNextScrollableMonths: PropTypes.func,
  // VERTICAL_SCROLLABLE daypickers only
  onGetPrevScrollableMonths: PropTypes.func,
  // VERTICAL_SCROLLABLE daypickers only

  // month props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  // day props
  modifiers: PropTypes.objectOf(PropTypes.objectOf(ModifiersShape)),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  // accessibility props
  isFocused: PropTypes.bool,
  getFirstFocusableDay: PropTypes.func,
  onBlur: PropTypes.func,
  showKeyboardShortcuts: PropTypes.bool,
  onTab: PropTypes.func,
  onShiftTab: PropTypes.func,
  // internationalization
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string
})) : {};
export var defaultProps = {
  // calendar presentation props
  enableOutsideDays: false,
  numberOfMonths: 2,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  onOutsideClick: function onOutsideClick() {},
  hidden: false,
  initialVisibleMonth: function initialVisibleMonth() {
    return moment();
  },
  firstDayOfWeek: null,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,
  horizontalMonthPadding: 13,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
  // navigation props
  dayPickerNavigationInlineStyles: null,
  disablePrev: false,
  disableNext: false,
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
  onMonthChange: function onMonthChange() {},
  onYearChange: function onYearChange() {},
  onGetNextScrollableMonths: function onGetNextScrollableMonths() {},
  onGetPrevScrollableMonths: function onGetPrevScrollableMonths() {},
  // month props
  renderMonthText: null,
  renderMonthElement: null,
  renderWeekHeaderElement: null,
  // day props
  modifiers: {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  // accessibility props
  isFocused: false,
  getFirstFocusableDay: null,
  onBlur: function onBlur() {},
  showKeyboardShortcuts: false,
  onTab: function onTab() {},
  onShiftTab: function onShiftTab() {},
  // internationalization
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined
};
var DayPicker = /*#__PURE__*/function (_ref2, _ref) {
  _inheritsLoose(DayPicker, _ref2);
  var _proto = DayPicker.prototype;
  _proto[_ref] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };
  function DayPicker(props) {
    var _this;
    _this = _ref2.call(this, props) || this;
    var currentMonth = props.hidden ? moment() : props.initialVisibleMonth();
    var focusedDate = currentMonth.clone().startOf('month').hour(12);
    if (props.getFirstFocusableDay) {
      focusedDate = props.getFirstFocusableDay(currentMonth);
    }
    var horizontalMonthPadding = props.horizontalMonthPadding;
    var translationValue = props.isRTL && _this.isHorizontal() ? -getCalendarMonthWidth(props.daySize, horizontalMonthPadding) : 0;
    _this.hasSetInitialVisibleMonth = !props.hidden;
    _this.state = {
      currentMonthScrollTop: null,
      currentMonth: currentMonth,
      monthTransition: null,
      translationValue: translationValue,
      scrollableMonthMultiple: 1,
      calendarMonthWidth: getCalendarMonthWidth(props.daySize, horizontalMonthPadding),
      focusedDate: !props.hidden || props.isFocused ? focusedDate : null,
      nextFocusedDate: null,
      showKeyboardShortcuts: props.showKeyboardShortcuts,
      onKeyboardShortcutsPanelClose: function onKeyboardShortcutsPanelClose() {},
      isTouchDevice: isTouchDevice(),
      withMouseInteractions: true,
      calendarInfoWidth: 0,
      monthTitleHeight: null,
      hasSetHeight: false
    };
    _this.setCalendarMonthWeeks(currentMonth);
    _this.calendarMonthGridHeight = 0;
    _this.setCalendarInfoWidthTimeout = null;
    _this.setCalendarMonthGridHeightTimeout = null;
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.throttledKeyDown = throttle(_this.onFinalKeyDown, 200, {
      trailing: false
    });
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_assertThisInitialized(_this));
    _this.onPrevMonthTransition = _this.onPrevMonthTransition.bind(_assertThisInitialized(_this));
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_assertThisInitialized(_this));
    _this.onNextMonthTransition = _this.onNextMonthTransition.bind(_assertThisInitialized(_this));
    _this.onMonthChange = _this.onMonthChange.bind(_assertThisInitialized(_this));
    _this.onYearChange = _this.onYearChange.bind(_assertThisInitialized(_this));
    _this.getNextScrollableMonths = _this.getNextScrollableMonths.bind(_assertThisInitialized(_this));
    _this.getPrevScrollableMonths = _this.getPrevScrollableMonths.bind(_assertThisInitialized(_this));
    _this.updateStateAfterMonthTransition = _this.updateStateAfterMonthTransition.bind(_assertThisInitialized(_this));
    _this.openKeyboardShortcutsPanel = _this.openKeyboardShortcutsPanel.bind(_assertThisInitialized(_this));
    _this.closeKeyboardShortcutsPanel = _this.closeKeyboardShortcutsPanel.bind(_assertThisInitialized(_this));
    _this.setCalendarInfoRef = _this.setCalendarInfoRef.bind(_assertThisInitialized(_this));
    _this.setContainerRef = _this.setContainerRef.bind(_assertThisInitialized(_this));
    _this.setTransitionContainerRef = _this.setTransitionContainerRef.bind(_assertThisInitialized(_this));
    _this.setMonthTitleHeight = _this.setMonthTitleHeight.bind(_assertThisInitialized(_this));
    return _this;
  }
  _proto.componentDidMount = function componentDidMount() {
    var orientation = this.props.orientation;
    var currentMonth = this.state.currentMonth;
    var calendarInfoWidth = this.calendarInfo ? calculateDimension(this.calendarInfo, 'width', true, true) : 0;
    var currentMonthScrollTop = this.transitionContainer && orientation === VERTICAL_SCROLLABLE ? this.transitionContainer.scrollHeight - this.transitionContainer.scrollTop : null;
    this.setState({
      isTouchDevice: isTouchDevice(),
      calendarInfoWidth: calendarInfoWidth,
      currentMonthScrollTop: currentMonthScrollTop
    });
    this.setCalendarMonthWeeks(currentMonth);
  };
  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextState) {
    var hidden = nextProps.hidden,
      isFocused = nextProps.isFocused,
      showKeyboardShortcuts = nextProps.showKeyboardShortcuts,
      onBlur = nextProps.onBlur,
      orientation = nextProps.orientation,
      renderMonthText = nextProps.renderMonthText,
      horizontalMonthPadding = nextProps.horizontalMonthPadding;
    var currentMonth = this.state.currentMonth;
    var nextCurrentMonth = nextState.currentMonth;
    if (!hidden) {
      if (!this.hasSetInitialVisibleMonth) {
        this.hasSetInitialVisibleMonth = true;
        this.setState({
          currentMonth: nextProps.initialVisibleMonth()
        });
      } else {
        var numberOfMonths = this.props.numberOfMonths;
        var newDate = nextProps.initialVisibleMonth();
        if (!isDayVisible(newDate, currentMonth, numberOfMonths)) {
          this.onMonthChange(newDate);
        }
      }
    }
    var _this$props = this.props,
      daySize = _this$props.daySize,
      prevIsFocused = _this$props.isFocused,
      prevRenderMonthText = _this$props.renderMonthText;
    if (nextProps.daySize !== daySize) {
      this.setState({
        calendarMonthWidth: getCalendarMonthWidth(nextProps.daySize, horizontalMonthPadding)
      });
    }
    if (isFocused !== prevIsFocused) {
      if (isFocused) {
        var focusedDate = this.getFocusedDay(currentMonth);
        var onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;
        if (nextProps.showKeyboardShortcuts) {
          // the ? shortcut came from the input and we should return input there once it is close
          onKeyboardShortcutsPanelClose = onBlur;
        }
        this.setState({
          showKeyboardShortcuts: showKeyboardShortcuts,
          onKeyboardShortcutsPanelClose: onKeyboardShortcutsPanelClose,
          focusedDate: focusedDate,
          withMouseInteractions: false
        });
      } else {
        this.setState({
          focusedDate: null
        });
      }
    }
    if (renderMonthText !== null && prevRenderMonthText !== null && renderMonthText(currentMonth) !== prevRenderMonthText(currentMonth)) {
      this.setState({
        monthTitleHeight: null
      });
    }

    // Capture the scroll position so when previous months are rendered above the current month
    // we can adjust scroll after the component has updated and the previous current month
    // stays in view.
    if (orientation === VERTICAL_SCROLLABLE && this.transitionContainer && !isSameMonth(currentMonth, nextCurrentMonth)) {
      this.setState({
        currentMonthScrollTop: this.transitionContainer.scrollHeight - this.transitionContainer.scrollTop
      });
    }
  };
  _proto.componentWillUpdate = function componentWillUpdate() {
    var _this2 = this;
    var transitionDuration = this.props.transitionDuration;

    // Calculating the dimensions trigger a DOM repaint which
    // breaks the CSS transition.
    // The setTimeout will wait until the transition ends.
    if (this.calendarInfo) {
      this.setCalendarInfoWidthTimeout = setTimeout(function () {
        var calendarInfoWidth = _this2.state.calendarInfoWidth;
        var calendarInfoPanelWidth = calculateDimension(_this2.calendarInfo, 'width', true, true);
        if (calendarInfoWidth !== calendarInfoPanelWidth) {
          _this2.setState({
            calendarInfoWidth: calendarInfoPanelWidth
          });
        }
      }, transitionDuration);
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props2 = this.props,
      orientation = _this$props2.orientation,
      daySize = _this$props2.daySize,
      isFocused = _this$props2.isFocused,
      numberOfMonths = _this$props2.numberOfMonths;
    var _this$state = this.state,
      currentMonth = _this$state.currentMonth,
      currentMonthScrollTop = _this$state.currentMonthScrollTop,
      focusedDate = _this$state.focusedDate,
      monthTitleHeight = _this$state.monthTitleHeight;
    var shouldAdjustHeight = false;
    if (numberOfMonths !== prevProps.numberOfMonths) {
      this.setCalendarMonthWeeks(currentMonth);
      shouldAdjustHeight = true;
    }
    if (this.isHorizontal() && (orientation !== prevProps.orientation || daySize !== prevProps.daySize)) {
      shouldAdjustHeight = true;
    }
    if (shouldAdjustHeight) {
      var visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
      var calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat(_toConsumableArray(visibleCalendarWeeks))) * (daySize - 1);
      var newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }
    if (!prevProps.isFocused && isFocused && !focusedDate) {
      this.container.focus();
    }

    // If orientation is VERTICAL_SCROLLABLE and currentMonth has changed adjust scrollTop so the
    // new months rendered above the current month don't push the current month out of view.
    if (orientation === VERTICAL_SCROLLABLE && !isSameMonth(prevState.currentMonth, currentMonth) && currentMonthScrollTop && this.transitionContainer) {
      this.transitionContainer.scrollTop = this.transitionContainer.scrollHeight - currentMonthScrollTop;
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.setCalendarInfoWidthTimeout);
    clearTimeout(this.setCalendarMonthGridHeightTimeout);
  };
  _proto.onKeyDown = function onKeyDown(e) {
    e.stopPropagation();
    if (!MODIFIER_KEY_NAMES.has(e.key)) {
      this.throttledKeyDown(e);
    }
  };
  _proto.onFinalKeyDown = function onFinalKeyDown(e) {
    this.setState({
      withMouseInteractions: false
    });
    var _this$props3 = this.props,
      onBlur = _this$props3.onBlur,
      onTab = _this$props3.onTab,
      onShiftTab = _this$props3.onShiftTab,
      isRTL = _this$props3.isRTL;
    var _this$state2 = this.state,
      focusedDate = _this$state2.focusedDate,
      showKeyboardShortcuts = _this$state2.showKeyboardShortcuts;
    if (!focusedDate) return;
    var newFocusedDate = focusedDate.clone();
    var didTransitionMonth = false;

    // focus might be anywhere when the keyboard shortcuts panel is opened so we want to
    // return it to wherever it was before when the panel was opened
    var activeElement = getActiveElement();
    var onKeyboardShortcutsPanelClose = function onKeyboardShortcutsPanelClose() {
      if (activeElement) activeElement.focus();
    };
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newFocusedDate.subtract(1, 'week');
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (isRTL) {
          newFocusedDate.add(1, 'day');
          didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        } else {
          newFocusedDate.subtract(1, 'day');
          didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        }
        break;
      case 'Home':
        e.preventDefault();
        newFocusedDate.startOf('week').hour(12);
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'PageUp':
        e.preventDefault();
        newFocusedDate.subtract(1, 'month');
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newFocusedDate.add(1, 'week');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (isRTL) {
          newFocusedDate.subtract(1, 'day');
          didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        } else {
          newFocusedDate.add(1, 'day');
          didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        }
        break;
      case 'End':
        e.preventDefault();
        newFocusedDate.endOf('week');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'PageDown':
        e.preventDefault();
        newFocusedDate.add(1, 'month');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case '?':
        this.openKeyboardShortcutsPanel(onKeyboardShortcutsPanelClose);
        break;
      case 'Escape':
        if (showKeyboardShortcuts) {
          this.closeKeyboardShortcutsPanel();
        } else {
          onBlur(e);
        }
        break;
      case 'Tab':
        if (e.shiftKey) {
          onShiftTab();
        } else {
          onTab(e);
        }
        break;
      default:
        break;
    }

    // If there was a month transition, do not update the focused date until the transition has
    // completed. Otherwise, attempting to focus on a DOM node may interrupt the CSS animation. If
    // didTransitionMonth is true, the focusedDate gets updated in #updateStateAfterMonthTransition
    if (!didTransitionMonth) {
      this.setState({
        focusedDate: newFocusedDate
      });
    }
  };
  _proto.onPrevMonthClick = function onPrevMonthClick(e) {
    if (e) e.preventDefault();
    this.onPrevMonthTransition();
  };
  _proto.onPrevMonthTransition = function onPrevMonthTransition(nextFocusedDate) {
    var _this$props4 = this.props,
      daySize = _this$props4.daySize,
      isRTL = _this$props4.isRTL,
      numberOfMonths = _this$props4.numberOfMonths;
    var _this$state3 = this.state,
      calendarMonthWidth = _this$state3.calendarMonthWidth,
      monthTitleHeight = _this$state3.monthTitleHeight;
    var translationValue;
    if (this.isVertical()) {
      var calendarMonthWeeksHeight = this.calendarMonthWeeks[0] * (daySize - 1);
      translationValue = monthTitleHeight + calendarMonthWeeksHeight + 1;
    } else if (this.isHorizontal()) {
      translationValue = calendarMonthWidth;
      if (isRTL) {
        translationValue = -2 * calendarMonthWidth;
      }
      var visibleCalendarWeeks = this.calendarMonthWeeks.slice(0, numberOfMonths);
      var _calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat(_toConsumableArray(visibleCalendarWeeks))) * (daySize - 1);
      var newMonthHeight = monthTitleHeight + _calendarMonthWeeksHeight + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }
    this.setState({
      monthTransition: PREV_TRANSITION,
      translationValue: translationValue,
      focusedDate: null,
      nextFocusedDate: nextFocusedDate
    });
  };
  _proto.onMonthChange = function onMonthChange(currentMonth) {
    this.setCalendarMonthWeeks(currentMonth);
    this.calculateAndSetDayPickerHeight();

    // Translation value is a hack to force an invisible transition that
    // properly rerenders the CalendarMonthGrid
    this.setState({
      monthTransition: MONTH_SELECTION_TRANSITION,
      translationValue: 0.00001,
      focusedDate: null,
      nextFocusedDate: currentMonth,
      currentMonth: currentMonth
    });
  };
  _proto.onYearChange = function onYearChange(currentMonth) {
    this.setCalendarMonthWeeks(currentMonth);
    this.calculateAndSetDayPickerHeight();

    // Translation value is a hack to force an invisible transition that
    // properly rerenders the CalendarMonthGrid
    this.setState({
      monthTransition: YEAR_SELECTION_TRANSITION,
      translationValue: 0.0001,
      focusedDate: null,
      nextFocusedDate: currentMonth,
      currentMonth: currentMonth
    });
  };
  _proto.onNextMonthClick = function onNextMonthClick(e) {
    if (e) e.preventDefault();
    this.onNextMonthTransition();
  };
  _proto.onNextMonthTransition = function onNextMonthTransition(nextFocusedDate) {
    var _this$props5 = this.props,
      isRTL = _this$props5.isRTL,
      numberOfMonths = _this$props5.numberOfMonths,
      daySize = _this$props5.daySize;
    var _this$state4 = this.state,
      calendarMonthWidth = _this$state4.calendarMonthWidth,
      monthTitleHeight = _this$state4.monthTitleHeight;
    var translationValue;
    if (this.isVertical()) {
      var firstVisibleMonthWeeks = this.calendarMonthWeeks[1];
      var calendarMonthWeeksHeight = firstVisibleMonthWeeks * (daySize - 1);
      translationValue = -(monthTitleHeight + calendarMonthWeeksHeight + 1);
    }
    if (this.isHorizontal()) {
      translationValue = -calendarMonthWidth;
      if (isRTL) {
        translationValue = 0;
      }
      var visibleCalendarWeeks = this.calendarMonthWeeks.slice(2, numberOfMonths + 2);
      var _calendarMonthWeeksHeight2 = Math.max.apply(Math, [0].concat(_toConsumableArray(visibleCalendarWeeks))) * (daySize - 1);
      var newMonthHeight = monthTitleHeight + _calendarMonthWeeksHeight2 + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }
    this.setState({
      monthTransition: NEXT_TRANSITION,
      translationValue: translationValue,
      focusedDate: null,
      nextFocusedDate: nextFocusedDate
    });
  };
  _proto.getFirstDayOfWeek = function getFirstDayOfWeek() {
    var firstDayOfWeek = this.props.firstDayOfWeek;
    if (firstDayOfWeek == null) {
      return moment.localeData().firstDayOfWeek();
    }
    return firstDayOfWeek;
  };
  _proto.getWeekHeaders = function getWeekHeaders() {
    var weekDayFormat = this.props.weekDayFormat;
    var currentMonth = this.state.currentMonth;
    var firstDayOfWeek = this.getFirstDayOfWeek();
    var weekHeaders = [];
    for (var i = 0; i < 7; i += 1) {
      weekHeaders.push(currentMonth.clone().day((i + firstDayOfWeek) % 7).format(weekDayFormat));
    }
    return weekHeaders;
  };
  _proto.getFirstVisibleIndex = function getFirstVisibleIndex() {
    var orientation = this.props.orientation;
    var monthTransition = this.state.monthTransition;
    if (orientation === VERTICAL_SCROLLABLE) return 0;
    var firstVisibleMonthIndex = 1;
    if (monthTransition === PREV_TRANSITION) {
      firstVisibleMonthIndex -= 1;
    } else if (monthTransition === NEXT_TRANSITION) {
      firstVisibleMonthIndex += 1;
    }
    return firstVisibleMonthIndex;
  };
  _proto.getFocusedDay = function getFocusedDay(newMonth) {
    var _this$props6 = this.props,
      getFirstFocusableDay = _this$props6.getFirstFocusableDay,
      numberOfMonths = _this$props6.numberOfMonths;
    var focusedDate;
    if (getFirstFocusableDay) {
      focusedDate = getFirstFocusableDay(newMonth);
    }
    if (newMonth && (!focusedDate || !isDayVisible(focusedDate, newMonth, numberOfMonths))) {
      focusedDate = newMonth.clone().startOf('month').hour(12);
    }
    return focusedDate;
  };
  _proto.setMonthTitleHeight = function setMonthTitleHeight(monthTitleHeight) {
    var _this3 = this;
    this.setState({
      monthTitleHeight: monthTitleHeight
    }, function () {
      _this3.calculateAndSetDayPickerHeight();
    });
  };
  _proto.setCalendarMonthWeeks = function setCalendarMonthWeeks(currentMonth) {
    var numberOfMonths = this.props.numberOfMonths;
    this.calendarMonthWeeks = [];
    var month = currentMonth.clone().subtract(1, 'months');
    var firstDayOfWeek = this.getFirstDayOfWeek();
    for (var i = 0; i < numberOfMonths + 2; i += 1) {
      var numberOfWeeks = getNumberOfCalendarMonthWeeks(month, firstDayOfWeek);
      this.calendarMonthWeeks.push(numberOfWeeks);
      month = month.add(1, 'months');
    }
  };
  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };
  _proto.setCalendarInfoRef = function setCalendarInfoRef(ref) {
    this.calendarInfo = ref;
  };
  _proto.setTransitionContainerRef = function setTransitionContainerRef(ref) {
    this.transitionContainer = ref;
  };
  _proto.getNextScrollableMonths = function getNextScrollableMonths(e) {
    var onGetNextScrollableMonths = this.props.onGetNextScrollableMonths;
    if (e) e.preventDefault();
    if (onGetNextScrollableMonths) onGetNextScrollableMonths(e);
    this.setState(function (_ref3) {
      var scrollableMonthMultiple = _ref3.scrollableMonthMultiple;
      return {
        scrollableMonthMultiple: scrollableMonthMultiple + 1
      };
    });
  };
  _proto.getPrevScrollableMonths = function getPrevScrollableMonths(e) {
    var _this$props7 = this.props,
      numberOfMonths = _this$props7.numberOfMonths,
      onGetPrevScrollableMonths = _this$props7.onGetPrevScrollableMonths;
    if (e) e.preventDefault();
    if (onGetPrevScrollableMonths) onGetPrevScrollableMonths(e);
    this.setState(function (_ref4) {
      var currentMonth = _ref4.currentMonth,
        scrollableMonthMultiple = _ref4.scrollableMonthMultiple;
      return {
        currentMonth: currentMonth.clone().subtract(numberOfMonths, 'month'),
        scrollableMonthMultiple: scrollableMonthMultiple + 1
      };
    });
  };
  _proto.maybeTransitionNextMonth = function maybeTransitionNextMonth(newFocusedDate) {
    var numberOfMonths = this.props.numberOfMonths;
    var _this$state5 = this.state,
      currentMonth = _this$state5.currentMonth,
      focusedDate = _this$state5.focusedDate;
    var newFocusedDateMonth = newFocusedDate.month();
    var focusedDateMonth = focusedDate.month();
    var isNewFocusedDateVisible = isDayVisible(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      this.onNextMonthTransition(newFocusedDate);
      return true;
    }
    return false;
  };
  _proto.maybeTransitionPrevMonth = function maybeTransitionPrevMonth(newFocusedDate) {
    var numberOfMonths = this.props.numberOfMonths;
    var _this$state6 = this.state,
      currentMonth = _this$state6.currentMonth,
      focusedDate = _this$state6.focusedDate;
    var newFocusedDateMonth = newFocusedDate.month();
    var focusedDateMonth = focusedDate.month();
    var isNewFocusedDateVisible = isDayVisible(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      this.onPrevMonthTransition(newFocusedDate);
      return true;
    }
    return false;
  };
  _proto.isHorizontal = function isHorizontal() {
    var orientation = this.props.orientation;
    return orientation === HORIZONTAL_ORIENTATION;
  };
  _proto.isVertical = function isVertical() {
    var orientation = this.props.orientation;
    return orientation === VERTICAL_ORIENTATION || orientation === VERTICAL_SCROLLABLE;
  };
  _proto.updateStateAfterMonthTransition = function updateStateAfterMonthTransition() {
    var _this4 = this;
    var _this$props8 = this.props,
      onPrevMonthClick = _this$props8.onPrevMonthClick,
      onNextMonthClick = _this$props8.onNextMonthClick,
      numberOfMonths = _this$props8.numberOfMonths,
      onMonthChange = _this$props8.onMonthChange,
      onYearChange = _this$props8.onYearChange,
      isRTL = _this$props8.isRTL;
    var _this$state7 = this.state,
      currentMonth = _this$state7.currentMonth,
      monthTransition = _this$state7.monthTransition,
      focusedDate = _this$state7.focusedDate,
      nextFocusedDate = _this$state7.nextFocusedDate,
      withMouseInteractions = _this$state7.withMouseInteractions,
      calendarMonthWidth = _this$state7.calendarMonthWidth;
    if (!monthTransition) return;
    var newMonth = currentMonth.clone();
    var firstDayOfWeek = this.getFirstDayOfWeek();
    if (monthTransition === PREV_TRANSITION) {
      newMonth.subtract(1, 'month');
      if (onPrevMonthClick) onPrevMonthClick(newMonth);
      var newInvisibleMonth = newMonth.clone().subtract(1, 'month');
      var numberOfWeeks = getNumberOfCalendarMonthWeeks(newInvisibleMonth, firstDayOfWeek);
      this.calendarMonthWeeks = [numberOfWeeks].concat(_toConsumableArray(this.calendarMonthWeeks.slice(0, -1)));
    } else if (monthTransition === NEXT_TRANSITION) {
      newMonth.add(1, 'month');
      if (onNextMonthClick) onNextMonthClick(newMonth);
      var _newInvisibleMonth = newMonth.clone().add(numberOfMonths, 'month');
      var _numberOfWeeks = getNumberOfCalendarMonthWeeks(_newInvisibleMonth, firstDayOfWeek);
      this.calendarMonthWeeks = [].concat(_toConsumableArray(this.calendarMonthWeeks.slice(1)), [_numberOfWeeks]);
    } else if (monthTransition === MONTH_SELECTION_TRANSITION) {
      if (onMonthChange) onMonthChange(newMonth);
    } else if (monthTransition === YEAR_SELECTION_TRANSITION) {
      if (onYearChange) onYearChange(newMonth);
    }
    var newFocusedDate = null;
    if (nextFocusedDate) {
      newFocusedDate = nextFocusedDate;
    } else if (!focusedDate && !withMouseInteractions) {
      newFocusedDate = this.getFocusedDay(newMonth);
    }
    this.setState({
      currentMonth: newMonth,
      monthTransition: null,
      translationValue: isRTL && this.isHorizontal() ? -calendarMonthWidth : 0,
      nextFocusedDate: null,
      focusedDate: newFocusedDate
    }, function () {
      // we don't want to focus on the relevant calendar day after a month transition
      // if the user is navigating around using a mouse
      if (withMouseInteractions) {
        var activeElement = getActiveElement();
        if (activeElement && activeElement !== document.body && _this4.container.contains(activeElement) && activeElement.blur) {
          activeElement.blur();
        }
      }
    });
  };
  _proto.adjustDayPickerHeight = function adjustDayPickerHeight(newMonthHeight) {
    var _this5 = this;
    var monthHeight = newMonthHeight + MONTH_PADDING;
    if (monthHeight !== this.calendarMonthGridHeight) {
      this.transitionContainer.style.height = "".concat(monthHeight, "px");
      if (!this.calendarMonthGridHeight) {
        this.setCalendarMonthGridHeightTimeout = setTimeout(function () {
          _this5.setState({
            hasSetHeight: true
          });
        }, 0);
      }
      this.calendarMonthGridHeight = monthHeight;
    }
  };
  _proto.calculateAndSetDayPickerHeight = function calculateAndSetDayPickerHeight() {
    var _this$props9 = this.props,
      daySize = _this$props9.daySize,
      numberOfMonths = _this$props9.numberOfMonths;
    var monthTitleHeight = this.state.monthTitleHeight;
    var visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
    var calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat(_toConsumableArray(visibleCalendarWeeks))) * (daySize - 1);
    var newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
    if (this.isHorizontal()) {
      this.adjustDayPickerHeight(newMonthHeight);
    }
  };
  _proto.openKeyboardShortcutsPanel = function openKeyboardShortcutsPanel(onCloseCallBack) {
    this.setState({
      showKeyboardShortcuts: true,
      onKeyboardShortcutsPanelClose: onCloseCallBack
    });
  };
  _proto.closeKeyboardShortcutsPanel = function closeKeyboardShortcutsPanel() {
    var onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;
    if (onKeyboardShortcutsPanelClose) {
      onKeyboardShortcutsPanelClose();
    }
    this.setState({
      onKeyboardShortcutsPanelClose: null,
      showKeyboardShortcuts: false
    });
  };
  _proto.renderNavigation = function renderNavigation(navDirection) {
    var _this$props10 = this.props,
      dayPickerNavigationInlineStyles = _this$props10.dayPickerNavigationInlineStyles,
      disablePrev = _this$props10.disablePrev,
      disableNext = _this$props10.disableNext,
      navPosition = _this$props10.navPosition,
      navPrev = _this$props10.navPrev,
      navNext = _this$props10.navNext,
      noNavButtons = _this$props10.noNavButtons,
      noNavNextButton = _this$props10.noNavNextButton,
      noNavPrevButton = _this$props10.noNavPrevButton,
      orientation = _this$props10.orientation,
      phrases = _this$props10.phrases,
      renderNavPrevButton = _this$props10.renderNavPrevButton,
      renderNavNextButton = _this$props10.renderNavNextButton,
      isRTL = _this$props10.isRTL;
    if (noNavButtons) {
      return null;
    }
    var onPrevMonthClick = orientation === VERTICAL_SCROLLABLE ? this.getPrevScrollableMonths : this.onPrevMonthClick;
    var onNextMonthClick = orientation === VERTICAL_SCROLLABLE ? this.getNextScrollableMonths : this.onNextMonthClick;
    return /*#__PURE__*/React.createElement(DayPickerNavigation, {
      disablePrev: disablePrev,
      disableNext: disableNext,
      inlineStyles: dayPickerNavigationInlineStyles,
      onPrevMonthClick: onPrevMonthClick,
      onNextMonthClick: onNextMonthClick,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      orientation: orientation,
      phrases: phrases,
      isRTL: isRTL,
      showNavNextButton: !(noNavNextButton || orientation === VERTICAL_SCROLLABLE && navDirection === PREV_NAV),
      showNavPrevButton: !(noNavPrevButton || orientation === VERTICAL_SCROLLABLE && navDirection === NEXT_NAV)
    });
  };
  _proto.renderWeekHeader = function renderWeekHeader(index) {
    var _this$props11 = this.props,
      daySize = _this$props11.daySize,
      horizontalMonthPadding = _this$props11.horizontalMonthPadding,
      orientation = _this$props11.orientation,
      renderWeekHeaderElement = _this$props11.renderWeekHeaderElement,
      css = _this$props11.css,
      styles = _this$props11.styles;
    var calendarMonthWidth = this.state.calendarMonthWidth;
    var verticalScrollable = orientation === VERTICAL_SCROLLABLE;
    var horizontalStyle = {
      left: index * calendarMonthWidth
    };
    var verticalStyle = {
      marginLeft: -calendarMonthWidth / 2
    };
    var weekHeaderStyle = {}; // no styles applied to the vertical-scrollable orientation
    if (this.isHorizontal()) {
      weekHeaderStyle = horizontalStyle;
    } else if (this.isVertical() && !verticalScrollable) {
      weekHeaderStyle = verticalStyle;
    }
    var weekHeaders = this.getWeekHeaders();
    var header = weekHeaders.map(function (day) {
      return /*#__PURE__*/React.createElement("li", _extends({
        key: day
      }, css(styles.DayPicker_weekHeader_li, {
        width: daySize
      })), renderWeekHeaderElement ? renderWeekHeaderElement(day) : /*#__PURE__*/React.createElement("small", null, day));
    });
    return /*#__PURE__*/React.createElement("div", _extends({}, css(styles.DayPicker_weekHeader, this.isVertical() && styles.DayPicker_weekHeader__vertical, verticalScrollable && styles.DayPicker_weekHeader__verticalScrollable, weekHeaderStyle, {
      padding: "0 ".concat(horizontalMonthPadding, "px")
    }), {
      key: "week-".concat(index)
    }), /*#__PURE__*/React.createElement("ul", css(styles.DayPicker_weekHeader_ul), header));
  };
  _proto.render = function render() {
    var _this6 = this;
    var _this$state8 = this.state,
      calendarMonthWidth = _this$state8.calendarMonthWidth,
      currentMonth = _this$state8.currentMonth,
      monthTransition = _this$state8.monthTransition,
      translationValue = _this$state8.translationValue,
      scrollableMonthMultiple = _this$state8.scrollableMonthMultiple,
      focusedDate = _this$state8.focusedDate,
      showKeyboardShortcuts = _this$state8.showKeyboardShortcuts,
      isTouch = _this$state8.isTouchDevice,
      hasSetHeight = _this$state8.hasSetHeight,
      calendarInfoWidth = _this$state8.calendarInfoWidth,
      monthTitleHeight = _this$state8.monthTitleHeight;
    var _this$props12 = this.props,
      enableOutsideDays = _this$props12.enableOutsideDays,
      numberOfMonths = _this$props12.numberOfMonths,
      orientation = _this$props12.orientation,
      modifiers = _this$props12.modifiers,
      withPortal = _this$props12.withPortal,
      onDayClick = _this$props12.onDayClick,
      onDayMouseEnter = _this$props12.onDayMouseEnter,
      onDayMouseLeave = _this$props12.onDayMouseLeave,
      firstDayOfWeek = _this$props12.firstDayOfWeek,
      renderMonthText = _this$props12.renderMonthText,
      renderCalendarDay = _this$props12.renderCalendarDay,
      renderDayContents = _this$props12.renderDayContents,
      renderCalendarInfo = _this$props12.renderCalendarInfo,
      renderMonthElement = _this$props12.renderMonthElement,
      renderKeyboardShortcutsButton = _this$props12.renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel = _this$props12.renderKeyboardShortcutsPanel,
      calendarInfoPosition = _this$props12.calendarInfoPosition,
      hideKeyboardShortcutsPanel = _this$props12.hideKeyboardShortcutsPanel,
      onOutsideClick = _this$props12.onOutsideClick,
      monthFormat = _this$props12.monthFormat,
      daySize = _this$props12.daySize,
      isFocused = _this$props12.isFocused,
      isRTL = _this$props12.isRTL,
      css = _this$props12.css,
      styles = _this$props12.styles,
      theme = _this$props12.theme,
      phrases = _this$props12.phrases,
      verticalHeight = _this$props12.verticalHeight,
      dayAriaLabelFormat = _this$props12.dayAriaLabelFormat,
      noBorder = _this$props12.noBorder,
      transitionDuration = _this$props12.transitionDuration,
      verticalBorderSpacing = _this$props12.verticalBorderSpacing,
      horizontalMonthPadding = _this$props12.horizontalMonthPadding,
      navPosition = _this$props12.navPosition;
    var dayPickerHorizontalPadding = theme.reactDates.spacing.dayPickerHorizontalPadding;
    var isHorizontal = this.isHorizontal();
    var numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
    var weekHeaders = [];
    for (var i = 0; i < numOfWeekHeaders; i += 1) {
      weekHeaders.push(this.renderWeekHeader(i));
    }
    var verticalScrollable = orientation === VERTICAL_SCROLLABLE;
    var height;
    if (isHorizontal) {
      height = this.calendarMonthGridHeight;
    } else if (this.isVertical() && !verticalScrollable && !withPortal) {
      // If the user doesn't set a desired height,
      // we default back to this kind of made-up value that generally looks good
      height = verticalHeight || 1.75 * calendarMonthWidth;
    }
    var isCalendarMonthGridAnimating = monthTransition !== null;
    var shouldFocusDate = !isCalendarMonthGridAnimating && isFocused;
    var keyboardShortcutButtonLocation = BOTTOM_RIGHT;
    if (this.isVertical()) {
      keyboardShortcutButtonLocation = withPortal ? TOP_LEFT : TOP_RIGHT;
    }
    var shouldAnimateHeight = isHorizontal && hasSetHeight;
    var calendarInfoPositionTop = calendarInfoPosition === INFO_POSITION_TOP;
    var calendarInfoPositionBottom = calendarInfoPosition === INFO_POSITION_BOTTOM;
    var calendarInfoPositionBefore = calendarInfoPosition === INFO_POSITION_BEFORE;
    var calendarInfoPositionAfter = calendarInfoPosition === INFO_POSITION_AFTER;
    var calendarInfoIsInline = calendarInfoPositionBefore || calendarInfoPositionAfter;
    var calendarInfo = renderCalendarInfo && /*#__PURE__*/React.createElement("div", _extends({
      ref: this.setCalendarInfoRef
    }, css(calendarInfoIsInline && styles.DayPicker_calendarInfo__horizontal)), renderCalendarInfo());
    var calendarInfoPanelWidth = renderCalendarInfo && calendarInfoIsInline ? calendarInfoWidth : 0;
    var firstVisibleMonthIndex = this.getFirstVisibleIndex();
    var wrapperHorizontalWidth = calendarMonthWidth * numberOfMonths + 2 * dayPickerHorizontalPadding;
    // Adding `1px` because of whitespace between 2 inline-block
    var fullHorizontalWidth = wrapperHorizontalWidth + calendarInfoPanelWidth + 1;
    var transitionContainerStyle = {
      width: isHorizontal && wrapperHorizontalWidth,
      height: height
    };
    var dayPickerWrapperStyle = {
      width: isHorizontal && wrapperHorizontalWidth
    };
    var dayPickerStyle = {
      width: isHorizontal && fullHorizontalWidth,
      // These values are to center the datepicker (approximately) on the page
      marginLeft: isHorizontal && withPortal ? -fullHorizontalWidth / 2 : null,
      marginTop: isHorizontal && withPortal ? -calendarMonthWidth / 2 : null
    };
    return /*#__PURE__*/React.createElement("div", css(styles.DayPicker, isHorizontal && styles.DayPicker__horizontal, verticalScrollable && styles.DayPicker__verticalScrollable, isHorizontal && withPortal && styles.DayPicker_portal__horizontal, this.isVertical() && withPortal && styles.DayPicker_portal__vertical, dayPickerStyle, !monthTitleHeight && styles.DayPicker__hidden, !noBorder && styles.DayPicker__withBorder), /*#__PURE__*/React.createElement(OutsideClickHandler, {
      onOutsideClick: onOutsideClick
    }, (calendarInfoPositionTop || calendarInfoPositionBefore) && calendarInfo, /*#__PURE__*/React.createElement("div", css(dayPickerWrapperStyle, calendarInfoIsInline && isHorizontal && styles.DayPicker_wrapper__horizontal), /*#__PURE__*/React.createElement("div", _extends({}, css(styles.DayPicker_weekHeaders, isHorizontal && styles.DayPicker_weekHeaders__horizontal), {
      "aria-hidden": "true",
      role: "presentation"
    }), weekHeaders), /*#__PURE__*/React.createElement("div", _extends({}, css(styles.DayPicker_focusRegion), {
      ref: this.setContainerRef,
      onClick: function onClick(e) {
        e.stopPropagation();
      },
      onKeyDown: this.onKeyDown,
      onMouseUp: function onMouseUp() {
        _this6.setState({
          withMouseInteractions: true
        });
      },
      tabIndex: -1,
      role: "application",
      "aria-roledescription": phrases.roleDescription,
      "aria-label": phrases.calendarLabel
    }), !verticalScrollable && navPosition === NAV_POSITION_TOP && this.renderNavigation(), /*#__PURE__*/React.createElement("div", _extends({}, css(styles.DayPicker_transitionContainer, shouldAnimateHeight && styles.DayPicker_transitionContainer__horizontal, this.isVertical() && styles.DayPicker_transitionContainer__vertical, verticalScrollable && styles.DayPicker_transitionContainer__verticalScrollable, transitionContainerStyle), {
      ref: this.setTransitionContainerRef
    }), verticalScrollable && this.renderNavigation(PREV_NAV), /*#__PURE__*/React.createElement(CalendarMonthGrid, {
      setMonthTitleHeight: !monthTitleHeight ? this.setMonthTitleHeight : undefined,
      translationValue: translationValue,
      enableOutsideDays: enableOutsideDays,
      firstVisibleMonthIndex: firstVisibleMonthIndex,
      initialMonth: currentMonth,
      isAnimating: isCalendarMonthGridAnimating,
      modifiers: modifiers,
      orientation: orientation,
      numberOfMonths: numberOfMonths * scrollableMonthMultiple,
      onDayClick: onDayClick,
      onDayMouseEnter: onDayMouseEnter,
      onDayMouseLeave: onDayMouseLeave,
      onMonthChange: this.onMonthChange,
      onYearChange: this.onYearChange,
      renderMonthText: renderMonthText,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderMonthElement: renderMonthElement,
      onMonthTransitionEnd: this.updateStateAfterMonthTransition,
      monthFormat: monthFormat,
      daySize: daySize,
      firstDayOfWeek: firstDayOfWeek,
      isFocused: shouldFocusDate,
      focusedDate: focusedDate,
      phrases: phrases,
      isRTL: isRTL,
      dayAriaLabelFormat: dayAriaLabelFormat,
      transitionDuration: transitionDuration,
      verticalBorderSpacing: verticalBorderSpacing,
      horizontalMonthPadding: horizontalMonthPadding
    }), verticalScrollable && this.renderNavigation(NEXT_NAV)), !verticalScrollable && navPosition === NAV_POSITION_BOTTOM && this.renderNavigation(), !isTouch && !hideKeyboardShortcutsPanel && /*#__PURE__*/React.createElement(DayPickerKeyboardShortcuts, {
      block: this.isVertical() && !withPortal,
      buttonLocation: keyboardShortcutButtonLocation,
      showKeyboardShortcutsPanel: showKeyboardShortcuts,
      openKeyboardShortcutsPanel: this.openKeyboardShortcutsPanel,
      closeKeyboardShortcutsPanel: this.closeKeyboardShortcutsPanel,
      phrases: phrases,
      renderKeyboardShortcutsButton: renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel: renderKeyboardShortcutsPanel
    }))), (calendarInfoPositionBottom || calendarInfoPositionAfter) && calendarInfo));
  };
  return DayPicker;
}(React.PureComponent || React.Component, !React.PureComponent && "shouldComponentUpdate");
DayPicker.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPicker.defaultProps = defaultProps;
export { DayPicker as PureDayPicker };
export default withStyles(function (_ref5) {
  var _ref5$reactDates = _ref5.reactDates,
    color = _ref5$reactDates.color,
    font = _ref5$reactDates.font,
    noScrollBarOnVerticalScrollable = _ref5$reactDates.noScrollBarOnVerticalScrollable,
    spacing = _ref5$reactDates.spacing,
    zIndex = _ref5$reactDates.zIndex;
  return {
    DayPicker: {
      background: color.background,
      position: 'relative',
      textAlign: noflip('left')
    },
    DayPicker__horizontal: {
      background: color.background
    },
    DayPicker__verticalScrollable: {
      height: '100%'
    },
    DayPicker__hidden: {
      visibility: 'hidden'
    },
    DayPicker__withBorder: {
      boxShadow: noflip('0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07)'),
      borderRadius: 3
    },
    DayPicker_portal__horizontal: {
      boxShadow: 'none',
      position: 'absolute',
      left: noflip('50%'),
      top: '50%'
    },
    DayPicker_portal__vertical: {
      position: 'initial'
    },
    DayPicker_focusRegion: {
      outline: 'none'
    },
    DayPicker_calendarInfo__horizontal: {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    DayPicker_wrapper__horizontal: {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    DayPicker_weekHeaders: {
      position: 'relative'
    },
    DayPicker_weekHeaders__horizontal: {
      marginLeft: noflip(spacing.dayPickerHorizontalPadding)
    },
    DayPicker_weekHeader: {
      color: color.placeholderText,
      position: 'absolute',
      top: 62,
      zIndex: zIndex + 2,
      textAlign: noflip('left')
    },
    DayPicker_weekHeader__vertical: {
      left: noflip('50%')
    },
    DayPicker_weekHeader__verticalScrollable: {
      top: 0,
      display: 'table-row',
      borderBottom: "1px solid ".concat(color.core.border),
      background: color.background,
      marginLeft: noflip(0),
      left: noflip(0),
      width: '100%',
      textAlign: 'center'
    },
    DayPicker_weekHeader_ul: {
      listStyle: 'none',
      margin: '1px 0',
      paddingLeft: noflip(0),
      paddingRight: noflip(0),
      fontSize: font.size
    },
    DayPicker_weekHeader_li: {
      display: 'inline-block',
      textAlign: 'center'
    },
    DayPicker_transitionContainer: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 3
    },
    DayPicker_transitionContainer__horizontal: {
      transition: 'height 0.2s ease-in-out'
    },
    DayPicker_transitionContainer__vertical: {
      width: '100%'
    },
    DayPicker_transitionContainer__verticalScrollable: _objectSpread({
      paddingTop: 20,
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: noflip(0),
      left: noflip(0),
      overflowY: 'scroll'
    }, noScrollBarOnVerticalScrollable && {
      '-webkitOverflowScrolling': 'touch',
      '::-webkit-scrollbar': {
        '-webkit-appearance': 'none',
        display: 'none'
      }
    })
  };
}, {
  pureComponent: typeof React.PureComponent !== 'undefined'
})(DayPicker);