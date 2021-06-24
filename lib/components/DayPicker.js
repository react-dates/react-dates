"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PureDayPicker = exports.defaultProps = void 0;

var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _reactWithStyles = require("react-with-styles");

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _isTouchDevice = _interopRequireDefault(require("is-touch-device"));

var _reactOutsideClickHandler = _interopRequireDefault(require("react-outside-click-handler"));

var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));

var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _getMonth = _interopRequireDefault(require("date-fns/getMonth"));

var _setDay = _interopRequireDefault(require("date-fns/setDay"));

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));

var _subMonths = _interopRequireDefault(require("date-fns/subMonths"));

var _addWeeks = _interopRequireDefault(require("date-fns/addWeeks"));

var _subWeeks = _interopRequireDefault(require("date-fns/subWeeks"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _addHours = _interopRequireDefault(require("date-fns/addHours"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));

var _defaultPhrases = require("../defaultPhrases");

var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));

var _noflip = _interopRequireDefault(require("../utils/noflip"));

var _CalendarMonthGrid = _interopRequireDefault(require("./CalendarMonthGrid"));

var _DayPickerNavigation = _interopRequireDefault(require("./DayPickerNavigation"));

var _DayPickerKeyboardShortcuts = _interopRequireWildcard(require("./DayPickerKeyboardShortcuts"));

var _getNumberOfCalendarMonthWeeks = _interopRequireDefault(require("../utils/getNumberOfCalendarMonthWeeks"));

var _getCalendarMonthWidth = _interopRequireDefault(require("../utils/getCalendarMonthWidth"));

var _calculateDimension = _interopRequireDefault(require("../utils/calculateDimension"));

var _getActiveElement = _interopRequireDefault(require("../utils/getActiveElement"));

var _isDayVisible = _interopRequireDefault(require("../utils/isDayVisible"));

var _getLocale = _interopRequireDefault(require("../utils/getLocale"));

var _ModifiersShape = _interopRequireDefault(require("../shapes/ModifiersShape"));

var _NavPositionShape = _interopRequireDefault(require("../shapes/NavPositionShape"));

var _ScrollableOrientationShape = _interopRequireDefault(require("../shapes/ScrollableOrientationShape"));

var _DayOfWeekShape = _interopRequireDefault(require("../shapes/DayOfWeekShape"));

var _CalendarInfoPositionShape = _interopRequireDefault(require("../shapes/CalendarInfoPositionShape"));

var _constants = require("../constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MONTH_PAddING = 23;
var PREV_TRANSITION = 'prev';
var NEXT_TRANSITION = 'next';
var MONTH_SELECTION_TRANSITION = 'month_selection';
var YEAR_SELECTION_TRANSITION = 'year_selection';
var PREV_NAV = 'prev_nav';
var NEXT_NAV = 'next_nav';
var propTypes = process.env.NODE_ENV !== "production" ? (0, _airbnbPropTypes.forbidExtraProps)(_objectSpread(_objectSpread({}, _reactWithStyles.withStylesPropTypes), {}, {
  // calendar presentation props
  enableOutsideDays: _propTypes["default"].bool,
  numberOfMonths: _propTypes["default"].number,
  orientation: _ScrollableOrientationShape["default"],
  withPortal: _propTypes["default"].bool,
  onOutsideClick: _propTypes["default"].func,
  hidden: _propTypes["default"].bool,
  initialVisibleMonth: _propTypes["default"].func,
  firstDayOfWeek: _DayOfWeekShape["default"],
  renderCalendarInfo: _propTypes["default"].func,
  calendarInfoPosition: _CalendarInfoPositionShape["default"],
  hideKeyboardShortcutsPanel: _propTypes["default"].bool,
  daySize: _airbnbPropTypes.nonNegativeInteger,
  isRTL: _propTypes["default"].bool,
  verticalHeight: _airbnbPropTypes.nonNegativeInteger,
  noBorder: _propTypes["default"].bool,
  transitionDuration: _airbnbPropTypes.nonNegativeInteger,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,
  horizontalMonthPadding: _airbnbPropTypes.nonNegativeInteger,
  renderKeyboardShortcutsButton: _propTypes["default"].func,
  renderKeyboardShortcutsPanel: _propTypes["default"].func,
  // navigation props
  dayPickerNavigationInlineStyles: _propTypes["default"].object,
  disablePrev: _propTypes["default"].bool,
  disableNext: _propTypes["default"].bool,
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
  onMonthChange: _propTypes["default"].func,
  onYearChange: _propTypes["default"].func,
  onGetNextScrollableMonths: _propTypes["default"].func,
  // VERTICAL_SCROLLABLE daypickers only
  onGetPrevScrollableMonths: _propTypes["default"].func,
  // VERTICAL_SCROLLABLE daypickers only
  // month props
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes["default"].func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: _propTypes["default"].func,
  // day props
  modifiers: _propTypes["default"].objectOf(_propTypes["default"].objectOf(_ModifiersShape["default"])),
  renderCalendarDay: _propTypes["default"].func,
  renderDayContents: _propTypes["default"].func,
  onDayClick: _propTypes["default"].func,
  onDayMouseEnter: _propTypes["default"].func,
  onDayMouseLeave: _propTypes["default"].func,
  // accessibility props
  isFocused: _propTypes["default"].bool,
  getFirstFocusableDay: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  showKeyboardShortcuts: _propTypes["default"].bool,
  onTab: _propTypes["default"].func,
  onShiftTab: _propTypes["default"].func,
  // internationalization
  monthFormat: _propTypes["default"].string,
  weekDayFormat: _propTypes["default"].string,
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DayPickerPhrases)),
  dayAriaLabelFormat: _propTypes["default"].string,
  locale: _propTypes["default"].string
})) : {};
var defaultProps = {
  // calendar presentation props
  enableOutsideDays: false,
  numberOfMonths: 2,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  withPortal: false,
  onOutsideClick: function onOutsideClick() {},
  hidden: false,
  initialVisibleMonth: function initialVisibleMonth() {
    return (0, _addHours["default"])((0, _startOfDay["default"])(new Date()), 12);
  },
  firstDayOfWeek: null,
  renderCalendarInfo: null,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: _constants.DAY_SIZE,
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
  monthFormat: 'MMMM yyyy',
  weekDayFormat: 'eee',
  phrases: _defaultPhrases.DayPickerPhrases,
  dayAriaLabelFormat: undefined,
  locale: null
};
exports.defaultProps = defaultProps;

