module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsShallowCompare = __webpack_require__(2);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _OutsideClickHandler = __webpack_require__(29);

	var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

	var _CalendarMonthGrid = __webpack_require__(30);

	var _CalendarMonthGrid2 = _interopRequireDefault(_CalendarMonthGrid);

	var _arrowLeft = __webpack_require__(31);

	var _arrowLeft2 = _interopRequireDefault(_arrowLeft);

	var _arrowRight = __webpack_require__(28);

	var _arrowRight2 = _interopRequireDefault(_arrowRight);

	var _chevronUp = __webpack_require__(32);

	var _chevronUp2 = _interopRequireDefault(_chevronUp);

	var _chevronDown = __webpack_require__(33);

	var _chevronDown2 = _interopRequireDefault(_chevronDown);

	var _getTransformStyles = __webpack_require__(13);

	var _getTransformStyles2 = _interopRequireDefault(_getTransformStyles);

	var _OrientationShape = __webpack_require__(8);

	var _OrientationShape2 = _interopRequireDefault(_OrientationShape);

	var _constants = __webpack_require__(9);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var CALENDAR_MONTH_WIDTH = 300;
	var DAY_PICKER_PADDING = 9;
	var MONTH_PADDING = 23;
	var PREV_TRANSITION = 'prev';
	var NEXT_TRANSITION = 'next';

	var propTypes = {
	  enableOutsideDays: _react.PropTypes.bool,
	  numberOfMonths: _react.PropTypes.number,
	  modifiers: _react.PropTypes.object,
	  orientation: _OrientationShape2['default'],
	  withPortal: _react.PropTypes.bool,
	  hidden: _react.PropTypes.bool,
	  initialVisibleMonth: _react.PropTypes.func,
	  onDayClick: _react.PropTypes.func,
	  onDayMouseDown: _react.PropTypes.func,
	  onDayMouseUp: _react.PropTypes.func,
	  onDayMouseEnter: _react.PropTypes.func,
	  onDayMouseLeave: _react.PropTypes.func,
	  onDayTouchStart: _react.PropTypes.func,
	  onDayTouchEnd: _react.PropTypes.func,
	  onDayTouchTap: _react.PropTypes.func,
	  onPrevMonthClick: _react.PropTypes.func,
	  onNextMonthClick: _react.PropTypes.func,
	  onOutsideClick: _react.PropTypes.func,

	  // i18n
	  monthFormat: _react.PropTypes.string
	};

	var defaultProps = {
	  enableOutsideDays: false,
	  numberOfMonths: 1,
	  modifiers: {},
	  orientation: _constants.HORIZONTAL_ORIENTATION,
	  withPortal: false,
	  hidden: false,
	  initialVisibleMonth: function () {
	    function initialVisibleMonth() {
	      return (0, _moment2['default'])();
	    }

	    return initialVisibleMonth;
	  }(),
	  onDayClick: function () {
	    function onDayClick() {}

	    return onDayClick;
	  }(),
	  onDayMouseDown: function () {
	    function onDayMouseDown() {}

	    return onDayMouseDown;
	  }(),
	  onDayMouseUp: function () {
	    function onDayMouseUp() {}

	    return onDayMouseUp;
	  }(),
	  onDayMouseEnter: function () {
	    function onDayMouseEnter() {}

	    return onDayMouseEnter;
	  }(),
	  onDayMouseLeave: function () {
	    function onDayMouseLeave() {}

	    return onDayMouseLeave;
	  }(),
	  onDayTouchStart: function () {
	    function onDayTouchStart() {}

	    return onDayTouchStart;
	  }(),
	  onDayTouchTap: function () {
	    function onDayTouchTap() {}

	    return onDayTouchTap;
	  }(),
	  onDayTouchEnd: function () {
	    function onDayTouchEnd() {}

	    return onDayTouchEnd;
	  }(),
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

	  // i18n
	  monthFormat: 'MMMM YYYY'
	};

	var DayPicker = function (_React$Component) {
	  _inherits(DayPicker, _React$Component);

	  function DayPicker(props) {
	    _classCallCheck(this, DayPicker);

	    var _this = _possibleConstructorReturn(this, (DayPicker.__proto__ || Object.getPrototypeOf(DayPicker)).call(this, props));

	    _this.hasSetInitialVisibleMonth = !props.hidden;
	    _this.state = {
	      currentMonth: props.hidden ? (0, _moment2['default'])() : props.initialVisibleMonth(),
	      monthTransition: null,
	      translationValue: 0,
	      start: "",
	      end: ""
	    };

	    _this.handlePrevMonthClick = _this.handlePrevMonthClick.bind(_this);
	    _this.handleNextMonthClick = _this.handleNextMonthClick.bind(_this);
	    _this.updateStateAfterMonthTransition = _this.updateStateAfterMonthTransition.bind(_this);
	    _this.onEndDateInputChange = _this.onEndDateInputChange.bind(_this);
	    _this.onStartDateInputChange = _this.onStartDateInputChange.bind(_this);
	    _this.handleSumbit = _this.handleSumbit.bind(_this);

	    _this.handleEndDateInputChange = _this.handleEndDateInputChange.bind(_this);
	    _this.handleStartDateInputChange = _this.handleStartDateInputChange.bind(_this);
	    return _this;
	  }

	  _createClass(DayPicker, [{
	    key: 'onEndDateInputChange',
	    value: function () {
	      function onEndDateInputChange(end) {
	        this.setState({ end: end });
	        this.props.onEndDateChange(end);
	      }

	      return onEndDateInputChange;
	    }()
	  }, {
	    key: 'onStartDateInputChange',
	    value: function () {
	      function onStartDateInputChange(start) {
	        this.setState({ start: start });
	        this.props.onStartDateChange(start);
	      }

	      return onStartDateInputChange;
	    }()
	  }, {
	    key: 'handleStartDateInputChange',
	    value: function () {
	      function handleStartDateInputChange() {
	        if (!this.state.start && !this.props.startDate) {
	          this.onStartDateInputChange(this.props.startDatePlaceholder);
	        }
	      }

	      return handleStartDateInputChange;
	    }()
	  }, {
	    key: 'handleEndDateInputChange',
	    value: function () {
	      function handleEndDateInputChange() {
	        if (!this.state.end && !this.props.endDate) {
	          this.onEndDateInputChange(this.props.endDatePlaceholder);
	        }
	      }

	      return handleEndDateInputChange;
	    }()
	  }, {
	    key: 'componentDidMount',
	    value: function () {
	      function componentDidMount() {
	        if (this.isHorizontal()) {
	          this.adjustDayPickerHeight();
	          this.initializeDayPickerWidth();
	        }
	      }

	      return componentDidMount;
	    }()
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function () {
	      function componentWillReceiveProps(nextProps) {
	        if (!this.hasSetInitialVisibleMonth && !nextProps.hidden) {
	          this.hasSetInitialVisibleMonth = true;
	          this.setState({
	            currentMonth: nextProps.initialVisibleMonth()
	          });
	        }

	        if (nextProps.startDate) {
	          this.setState({ start: nextProps.startDate });
	        }

	        if (nextProps.endDate) {
	          this.setState({ end: nextProps.endDate });
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
	    key: 'componentDidUpdate',
	    value: function () {
	      function componentDidUpdate() {
	        if (this.state.monthTransition) {
	          if (this.isHorizontal()) {
	            this.adjustDayPickerHeight();
	          }
	        }
	      }

	      return componentDidUpdate;
	    }()
	  }, {
	    key: 'getMonthHeightByIndex',
	    value: function () {
	      function getMonthHeightByIndex(i) {
	        return this.getMonthHeight(_reactDom2['default'].findDOMNode(this.refs.transitionContainer).querySelectorAll('.CalendarMonth')[i]);
	      }

	      return getMonthHeightByIndex;
	    }()
	  }, {
	    key: 'getMonthHeight',
	    value: function () {
	      function getMonthHeight(el) {
	        var caption = el.querySelector('.js-CalendarMonth__caption');
	        var grid = el.querySelector('.js-CalendarMonth__grid');

	        // Need to separate out table children for FF
	        // Add an additional +1 for the border
	        return this.calculateDimension(caption, 'height', true, true) + this.calculateDimension(grid, 'height') + 1;
	      }

	      return getMonthHeight;
	    }()
	  }, {
	    key: 'applyTransformStyles',
	    value: function () {
	      function applyTransformStyles(el, transform) {
	        var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	        var transformStyles = (0, _getTransformStyles2['default'])(transform);
	        transformStyles.opacity = opacity;

	        Object.keys(transformStyles).forEach(function (styleKey) {
	          // eslint-disable-next-line no-param-reassign
	          el.style[styleKey] = transformStyles[styleKey];
	        });
	      }

	      return applyTransformStyles;
	    }()
	  }, {
	    key: 'calculateDimension',
	    value: function () {
	      function calculateDimension(el, axis) {
	        var borderBox = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	        var withMargin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        if (!el) {
	          return 0;
	        }

	        var axisStart = axis === 'width' ? 'Left' : 'Top';
	        var axisEnd = axis === 'width' ? 'Right' : 'Bottom';

	        // Only read styles if we need to
	        var style = !borderBox || withMargin ? window.getComputedStyle(el) : {};

	        // Offset includes border and padding
	        var size = axis === 'width' ? el.offsetWidth : el.offsetHeight;

	        // Get the inner size
	        if (!borderBox) {
	          size -= parseFloat(style['padding' + axisStart]) + parseFloat(style['padding' + axisEnd]) + parseFloat(style['border' + axisStart + 'Width']) + parseFloat(style['border' + axisEnd + 'Width']);
	        }

	        // Apply margin
	        if (withMargin) {
	          size += parseFloat(style['margin' + axisStart]) + parseFloat(style['margin' + axisEnd]);
	        }

	        return size;
	      }

	      return calculateDimension;
	    }()
	  }, {
	    key: 'isHorizontal',
	    value: function () {
	      function isHorizontal() {
	        return this.props.orientation === _constants.HORIZONTAL_ORIENTATION;
	      }

	      return isHorizontal;
	    }()
	  }, {
	    key: 'isVertical',
	    value: function () {
	      function isVertical() {
	        return this.props.orientation === _constants.VERTICAL_ORIENTATION;
	      }

	      return isVertical;
	    }()
	  }, {
	    key: 'initializeDayPickerWidth',
	    value: function () {
	      function initializeDayPickerWidth() {
	        this.dayPickerWidth = this.calculateDimension(_reactDom2['default'].findDOMNode(this.refs.calendarMonthGrid).querySelector('.CalendarMonth'), 'width', true);
	      }

	      return initializeDayPickerWidth;
	    }()
	  }, {
	    key: 'updateStateAfterMonthTransition',
	    value: function () {
	      function updateStateAfterMonthTransition() {
	        var _state = this.state;
	        var currentMonth = _state.currentMonth;
	        var monthTransition = _state.monthTransition;

	        var newMonth = currentMonth;
	        if (monthTransition === PREV_TRANSITION) {
	          newMonth = currentMonth.clone().subtract(1, 'month');
	        } else if (monthTransition === NEXT_TRANSITION) {
	          newMonth = currentMonth.clone().add(1, 'month');
	        }

	        // clear the previous transforms
	        this.applyTransformStyles(_reactDom2['default'].findDOMNode(this.refs.calendarMonthGrid).querySelector('.CalendarMonth'), 'none');

	        this.setState({
	          currentMonth: newMonth,
	          monthTransition: null,
	          translationValue: 0
	        });
	      }

	      return updateStateAfterMonthTransition;
	    }()
	  }, {
	    key: 'handlePrevMonthClick',
	    value: function () {
	      function handlePrevMonthClick(e) {
	        if (e) e.preventDefault();

	        if (this.props.onPrevMonthClick) {
	          this.props.onPrevMonthClick(e);
	        }

	        var translationValue = this.isVertical() ? this.getMonthHeightByIndex(0) : this.dayPickerWidth;

	        // The first CalendarMonth is always positioned absolute at top: 0 or left: 0
	        // so we need to transform it to the appropriate location before the animation.
	        // This behavior is because we would otherwise need a double-render in order to
	        // adjust the container position once we had the height the first calendar
	        // (ie first draw all the calendar, then in a second render, use the first calendar's
	        // height to position the container). Variable calendar heights, amirite? <3 Maja
	        this.translateFirstDayPickerForAnimation(translationValue);

	        this.setState({
	          monthTransition: PREV_TRANSITION,
	          translationValue: translationValue
	        });
	      }

	      return handlePrevMonthClick;
	    }()
	  }, {
	    key: 'handleNextMonthClick',
	    value: function () {
	      function handleNextMonthClick(e) {
	        if (e) e.preventDefault();
	        if (this.props.onNextMonthClick) {
	          this.props.onNextMonthClick(e);
	        }

	        var translationValue = this.isVertical() ? -this.getMonthHeightByIndex(1) : -this.dayPickerWidth;

	        this.setState({
	          monthTransition: NEXT_TRANSITION,
	          translationValue: translationValue
	        });
	      }

	      return handleNextMonthClick;
	    }()
	  }, {
	    key: 'handleSumbit',
	    value: function () {
	      function handleSumbit(input, event) {
	        var _props = this.props;
	        var startDate = _props.startDate;
	        var endDate = _props.endDate;

	        event.preventDefault();

	        if (input === "start") {
	          return this.endInputRef.focus();
	        } else if (endDate && startDate) {
	          return this.props.onSubmit();
	        } else {
	          return this.startInputRef.focus();
	        }
	      }

	      return handleSumbit;
	    }()
	  }, {
	    key: 'adjustDayPickerHeight',
	    value: function () {
	      function adjustDayPickerHeight() {
	        var _this2 = this;

	        var transitionContainer = _reactDom2['default'].findDOMNode(this.refs.transitionContainer);
	        var heights = [];

	        // convert node list to array
	        [].concat(_toConsumableArray(transitionContainer.querySelectorAll('.CalendarMonth'))).forEach(function (el) {
	          if (el.getAttribute('data-visible') === 'true') {
	            heights.push(_this2.getMonthHeight(el));
	          }
	        });

	        var newMonthHeight = Math.max.apply(Math, heights) + MONTH_PADDING;

	        if (newMonthHeight !== this.calculateDimension(transitionContainer, 'height')) {
	          this.monthHeight = newMonthHeight;
	          transitionContainer.style.height = String(newMonthHeight) + 'px';
	        }
	      }

	      return adjustDayPickerHeight;
	    }()
	  }, {
	    key: 'translateFirstDayPickerForAnimation',
	    value: function () {
	      function translateFirstDayPickerForAnimation(translationValue) {
	        var transformType = this.isVertical() ? 'translateY' : 'translateX';
	        var transformValue = transformType + '(-' + String(translationValue) + 'px)';

	        this.applyTransformStyles(_reactDom2['default'].findDOMNode(this.refs.transitionContainer).querySelector('.CalendarMonth'), transformValue, 1);
	      }

	      return translateFirstDayPickerForAnimation;
	    }()
	  }, {
	    key: 'renderNavigation',
	    value: function () {
	      function renderNavigation() {
	        var isVertical = this.isVertical();

	        return _react2['default'].createElement('div', { className: 'DayPicker__nav' }, _react2['default'].createElement('span', {
	          className: 'DayPicker__nav--prev',
	          onClick: this.handlePrevMonthClick
	        }, isVertical ? _react2['default'].createElement(_chevronUp2['default'], null) : _react2['default'].createElement(_arrowLeft2['default'], null)), _react2['default'].createElement('span', {
	          className: 'DayPicker__nav--next',
	          onClick: this.handleNextMonthClick
	        }, isVertical ? _react2['default'].createElement(_chevronDown2['default'], null) : _react2['default'].createElement(_arrowRight2['default'], null)));
	      }

	      return renderNavigation;
	    }()
	  }, {
	    key: 'renderWeekHeader',
	    value: function () {
	      function renderWeekHeader(index) {
	        var numberOfMonths = this.props.numberOfMonths;

	        var widthPercentage = 100 / numberOfMonths;
	        var horizontalStyle = {
	          width: widthPercentage + '%',
	          left: widthPercentage * index + '%'
	        };

	        var style = this.isHorizontal() ? horizontalStyle : {};

	        var header = [];
	        for (var i = 0; i < 7; i++) {
	          header.push(_react2['default'].createElement('li', { key: i }, _react2['default'].createElement('small', null, (0, _moment2['default'])().locale('en').weekday(i).format('dd'))));
	        }

	        return _react2['default'].createElement('div', {
	          className: 'DayPicker__week-header',
	          key: 'week-' + String(index),
	          style: style
	        }, _react2['default'].createElement('ul', null, header));
	      }

	      return renderWeekHeader;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var _this3 = this;

	        var _state2 = this.state;
	        var currentMonth = _state2.currentMonth;
	        var monthTransition = _state2.monthTransition;
	        var translationValue = _state2.translationValue;
	        var start = _state2.start;
	        var end = _state2.end;
	        var _props2 = this.props;
	        var enableOutsideDays = _props2.enableOutsideDays;
	        var numberOfMonths = _props2.numberOfMonths;
	        var orientation = _props2.orientation;
	        var modifiers = _props2.modifiers;
	        var withPortal = _props2.withPortal;
	        var onDayClick = _props2.onDayClick;
	        var onDayMouseDown = _props2.onDayMouseDown;
	        var onDayMouseUp = _props2.onDayMouseUp;
	        var onDayTouchStart = _props2.onDayTouchStart;
	        var onDayTouchEnd = _props2.onDayTouchEnd;
	        var onDayTouchTap = _props2.onDayTouchTap;
	        var onDayMouseEnter = _props2.onDayMouseEnter;
	        var onDayMouseLeave = _props2.onDayMouseLeave;
	        var onOutsideClick = _props2.onOutsideClick;
	        var monthFormat = _props2.monthFormat;
	        var mode = _props2.mode;
	        var onStartDateChange = _props2.onStartDateChange;
	        var onEndDateChange = _props2.onEndDateChange;
	        var startDate = _props2.startDate;
	        var endDate = _props2.endDate;
	        var onSubmit = _props2.onSubmit;
	        var startDatePlaceholder = _props2.startDatePlaceholder;
	        var endDatePlaceholder = _props2.endDatePlaceholder;

	        var numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
	        var weekHeaders = [];
	        for (var i = 0; i < numOfWeekHeaders; i++) {
	          weekHeaders.push(this.renderWeekHeader(i));
	        }

	        var firstVisibleMonthIndex = 1;
	        if (monthTransition === PREV_TRANSITION) {
	          firstVisibleMonthIndex -= 1;
	        } else if (monthTransition === NEXT_TRANSITION) {
	          firstVisibleMonthIndex += 1;
	        }

	        var dayPickerClassNames = (0, _classnames2['default'])('DayPicker', {
	          'DayPicker--horizontal': this.isHorizontal(),
	          'DayPicker--vertical': this.isVertical(),
	          'DayPicker--portal': withPortal
	        });

	        var transitionContainerClasses = (0, _classnames2['default'])('transition-container', {
	          'transition-container--horizontal': this.isHorizontal(),
	          'transition-container--vertical': this.isVertical()
	        });

	        var horizontalWidth = CALENDAR_MONTH_WIDTH * numberOfMonths + 2 * DAY_PICKER_PADDING;

	        // this is a kind of made-up value that generally looks good. we'll
	        // probably want to let the user set this explicitly.
	        var verticalHeight = 1.75 * CALENDAR_MONTH_WIDTH;

	        var dayPickerStyle = {
	          width: this.isHorizontal() && horizontalWidth,

	          // These values are to center the datepicker (approximately) on the page
	          marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2,
	          marginTop: this.isHorizontal() && withPortal && -CALENDAR_MONTH_WIDTH / 2
	        };

	        var transitionContainerStyle = {
	          width: this.isHorizontal() && horizontalWidth,
	          height: this.isVertical() && !withPortal && verticalHeight
	        };

	        var isCalendarMonthGridAnimating = monthTransition !== null;
	        var transformType = this.isVertical() ? 'translateY' : 'translateX';
	        var transformValue = transformType + '(' + String(translationValue) + 'px)';

	        return _react2['default'].createElement('div', { className: dayPickerClassNames, style: dayPickerStyle }, _react2['default'].createElement(_OutsideClickHandler2['default'], { onOutsideClick: onOutsideClick }, this.renderNavigation(), _react2['default'].createElement('div', { className: 'DayPicker__week-headers' }, weekHeaders), _react2['default'].createElement('div', {
	          className: transitionContainerClasses,
	          ref: 'transitionContainer',
	          style: transitionContainerStyle
	        }, _react2['default'].createElement(_CalendarMonthGrid2['default'], {
	          ref: 'calendarMonthGrid',
	          transformValue: transformValue,
	          enableOutsideDays: enableOutsideDays,
	          firstVisibleMonthIndex: firstVisibleMonthIndex,
	          initialMonth: currentMonth,
	          isAnimating: isCalendarMonthGridAnimating,
	          modifiers: modifiers,
	          orientation: orientation,
	          withPortal: withPortal,
	          numberOfMonths: numberOfMonths,
	          onDayClick: onDayClick,
	          onDayMouseDown: onDayMouseDown,
	          onDayMouseUp: onDayMouseUp,
	          onDayTouchStart: onDayTouchStart,
	          onDayTouchEnd: onDayTouchEnd,
	          onDayTouchTap: onDayTouchTap,
	          onDayMouseEnter: onDayMouseEnter,
	          onDayMouseLeave: onDayMouseLeave,
	          onMonthTransitionEnd: this.updateStateAfterMonthTransition,
	          monthFormat: monthFormat
	        })), mode === "range" && _react2['default'].createElement('div', { className: "DayPicker__input-wrapper" }, _react2['default'].createElement('div', { className: "DayPicker__input-group" }, _react2['default'].createElement('label', { htmlFor: "from-time" }, 'FROM '), _react2['default'].createElement('form', { onSubmit: function () {
	            function onSubmit(e) {
	              return _this3.handleSumbit("start", e);
	            }

	            return onSubmit;
	          }() }, _react2['default'].createElement('input', {
	          id: "from-time",
	          name: "from-time",
	          className: (0, _classnames2['default'])("DayPicker__input", { invalid: this.props.error.start }),
	          type: 'text',
	          ref: function () {
	            function ref(_ref) {
	              _this3.startInputRef = _ref;
	            }

	            return ref;
	          }(),
	          value: start || startDate || "",
	          onChange: function () {
	            function onChange(e) {
	              return _this3.onStartDateInputChange(e.target.value);
	            }

	            return onChange;
	          }(),
	          onFocus: this.handleStartDateInputChange,
	          placeholder: startDatePlaceholder,
	          autoComplete: 'off',
	          maxLength: 20
	        }))), _react2['default'].createElement('div', { className: "DayPicker__input-group" }, _react2['default'].createElement('label', { htmlFor: "to-time" }, 'TO'), _react2['default'].createElement('form', { onSubmit: function () {
	            function onSubmit(e) {
	              return _this3.handleSumbit("end", e);
	            }

	            return onSubmit;
	          }() }, _react2['default'].createElement('input', {
	          id: "to-time",
	          name: "to-time",
	          className: (0, _classnames2['default'])("DayPicker__input", { invalid: this.props.error.end }),
	          type: 'text',
	          ref: function () {
	            function ref(_ref2) {
	              _this3.endInputRef = _ref2;
	            }

	            return ref;
	          }(),
	          value: end || endDate || "",
	          onChange: function () {
	            function onChange(e) {
	              return _this3.onEndDateInputChange(e.target.value);
	            }

	            return onChange;
	          }(),
	          onKeyDown: function () {
	            function onKeyDown() {}

	            return onKeyDown;
	          }(),
	          onFocus: this.handleEndDateInputChange,
	          placeholder: endDatePlaceholder,
	          autoComplete: 'off'
	        }))))));
	      }

	      return render;
	    }()
	  }]);

	  return DayPicker;
	}(_react2['default'].Component);

	exports['default'] = DayPicker;

	DayPicker.propTypes = propTypes;
	DayPicker.defaultProps = defaultProps;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-addons-shallow-compare");

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	module.exports = require("../shapes/OrientationShape");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("../../constants");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	module.exports = require("../utils/getTransformStyles");

/***/ },
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SVG = function (_React$Component) {
	  _inherits(SVG, _React$Component);

	  function SVG() {
	    _classCallCheck(this, SVG);

	    return _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).apply(this, arguments));
	  }

	  _createClass(SVG, [{
	    key: "render",
	    value: function () {
	      function render() {
	        return _react2["default"].createElement(
	          "svg",
	          _extends({ viewBox: "0 0 1000 1000" }, this.props),
	          _react2["default"].createElement("path", { d: "M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" })
	        );
	      }

	      return render;
	    }()
	  }]);

	  return SVG;
	}(_react2["default"].Component);

	exports["default"] = SVG;

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("./OutsideClickHandler");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("./CalendarMonthGrid");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SVG = function (_React$Component) {
	  _inherits(SVG, _React$Component);

	  function SVG() {
	    _classCallCheck(this, SVG);

	    return _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).apply(this, arguments));
	  }

	  _createClass(SVG, [{
	    key: "render",
	    value: function () {
	      function render() {
	        return _react2["default"].createElement(
	          "svg",
	          _extends({ viewBox: "0 0 1000 1000" }, this.props),
	          _react2["default"].createElement("path", { d: "M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z" })
	        );
	      }

	      return render;
	    }()
	  }]);

	  return SVG;
	}(_react2["default"].Component);

	exports["default"] = SVG;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SVG = function (_React$Component) {
	  _inherits(SVG, _React$Component);

	  function SVG() {
	    _classCallCheck(this, SVG);

	    return _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).apply(this, arguments));
	  }

	  _createClass(SVG, [{
	    key: "render",
	    value: function () {
	      function render() {
	        return _react2["default"].createElement(
	          "svg",
	          _extends({ viewBox: "0 0 1000 1000" }, this.props),
	          _react2["default"].createElement("path", { d: "M32.1 712.6l453.2-452.2c11-11 21-11 32 0l453.2 452.2c4 5 6 10 6 16 0 13-10 23-22 23-7 0-12-2-16-7L501.3 308.5 64.1 744.7c-4 5-9 7-15 7-7 0-12-2-17-7-9-11-9-21 0-32.1z" })
	        );
	      }

	      return render;
	    }()
	  }]);

	  return SVG;
	}(_react2["default"].Component);

	exports["default"] = SVG;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SVG = function (_React$Component) {
	  _inherits(SVG, _React$Component);

	  function SVG() {
	    _classCallCheck(this, SVG);

	    return _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).apply(this, arguments));
	  }

	  _createClass(SVG, [{
	    key: "render",
	    value: function () {
	      function render() {
	        return _react2["default"].createElement(
	          "svg",
	          _extends({ viewBox: "0 0 1000 1000" }, this.props),
	          _react2["default"].createElement("path", { d: "M967.5 288.5L514.3 740.7c-11 11-21 11-32 0L29.1 288.5c-4-5-6-11-6-16 0-13 10-23 23-23 6 0 11 2 15 7l437.2 436.2 437.2-436.2c4-5 9-7 16-7 6 0 11 2 16 7 9 10.9 9 21 0 32z" })
	        );
	      }

	      return render;
	    }()
	  }]);

	  return SVG;
	}(_react2["default"].Component);

	exports["default"] = SVG;

/***/ }
/******/ ]);