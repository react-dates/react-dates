Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureDayPicker = exports.defaultProps = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _isTouchDevice = require('is-touch-device');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _reactOutsideClickHandler = require('react-outside-click-handler');

var _reactOutsideClickHandler2 = _interopRequireDefault(_reactOutsideClickHandler);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _CalendarMonthGrid = require('./CalendarMonthGrid');

var _CalendarMonthGrid2 = _interopRequireDefault(_CalendarMonthGrid);

var _DayPickerNavigation = require('./DayPickerNavigation');

var _DayPickerNavigation2 = _interopRequireDefault(_DayPickerNavigation);

var _DayPickerKeyboardShortcuts = require('./DayPickerKeyboardShortcuts');

var _DayPickerKeyboardShortcuts2 = _interopRequireDefault(_DayPickerKeyboardShortcuts);

var _getNumberOfCalendarMonthWeeks = require('../utils/getNumberOfCalendarMonthWeeks');

var _getNumberOfCalendarMonthWeeks2 = _interopRequireDefault(_getNumberOfCalendarMonthWeeks);

var _getCalendarMonthWidth = require('../utils/getCalendarMonthWidth');

var _getCalendarMonthWidth2 = _interopRequireDefault(_getCalendarMonthWidth);

var _calculateDimension = require('../utils/calculateDimension');

var _calculateDimension2 = _interopRequireDefault(_calculateDimension);

var _getActiveElement = require('../utils/getActiveElement');

var _getActiveElement2 = _interopRequireDefault(_getActiveElement);

var _isDayVisible = require('../utils/isDayVisible');

var _isDayVisible2 = _interopRequireDefault(_isDayVisible);

var _ModifiersShape = require('../shapes/ModifiersShape');

var _ModifiersShape2 = _interopRequireDefault(_ModifiersShape);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _DayOfWeekShape = require('../shapes/DayOfWeekShape');

var _DayOfWeekShape2 = _interopRequireDefault(_DayOfWeekShape);

var _CalendarInfoPositionShape = require('../shapes/CalendarInfoPositionShape');

var _CalendarInfoPositionShape2 = _interopRequireDefault(_CalendarInfoPositionShape);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MONTH_PADDING = 23;
var DAY_PICKER_PADDING = 9;
var PREV_TRANSITION = 'prev';
var NEXT_TRANSITION = 'next';
var MONTH_SELECTION_TRANSITION = 'month_selection';
var YEAR_SELECTION_TRANSITION = 'year_selection';

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {

  // calendar presentation props
  enableOutsideDays: _propTypes2['default'].bool,
  numberOfMonths: _propTypes2['default'].number,
  orientation: _ScrollableOrientationShape2['default'],
  withPortal: _propTypes2['default'].bool,
  onOutsideClick: _propTypes2['default'].func,
  hidden: _propTypes2['default'].bool,
  initialVisibleMonth: _propTypes2['default'].func,
  firstDayOfWeek: _DayOfWeekShape2['default'],
  renderCalendarInfo: _propTypes2['default'].func,
  calendarInfoPosition: _CalendarInfoPositionShape2['default'],
  hideKeyboardShortcutsPanel: _propTypes2['default'].bool,
  daySize: _airbnbPropTypes.nonNegativeInteger,
  isRTL: _propTypes2['default'].bool,
  verticalHeight: _airbnbPropTypes.nonNegativeInteger,
  noBorder: _propTypes2['default'].bool,
  transitionDuration: _airbnbPropTypes.nonNegativeInteger,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,

  // navigation props
  navPrev: _propTypes2['default'].node,
  navNext: _propTypes2['default'].node,
  noNavButtons: _propTypes2['default'].bool,
  onPrevMonthClick: _propTypes2['default'].func,
  onNextMonthClick: _propTypes2['default'].func,
  onMonthChange: _propTypes2['default'].func,
  onYearChange: _propTypes2['default'].func,
  onMultiplyScrollableMonths: _propTypes2['default'].func, // VERTICAL_SCROLLABLE daypickers only

  // month props
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes2['default'].func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes2['default'].func, 'renderMonthText', 'renderMonthElement'),

  // day props
  modifiers: _propTypes2['default'].objectOf(_propTypes2['default'].objectOf(_ModifiersShape2['default'])),
  renderCalendarDay: _propTypes2['default'].func,
  renderDayContents: _propTypes2['default'].func,
  onDayClick: _propTypes2['default'].func,
  onDayMouseEnter: _propTypes2['default'].func,
  onDayMouseLeave: _propTypes2['default'].func,

  // accessibility props
  isFocused: _propTypes2['default'].bool,
  getFirstFocusableDay: _propTypes2['default'].func,
  onBlur: _propTypes2['default'].func,
  showKeyboardShortcuts: _propTypes2['default'].bool,

  // internationalization
  monthFormat: _propTypes2['default'].string,
  weekDayFormat: _propTypes2['default'].string,
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.DayPickerPhrases)),
  dayAriaLabelFormat: _propTypes2['default'].string,
  isSingleDate: _propTypes2['default'].bool
}));