var DayPicker = /*#__PURE__*/function (_ref) {
  (0, _inheritsLoose2["default"])(DayPicker, _ref);
  var _proto = DayPicker.prototype;

  _proto[!_react["default"].PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };

  function DayPicker(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    var currentMonth = props.hidden ? (0, _addHours["default"])((0, _startOfDay["default"])(new Date()), 12) : props.initialVisibleMonth();
    var focusedDate = (0, _startOfMonth["default"])(currentMonth);

    if (props.getFirstFocusableDay) {
      focusedDate = props.getFirstFocusableDay(currentMonth);
    }

    var horizontalMonthPadding = props.horizontalMonthPadding;
    var translationValue = props.isRTL && _this.isHorizontal() ? -(0, _getCalendarMonthWidth["default"])(props.daySize, horizontalMonthPadding) : 0;
    _this.hasSetInitialVisibleMonth = !props.hidden;
    _this.state = {
      currentMonthScrollTop: null,
      currentMonth: currentMonth,
      monthTransition: null,
      translationValue: translationValue,
      scrollableMonthMultiple: 1,
      calendarMonthWidth: (0, _getCalendarMonthWidth["default"])(props.daySize, horizontalMonthPadding),
      focusedDate: !props.hidden || props.isFocused ? focusedDate : null,
      nextFocusedDate: null,
      showKeyboardShortcuts: props.showKeyboardShortcuts,
      onKeyboardShortcutsPanelClose: function onKeyboardShortcutsPanelClose() {},
      isTouchDevice: (0, _isTouchDevice["default"])(),
      withMouseInteractions: true,
      calendarInfoWidth: 0,
      monthTitleHeight: null,
      hasSetHeight: false
    };

    _this.setCalendarMonthWeeks(currentMonth);

    _this.calendarMonthGridHeight = 0;
    _this.setCalendarInfoWidthTimeout = null;
    _this.setCalendarMonthGridHeightTimeout = null;
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this.throttledKeyDown = (0, _throttle["default"])(_this.onFinalKeyDown, 200, {
      trailing: false
    });
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onPrevMonthTransition = _this.onPrevMonthTransition.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onNextMonthClick = _this.onNextMonthClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onNextMonthTransition = _this.onNextMonthTransition.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onMonthChange = _this.onMonthChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onYearChange = _this.onYearChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getNextScrollableMonths = _this.getNextScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getPrevScrollableMonths = _this.getPrevScrollableMonths.bind((0, _assertThisInitialized2["default"])(_this));
    _this.updateStateAfterMonthTransition = _this.updateStateAfterMonthTransition.bind((0, _assertThisInitialized2["default"])(_this));
    _this.openKeyboardShortcutsPanel = _this.openKeyboardShortcutsPanel.bind((0, _assertThisInitialized2["default"])(_this));
    _this.closeKeyboardShortcutsPanel = _this.closeKeyboardShortcutsPanel.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setCalendarInfoRef = _this.setCalendarInfoRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setContainerRef = _this.setContainerRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setTransitionContainerRef = _this.setTransitionContainerRef.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setMonthTitleHeight = _this.setMonthTitleHeight.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  _proto.componentDidMount = function componentDidMount() {
    var orientation = this.props.orientation;
    var currentMonth = this.state.currentMonth;
    var calendarInfoWidth = this.calendarInfo ? (0, _calculateDimension["default"])(this.calendarInfo, 'width', true, true) : 0;
    var currentMonthScrollTop = this.transitionContainer && orientation === _constants.VERTICAL_SCROLLABLE ? this.transitionContainer.scrollHeight - this.transitionContainer.scrollTop : null;
    this.setState({
      isTouchDevice: (0, _isTouchDevice["default"])(),
      calendarInfoWidth: calendarInfoWidth,
      currentMonthScrollTop: currentMonthScrollTop
    });
    this.setCalendarMonthWeeks(currentMonth);
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps, nextState) {
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
      }
    }

    var _this$props = this.props,
        daySize = _this$props.daySize,
        prevIsFocused = _this$props.isFocused,
        prevRenderMonthText = _this$props.renderMonthText;

    if (nextProps.daySize !== daySize) {
      this.setState({
        calendarMonthWidth: (0, _getCalendarMonthWidth["default"])(nextProps.daySize, horizontalMonthPadding)
      });
    }

    if (isFocused !== prevIsFocused) {
      if (isFocused) {
        var focusedDate = this.getFocusedday(currentMonth);
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

    if (renderMonthText !== prevRenderMonthText) {
      this.setState({
        monthTitleHeight: null
      });
    } // Capture the scroll position so when previous months are rendered above the current month
    // we can adjust scroll after the component has updated and the previous current month
    // stays in view.


    if (orientation === _constants.VERTICAL_SCROLLABLE && this.transitionContainer && !(0, _isSameMonth["default"])(currentMonth, nextCurrentMonth)) {
      this.setState({
        currentMonthScrollTop: this.transitionContainer.scrollHeight - this.transitionContainer.scrollTop
      });
    }
  };

  _proto.UNSAFE_componentWillUpdate = function UNSAFE_componentWillUpdate() {
    var _this2 = this;

    var transitionDuration = this.props.transitionDuration; // Calculating the dimensions trigger a DOM repaint which
    // breaks the CSS transition.
    // The setTimeout will wait until the transition ends.

    if (this.calendarInfo) {
      this.setCalendarInfoWidthTimeout = setTimeout(function () {
        var calendarInfoWidth = _this2.state.calendarInfoWidth;
        var calendarInfoPanelWidth = (0, _calculateDimension["default"])(_this2.calendarInfo, 'width', true, true);

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

    if (this.isHorizontal() && (orientation !== prevProps.orientation || daySize !== prevProps.daySize)) {
      var visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
      var calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat((0, _toConsumableArray2["default"])(visibleCalendarWeeks))) * (daySize - 1);
      var newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }

    if (!prevProps.isFocused && isFocused && !focusedDate) {
      this.container.focus();
    } // If orientation is VERTICAL_SCROLLABLE and currentMonth has changed adjust scrollTop so the
    // new months rendered above the current month don't push the current month out of view.


    if (orientation === _constants.VERTICAL_SCROLLABLE && !(0, _isSameMonth["default"])(prevState.currentMonth, currentMonth) && currentMonthScrollTop && this.transitionContainer) {
      this.transitionContainer.scrollTop = this.transitionContainer.scrollHeight - currentMonthScrollTop;
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.setCalendarInfoWidthTimeout);
    clearTimeout(this.setCalendarMonthGridHeightTimeout);
  };

  _proto.onKeyDown = function onKeyDown(e) {
    e.stopPropagation();

    if (!_constants.MODIFIER_KEY_NAMES.has(e.key)) {
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
    var newFocusedDate = new Date(focusedDate);
    var didTransitionMonth = false; // focus might be anywhere when the keyboard shortcuts panel is opened so we want to
    // return it to wherever it was before when the panel was opened

    var activeElement = (0, _getActiveElement["default"])();

    var onKeyboardShortcutsPanelClose = function onKeyboardShortcutsPanelClose() {
      if (activeElement) activeElement.focus();
    };

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newFocusedDate = (0, _subWeeks["default"])(newFocusedDate, 1);
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;

      case 'ArrowLeft':
        e.preventDefault();

        if (isRTL) {
          newFocusedDate = (0, _addDays["default"])(newFocusedDate, 1);
        } else {
          newFocusedDate = (0, _subDays["default"])(newFocusedDate, 1);
        }

        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;

      case 'Home':
        e.preventDefault();
        newFocusedDate = (0, _startOfWeek["default"])(newFocusedDate);
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;

      case 'PageUp':
        e.preventDefault();
        newFocusedDate = (0, _subMonths["default"])(newFocusedDate, 1);
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;

      case 'ArrowDown':
        e.preventDefault();
        newFocusedDate = (0, _addWeeks["default"])(newFocusedDate, 1);
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;

      case 'ArrowRight':
        e.preventDefault();

        if (isRTL) {
          newFocusedDate = (0, _subDays["default"])(newFocusedDate, 1);
        } else {
          newFocusedDate = (0, _addDays["default"])(newFocusedDate, 1);
        }

        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;

      case 'End':
        e.preventDefault();
        newFocusedDate = (0, _endOfWeek["default"])(newFocusedDate);
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;

      case 'PageDown':
        e.preventDefault();
        newFocusedDate = (0, _addMonths["default"])(newFocusedDate, 1);
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
    } // If there was a month transition, do not update the focused date until the transition has
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

      var _calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat((0, _toConsumableArray2["default"])(visibleCalendarWeeks))) * (daySize - 1);

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
    this.calculateAndSetDayPickerHeight(); // Translation value is a hack to force an invisible transition that
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
    this.calculateAndSetDayPickerHeight(); // Translation value is a hack to force an invisible transition that
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

      var _calendarMonthWeeksHeight2 = Math.max.apply(Math, [0].concat((0, _toConsumableArray2["default"])(visibleCalendarWeeks))) * (daySize - 1);

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
    var _this$props6 = this.props,
        firstDayOfWeek = _this$props6.firstDayOfWeek,
        locale = _this$props6.locale;
    var localeData = (0, _getLocale["default"])(locale);

    if (firstDayOfWeek === null) {
      return localeData.options.weekStartsOn;
    }

    return firstDayOfWeek;
  };

  _proto.getWeekHeaders = function getWeekHeaders() {
    var _this$props7 = this.props,
        weekDayFormat = _this$props7.weekDayFormat,
        locale = _this$props7.locale;
    var currentMonth = this.state.currentMonth;
    var firstDayOfWeek = this.getFirstDayOfWeek();
    var weekHeaders = [];

    for (var i = 0; i < 7; i += 1) {
      weekHeaders.push((0, _format["default"])((0, _setDay["default"])((0, _addHours["default"])((0, _startOfDay["default"])(currentMonth), 12), (i + firstDayOfWeek) % 7), weekDayFormat, {
        locale: (0, _getLocale["default"])(locale)
      }));
    }

    return weekHeaders;
  };

  _proto.getFirstVisibleIndex = function getFirstVisibleIndex() {
    var orientation = this.props.orientation;
    var monthTransition = this.state.monthTransition;
    if (orientation === _constants.VERTICAL_SCROLLABLE) return 0;
    var firstVisibleMonthIndex = 1;

    if (monthTransition === PREV_TRANSITION) {
      firstVisibleMonthIndex -= 1;
    } else if (monthTransition === NEXT_TRANSITION) {
      firstVisibleMonthIndex += 1;
    }

    return firstVisibleMonthIndex;
  };

  _proto.getFocusedday = function getFocusedday(newMonth) {
    var _this$props8 = this.props,
        getFirstFocusableDay = _this$props8.getFirstFocusableDay,
        numberOfMonths = _this$props8.numberOfMonths;
    var focusedDate;

    if (getFirstFocusableDay) {
      focusedDate = getFirstFocusableDay(newMonth);
    }

    if (newMonth && (!focusedDate || !(0, _isDayVisible["default"])(focusedDate, newMonth, numberOfMonths))) {
      focusedDate = (0, _startOfMonth["default"])(newMonth);
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
    var _this$props9 = this.props,
        numberOfMonths = _this$props9.numberOfMonths,
        locale = _this$props9.locale;
    this.calendarMonthWeeks = [];
    var month = (0, _subMonths["default"])(currentMonth, 1);
    var firstDayOfWeek = this.getFirstDayOfWeek();

    for (var i = 0; i < numberOfMonths + 2; i += 1) {
      var numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks["default"])(month, firstDayOfWeek, locale);
      this.calendarMonthWeeks.push(numberOfWeeks);
      month = (0, _addMonths["default"])(month, 1);
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
    this.setState(function (_ref2) {
      var scrollableMonthMultiple = _ref2.scrollableMonthMultiple;
      return {
        scrollableMonthMultiple: scrollableMonthMultiple + 1
      };
    });
  };

  _proto.getPrevScrollableMonths = function getPrevScrollableMonths(e) {
    var _this$props10 = this.props,
        numberOfMonths = _this$props10.numberOfMonths,
        onGetPrevScrollableMonths = _this$props10.onGetPrevScrollableMonths;
    if (e) e.preventDefault();
    if (onGetPrevScrollableMonths) onGetPrevScrollableMonths(e);
    this.setState(function (_ref3) {
      var currentMonth = _ref3.currentMonth,
          scrollableMonthMultiple = _ref3.scrollableMonthMultiple;
      return {
        currentMonth: (0, _subMonths["default"])(currentMonth, numberOfMonths),
        scrollableMonthMultiple: scrollableMonthMultiple + 1
      };
    });
  };

  _proto.maybeTransitionNextMonth = function maybeTransitionNextMonth(newFocusedDate) {
    var numberOfMonths = this.props.numberOfMonths;
    var _this$state5 = this.state,
        currentMonth = _this$state5.currentMonth,
        focusedDate = _this$state5.focusedDate;
    var newFocusedDateMonth = (0, _getMonth["default"])(newFocusedDate);
    var focusedDateMonth = (0, _getMonth["default"])(focusedDate);
    var isNewFocusedDateVisible = (0, _isDayVisible["default"])(newFocusedDate, currentMonth, numberOfMonths);

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
    var newFocusedDateMonth = (0, _getMonth["default"])(newFocusedDate);
    var focusedDateMonth = (0, _getMonth["default"])(focusedDate);
    var isNewFocusedDateVisible = (0, _isDayVisible["default"])(newFocusedDate, currentMonth, numberOfMonths);

    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      this.onPrevMonthTransition(newFocusedDate);
      return true;
    }

    return false;
  };

  _proto.isHorizontal = function isHorizontal() {
    var orientation = this.props.orientation;
    return orientation === _constants.HORIZONTAL_ORIENTATION;
  };

  _proto.isVertical = function isVertical() {
    var orientation = this.props.orientation;
    return orientation === _constants.VERTICAL_ORIENTATION || orientation === _constants.VERTICAL_SCROLLABLE;
  };

  _proto.updateStateAfterMonthTransition = function updateStateAfterMonthTransition() {
    var _this4 = this;

    var _this$props11 = this.props,
        onPrevMonthClick = _this$props11.onPrevMonthClick,
        onNextMonthClick = _this$props11.onNextMonthClick,
        numberOfMonths = _this$props11.numberOfMonths,
        onMonthChange = _this$props11.onMonthChange,
        onYearChange = _this$props11.onYearChange,
        isRTL = _this$props11.isRTL,
        locale = _this$props11.locale;
    var _this$state7 = this.state,
        currentMonth = _this$state7.currentMonth,
        monthTransition = _this$state7.monthTransition,
        focusedDate = _this$state7.focusedDate,
        nextFocusedDate = _this$state7.nextFocusedDate,
        withMouseInteractions = _this$state7.withMouseInteractions,
        calendarMonthWidth = _this$state7.calendarMonthWidth;
    if (!monthTransition) return;
    var newMonth = currentMonth;
    var firstDayOfWeek = this.getFirstDayOfWeek();

    if (monthTransition === PREV_TRANSITION) {
      newMonth = (0, _subMonths["default"])(newMonth, 1);
      if (onPrevMonthClick) onPrevMonthClick(newMonth);
      var newInvisibleMonth = (0, _subMonths["default"])(newMonth, 1);
      var numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks["default"])(newInvisibleMonth, firstDayOfWeek, locale);
      this.calendarMonthWeeks = [numberOfWeeks].concat((0, _toConsumableArray2["default"])(this.calendarMonthWeeks.slice(0, -1)));
    } else if (monthTransition === NEXT_TRANSITION) {
      newMonth = (0, _addMonths["default"])(newMonth, 1);
      if (onNextMonthClick) onNextMonthClick(newMonth);

      var _newInvisibleMonth = (0, _addMonths["default"])(newMonth, numberOfMonths);

      var _numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks["default"])(_newInvisibleMonth, firstDayOfWeek, locale);

      this.calendarMonthWeeks = [].concat((0, _toConsumableArray2["default"])(this.calendarMonthWeeks.slice(1)), [_numberOfWeeks]);
    } else if (monthTransition === MONTH_SELECTION_TRANSITION) {
      if (onMonthChange) onMonthChange(newMonth);
    } else if (monthTransition === YEAR_SELECTION_TRANSITION) {
      if (onYearChange) onYearChange(newMonth);
    }

    var newFocusedDate = null;

    if (nextFocusedDate) {
      newFocusedDate = nextFocusedDate;
    } else if (!focusedDate && !withMouseInteractions) {
      newFocusedDate = this.getFocusedday(newMonth);
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
        var activeElement = (0, _getActiveElement["default"])();

        if (activeElement && activeElement !== document.body && _this4.container.contains(activeElement) && activeElement.blur) {
          activeElement.blur();
        }
      }
    });
  };

  _proto.adjustDayPickerHeight = function adjustDayPickerHeight(newMonthHeight) {
    var _this5 = this;

    var monthHeight = newMonthHeight + MONTH_PAddING;

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
    var _this$props12 = this.props,
        daySize = _this$props12.daySize,
        numberOfMonths = _this$props12.numberOfMonths;
    var monthTitleHeight = this.state.monthTitleHeight;
    var visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
    var calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat((0, _toConsumableArray2["default"])(visibleCalendarWeeks))) * (daySize - 1);
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
    var _this$props13 = this.props,
        dayPickerNavigationInlineStyles = _this$props13.dayPickerNavigationInlineStyles,
        disablePrev = _this$props13.disablePrev,
        disableNext = _this$props13.disableNext,
        navPosition = _this$props13.navPosition,
        navPrev = _this$props13.navPrev,
        navNext = _this$props13.navNext,
        noNavButtons = _this$props13.noNavButtons,
        noNavNextButton = _this$props13.noNavNextButton,
        noNavPrevButton = _this$props13.noNavPrevButton,
        orientation = _this$props13.orientation,
        phrases = _this$props13.phrases,
        renderNavPrevButton = _this$props13.renderNavPrevButton,
        renderNavNextButton = _this$props13.renderNavNextButton,
        isRTL = _this$props13.isRTL;

    if (noNavButtons) {
      return null;
    }

    var onPrevMonthClick = orientation === _constants.VERTICAL_SCROLLABLE ? this.getPrevScrollableMonths : this.onPrevMonthClick;
    var onNextMonthClick = orientation === _constants.VERTICAL_SCROLLABLE ? this.getNextScrollableMonths : this.onNextMonthClick;
    return /*#__PURE__*/_react["default"].createElement(_DayPickerNavigation["default"], {
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
      showNavNextButton: !(noNavNextButton || orientation === _constants.VERTICAL_SCROLLABLE && navDirection === PREV_NAV),
      showNavPrevButton: !(noNavPrevButton || orientation === _constants.VERTICAL_SCROLLABLE && navDirection === NEXT_NAV)
    });
  };

  _proto.renderWeekHeader = function renderWeekHeader(index) {
    var _this$props14 = this.props,
        daySize = _this$props14.daySize,
        horizontalMonthPadding = _this$props14.horizontalMonthPadding,
        orientation = _this$props14.orientation,
        renderWeekHeaderElement = _this$props14.renderWeekHeaderElement,
        styles = _this$props14.styles;
    var calendarMonthWidth = this.state.calendarMonthWidth;
    var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
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
      return /*#__PURE__*/_react["default"].createElement("li", (0, _extends2["default"])({
        key: day
      }, (0, _reactWithStyles.css)(styles.DayPicker_weekHeader_li, {
        width: daySize
      })), renderWeekHeaderElement ? renderWeekHeaderElement(day) : /*#__PURE__*/_react["default"].createElement("small", null, day));
    });
    return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, (0, _reactWithStyles.css)(styles.DayPicker_weekHeader, this.isVertical() && styles.DayPicker_weekHeader__vertical, verticalScrollable && styles.DayPicker_weekHeader__verticalScrollable, weekHeaderStyle, {
      padding: "0 ".concat(horizontalMonthPadding, "px")
    }), {
      key: "week-".concat(index)
    }), /*#__PURE__*/_react["default"].createElement("ul", (0, _reactWithStyles.css)(styles.DayPicker_weekHeader_ul), header));
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
    var _this$props15 = this.props,
        enableOutsideDays = _this$props15.enableOutsideDays,
        numberOfMonths = _this$props15.numberOfMonths,
        orientation = _this$props15.orientation,
        modifiers = _this$props15.modifiers,
        withPortal = _this$props15.withPortal,
        onDayClick = _this$props15.onDayClick,
        onDayMouseEnter = _this$props15.onDayMouseEnter,
        onDayMouseLeave = _this$props15.onDayMouseLeave,
        firstDayOfWeek = _this$props15.firstDayOfWeek,
        renderMonthText = _this$props15.renderMonthText,
        renderCalendarDay = _this$props15.renderCalendarDay,
        renderDayContents = _this$props15.renderDayContents,
        renderCalendarInfo = _this$props15.renderCalendarInfo,
        renderMonthElement = _this$props15.renderMonthElement,
        renderKeyboardShortcutsButton = _this$props15.renderKeyboardShortcutsButton,
        renderKeyboardShortcutsPanel = _this$props15.renderKeyboardShortcutsPanel,
        calendarInfoPosition = _this$props15.calendarInfoPosition,
        hideKeyboardShortcutsPanel = _this$props15.hideKeyboardShortcutsPanel,
        onOutsideClick = _this$props15.onOutsideClick,
        monthFormat = _this$props15.monthFormat,
        daySize = _this$props15.daySize,
        isFocused = _this$props15.isFocused,
        isRTL = _this$props15.isRTL,
        styles = _this$props15.styles,
        theme = _this$props15.theme,
        phrases = _this$props15.phrases,
        verticalHeight = _this$props15.verticalHeight,
        dayAriaLabelFormat = _this$props15.dayAriaLabelFormat,
        noBorder = _this$props15.noBorder,
        transitionDuration = _this$props15.transitionDuration,
        verticalBorderSpacing = _this$props15.verticalBorderSpacing,
        horizontalMonthPadding = _this$props15.horizontalMonthPadding,
        navPosition = _this$props15.navPosition,
        locale = _this$props15.locale;
    var dayPickerHorizontalPadding = theme.reactDates.spacing.dayPickerHorizontalPadding;
    var isHorizontal = this.isHorizontal();
    var numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
    var weekHeaders = [];

    for (var i = 0; i < numOfWeekHeaders; i += 1) {
      weekHeaders.push(this.renderWeekHeader(i));
    }

    var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
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
    var keyboardShortcutButtonLocation = _DayPickerKeyboardShortcuts.BOTTOM_RIGHT;

    if (this.isVertical()) {
      keyboardShortcutButtonLocation = withPortal ? _DayPickerKeyboardShortcuts.TOP_LEFT : _DayPickerKeyboardShortcuts.TOP_RIGHT;
    }

    var shouldAnimateHeight = isHorizontal && hasSetHeight;
    var calendarInfoPositionTop = calendarInfoPosition === _constants.INFO_POSITION_TOP;
    var calendarInfoPositionBottom = calendarInfoPosition === _constants.INFO_POSITION_BOTTOM;
    var calendarInfoPositionBefore = calendarInfoPosition === _constants.INFO_POSITION_BEFORE;
    var calendarInfoPositionAfter = calendarInfoPosition === _constants.INFO_POSITION_AFTER;
    var calendarInfoIsInline = calendarInfoPositionBefore || calendarInfoPositionAfter;

    var calendarInfo = renderCalendarInfo && /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
      ref: this.setCalendarInfoRef
    }, (0, _reactWithStyles.css)(calendarInfoIsInline && styles.DayPicker_calendarInfo__horizontal)), renderCalendarInfo());

    var calendarInfoPanelWidth = renderCalendarInfo && calendarInfoIsInline ? calendarInfoWidth : 0;
    var firstVisibleMonthIndex = this.getFirstVisibleIndex();
    var wrapperHorizontalWidth = calendarMonthWidth * numberOfMonths + 2 * dayPickerHorizontalPadding; // Adding `1px` because of whitespace between 2 inline-block

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
    return /*#__PURE__*/_react["default"].createElement("div", (0, _reactWithStyles.css)(styles.DayPicker, isHorizontal && styles.DayPicker__horizontal, verticalScrollable && styles.DayPicker__verticalScrollable, isHorizontal && withPortal && styles.DayPicker_portal__horizontal, this.isVertical() && withPortal && styles.DayPicker_portal__vertical, dayPickerStyle, !monthTitleHeight && styles.DayPicker__hidden, !noBorder && styles.DayPicker__withBorder), /*#__PURE__*/_react["default"].createElement(_reactOutsideClickHandler["default"], {
      onOutsideClick: onOutsideClick
    }, (calendarInfoPositionTop || calendarInfoPositionBefore) && calendarInfo, /*#__PURE__*/_react["default"].createElement("div", (0, _reactWithStyles.css)(dayPickerWrapperStyle, calendarInfoIsInline && isHorizontal && styles.DayPicker_wrapper__horizontal), /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, (0, _reactWithStyles.css)(styles.DayPicker_weekHeaders, isHorizontal && styles.DayPicker_weekHeaders__horizontal), {
      "aria-hidden": "true",
      role: "presentation"
    }), weekHeaders), /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, (0, _reactWithStyles.css)(styles.DayPicker_focusRegion), {
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
    }), !verticalScrollable && navPosition === _constants.NAV_POSITION_TOP && this.renderNavigation(), /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({}, (0, _reactWithStyles.css)(styles.DayPicker_transitionContainer, shouldAnimateHeight && styles.DayPicker_transitionContainer__horizontal, this.isVertical() && styles.DayPicker_transitionContainer__vertical, verticalScrollable && styles.DayPicker_transitionContainer__verticalScrollable, transitionContainerStyle), {
      ref: this.setTransitionContainerRef
    }), verticalScrollable && this.renderNavigation(PREV_NAV), /*#__PURE__*/_react["default"].createElement(_CalendarMonthGrid["default"], {
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
      horizontalMonthPadding: horizontalMonthPadding,
      locale: locale
    }), verticalScrollable && this.renderNavigation(NEXT_NAV)), !verticalScrollable && navPosition === _constants.NAV_POSITION_BOTTOM && this.renderNavigation(), !isTouch && !hideKeyboardShortcutsPanel && /*#__PURE__*/_react["default"].createElement(_DayPickerKeyboardShortcuts["default"], {
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
}(_react["default"].PureComponent || _react["default"].Component);

exports.PureDayPicker = DayPicker;
DayPicker.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DayPicker.defaultProps = defaultProps;

var _default = (0, _reactWithStyles.withStyles)(function (_ref4) {
  var _ref4$reactDates = _ref4.reactDates,
      color = _ref4$reactDates.color,
      font = _ref4$reactDates.font,
      noScrollBarOnVerticalScrollable = _ref4$reactDates.noScrollBarOnVerticalScrollable,
      spacing = _ref4$reactDates.spacing,
      zIndex = _ref4$reactDates.zIndex;
  return {
    DayPicker: {
      background: color.background,
      position: 'relative',
      textAlign: (0, _noflip["default"])('left')
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
      boxShadow: (0, _noflip["default"])('0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07)'),
      borderRadius: 3
    },
    DayPicker_portal__horizontal: {
      boxShadow: 'none',
      position: 'absolute',
      left: (0, _noflip["default"])('50%'),
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
      marginLeft: (0, _noflip["default"])(spacing.dayPickerHorizontalPadding)
    },
    DayPicker_weekHeader: {
      color: color.placeholderText,
      position: 'absolute',
      top: 62,
      zIndex: zIndex + 2,
      textAlign: (0, _noflip["default"])('left')
    },
    DayPicker_weekHeader__vertical: {
      left: (0, _noflip["default"])('50%')
    },
    DayPicker_weekHeader__verticalScrollable: {
      top: 0,
      display: 'table-row',
      borderBottom: "1px solid ".concat(color.core.border),
      background: color.background,
      marginLeft: (0, _noflip["default"])(0),
      left: (0, _noflip["default"])(0),
      width: '100%',
      textAlign: 'center'
    },
    DayPicker_weekHeader_ul: {
      listStyle: 'none',
      margin: '1px 0',
      paddingLeft: (0, _noflip["default"])(0),
      paddingRight: (0, _noflip["default"])(0),
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
      right: (0, _noflip["default"])(0),
      left: (0, _noflip["default"])(0),
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
  pureComponent: typeof _react["default"].PureComponent !== 'undefined'
})(DayPicker);

exports["default"] = _default;