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

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _OutsideClickHandler = require('./OutsideClickHandler');

var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

var _CalendarMonthGrid = require('./CalendarMonthGrid');

var _CalendarMonthGrid2 = _interopRequireDefault(_CalendarMonthGrid);

var _DayPickerNavigation = require('./DayPickerNavigation');

var _DayPickerNavigation2 = _interopRequireDefault(_DayPickerNavigation);

var _DayPickerKeyboardShortcuts = require('./DayPickerKeyboardShortcuts');

var _DayPickerKeyboardShortcuts2 = _interopRequireDefault(_DayPickerKeyboardShortcuts);

var _getCalendarMonthWidth = require('../utils/getCalendarMonthWidth');

var _getCalendarMonthWidth2 = _interopRequireDefault(_getCalendarMonthWidth);

var _calculateDimension = require('../utils/calculateDimension');

var _calculateDimension2 = _interopRequireDefault(_calculateDimension);

var _getActiveElement = require('../utils/getActiveElement');

var _getActiveElement2 = _interopRequireDefault(_getActiveElement);

var _isDayVisible = require('../utils/isDayVisible');

var _isDayVisible2 = _interopRequireDefault(_isDayVisible);

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

  // navigation props
  navPrev: _propTypes2['default'].node,
  navNext: _propTypes2['default'].node,
  onPrevMonthClick: _propTypes2['default'].func,
  onNextMonthClick: _propTypes2['default'].func,
  onMultiplyScrollableMonths: _propTypes2['default'].func, // VERTICAL_SCROLLABLE daypickers only

  // month props
  renderMonth: _propTypes2['default'].func,

  // day props
  modifiers: _propTypes2['default'].object,
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
  dayAriaLabelFormat: _propTypes2['default'].string
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

  // navigation props
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
  onMultiplyScrollableMonths: function () {
    function onMultiplyScrollableMonths() {}

    return onMultiplyScrollableMonths;
  }(),


  // month props
  renderMonth: null,

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
  dayAriaLabelFormat: undefined
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
      hasSetHeight: false,
      calendarInfoWidth: 0
    };

    _this.calendarMonthHeights = [];
    _this.calendarMonthGridHeight = 0;
    _this.setCalendarInfoWidthTimeout = null;

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.throttledKeyDown = (0, _throttle2['default'])(_this.onFinalKeyDown, 200, { trailing: false });
    _this.onPrevMonthClick = _this.onPrevMonthClick.bind(_this);
    _this.onNextMonthClick = _this.onNextMonthClick.bind(_this);
    _this.multiplyScrollableMonths = _this.multiplyScrollableMonths.bind(_this);
    _this.updateStateAfterMonthTransition = _this.updateStateAfterMonthTransition.bind(_this);

    _this.openKeyboardShortcutsPanel = _this.openKeyboardShortcutsPanel.bind(_this);
    _this.closeKeyboardShortcutsPanel = _this.closeKeyboardShortcutsPanel.bind(_this);

    _this.setCalendarInfoRef = _this.setCalendarInfoRef.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    _this.setTransitionContainerRef = _this.setTransitionContainerRef.bind(_this);
    _this.setCalendarMonthHeights = _this.setCalendarMonthHeights.bind(_this);
    return _this;
  }

  _createClass(DayPicker, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        if (this.calendarInfo) {
          this.setState({
            isTouchDevice: (0, _isTouchDevice2['default'])(),
            calendarInfoWidth: (0, _calculateDimension2['default'])(this.calendarInfo, 'width', true, true)
          });
        } else {
          this.setState({ isTouchDevice: (0, _isTouchDevice2['default'])() });
        }
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
            onBlur = nextProps.onBlur;
        var currentMonth = this.state.currentMonth;


        if (!hidden) {
          if (!this.hasSetInitialVisibleMonth) {
            this.hasSetInitialVisibleMonth = true;
            this.setState({
              currentMonth: nextProps.initialVisibleMonth()
            });
          }
        }

        if (nextProps.daySize !== this.props.daySize) {
          this.setState({
            calendarMonthWidth: (0, _getCalendarMonthWidth2['default'])(nextProps.daySize)
          });
        }

        if (isFocused !== this.props.isFocused) {
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
          var calendarInfoWidth = this.state.calendarInfoWidth;

          this.setCalendarInfoWidthTimeout = setTimeout(function () {
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

        var _props = this.props,
            onBlur = _props.onBlur,
            isRTL = _props.isRTL;
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
        var _props2 = this.props,
            numberOfMonths = _props2.numberOfMonths,
            isRTL = _props2.isRTL;
        var calendarMonthWidth = this.state.calendarMonthWidth;


        if (e) e.preventDefault();

        var translationValue = this.isVertical() ? this.calendarMonthHeights[0] : calendarMonthWidth;

        if (this.isHorizontal()) {
          if (isRTL) {
            translationValue = -2 * calendarMonthWidth;
          }

          var newMonthHeight = Math.max.apply(Math, [0].concat(_toConsumableArray(this.calendarMonthHeights.slice(0, numberOfMonths))));
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
    key: 'onNextMonthClick',
    value: function () {
      function onNextMonthClick(nextFocusedDate, e) {
        var isRTL = this.props.isRTL;
        var calendarMonthWidth = this.state.calendarMonthWidth;


        if (e) e.preventDefault();

        var translationValue = this.isVertical() ? -this.calendarMonthHeights[1] : -calendarMonthWidth;

        if (this.isHorizontal()) {
          if (isRTL) {
            translationValue = 0;
          }
          var newMonthHeight = Math.max.apply(Math, [0].concat(_toConsumableArray(this.calendarMonthHeights.slice(2))));
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
        var _props3 = this.props,
            getFirstFocusableDay = _props3.getFirstFocusableDay,
            numberOfMonths = _props3.numberOfMonths;


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
    key: 'setCalendarMonthHeights',
    value: function () {
      function setCalendarMonthHeights(calendarMonthHeights) {
        var numberOfMonths = this.props.numberOfMonths;

        var firstVisibleMonthIndex = this.getFirstVisibleIndex();
        var lastVisibleMonthIndex = firstVisibleMonthIndex + numberOfMonths;

        this.calendarMonthHeights = calendarMonthHeights;
        var visibleCalendarMonthHeights = calendarMonthHeights.filter(function (_, i) {
          return i >= firstVisibleMonthIndex && i < lastVisibleMonthIndex;
        });
        this.calendarMonthGridHeight = Math.max.apply(Math, [0].concat(_toConsumableArray(visibleCalendarMonthHeights))) + MONTH_PADDING;
        this.setState({ hasSetHeight: true });
      }

      return setCalendarMonthHeights;
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
        var _state2 = this.state,
            currentMonth = _state2.currentMonth,
            focusedDate = _state2.focusedDate;


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
        var _state3 = this.state,
            currentMonth = _state3.currentMonth,
            focusedDate = _state3.focusedDate;


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

        this.setState({
          scrollableMonthMultiple: this.state.scrollableMonthMultiple + 1
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
        var _props4 = this.props,
            onPrevMonthClick = _props4.onPrevMonthClick,
            onNextMonthClick = _props4.onNextMonthClick,
            isRTL = _props4.isRTL;
        var _state4 = this.state,
            currentMonth = _state4.currentMonth,
            monthTransition = _state4.monthTransition,
            focusedDate = _state4.focusedDate,
            nextFocusedDate = _state4.nextFocusedDate,
            withMouseInteractions = _state4.withMouseInteractions,
            calendarMonthWidth = _state4.calendarMonthWidth;


        if (!monthTransition) return;

        var newMonth = currentMonth.clone();
        if (monthTransition === PREV_TRANSITION) {
          if (onPrevMonthClick) onPrevMonthClick();
          newMonth.subtract(1, 'month');
        } else if (monthTransition === NEXT_TRANSITION) {
          if (onNextMonthClick) onNextMonthClick();
          newMonth.add(1, 'month');
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
            if (activeElement && activeElement !== document.body) {
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
        var monthHeight = newMonthHeight + MONTH_PADDING;
        if (monthHeight !== this.calendarMonthGridHeight) {
          this.calendarMonthGridHeight = monthHeight;
          this.transitionContainer.style.height = String(monthHeight) + 'px';
        }
      }

      return adjustDayPickerHeight;
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
        var _this3 = this;

        var _props5 = this.props,
            navPrev = _props5.navPrev,
            navNext = _props5.navNext,
            orientation = _props5.orientation,
            phrases = _props5.phrases,
            isRTL = _props5.isRTL;


        var onNextMonthClick = void 0;
        if (orientation === _constants.VERTICAL_SCROLLABLE) {
          onNextMonthClick = this.multiplyScrollableMonths;
        } else {
          onNextMonthClick = function () {
            function onNextMonthClick(e) {
              _this3.onNextMonthClick(null, e);
            }

            return onNextMonthClick;
          }();
        }

        return _react2['default'].createElement(_DayPickerNavigation2['default'], {
          onPrevMonthClick: function () {
            function onPrevMonthClick(e) {
              _this3.onPrevMonthClick(null, e);
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
        var _props6 = this.props,
            daySize = _props6.daySize,
            orientation = _props6.orientation,
            weekDayFormat = _props6.weekDayFormat,
            styles = _props6.styles;
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

        var firstDayOfWeek = this.props.firstDayOfWeek;

        if (firstDayOfWeek == null) {
          firstDayOfWeek = _moment2['default'].localeData().firstDayOfWeek();
        }

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
        var _this4 = this;

        var _state5 = this.state,
            calendarMonthWidth = _state5.calendarMonthWidth,
            currentMonth = _state5.currentMonth,
            monthTransition = _state5.monthTransition,
            translationValue = _state5.translationValue,
            scrollableMonthMultiple = _state5.scrollableMonthMultiple,
            focusedDate = _state5.focusedDate,
            showKeyboardShortcuts = _state5.showKeyboardShortcuts,
            isTouch = _state5.isTouchDevice,
            hasSetHeight = _state5.hasSetHeight,
            calendarInfoWidth = _state5.calendarInfoWidth;
        var _props7 = this.props,
            enableOutsideDays = _props7.enableOutsideDays,
            numberOfMonths = _props7.numberOfMonths,
            orientation = _props7.orientation,
            modifiers = _props7.modifiers,
            withPortal = _props7.withPortal,
            onDayClick = _props7.onDayClick,
            onDayMouseEnter = _props7.onDayMouseEnter,
            onDayMouseLeave = _props7.onDayMouseLeave,
            firstDayOfWeek = _props7.firstDayOfWeek,
            renderMonth = _props7.renderMonth,
            renderCalendarDay = _props7.renderCalendarDay,
            renderDayContents = _props7.renderDayContents,
            renderCalendarInfo = _props7.renderCalendarInfo,
            calendarInfoPosition = _props7.calendarInfoPosition,
            hideKeyboardShortcutsPanel = _props7.hideKeyboardShortcutsPanel,
            onOutsideClick = _props7.onOutsideClick,
            monthFormat = _props7.monthFormat,
            daySize = _props7.daySize,
            isFocused = _props7.isFocused,
            isRTL = _props7.isRTL,
            styles = _props7.styles,
            phrases = _props7.phrases,
            verticalHeight = _props7.verticalHeight,
            dayAriaLabelFormat = _props7.dayAriaLabelFormat,
            noBorder = _props7.noBorder,
            transitionDuration = _props7.transitionDuration;


        var isHorizontal = this.isHorizontal();

        var numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
        var weekHeaders = [];
        for (var i = 0; i < numOfWeekHeaders; i += 1) {
          weekHeaders.push(this.renderWeekHeader(i));
        }

        var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;
        var height = void 0;
        if (isHorizontal) {
          height = this.calendarMonthGridHeight;
        } else if (this.isVertical() && !verticalScrollable && !withPortal) {
          // If the user doesn't set a desired height,
          // we default back to this kind of made-up value that generally looks good
          height = verticalHeight || 1.75 * calendarMonthWidth;
        }

        var isCalendarMonthGridAnimating = monthTransition !== null;
        var transformType = this.isVertical() ? 'translateY' : 'translateX';
        var transformValue = transformType + '(' + String(translationValue) + 'px)';

        var shouldFocusDate = !isCalendarMonthGridAnimating && isFocused;

        var keyboardShortcutButtonLocation = _DayPickerKeyboardShortcuts.BOTTOM_RIGHT;
        if (this.isVertical()) {
          keyboardShortcutButtonLocation = withPortal ? _DayPickerKeyboardShortcuts.TOP_LEFT : _DayPickerKeyboardShortcuts.TOP_RIGHT;
        }

        var isHorizontalAndAnimating = isHorizontal && isCalendarMonthGridAnimating;

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
          }, (0, _reactWithStyles.css)(styles.DayPicker, isHorizontal && styles.DayPicker__horizontal, verticalScrollable && styles.DayPicker__verticalScrollable, isHorizontal && withPortal && styles.DayPicker_portal__horizontal, this.isVertical() && withPortal && styles.DayPicker_portal__vertical, dayPickerStyle, !hasSetHeight && styles.DayPicker__hidden, !noBorder && styles.DayPicker__withBorder)),
          _react2['default'].createElement(
            _OutsideClickHandler2['default'],
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
                      _this4.setState({ withMouseInteractions: true });
                    }

                    return onMouseUp;
                  }(),
                  role: 'region',
                  tabIndex: -1
                }),
                !verticalScrollable && this.renderNavigation(),
                _react2['default'].createElement(
                  'div',
                  _extends({}, (0, _reactWithStyles.css)(styles.DayPicker_transitionContainer, isHorizontalAndAnimating && styles.DayPicker_transitionContainer__horizontal, this.isVertical() && styles.DayPicker_transitionContainer__vertical, verticalScrollable && styles.DayPicker_transitionContainer__verticalScrollable, transitionContainerStyle), {
                    ref: this.setTransitionContainerRef
                  }),
                  _react2['default'].createElement(_CalendarMonthGrid2['default'], {
                    setCalendarMonthHeights: this.setCalendarMonthHeights,
                    transformValue: transformValue,
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
                    renderMonth: renderMonth,
                    renderCalendarDay: renderCalendarDay,
                    renderDayContents: renderDayContents,
                    onMonthTransitionEnd: this.updateStateAfterMonthTransition,
                    monthFormat: monthFormat,
                    daySize: daySize,
                    firstDayOfWeek: firstDayOfWeek,
                    isFocused: shouldFocusDate,
                    focusedDate: focusedDate,
                    phrases: phrases,
                    isRTL: isRTL,
                    dayAriaLabelFormat: dayAriaLabelFormat,
                    transitionDuration: transitionDuration
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
exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref) {
  var _ref$reactDates = _ref.reactDates,
      color = _ref$reactDates.color,
      font = _ref$reactDates.font,
      zIndex = _ref$reactDates.zIndex;
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
      top: 62,
      zIndex: zIndex + 2,
      padding: '0 13px',
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