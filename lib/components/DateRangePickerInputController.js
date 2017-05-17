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

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactMomentProptypes = __webpack_require__(3);

	var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

	var _DateRangePickerInput = __webpack_require__(26);

	var _DateRangePickerInput2 = _interopRequireDefault(_DateRangePickerInput);

	var _toMomentObject = __webpack_require__(27);

	var _toMomentObject2 = _interopRequireDefault(_toMomentObject);

	var _toLocalizedDateString = __webpack_require__(28);

	var _toLocalizedDateString2 = _interopRequireDefault(_toLocalizedDateString);

	var _toISODateString = __webpack_require__(29);

	var _toISODateString2 = _interopRequireDefault(_toISODateString);

	var _isInclusivelyAfterDay = __webpack_require__(18);

	var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

	var _isInclusivelyBeforeDay = __webpack_require__(30);

	var _isInclusivelyBeforeDay2 = _interopRequireDefault(_isInclusivelyBeforeDay);

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
	  startDate: _reactMomentProptypes2['default'].momentObj,
	  startDateId: _react.PropTypes.string,
	  startDatePlaceholderText: _react.PropTypes.string,
	  isStartDateFocused: _react.PropTypes.bool,

	  endDate: _reactMomentProptypes2['default'].momentObj,
	  endDateId: _react.PropTypes.string,
	  endDatePlaceholderText: _react.PropTypes.string,
	  isEndDateFocused: _react.PropTypes.bool,

	  screenReaderMessage: _react.PropTypes.string,
	  showClearDates: _react.PropTypes.bool,
	  showCaret: _react.PropTypes.bool,
	  showDefaultInputIcon: _react.PropTypes.bool,
	  disabled: _react.PropTypes.bool,
	  required: _react.PropTypes.bool,

	  keepOpenOnDateSelect: _react.PropTypes.bool,
	  reopenPickerOnClearDates: _react.PropTypes.bool,
	  withFullScreenPortal: _react.PropTypes.bool,
	  isOutsideRange: _react.PropTypes.func,
	  displayFormat: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

	  onFocusChange: _react.PropTypes.func,
	  onDatesChange: _react.PropTypes.func,

	  customInputIcon: _react.PropTypes.node,
	  customArrowIcon: _react.PropTypes.node,

	  // i18n
	  phrases: _react.PropTypes.shape({
	    clearDates: _react.PropTypes.node
	  })
	};

	var defaultProps = {
	  startDate: null,
	  startDateId: _constants.START_DATE,
	  startDatePlaceholderText: 'Start Date',
	  isStartDateFocused: false,

	  endDate: null,
	  endDateId: _constants.END_DATE,
	  endDatePlaceholderText: 'End Date',
	  isEndDateFocused: false,

	  screenReaderMessage: '',
	  showClearDates: false,
	  showCaret: false,
	  showDefaultInputIcon: false,
	  disabled: false,
	  required: false,

	  keepOpenOnDateSelect: false,
	  reopenPickerOnClearDates: false,
	  withFullScreenPortal: false,
	  isOutsideRange: function () {
	    function isOutsideRange(day) {
	      return !(0, _isInclusivelyAfterDay2['default'])(day, (0, _moment2['default'])());
	    }

	    return isOutsideRange;
	  }(),
	  displayFormat: function () {
	    function displayFormat() {
	      return _moment2['default'].localeData().longDateFormat('L');
	    }

	    return displayFormat;
	  }(),

	  onFocusChange: function () {
	    function onFocusChange() {}

	    return onFocusChange;
	  }(),
	  onDatesChange: function () {
	    function onDatesChange() {}

	    return onDatesChange;
	  }(),

	  customInputIcon: null,
	  customArrowIcon: null,

	  // i18n
	  phrases: {
	    clearDates: 'Clear Dates'
	  }
	};

	var DateRangePickerInputWithHandlers = function (_React$Component) {
	  _inherits(DateRangePickerInputWithHandlers, _React$Component);

	  function DateRangePickerInputWithHandlers(props) {
	    _classCallCheck(this, DateRangePickerInputWithHandlers);

	    var _this = _possibleConstructorReturn(this, (DateRangePickerInputWithHandlers.__proto__ || Object.getPrototypeOf(DateRangePickerInputWithHandlers)).call(this, props));

	    _this.onClearFocus = _this.onClearFocus.bind(_this);
	    _this.onStartDateChange = _this.onStartDateChange.bind(_this);
	    _this.onStartDateFocus = _this.onStartDateFocus.bind(_this);
	    _this.onEndDateChange = _this.onEndDateChange.bind(_this);
	    _this.onEndDateFocus = _this.onEndDateFocus.bind(_this);
	    _this.clearDates = _this.clearDates.bind(_this);
	    return _this;
	  }

	  _createClass(DateRangePickerInputWithHandlers, [{
	    key: 'onClearFocus',
	    value: function () {
	      function onClearFocus() {
	        this.props.onFocusChange(null);
	      }

	      return onClearFocus;
	    }()
	  }, {
	    key: 'onEndDateChange',
	    value: function () {
	      function onEndDateChange(endDateString) {
	        var _props = this.props;
	        var startDate = _props.startDate;
	        var isOutsideRange = _props.isOutsideRange;
	        var keepOpenOnDateSelect = _props.keepOpenOnDateSelect;
	        var onDatesChange = _props.onDatesChange;
	        var onFocusChange = _props.onFocusChange;

	        var endDate = (0, _toMomentObject2['default'])(endDateString, this.getDisplayFormat());

	        var isEndDateValid = endDate && !isOutsideRange(endDate) && !(0, _isInclusivelyBeforeDay2['default'])(endDate, startDate);
	        if (isEndDateValid) {
	          onDatesChange({ startDate: startDate, endDate: endDate });
	          if (!keepOpenOnDateSelect) onFocusChange(null);
	        } else {
	          onDatesChange({
	            startDate: startDate,
	            endDate: null
	          });
	        }
	      }

	      return onEndDateChange;
	    }()
	  }, {
	    key: 'onEndDateFocus',
	    value: function () {
	      function onEndDateFocus() {
	        var _props2 = this.props;
	        var startDate = _props2.startDate;
	        var onFocusChange = _props2.onFocusChange;
	        var withFullScreenPortal = _props2.withFullScreenPortal;
	        var disabled = _props2.disabled;

	        if (!startDate && withFullScreenPortal && !disabled) {
	          // When the datepicker is full screen, we never want to focus the end date first
	          // because there's no indication that that is the case once the datepicker is open and it
	          // might confuse the user
	          onFocusChange(_constants.START_DATE);
	        } else if (!disabled) {
	          onFocusChange(_constants.END_DATE);
	        }
	      }

	      return onEndDateFocus;
	    }()
	  }, {
	    key: 'onStartDateChange',
	    value: function () {
	      function onStartDateChange(startDateString) {
	        var startDate = (0, _toMomentObject2['default'])(startDateString, this.getDisplayFormat());

	        var endDate = this.props.endDate;
	        var _props3 = this.props;
	        var isOutsideRange = _props3.isOutsideRange;
	        var onDatesChange = _props3.onDatesChange;
	        var onFocusChange = _props3.onFocusChange;

	        var isStartDateValid = startDate && !isOutsideRange(startDate);
	        if (isStartDateValid) {
	          if ((0, _isInclusivelyBeforeDay2['default'])(endDate, startDate)) {
	            endDate = null;
	          }

	          onDatesChange({ startDate: startDate, endDate: endDate });
	          onFocusChange(_constants.END_DATE);
	        } else {
	          onDatesChange({
	            startDate: null,
	            endDate: endDate
	          });
	        }
	      }

	      return onStartDateChange;
	    }()
	  }, {
	    key: 'onStartDateFocus',
	    value: function () {
	      function onStartDateFocus() {
	        if (!this.props.disabled) {
	          this.props.onFocusChange(_constants.START_DATE);
	        }
	      }

	      return onStartDateFocus;
	    }()
	  }, {
	    key: 'getDisplayFormat',
	    value: function () {
	      function getDisplayFormat() {
	        var displayFormat = this.props.displayFormat;

	        return typeof displayFormat === 'string' ? displayFormat : displayFormat();
	      }

	      return getDisplayFormat;
	    }()
	  }, {
	    key: 'getDateString',
	    value: function () {
	      function getDateString(date) {
	        var displayFormat = this.getDisplayFormat();
	        if (date && displayFormat) {
	          return date && date.format(displayFormat);
	        }
	        return (0, _toLocalizedDateString2['default'])(date);
	      }

	      return getDateString;
	    }()
	  }, {
	    key: 'clearDates',
	    value: function () {
	      function clearDates() {
	        var _props4 = this.props;
	        var onDatesChange = _props4.onDatesChange;
	        var reopenPickerOnClearDates = _props4.reopenPickerOnClearDates;
	        var onFocusChange = _props4.onFocusChange;

	        onDatesChange({ startDate: null, endDate: null });
	        if (reopenPickerOnClearDates) {
	          onFocusChange(_constants.START_DATE);
	        }
	      }

	      return clearDates;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var _props5 = this.props;
	        var startDate = _props5.startDate;
	        var startDateId = _props5.startDateId;
	        var startDatePlaceholderText = _props5.startDatePlaceholderText;
	        var isStartDateFocused = _props5.isStartDateFocused;
	        var endDate = _props5.endDate;
	        var endDateId = _props5.endDateId;
	        var endDatePlaceholderText = _props5.endDatePlaceholderText;
	        var isEndDateFocused = _props5.isEndDateFocused;
	        var screenReaderMessage = _props5.screenReaderMessage;
	        var showClearDates = _props5.showClearDates;
	        var showCaret = _props5.showCaret;
	        var showDefaultInputIcon = _props5.showDefaultInputIcon;
	        var customInputIcon = _props5.customInputIcon;
	        var customArrowIcon = _props5.customArrowIcon;
	        var disabled = _props5.disabled;
	        var required = _props5.required;
	        var phrases = _props5.phrases;

	        var startDateString = this.getDateString(startDate);
	        var startDateValue = (0, _toISODateString2['default'])(startDate);
	        var endDateString = this.getDateString(endDate);
	        var endDateValue = (0, _toISODateString2['default'])(endDate);

	        return _react2['default'].createElement(_DateRangePickerInput2['default'], {
	          startDate: startDateString,
	          startDateValue: startDateValue,
	          startDateId: startDateId,
	          startDatePlaceholderText: startDatePlaceholderText,
	          isStartDateFocused: isStartDateFocused,
	          endDate: endDateString,
	          endDateValue: endDateValue,
	          endDateId: endDateId,
	          endDatePlaceholderText: endDatePlaceholderText,
	          isEndDateFocused: isEndDateFocused,
	          disabled: disabled,
	          required: required,
	          showCaret: showCaret,
	          showDefaultInputIcon: showDefaultInputIcon,
	          customInputIcon: customInputIcon,
	          customArrowIcon: customArrowIcon,
	          phrases: phrases,
	          onStartDateChange: this.onStartDateChange,
	          onStartDateFocus: this.onStartDateFocus,
	          onStartDateShiftTab: this.onClearFocus,
	          onEndDateChange: this.onEndDateChange,
	          onEndDateFocus: this.onEndDateFocus,
	          onEndDateTab: this.onClearFocus,
	          showClearDates: showClearDates,
	          onClearDates: this.clearDates,
	          screenReaderMessage: screenReaderMessage
	        });
	      }

	      return render;
	    }()
	  }]);

	  return DateRangePickerInputWithHandlers;
	}(_react2['default'].Component);

	exports['default'] = DateRangePickerInputWithHandlers;

	DateRangePickerInputWithHandlers.propTypes = propTypes;
	DateRangePickerInputWithHandlers.defaultProps = defaultProps;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-moment-proptypes");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 5 */,
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
/* 18 */
/***/ function(module, exports) {

	module.exports = require("../utils/isInclusivelyAfterDay");

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports) {

	module.exports = require("./DateRangePickerInput");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("../utils/toMomentObject");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("../utils/toLocalizedDateString");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("../utils/toISODateString");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("../utils/isInclusivelyBeforeDay");

/***/ }
/******/ ]);