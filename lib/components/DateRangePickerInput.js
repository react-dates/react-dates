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

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _DateInput = __webpack_require__(23);

	var _DateInput2 = _interopRequireDefault(_DateInput);

	var _arrowRight = __webpack_require__(24);

	var _arrowRight2 = _interopRequireDefault(_arrowRight);

	var _close = __webpack_require__(21);

	var _close2 = _interopRequireDefault(_close);

	var _calendar = __webpack_require__(25);

	var _calendar2 = _interopRequireDefault(_calendar);

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

	var propTypes = {
	  startDateId: _react.PropTypes.string,
	  startDatePlaceholderText: _react.PropTypes.string,
	  screenReaderMessage: _react.PropTypes.string,

	  endDateId: _react.PropTypes.string,
	  endDatePlaceholderText: _react.PropTypes.string,

	  onStartDateFocus: _react.PropTypes.func,
	  onEndDateFocus: _react.PropTypes.func,
	  onStartDateChange: _react.PropTypes.func,
	  onEndDateChange: _react.PropTypes.func,
	  onStartDateShiftTab: _react.PropTypes.func,
	  onEndDateTab: _react.PropTypes.func,
	  onClearDates: _react.PropTypes.func,

	  startDate: _react.PropTypes.string,
	  startDateValue: _react.PropTypes.string,
	  endDate: _react.PropTypes.string,
	  endDateValue: _react.PropTypes.string,

	  isStartDateFocused: _react.PropTypes.bool,
	  isEndDateFocused: _react.PropTypes.bool,
	  showClearDates: _react.PropTypes.bool,
	  disabled: _react.PropTypes.bool,
	  required: _react.PropTypes.bool,
	  showCaret: _react.PropTypes.bool,
	  showDefaultInputIcon: _react.PropTypes.bool,
	  customInputIcon: _react.PropTypes.node,
	  customArrowIcon: _react.PropTypes.node,

	  // i18n
	  phrases: _react.PropTypes.shape({
	    clearDates: _react.PropTypes.node
	  })
	};

	var defaultProps = {
	  startDateId: _constants.START_DATE,
	  endDateId: _constants.END_DATE,
	  startDatePlaceholderText: 'Start Date',
	  endDatePlaceholderText: 'End Date',
	  screenReaderMessage: '',
	  onStartDateFocus: function () {
	    function onStartDateFocus() {}

	    return onStartDateFocus;
	  }(),
	  onEndDateFocus: function () {
	    function onEndDateFocus() {}

	    return onEndDateFocus;
	  }(),
	  onStartDateChange: function () {
	    function onStartDateChange() {}

	    return onStartDateChange;
	  }(),
	  onEndDateChange: function () {
	    function onEndDateChange() {}

	    return onEndDateChange;
	  }(),
	  onStartDateShiftTab: function () {
	    function onStartDateShiftTab() {}

	    return onStartDateShiftTab;
	  }(),
	  onEndDateTab: function () {
	    function onEndDateTab() {}

	    return onEndDateTab;
	  }(),
	  onClearDates: function () {
	    function onClearDates() {}

	    return onClearDates;
	  }(),

	  startDate: '',
	  startDateValue: '',
	  endDate: '',
	  endDateValue: '',

	  isStartDateFocused: false,
	  isEndDateFocused: false,
	  showClearDates: false,
	  disabled: false,
	  required: false,
	  showCaret: false,
	  showDefaultInputIcon: false,
	  customInputIcon: null,
	  customArrowIcon: null,

	  // i18n
	  phrases: {
	    clearDates: 'Clear Dates'
	  }
	};

	var DateRangePickerInput = function (_React$Component) {
	  _inherits(DateRangePickerInput, _React$Component);

	  function DateRangePickerInput(props) {
	    _classCallCheck(this, DateRangePickerInput);

	    var _this = _possibleConstructorReturn(this, (DateRangePickerInput.__proto__ || Object.getPrototypeOf(DateRangePickerInput)).call(this, props));

	    _this.state = {
	      isClearDatesHovered: false
	    };

	    _this.onClearDatesMouseEnter = _this.onClearDatesMouseEnter.bind(_this);
	    _this.onClearDatesMouseLeave = _this.onClearDatesMouseLeave.bind(_this);
	    return _this;
	  }

	  _createClass(DateRangePickerInput, [{
	    key: 'onClearDatesMouseEnter',
	    value: function () {
	      function onClearDatesMouseEnter() {
	        this.setState({
	          isClearDatesHovered: true
	        });
	      }

	      return onClearDatesMouseEnter;
	    }()
	  }, {
	    key: 'onClearDatesMouseLeave',
	    value: function () {
	      function onClearDatesMouseLeave() {
	        this.setState({
	          isClearDatesHovered: false
	        });
	      }

	      return onClearDatesMouseLeave;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var isClearDatesHovered = this.state.isClearDatesHovered;
	        var _props = this.props;
	        var startDate = _props.startDate;
	        var startDateValue = _props.startDateValue;
	        var startDateId = _props.startDateId;
	        var startDatePlaceholderText = _props.startDatePlaceholderText;
	        var screenReaderMessage = _props.screenReaderMessage;
	        var isStartDateFocused = _props.isStartDateFocused;
	        var onStartDateChange = _props.onStartDateChange;
	        var onStartDateFocus = _props.onStartDateFocus;
	        var onStartDateShiftTab = _props.onStartDateShiftTab;
	        var endDate = _props.endDate;
	        var endDateValue = _props.endDateValue;
	        var endDateId = _props.endDateId;
	        var endDatePlaceholderText = _props.endDatePlaceholderText;
	        var isEndDateFocused = _props.isEndDateFocused;
	        var onEndDateChange = _props.onEndDateChange;
	        var onEndDateFocus = _props.onEndDateFocus;
	        var onEndDateTab = _props.onEndDateTab;
	        var onClearDates = _props.onClearDates;
	        var showClearDates = _props.showClearDates;
	        var disabled = _props.disabled;
	        var required = _props.required;
	        var showCaret = _props.showCaret;
	        var showDefaultInputIcon = _props.showDefaultInputIcon;
	        var customInputIcon = _props.customInputIcon;
	        var customArrowIcon = _props.customArrowIcon;
	        var phrases = _props.phrases;

	        var inputIcon = customInputIcon || _react2['default'].createElement(_calendar2['default'], null);
	        var arrowIcon = customArrowIcon || _react2['default'].createElement(_arrowRight2['default'], null);

	        return _react2['default'].createElement('div', {
	          className: (0, _classnames2['default'])('DateRangePickerInput', {
	            'DateRangePickerInput--disabled': disabled
	          })
	        }, (showDefaultInputIcon || customInputIcon !== null) && _react2['default'].createElement('span', {
	          className: 'DateRangePickerInput__calendar-icon',
	          onClick: onStartDateFocus
	        }, inputIcon), _react2['default'].createElement(_DateInput2['default'], {
	          id: startDateId,
	          placeholder: startDatePlaceholderText,
	          displayValue: startDate,
	          inputValue: startDateValue,
	          screenReaderMessage: screenReaderMessage,
	          focused: isStartDateFocused,
	          disabled: disabled,
	          required: required,
	          showCaret: showCaret,

	          onChange: onStartDateChange,
	          onFocus: onStartDateFocus,
	          onKeyDownShiftTab: onStartDateShiftTab
	        }), _react2['default'].createElement('div', { className: 'DateRangePickerInput__arrow' }, arrowIcon), _react2['default'].createElement(_DateInput2['default'], {
	          id: endDateId,
	          placeholder: endDatePlaceholderText,
	          displayValue: endDate,
	          inputValue: endDateValue,
	          screenReaderMessage: screenReaderMessage,
	          focused: isEndDateFocused,
	          disabled: disabled,
	          required: required,
	          showCaret: showCaret,

	          onChange: onEndDateChange,
	          onFocus: onEndDateFocus,
	          onKeyDownTab: onEndDateTab
	        }), showClearDates && _react2['default'].createElement('button', {
	          type: 'button',
	          className: (0, _classnames2['default'])('DateRangePickerInput__clear-dates', {
	            'DateRangePickerInput__clear-dates--hide': !(startDate || endDate),
	            'DateRangePickerInput__clear-dates--hover': isClearDatesHovered
	          }),
	          onMouseEnter: this.onClearDatesMouseEnter,
	          onMouseLeave: this.onClearDatesMouseLeave,
	          onClick: onClearDates
	        }, _react2['default'].createElement('span', { className: 'screen-reader-only' }, phrases.clearDates), _react2['default'].createElement(_close2['default'], null)));
	      }

	      return render;
	    }()
	  }]);

	  return DateRangePickerInput;
	}(_react2['default'].Component);

	exports['default'] = DateRangePickerInput;

	DateRangePickerInput.propTypes = propTypes;
	DateRangePickerInput.defaultProps = defaultProps;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
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
/* 22 */,
/* 23 */
/***/ function(module, exports) {

	module.exports = require("./DateInput");

/***/ },
/* 24 */
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
/* 25 */
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
	          _extends({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1393.1 1500" }, this.props),
	          _react2["default"].createElement("path", { d: "M107.2 1392.9h241.1v-241.1H107.2v241.1zm294.7 0h267.9v-241.1H401.9v241.1zm-294.7-294.7h241.1V830.4H107.2v267.8zm294.7 0h267.9V830.4H401.9v267.8zM107.2 776.8h241.1V535.7H107.2v241.1zm616.2 616.1h267.9v-241.1H723.4v241.1zM401.9 776.8h267.9V535.7H401.9v241.1zm642.9 616.1H1286v-241.1h-241.1v241.1zm-321.4-294.7h267.9V830.4H723.4v267.8zM428.7 375V133.9c0-7.3-2.7-13.5-8-18.8-5.3-5.3-11.6-8-18.8-8h-53.6c-7.3 0-13.5 2.7-18.8 8-5.3 5.3-8 11.6-8 18.8V375c0 7.3 2.7 13.5 8 18.8 5.3 5.3 11.6 8 18.8 8h53.6c7.3 0 13.5-2.7 18.8-8 5.3-5.3 8-11.5 8-18.8zm616.1 723.2H1286V830.4h-241.1v267.8zM723.4 776.8h267.9V535.7H723.4v241.1zm321.4 0H1286V535.7h-241.1v241.1zm26.8-401.8V133.9c0-7.3-2.7-13.5-8-18.8-5.3-5.3-11.6-8-18.8-8h-53.6c-7.3 0-13.5 2.7-18.8 8-5.3 5.3-8 11.6-8 18.8V375c0 7.3 2.7 13.5 8 18.8 5.3 5.3 11.6 8 18.8 8h53.6c7.3 0 13.5-2.7 18.8-8 5.4-5.3 8-11.5 8-18.8zm321.5-53.6v1071.4c0 29-10.6 54.1-31.8 75.3-21.2 21.2-46.3 31.8-75.3 31.8H107.2c-29 0-54.1-10.6-75.3-31.8C10.6 1447 0 1421.9 0 1392.9V321.4c0-29 10.6-54.1 31.8-75.3s46.3-31.8 75.3-31.8h107.2v-80.4c0-36.8 13.1-68.4 39.3-94.6S311.4 0 348.3 0h53.6c36.8 0 68.4 13.1 94.6 39.3 26.2 26.2 39.3 57.8 39.3 94.6v80.4h321.5v-80.4c0-36.8 13.1-68.4 39.3-94.6C922.9 13.1 954.4 0 991.3 0h53.6c36.8 0 68.4 13.1 94.6 39.3s39.3 57.8 39.3 94.6v80.4H1286c29 0 54.1 10.6 75.3 31.8 21.2 21.2 31.8 46.3 31.8 75.3z" })
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