var defaultProps = exports.defaultProps = {
  // calendar presentation props
  enableOutsideDays: false,
  numberOfMonths: 2,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  withPortal: false,
  onOutsideClick: function () {
    function onOutsideClick() {}

    return onOutsideClick;
  }(),

  hidden: false,
  initialVisibleMonth: function () {
    function initialVisibleMonth() {
      return (0, _moment2['default'])();
    }

    return initialVisibleMonth;
  }(),
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

  // navigation props
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
  onMonthChange: function () {
    function onMonthChange() {}

    return onMonthChange;
  }(),
  onYearChange: function () {
    function onYearChange() {}

    return onYearChange;
  }(),
  onMultiplyScrollableMonths: function () {
    function onMultiplyScrollableMonths() {}

    return onMultiplyScrollableMonths;
  }(),


  // month props
  renderMonthText: null,
  renderMonthElement: null,

  // day props
  modifiers: {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  onDayClick: function () {
    function onDayClick() {}

    return onDayClick;
  }(),
  onDayMouseEnter: function () {
    function onDayMouseEnter() {}

    return onDayMouseEnter;
  }(),
  onDayMouseLeave: function () {
    function onDayMouseLeave() {}

    return onDayMouseLeave;
  }(),


  // accessibility props
  isFocused: false,
  getFirstFocusableDay: null,
  onBlur: function () {
    function onBlur() {}

    return onBlur;
  }(),

  showKeyboardShortcuts: false,

  // internationalization
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: _defaultPhrases.DayPickerPhrases,
  dayAriaLabelFormat: undefined,
  isSingleDate: false
};

var DayPicker = function (_React$Component) {
  _inherits(DayPicker, _React$Component);

  function DayPicker(props) {
    _classCallCheck(this, DayPicker);

    var _this = _possibleConstructorReturn(this, (DayPicker.__proto__ || Object.getPrototypeOf(DayPicker)).call(this, props));

    var currentMonth = props.hidden ? (0, _moment2['default'])() : props.initialVisibleMonth();

    var focusedDate = currentMonth.clone().startOf('month');
    if (props.getFirstFocusableDay) {
      focusedDate = props.getFirstFocusableDay(currentMonth);
    }

    var translationValue = props.isRTL && _this.isHorizontal() ? -(0, _getCalendarMonthWidth2['default'])(props.daySize) : 0;

    _this.hasSetInitialVisibleMonth = !props.hidden;
    _this.state = {
      currentMonth: currentMonth,
      monthTransition: null,
      translationValue: translationValue,
      scrollableMonthMultiple: 1,
      calendarMonthWidth: (0, _getCalendarMonthWidth2['default'])(props.daySize),
      focusedDate: !props.hidden || props.isFocused ? focusedDate : null,
      nextFocusedDate: null,
      showKeyboardShortcuts: props.showKeyboardShortcuts,
      onKeyboardShortcutsPanelClose: function () {
        function onKeyboardShortcutsPanelClose() {}

        return onKeyboardShortcutsPanelClose;
      }(),

      isTouchDevice: (0, _isTouchDevice2['default'])(),
      withMouseInteractions: true,
      calendarInfoWidth: 0,
      monthTitleHeight: null,
      hasSetHeight: false
    };

    _this.setCalendarMonthWeeks(currentMonth);

    _this.calendarMonthGridHeight = 0;
    _this.setCalendarInfoWidthTimeout = null;

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.throttledKeyDown = (0, _throttle2['default'])(_this.onFinalKeyDown, 200, { trailing: false });
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_this);
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_this);
    _this.onMonthChange = _this.onMonthChange.bind(_this);
    _this.onYearChange = _this.onYearChange.bind(_this);

    _this.multiplyScrollableMonths = _this.multiplyScrollableMonths.bind(_this);
    _this.updateStateAfterMonthTransition = _this.updateStateAfterMonthTransition.bind(_this);

    _this.openKeyboardShortcutsPanel = _this.openKeyboardShortcutsPanel.bind(_this);
    _this.closeKeyboardShortcutsPanel = _this.closeKeyboardShortcutsPanel.bind(_this);

    _this.setCalendarInfoRef = _this.setCalendarInfoRef.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    _this.setTransitionContainerRef = _this.setTransitionContainerRef.bind(_this);
    _this.setMonthTitleHeight = _this.setMonthTitleHeight.bind(_this);
    return _this;
  }

  _createClass(DayPicker, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        var currentMonth = this.state.currentMonth;

        if (this.calendarInfo) {
          this.setState({
            isTouchDevice: (0, _isTouchDevice2['default'])(),
            calendarInfoWidth: (0, _calculateDimension2['default'])(this.calendarInfo, 'width', true, true)
          });
        } else {
          this.setState({ isTouchDevice: (0, _isTouchDevice2['default'])() });
        }

        this.setCalendarMonthWeeks(currentMonth);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var hidden = nextProps.hidden,
            isFocused = nextProps.isFocused,
            showKeyboardShortcuts = nextProps.showKeyboardShortcuts,
            onBlur = nextProps.onBlur,
            renderMonthText = nextProps.renderMonthText;
        var currentMonth = this.state.currentMonth;


        if (!hidden) {
          if (!this.hasSetInitialVisibleMonth) {
            this.hasSetInitialVisibleMonth = true;
            this.setState({
              currentMonth: nextProps.initialVisibleMonth()
            });
          }
        }

        var _props = this.props,
            daySize = _props.daySize,
            prevIsFocused = _props.isFocused,
            prevRenderMonthText = _props.renderMonthText;


        if (nextProps.daySize !== daySize) {
          this.setState({
            calendarMonthWidth: (0, _getCalendarMonthWidth2['default'])(nextProps.daySize)
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
            this.setState({ focusedDate: null });
          }
        }

        if (renderMonthText !== prevRenderMonthText) {
          this.setState({
            monthTitleHeight: null
          });
        }
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'shouldComponentUpdate',
    value: function () {
      function shouldComponentUpdate(nextProps, nextState) {
        return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'componentWillUpdate',
    value: function () {
      function componentWillUpdate() {
        var _this2 = this;

        var transitionDuration = this.props.transitionDuration;

        // Calculating the dimensions trigger a DOM repaint which
        // breaks the CSS transition.
        // The setTimeout will wait until the transition ends.

        if (this.calendarInfo) {
          this.setCalendarInfoWidthTimeout = setTimeout(function () {
            var calendarInfoWidth = _this2.state.calendarInfoWidth;

            var calendarInfoPanelWidth = (0, _calculateDimension2['default'])(_this2.calendarInfo, 'width', true, true);
            if (calendarInfoWidth !== calendarInfoPanelWidth) {
              _this2.setState({
                calendarInfoWidth: calendarInfoPanelWidth
              });
            }
          }, transitionDuration);
        }
      }

      return componentWillUpdate;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        var isFocused = this.props.isFocused;
        var focusedDate = this.state.focusedDate;


        if (!prevProps.isFocused && isFocused && !focusedDate) {
          this.container.focus();
        }
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        clearTimeout(this.setCalendarInfoWidthTimeout);
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'onKeyDown',
    value: function () {
      function onKeyDown(e) {
        e.stopPropagation();
        if (!_constants.MODIFIER_KEY_NAMES.has(e.key)) {
          this.throttledKeyDown(e);
        }
      }

      return onKeyDown;
    }()
  }, {
    key: 'onFinalKeyDown',
    value: function () {
      function onFinalKeyDown(e) {
        this.setState({ withMouseInteractions: false });

        var _props2 = this.props,
            onBlur = _props2.onBlur,
            isRTL = _props2.isRTL;
        var _state = this.state,
            focusedDate = _state.focusedDate,
            showKeyboardShortcuts = _state.showKeyboardShortcuts;

        if (!focusedDate) return;

        var newFocusedDate = focusedDate.clone();

        var didTransitionMonth = false;

        // focus might be anywhere when the keyboard shortcuts panel is opened so we want to
        // return it to wherever it was before when the panel was opened
        var activeElement = (0, _getActiveElement2['default'])();
        var onKeyboardShortcutsPanelClose = function () {
          function onKeyboardShortcutsPanelClose() {
            if (activeElement) activeElement.focus();
          }

          return onKeyboardShortcutsPanelClose;
        }();

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
            } else {
              newFocusedDate.subtract(1, 'day');
            }
            didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
            break;
          case 'Home':
            e.preventDefault();
            newFocusedDate.startOf('week');
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
            } else {
              newFocusedDate.add(1, 'day');
            }
            didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
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
              onBlur();
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
      }

      return onFinalKeyDown;
    }()
  }, {
    key: 'onPrevMonthClick',
    value: function () {
      function onPrevMonthClick(nextFocusedDate, e) {
        var _props3 = this.props,
            daySize = _props3.daySize,
            isRTL = _props3.isRTL,
            numberOfMonths = _props3.numberOfMonths;
        var _state2 = this.state,
            calendarMonthWidth = _state2.calendarMonthWidth,
            monthTitleHeight = _state2.monthTitleHeight;


        if (e) e.preventDefault();

        var translationValue = void 0;
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
      }

      return onPrevMonthClick;
    }()
  }, {
    key: 'onMonthChange',
    value: function () {
      function onMonthChange(currentMonth) {
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
      }

      return onMonthChange;
    }()
  }, {
    key: 'onYearChange',
    value: function () {
      function onYearChange(currentMonth) {
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
      }

      return onYearChange;
    }()
  }, {
    key: 'onNextMonthClick',
    value: function () {
      function onNextMonthClick(nextFocusedDate, e) {
        var _props4 = this.props,
            isRTL = _props4.isRTL,
            numberOfMonths = _props4.numberOfMonths,
            daySize = _props4.daySize;
        var _state3 = this.state,
            calendarMonthWidth = _state3.calendarMonthWidth,
            monthTitleHeight = _state3.monthTitleHeight;


        if (e) e.preventDefault();

        var translationValue = void 0;

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
      }

      return onNextMonthClick;
    }()
  }, {
    key: 'getFirstDayOfWeek',
    value: function () {
      function getFirstDayOfWeek() {
        var firstDayOfWeek = this.props.firstDayOfWeek;

        if (firstDayOfWeek == null) {
          return _moment2['default'].localeData().firstDayOfWeek();
        }

        return firstDayOfWeek;
      }

      return getFirstDayOfWeek;
    }()
  }, {
    key: 'getFirstVisibleIndex',
    value: function () {
      function getFirstVisibleIndex() {
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
      }

      return getFirstVisibleIndex;
    }()
  }, {
    key: 'getFocusedDay',
    value: function () {
      function getFocusedDay(newMonth) {
        var _props5 = this.props,
            getFirstFocusableDay = _props5.getFirstFocusableDay,
            numberOfMonths = _props5.numberOfMonths;


        var focusedDate = void 0;
        if (getFirstFocusableDay) {
          focusedDate = getFirstFocusableDay(newMonth);
        }

        if (newMonth && (!focusedDate || !(0, _isDayVisible2['default'])(focusedDate, newMonth, numberOfMonths))) {
          focusedDate = newMonth.clone().startOf('month');
        }

        return focusedDate;
      }

      return getFocusedDay;
    }()
  }, {
    key: 'setMonthTitleHeight',
    value: function () {
      function setMonthTitleHeight(monthTitleHeight) {
        var _this3 = this;

        this.setState({
          monthTitleHeight: monthTitleHeight
        }, function () {
          _this3.calculateAndSetDayPickerHeight();
        });
      }

      return setMonthTitleHeight;
    }()
  }, {
    key: 'setCalendarMonthWeeks',
    value: function () {
      function setCalendarMonthWeeks(currentMonth) {
        var numberOfMonths = this.props.numberOfMonths;


        this.calendarMonthWeeks = [];
        var month = currentMonth.clone().subtract(1, 'months');
        var firstDayOfWeek = this.getFirstDayOfWeek();
        for (var i = 0; i < numberOfMonths + 2; i += 1) {
          var numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks2['default'])(month, firstDayOfWeek);
          this.calendarMonthWeeks.push(numberOfWeeks);
          month = month.add(1, 'months');
        }
      }

      return setCalendarMonthWeeks;
    }()
  }, {
    key: 'setContainerRef',
    value: function () {
      function setContainerRef(ref) {
        this.container = ref;
      }

      return setContainerRef;
    }()
  }, {
    key: 'setCalendarInfoRef',
    value: function () {
      function setCalendarInfoRef(ref) {
        this.calendarInfo = ref;
      }

      return setCalendarInfoRef;
    }()
  }, {
    key: 'setTransitionContainerRef',
    value: function () {
      function setTransitionContainerRef(ref) {
        this.transitionContainer = ref;
      }

      return setTransitionContainerRef;
    }()
  }, {
    key: 'maybeTransitionNextMonth',
    value: function () {
      function maybeTransitionNextMonth(newFocusedDate) {
        var numberOfMonths = this.props.numberOfMonths;
        var _state4 = this.state,
            currentMonth = _state4.currentMonth,
            focusedDate = _state4.focusedDate;


        var newFocusedDateMonth = newFocusedDate.month();
        var focusedDateMonth = focusedDate.month();
        var isNewFocusedDateVisible = (0, _isDayVisible2['default'])(newFocusedDate, currentMonth, numberOfMonths);
        if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
          this.onNextMonthClick(newFocusedDate);
          return true;
        }

        return false;
      }

      return maybeTransitionNextMonth;
    }()
  }, {
    key: 'maybeTransitionPrevMonth',
    value: function () {
      function maybeTransitionPrevMonth(newFocusedDate) {
        var numberOfMonths = this.props.numberOfMonths;
        var _state5 = this.state,
            currentMonth = _state5.currentMonth,
            focusedDate = _state5.focusedDate;


        var newFocusedDateMonth = newFocusedDate.month();
        var focusedDateMonth = focusedDate.month();
        var isNewFocusedDateVisible = (0, _isDayVisible2['default'])(newFocusedDate, currentMonth, numberOfMonths);
        if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
          this.onPrevMonthClick(newFocusedDate);
          return true;
        }

        return false;
      }

      return maybeTransitionPrevMonth;
    }()
  }, {
    key: 'multiplyScrollableMonths',
    value: function () {
      function multiplyScrollableMonths(e) {
        var onMultiplyScrollableMonths = this.props.onMultiplyScrollableMonths;

        if (e) e.preventDefault();

        if (onMultiplyScrollableMonths) onMultiplyScrollableMonths(e);

        this.setState(function (_ref) {
          var scrollableMonthMultiple = _ref.scrollableMonthMultiple;
          return {
            scrollableMonthMultiple: scrollableMonthMultiple + 1
          };
        });
      }

      return multiplyScrollableMonths;
    }()
  }, {
    key: 'isHorizontal',
    value: function () {
      function isHorizontal() {
        var orientation = this.props.orientation;

        return orientation === _constants.HORIZONTAL_ORIENTATION;
      }

      return isHorizontal;
    }()
  }, {
    key: 'isVertical',
    value: function () {
      function isVertical() {
        var orientation = this.props.orientation;

        return orientation === _constants.VERTICAL_ORIENTATION || orientation === _constants.VERTICAL_SCROLLABLE;
      }

      return isVertical;
    }()
  }, {
    key: 'updateStateAfterMonthTransition',
    value: function () {
      function updateStateAfterMonthTransition() {
        var _this4 = this;

        var _props6 = this.props,
            onPrevMonthClick = _props6.onPrevMonthClick,
            onNextMonthClick = _props6.onNextMonthClick,
            numberOfMonths = _props6.numberOfMonths,
            onMonthChange = _props6.onMonthChange,
            onYearChange = _props6.onYearChange,
            isRTL = _props6.isRTL;
        var _state6 = this.state,
            currentMonth = _state6.currentMonth,
            monthTransition = _state6.monthTransition,
            focusedDate = _state6.focusedDate,
            nextFocusedDate = _state6.nextFocusedDate,
            withMouseInteractions = _state6.withMouseInteractions,
            calendarMonthWidth = _state6.calendarMonthWidth;


        if (!monthTransition) return;

        var newMonth = currentMonth.clone();
        var firstDayOfWeek = this.getFirstDayOfWeek();
        if (monthTransition === PREV_TRANSITION) {
          newMonth.subtract(1, 'month');
          if (onPrevMonthClick) onPrevMonthClick(newMonth);
          var newInvisibleMonth = newMonth.clone().subtract(1, 'month');
          var numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks2['default'])(newInvisibleMonth, firstDayOfWeek);
          this.calendarMonthWeeks = [numberOfWeeks].concat(_toConsumableArray(this.calendarMonthWeeks.slice(0, -1)));
        } else if (monthTransition === NEXT_TRANSITION) {
          newMonth.add(1, 'month');
          if (onNextMonthClick) onNextMonthClick(newMonth);
          var _newInvisibleMonth = newMonth.clone().add(numberOfMonths, 'month');
          var _numberOfWeeks = (0, _getNumberOfCalendarMonthWeeks2['default'])(_newInvisibleMonth, firstDayOfWeek);
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
            var activeElement = (0, _getActiveElement2['default'])();
            if (activeElement && activeElement !== document.body && _this4.container.contains(activeElement)) {
              activeElement.blur();
            }
          }
        });
      }

      return updateStateAfterMonthTransition;
    }()
  }, {
    key: 'adjustDayPickerHeight',
    value: function () {
      function adjustDayPickerHeight(newMonthHeight) {
        var _this5 = this;

        var monthHeight = newMonthHeight + MONTH_PADDING;
        if (monthHeight !== this.calendarMonthGridHeight) {
          this.transitionContainer.style.height = String(monthHeight) + 'px';
          if (!this.calendarMonthGridHeight) {
            setTimeout(function () {
              _this5.setState({ hasSetHeight: true });
            }, 0);
          }
          this.calendarMonthGridHeight = monthHeight;
        }
      }

      return adjustDayPickerHeight;
    }()
  }, {
    key: 'calculateAndSetDayPickerHeight',
    value: function () {
      function calculateAndSetDayPickerHeight() {
        var _props7 = this.props,
            daySize = _props7.daySize,
            numberOfMonths = _props7.numberOfMonths;
        var monthTitleHeight = this.state.monthTitleHeight;


        var visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
        var calendarMonthWeeksHeight = Math.max.apply(Math, [0].concat(_toConsumableArray(visibleCalendarWeeks))) * (daySize - 1);
        var newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;

        if (this.isHorizontal()) {
          this.adjustDayPickerHeight(newMonthHeight);
        }
      }

      return calculateAndSetDayPickerHeight;
    }()
  }, {
    key: 'openKeyboardShortcutsPanel',
    value: function () {
      function openKeyboardShortcutsPanel(onCloseCallBack) {
        this.setState({
          showKeyboardShortcuts: true,
          onKeyboardShortcutsPanelClose: onCloseCallBack
        });
      }

      return openKeyboardShortcutsPanel;
    }()
  }, {
    key: 'closeKeyboardShortcutsPanel',
    value: function () {
      function closeKeyboardShortcutsPanel() {
        var onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;


        if (onKeyboardShortcutsPanelClose) {
          onKeyboardShortcutsPanelClose();
        }

        this.setState({
          onKeyboardShortcutsPanelClose: null,
          showKeyboardShortcuts: false
        });
      }

      return closeKeyboardShortcutsPanel;
    }()
  }, {
    key: 'renderNavigation',
    value: function () {
      function renderNavigation() {
        var _this6 = this;

        var _props8 = this.props,
            navPrev = _props8.navPrev,
            navNext = _props8.navNext,
            noNavButtons = _props8.noNavButtons,
            orientation = _props8.orientation,
            phrases = _props8.phrases,
            isRTL = _props8.isRTL;


        if (noNavButtons) {
          return null;
        }

        var onNextMonthClick = void 0;
        if (orientation === _constants.VERTICAL_SCROLLABLE) {
          onNextMonthClick = this.multiplyScrollableMonths;
        } else {
          onNextMonthClick = function () {
            function onNextMonthClick(e) {
              _this6.onNextMonthClick(null, e);
            }

            return onNextMonthClick;
          }();
        }

        return _react2['default'].createElement(_DayPickerNavigation2['default'], {
          onPrevMonthClick: function () {
            function onPrevMonthClick(e) {
              _this6.onPrevMonthClick(null, e);
            }

            return onPrevMonthClick;
          }(),
          onNextMonthClick: onNextMonthClick,
          navPrev: navPrev,
          navNext: navNext,
          orientation: orientation,
          phrases: phrases,
          isRTL: isRTL
        });
      }

      return renderNavigation;
    }()
  }, {
    key: 'renderWeekHeader',
    value: function () {
      function renderWeekHeader(index) {
        var _props9 = this.props,
            daySize = _props9.daySize,
            orientation = _props9.orientation,
            weekDayFormat = _props9.weekDayFormat,
            styles = _props9.styles;
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

        var firstDayOfWeek = this.getFirstDayOfWeek();

        var header = [];
        for (var i = 0; i < 7; i += 1) {
          header.push(_react2['default'].createElement(
            'li',
            _extends({ key: i }, (0, _reactWithStyles.css)(styles.DayPicker_weekHeader_li, { width: daySize })),
            _react2['default'].createElement(
              'small',
              null,
              (0, _moment2['default'])().day((i + firstDayOfWeek) % 7).format(weekDayFormat)
            )
          ));
        }

        return _react2['default'].createElement(
          'div',
          _extends({}, (0, _reactWithStyles.css)(styles.DayPicker_weekHeader, this.isVertical() && styles.DayPicker_weekHeader__vertical, verticalScrollable && styles.DayPicker_weekHeader__verticalScrollable, weekHeaderStyle), {
            key: 'week-' + String(index)
          }),
          _react2['default'].createElement(
            'ul',
            (0, _reactWithStyles.css)(styles.DayPicker_weekHeader_ul),
            header
          )
        );
      }

      return renderWeekHeader;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this7 = this;

        var _state7 = this.state,
            calendarMonthWidth = _state7.calendarMonthWidth,
            currentMonth = _state7.currentMonth,
            monthTransition = _state7.monthTransition,
            translationValue = _state7.translationValue,
            scrollableMonthMultiple = _state7.scrollableMonthMultiple,
            focusedDate = _state7.focusedDate,
            showKeyboardShortcuts = _state7.showKeyboardShortcuts,
            isTouch = _state7.isTouchDevice,
            hasSetHeight = _state7.hasSetHeight,
            calendarInfoWidth = _state7.calendarInfoWidth,
            monthTitleHeight = _state7.monthTitleHeight;
        var _props10 = this.props,
            enableOutsideDays = _props10.enableOutsideDays,
            numberOfMonths = _props10.numberOfMonths,
            orientation = _props10.orientation,
            modifiers = _props10.modifiers,
            withPortal = _props10.withPortal,
            onDayClick = _props10.onDayClick,
            onDayMouseEnter = _props10.onDayMouseEnter,
            onDayMouseLeave = _props10.onDayMouseLeave,
            firstDayOfWeek = _props10.firstDayOfWeek,
            renderMonthText = _props10.renderMonthText,
            renderCalendarDay = _props10.renderCalendarDay,
            renderDayContents = _props10.renderDayContents,
            renderCalendarInfo = _props10.renderCalendarInfo,
            renderMonthElement = _props10.renderMonthElement,
            calendarInfoPosition = _props10.calendarInfoPosition,
            hideKeyboardShortcutsPanel = _props10.hideKeyboardShortcutsPanel,
            onOutsideClick = _props10.onOutsideClick,
            monthFormat = _props10.monthFormat,
            daySize = _props10.daySize,
            isFocused = _props10.isFocused,
            isRTL = _props10.isRTL,
            styles = _props10.styles,
            phrases = _props10.phrases,
            verticalHeight = _props10.verticalHeight,
            dayAriaLabelFormat = _props10.dayAriaLabelFormat,
            noBorder = _props10.noBorder,
            transitionDuration = _props10.transitionDuration,
            verticalBorderSpacing = _props10.verticalBorderSpacing,
            isSingleDate = _props10.isSingleDate;


        var isHorizontal = this.isHorizontal();

        var numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
        var weekHeaders = [];
        for (var i = 0; i < numOfWeekHeaders; i += 1) {
          weekHeaders.push(this.renderWeekHeader(i));
        }

        var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
        var height = void 0;
        if (isHorizontal) {
          height = this.calendarMonthGridHeight + _constants.PADDING_BOTTOM;
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

        var calendarInfo = renderCalendarInfo && _react2['default'].createElement(
          'div',
          _extends({
            ref: this.setCalendarInfoRef
          }, (0, _reactWithStyles.css)(calendarInfoIsInline && styles.DayPicker_calendarInfo__horizontal)),
          renderCalendarInfo()
        );

        var calendarInfoPanelWidth = renderCalendarInfo && calendarInfoIsInline ? calendarInfoWidth : 0;

        var firstVisibleMonthIndex = this.getFirstVisibleIndex();
        var wrapperHorizontalWidth = calendarMonthWidth * numberOfMonths + 2 * DAY_PICKER_PADDING;
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

        return _react2['default'].createElement(
          'div',
          _extends({
            role: 'application',
            'aria-label': phrases.calendarLabel
          }, (0, _reactWithStyles.css)(styles.DayPicker, isHorizontal && styles.DayPicker__horizontal, verticalScrollable && styles.DayPicker__verticalScrollable, isHorizontal && withPortal && styles.DayPicker_portal__horizontal, this.isVertical() && withPortal && styles.DayPicker_portal__vertical, dayPickerStyle, !monthTitleHeight && styles.DayPicker__hidden, !noBorder && styles.DayPicker__withBorder)),
          _react2['default'].createElement(
            _reactOutsideClickHandler2['default'],
            { onOutsideClick: onOutsideClick },
            (calendarInfoPositionTop || calendarInfoPositionBefore) && calendarInfo,
            _react2['default'].createElement(
              'div',
              (0, _reactWithStyles.css)(dayPickerWrapperStyle, calendarInfoIsInline && isHorizontal && styles.DayPicker_wrapper__horizontal),
              _react2['default'].createElement(
                'div',
                _extends({}, (0, _reactWithStyles.css)(styles.DayPicker_weekHeaders, isHorizontal && styles.DayPicker_weekHeaders__horizontal), {
                  'aria-hidden': 'true',
                  role: 'presentation'
                }),
                weekHeaders
              ),
              _react2['default'].createElement(
                'div',
                _extends({}, (0, _reactWithStyles.css)(styles.DayPicker_focusRegion), {
                  ref: this.setContainerRef,
                  onClick: function () {
                    function onClick(e) {
                      e.stopPropagation();
                    }

                    return onClick;
                  }(),
                  onKeyDown: this.onKeyDown,
                  onMouseUp: function () {
                    function onMouseUp() {
                      _this7.setState({ withMouseInteractions: true });
                    }

                    return onMouseUp;
                  }(),
                  role: 'region',
                  tabIndex: -1
                }),
                !verticalScrollable && this.renderNavigation(),
                _react2['default'].createElement(
                  'div',
                  _extends({}, (0, _reactWithStyles.css)(styles.DayPicker_transitionContainer, shouldAnimateHeight && styles.DayPicker_transitionContainer__horizontal, this.isVertical() && styles.DayPicker_transitionContainer__vertical, verticalScrollable && styles.DayPicker_transitionContainer__verticalScrollable, transitionContainerStyle), {
                    ref: this.setTransitionContainerRef
                  }),
                  _react2['default'].createElement(_CalendarMonthGrid2['default'], {
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
                    isSingleDate: isSingleDate
                  }),
                  verticalScrollable && this.renderNavigation()
                ),
                !isTouch && !hideKeyboardShortcutsPanel && _react2['default'].createElement(_DayPickerKeyboardShortcuts2['default'], {
                  block: this.isVertical() && !withPortal,
                  buttonLocation: keyboardShortcutButtonLocation,
                  showKeyboardShortcutsPanel: showKeyboardShortcuts,
                  openKeyboardShortcutsPanel: this.openKeyboardShortcutsPanel,
                  closeKeyboardShortcutsPanel: this.closeKeyboardShortcutsPanel,
                  phrases: phrases
                })
              )
            ),
            (calendarInfoPositionBottom || calendarInfoPositionAfter) && calendarInfo
          )
        );
      }

      return render;
    }()
  }]);

  return DayPicker;
}(_react2['default'].Component);

DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;

exports.PureDayPicker = DayPicker;
exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      font = _ref2$reactDates.font,
      zIndex = _ref2$reactDates.zIndex;
  return {
    DayPicker: {
      background: color.background,
      position: 'relative',
      textAlign: 'left'
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
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07)',
      borderRadius: 3
    },

    DayPicker_portal__horizontal: {
      boxShadow: 'none',
      position: 'absolute',
      left: '50%',
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
      marginLeft: 9
    },

    DayPicker_weekHeader: {
      color: color.placeholderText,
      position: 'absolute',
      top: 54,
      zIndex: zIndex + 2,
      padding: '0 8px',
      textAlign: 'left'
    },

    DayPicker_weekHeader__vertical: {
      left: '50%'
    },

    DayPicker_weekHeader__verticalScrollable: {
      top: 0,
      display: 'table-row',
      borderBottom: '1px solid ' + String(color.core.border),
      background: color.background,
      marginLeft: 0,
      left: 0,
      width: '100%',
      textAlign: 'center'
    },

    DayPicker_weekHeader_ul: {
      listStyle: 'none',
      margin: '1px 0',
      paddingLeft: 0,
      paddingRight: 0,
      fontSize: font.size
    },

    DayPicker_weekHeader_li: {
      display: 'inline-block',
      textAlign: 'center',
      color: color.weekHeaderLi,
      fontFamily: font.weekHeaderLiFont
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

    DayPicker_transitionContainer__verticalScrollable: {
      paddingTop: 20,
      height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      overflowY: 'scroll'
    }
  };
})(DayPicker);