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

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactAddonsShallowCompare = __webpack_require__(2);

	var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactPortal = __webpack_require__(15);

	var _reactPortal2 = _interopRequireDefault(_reactPortal);

	var _OutsideClickHandler = __webpack_require__(16);

	var _OutsideClickHandler2 = _interopRequireDefault(_OutsideClickHandler);

	var _getResponsiveContainerStyles = __webpack_require__(17);

	var _getResponsiveContainerStyles2 = _interopRequireDefault(_getResponsiveContainerStyles);

	var _isInclusivelyAfterDay = __webpack_require__(18);

	var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

	var _DateRangePickerInputController = __webpack_require__(19);

	var _DateRangePickerInputController2 = _interopRequireDefault(_DateRangePickerInputController);

	var _DayPickerRangeController = __webpack_require__(20);

	var _DayPickerRangeController2 = _interopRequireDefault(_DayPickerRangeController);

	var _close = __webpack_require__(21);

	var _close2 = _interopRequireDefault(_close);

	var _DateRangePickerShape = __webpack_require__(22);

	var _DateRangePickerShape2 = _interopRequireDefault(_DateRangePickerShape);

	var _constants = __webpack_require__(9);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
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

	var propTypes = _DateRangePickerShape2['default'];

	var defaultProps = {
	  startDateId: _constants.START_DATE,
	  endDateId: _constants.END_DATE,
	  focusedInput: null,
	  screenReaderInputMessage: '',
	  minimumNights: 1,
	  isDayBlocked: function () {
	    function isDayBlocked() {
	      return false;
	    }

	    return isDayBlocked;
	  }(),
	  isDayHighlighted: function () {
	    function isDayHighlighted() {
	      return false;
	    }

	    return isDayHighlighted;
	  }(),
	  isOutsideRange: function () {
	    function isOutsideRange(day) {
	      return !(0, _isInclusivelyAfterDay2['default'])(day, (0, _moment2['default'])());
	    }

	    return isOutsideRange;
	  }(),
	  enableOutsideDays: false,
	  numberOfMonths: 2,
	  showClearDates: false,
	  showDefaultInputIcon: false,
	  customInputIcon: null,
	  customArrowIcon: null,
	  disabled: false,
	  required: false,
	  reopenPickerOnClearDates: false,
	  keepOpenOnDateSelect: false,
	  initialVisibleMonth: function () {
	    function initialVisibleMonth() {
	      return (0, _moment2['default'])();
	    }

	    return initialVisibleMonth;
	  }(),
	  navPrev: null,
	  navNext: null,

	  orientation: _constants.HORIZONTAL_ORIENTATION,
	  anchorDirection: _constants.ANCHOR_LEFT,
	  horizontalMargin: 0,
	  withPortal: false,
	  withFullScreenPortal: false,

	  onDatesChange: function () {
	    function onDatesChange() {}

	    return onDatesChange;
	  }(),
	  onFocusChange: function () {
	    function onFocusChange() {}

	    return onFocusChange;
	  }(),
	  onPrevMonthClick: function () {
	    function onPrevMonthClick() {}

	    return onPrevMonthClick;
	  }(),
	  onNextMonthClick: function () {
	    function onNextMonthClick() {}

	    return onNextMonthClick;
	  }(),

	  renderDay: null,

	  // i18n
	  displayFormat: function () {
	    function displayFormat() {
	      return _moment2['default'].localeData().longDateFormat('L');
	    }

	    return displayFormat;
	  }(),
	  monthFormat: 'MMMM YYYY',
	  phrases: {
	    closeDatePicker: 'Close',
	    clearDates: 'Clear Dates'
	  }
	};

	var DateRangePicker = function (_React$Component) {
	  _inherits(DateRangePicker, _React$Component);

	  function DateRangePicker(props) {
	    _classCallCheck(this, DateRangePicker);

	    var _this = _possibleConstructorReturn(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this, props));

	    _this.state = {
	      dayPickerContainerStyles: {}
	    };

	    _this.onOutsideClick = _this.onOutsideClick.bind(_this);

	    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);
	    return _this;
	  }

	  _createClass(DateRangePicker, [{
	    key: 'componentDidMount',
	    value: function () {
	      function componentDidMount() {
	        window.addEventListener('resize', this.responsivizePickerPosition);
	        this.responsivizePickerPosition();
	      }

	      return componentDidMount;
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
	      function componentDidUpdate(prevProps) {
	        if (!prevProps.focusedInput && this.props.focusedInput && this.isOpened()) {
	          // The date picker just changed from being closed to being open.
	          this.responsivizePickerPosition();
	        }
	      }

	      return componentDidUpdate;
	    }()
	  }, {
	    key: 'componentWillUnmount',
	    value: function () {
	      function componentWillUnmount() {
	        window.removeEventListener('resize', this.responsivizePickerPosition);
	      }

	      return componentWillUnmount;
	    }()
	  }, {
	    key: 'onOutsideClick',
	    value: function () {
	      function onOutsideClick() {
	        var onFocusChange = this.props.onFocusChange;

	        if (!this.isOpened()) return;

	        onFocusChange(null);
	      }

	      return onOutsideClick;
	    }()
	  }, {
	    key: 'getDayPickerContainerClasses',
	    value: function () {
	      function getDayPickerContainerClasses() {
	        var _props = this.props;
	        var orientation = _props.orientation;
	        var withPortal = _props.withPortal;
	        var withFullScreenPortal = _props.withFullScreenPortal;
	        var anchorDirection = _props.anchorDirection;

	        var dayPickerClassName = (0, _classnames2['default'])('DateRangePicker__picker', {
	          'DateRangePicker__picker--direction-left': anchorDirection === _constants.ANCHOR_LEFT,
	          'DateRangePicker__picker--direction-right': anchorDirection === _constants.ANCHOR_RIGHT,
	          'DateRangePicker__picker--horizontal': orientation === _constants.HORIZONTAL_ORIENTATION,
	          'DateRangePicker__picker--vertical': orientation === _constants.VERTICAL_ORIENTATION,
	          'DateRangePicker__picker--portal': withPortal || withFullScreenPortal,
	          'DateRangePicker__picker--full-screen-portal': withFullScreenPortal
	        });

	        return dayPickerClassName;
	      }

	      return getDayPickerContainerClasses;
	    }()
	  }, {
	    key: 'getDayPickerDOMNode',
	    value: function () {
	      function getDayPickerDOMNode() {
	        return _reactDom2['default'].findDOMNode(this.dayPicker);
	      }

	      return getDayPickerDOMNode;
	    }()
	  }, {
	    key: 'isOpened',
	    value: function () {
	      function isOpened() {
	        var focusedInput = this.props.focusedInput;

	        return focusedInput === _constants.START_DATE || focusedInput === _constants.END_DATE;
	      }

	      return isOpened;
	    }()
	  }, {
	    key: 'responsivizePickerPosition',
	    value: function () {
	      function responsivizePickerPosition() {
	        if (!this.isOpened()) {
	          return;
	        }

	        var _props2 = this.props;
	        var anchorDirection = _props2.anchorDirection;
	        var horizontalMargin = _props2.horizontalMargin;
	        var withPortal = _props2.withPortal;
	        var withFullScreenPortal = _props2.withFullScreenPortal;
	        var dayPickerContainerStyles = this.state.dayPickerContainerStyles;

	        var isAnchoredLeft = anchorDirection === _constants.ANCHOR_LEFT;
	        if (!withPortal && !withFullScreenPortal) {
	          var containerRect = this.dayPickerContainer.getBoundingClientRect();
	          var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
	          var containerEdge = isAnchoredLeft ? containerRect[_constants.ANCHOR_RIGHT] : containerRect[_constants.ANCHOR_LEFT];

	          this.setState({
	            dayPickerContainerStyles: (0, _getResponsiveContainerStyles2['default'])(anchorDirection, currentOffset, containerEdge, horizontalMargin)
	          });
	        }
	      }

	      return responsivizePickerPosition;
	    }()
	  }, {
	    key: 'maybeRenderDayPickerWithPortal',
	    value: function () {
	      function maybeRenderDayPickerWithPortal() {
	        var _props3 = this.props;
	        var withPortal = _props3.withPortal;
	        var withFullScreenPortal = _props3.withFullScreenPortal;

	        if (!this.isOpened()) {
	          return null;
	        }

	        if (withPortal || withFullScreenPortal) {
	          return _react2['default'].createElement(_reactPortal2['default'], { isOpened: true }, this.renderDayPicker());
	        }

	        return this.renderDayPicker();
	      }

	      return maybeRenderDayPickerWithPortal;
	    }()
	  }, {
	    key: 'renderDayPicker',
	    value: function () {
	      function renderDayPicker() {
	        var _this2 = this;

	        var _props4 = this.props;
	        var isDayBlocked = _props4.isDayBlocked;
	        var isDayHighlighted = _props4.isDayHighlighted;
	        var isOutsideRange = _props4.isOutsideRange;
	        var numberOfMonths = _props4.numberOfMonths;
	        var orientation = _props4.orientation;
	        var monthFormat = _props4.monthFormat;
	        var navPrev = _props4.navPrev;
	        var navNext = _props4.navNext;
	        var onPrevMonthClick = _props4.onPrevMonthClick;
	        var onNextMonthClick = _props4.onNextMonthClick;
	        var onDatesChange = _props4.onDatesChange;
	        var onFocusChange = _props4.onFocusChange;
	        var withPortal = _props4.withPortal;
	        var withFullScreenPortal = _props4.withFullScreenPortal;
	        var enableOutsideDays = _props4.enableOutsideDays;
	        var initialVisibleMonth = _props4.initialVisibleMonth;
	        var focusedInput = _props4.focusedInput;
	        var startDate = _props4.startDate;
	        var endDate = _props4.endDate;
	        var minimumNights = _props4.minimumNights;
	        var keepOpenOnDateSelect = _props4.keepOpenOnDateSelect;
	        var renderDay = _props4.renderDay;
	        var dayPickerContainerStyles = this.state.dayPickerContainerStyles;

	        var onOutsideClick = !withFullScreenPortal && withPortal ? this.onOutsideClick : undefined;

	        return _react2['default'].createElement('div', {
	          ref: function () {
	            function ref(_ref2) {
	              _this2.dayPickerContainer = _ref2;
	            }

	            return ref;
	          }(),
	          className: this.getDayPickerContainerClasses(),
	          style: dayPickerContainerStyles
	        }, _react2['default'].createElement(_DayPickerRangeController2['default'], {
	          ref: function () {
	            function ref(_ref) {
	              _this2.dayPicker = _ref;
	            }

	            return ref;
	          }(),
	          orientation: orientation,
	          enableOutsideDays: enableOutsideDays,
	          numberOfMonths: numberOfMonths,
	          onPrevMonthClick: onPrevMonthClick,
	          onNextMonthClick: onNextMonthClick,
	          onDatesChange: onDatesChange,
	          onFocusChange: onFocusChange,
	          focusedInput: focusedInput,
	          startDate: startDate,
	          endDate: endDate,
	          monthFormat: monthFormat,
	          withPortal: withPortal || withFullScreenPortal,
	          hidden: !this.isOpened(),
	          initialVisibleMonth: initialVisibleMonth,
	          onOutsideClick: onOutsideClick,
	          navPrev: navPrev,
	          navNext: navNext,
	          minimumNights: minimumNights,
	          isOutsideRange: isOutsideRange,
	          isDayHighlighted: isDayHighlighted,
	          isDayBlocked: isDayBlocked,
	          keepOpenOnDateSelect: keepOpenOnDateSelect,
	          renderDay: renderDay
	        }), withFullScreenPortal && _react2['default'].createElement('button', {
	          className: 'DateRangePicker__close',
	          type: 'button',
	          onClick: this.onOutsideClick
	        }, _react2['default'].createElement('span', { className: 'screen-reader-only' }, this.props.phrases.closeDatePicker), _react2['default'].createElement(_close2['default'], null)));
	      }

	      return renderDayPicker;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var _props5 = this.props;
	        var startDate = _props5.startDate;
	        var startDateId = _props5.startDateId;
	        var startDatePlaceholderText = _props5.startDatePlaceholderText;
	        var endDate = _props5.endDate;
	        var endDateId = _props5.endDateId;
	        var endDatePlaceholderText = _props5.endDatePlaceholderText;
	        var focusedInput = _props5.focusedInput;
	        var screenReaderInputMessage = _props5.screenReaderInputMessage;
	        var showClearDates = _props5.showClearDates;
	        var showDefaultInputIcon = _props5.showDefaultInputIcon;
	        var customInputIcon = _props5.customInputIcon;
	        var customArrowIcon = _props5.customArrowIcon;
	        var disabled = _props5.disabled;
	        var required = _props5.required;
	        var phrases = _props5.phrases;
	        var isOutsideRange = _props5.isOutsideRange;
	        var withPortal = _props5.withPortal;
	        var withFullScreenPortal = _props5.withFullScreenPortal;
	        var displayFormat = _props5.displayFormat;
	        var reopenPickerOnClearDates = _props5.reopenPickerOnClearDates;
	        var keepOpenOnDateSelect = _props5.keepOpenOnDateSelect;
	        var onDatesChange = _props5.onDatesChange;
	        var onFocusChange = _props5.onFocusChange;
	        var renderDay = _props5.renderDay;

	        var onOutsideClick = !withPortal && !withFullScreenPortal ? this.onOutsideClick : undefined;

	        return _react2['default'].createElement('div', { className: 'DateRangePicker' }, _react2['default'].createElement(_OutsideClickHandler2['default'], { onOutsideClick: onOutsideClick }, _react2['default'].createElement(_DateRangePickerInputController2['default'], {
	          startDate: startDate,
	          startDateId: startDateId,
	          startDatePlaceholderText: startDatePlaceholderText,
	          isStartDateFocused: focusedInput === _constants.START_DATE,
	          endDate: endDate,
	          endDateId: endDateId,
	          endDatePlaceholderText: endDatePlaceholderText,
	          isEndDateFocused: focusedInput === _constants.END_DATE,
	          displayFormat: displayFormat,
	          showClearDates: showClearDates,
	          showCaret: !withPortal && !withFullScreenPortal,
	          showDefaultInputIcon: showDefaultInputIcon,
	          customInputIcon: customInputIcon,
	          customArrowIcon: customArrowIcon,
	          disabled: disabled,
	          required: required,
	          reopenPickerOnClearDates: reopenPickerOnClearDates,
	          keepOpenOnDateSelect: keepOpenOnDateSelect,
	          isOutsideRange: isOutsideRange,
	          withFullScreenPortal: withFullScreenPortal,
	          onDatesChange: onDatesChange,
	          onFocusChange: onFocusChange,
	          renderDay: renderDay,
	          phrases: phrases,
	          screenReaderMessage: screenReaderInputMessage
	        }), this.maybeRenderDayPickerWithPortal()));
	      }

	      return render;
	    }()
	  }]);

	  return DateRangePicker;
	}(_react2['default'].Component);

	exports['default'] = DateRangePicker;

	DateRangePicker.propTypes = propTypes;
	DateRangePicker.defaultProps = defaultProps;

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
/* 8 */,
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
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports) {

	module.exports = require("react-portal");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("./OutsideClickHandler");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("../utils/getResponsiveContainerStyles");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("../utils/isInclusivelyAfterDay");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("./DateRangePickerInputController");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("./DayPickerRangeController");

/***/ },
/* 21 */
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
	          _extends({ viewBox: "0 0 12 12" }, this.props),
	          _react2["default"].createElement("path", { fillRule: "evenodd", d: "M11.53.47a.75.75 0 0 0-1.061 0l-4.47 4.47L1.529.47A.75.75 0 1 0 .468 1.531l4.47 4.47-4.47 4.47a.75.75 0 1 0 1.061 1.061l4.47-4.47 4.47 4.47a.75.75 0 1 0 1.061-1.061l-4.47-4.47 4.47-4.47a.75.75 0 0 0 0-1.061z" })
	        );
	      }

	      return render;
	    }()
	  }]);

	  return SVG;
	}(_react2["default"].Component);

	exports["default"] = SVG;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("../shapes/DateRangePickerShape");

/***/ }
/******/ ]);