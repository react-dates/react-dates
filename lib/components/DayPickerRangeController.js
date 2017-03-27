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

	var _reactMomentProptypes = __webpack_require__(3);

	var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _isTouchDevice = __webpack_require__(14);

	var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

	var _isInclusivelyAfterDay = __webpack_require__(18);

	var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

	var _isNextDay = __webpack_require__(36);

	var _isNextDay2 = _interopRequireDefault(_isNextDay);

	var _isSameDay = __webpack_require__(37);

	var _isSameDay2 = _interopRequireDefault(_isSameDay);

	var _FocusedInputShape = __webpack_require__(38);

	var _FocusedInputShape2 = _interopRequireDefault(_FocusedInputShape);

	var _ScrollableOrientationShape = __webpack_require__(8);

	var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

	var _constants = __webpack_require__(9);

	var _DayPicker = __webpack_require__(39);

	var _DayPicker2 = _interopRequireDefault(_DayPicker);

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
	  endDate: _reactMomentProptypes2['default'].momentObj,
	  onDatesChange: _react.PropTypes.func,

	  focusedInput: _FocusedInputShape2['default'],
	  onFocusChange: _react.PropTypes.func,

	  keepOpenOnDateSelect: _react.PropTypes.bool,
	  minimumNights: _react.PropTypes.number,
	  isOutsideRange: _react.PropTypes.func,
	  isDayBlocked: _react.PropTypes.func,
	  isDayHighlighted: _react.PropTypes.func,

	  // DayPicker props
	  enableOutsideDays: _react.PropTypes.bool,
	  numberOfMonths: _react.PropTypes.number,
	  orientation: _ScrollableOrientationShape2['default'],
	  withPortal: _react.PropTypes.bool,
	  hidden: _react.PropTypes.bool,
	  initialVisibleMonth: _react.PropTypes.func,

	  navPrev: _react.PropTypes.node,
	  navNext: _react.PropTypes.node,

	  onPrevMonthClick: _react.PropTypes.func,
	  onNextMonthClick: _react.PropTypes.func,
	  onOutsideClick: _react.PropTypes.func,
	  renderDay: _react.PropTypes.func,

	  // i18n
	  monthFormat: _react.PropTypes.string
	};

	var defaultProps = {
	  startDate: undefined, // TODO: use null
	  endDate: undefined, // TODO: use null
	  onDatesChange: function () {
	    function onDatesChange() {}

	    return onDatesChange;
	  }(),

	  focusedInput: null,
	  onFocusChange: function () {
	    function onFocusChange() {}

	    return onFocusChange;
	  }(),

	  keepOpenOnDateSelect: false,
	  minimumNights: 1,
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
	  enableOutsideDays: false,
	  numberOfMonths: 1,
	  orientation: _constants.HORIZONTAL_ORIENTATION,
	  withPortal: false,
	  hidden: false,

	  initialVisibleMonth: function () {
	    function initialVisibleMonth() {
	      return (0, _moment2['default'])();
	    }

	    return initialVisibleMonth;
	  }(),

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

	  renderDay: null,

	  // i18n
	  monthFormat: 'MMMM YYYY'
	};

	var DayPickerRangeController = function (_React$Component) {
	  _inherits(DayPickerRangeController, _React$Component);

	  function DayPickerRangeController(props) {
	    _classCallCheck(this, DayPickerRangeController);

	    var _this = _possibleConstructorReturn(this, (DayPickerRangeController.__proto__ || Object.getPrototypeOf(DayPickerRangeController)).call(this, props));

	    _this.state = {
	      hoverDate: null
	    };

	    _this.isTouchDevice = (0, _isTouchDevice2['default'])();
	    _this.today = (0, _moment2['default'])();

	    _this.onDayClick = _this.onDayClick.bind(_this);
	    _this.onDayMouseEnter = _this.onDayMouseEnter.bind(_this);
	    _this.onDayMouseLeave = _this.onDayMouseLeave.bind(_this);
	    return _this;
	  }

	  _createClass(DayPickerRangeController, [{
	    key: 'componentWillUpdate',
	    value: function () {
	      function componentWillUpdate() {
	        this.today = (0, _moment2['default'])();
	      }

	      return componentWillUpdate;
	    }()
	  }, {
	    key: 'onDayClick',
	    value: function () {
	      function onDayClick(day, e) {
	        var _props = this.props;
	        var keepOpenOnDateSelect = _props.keepOpenOnDateSelect;
	        var minimumNights = _props.minimumNights;

	        if (e) e.preventDefault();
	        if (this.isBlocked(day)) return;

	        var focusedInput = this.props.focusedInput;
	        var _props2 = this.props;
	        var startDate = _props2.startDate;
	        var endDate = _props2.endDate;

	        if (focusedInput === _constants.START_DATE) {
	          this.props.onFocusChange(_constants.END_DATE);

	          startDate = day;

	          if ((0, _isInclusivelyAfterDay2['default'])(day, endDate)) {
	            endDate = null;
	          }
	        } else if (focusedInput === _constants.END_DATE) {
	          var firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

	          if (!startDate) {
	            endDate = day;
	            this.props.onFocusChange(_constants.START_DATE);
	          } else if ((0, _isInclusivelyAfterDay2['default'])(day, firstAllowedEndDate)) {
	            endDate = day;
	            if (!keepOpenOnDateSelect) this.props.onFocusChange(null);
	          } else {
	            startDate = day;
	            endDate = null;
	          }
	        }

	        this.props.onDatesChange({ startDate: startDate, endDate: endDate });
	      }

	      return onDayClick;
	    }()
	  }, {
	    key: 'onDayMouseEnter',
	    value: function () {
	      function onDayMouseEnter(day) {
	        if (this.isTouchDevice) return;

	        this.setState({
	          hoverDate: day
	        });
	      }

	      return onDayMouseEnter;
	    }()
	  }, {
	    key: 'onDayMouseLeave',
	    value: function () {
	      function onDayMouseLeave() {
	        if (this.isTouchDevice) return;

	        this.setState({
	          hoverDate: null
	        });
	      }

	      return onDayMouseLeave;
	    }()
	  }, {
	    key: 'doesNotMeetMinimumNights',
	    value: function () {
	      function doesNotMeetMinimumNights(day) {
	        var _props3 = this.props;
	        var startDate = _props3.startDate;
	        var isOutsideRange = _props3.isOutsideRange;
	        var focusedInput = _props3.focusedInput;
	        var minimumNights = _props3.minimumNights;

	        if (focusedInput !== _constants.END_DATE) return false;

	        if (startDate) {
	          var dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
	          return dayDiff < minimumNights && dayDiff >= 0;
	        }
	        return isOutsideRange((0, _moment2['default'])(day).subtract(minimumNights, 'days'));
	      }

	      return doesNotMeetMinimumNights;
	    }()
	  }, {
	    key: 'isDayAfterHoveredStartDate',
	    value: function () {
	      function isDayAfterHoveredStartDate(day) {
	        var _props4 = this.props;
	        var startDate = _props4.startDate;
	        var endDate = _props4.endDate;
	        var minimumNights = _props4.minimumNights;
	        var hoverDate = this.state.hoverDate;

	        return !!startDate && !endDate && !this.isBlocked(day) && (0, _isNextDay2['default'])(hoverDate, day) && minimumNights > 0 && (0, _isSameDay2['default'])(hoverDate, startDate);
	      }

	      return isDayAfterHoveredStartDate;
	    }()
	  }, {
	    key: 'isEndDate',
	    value: function () {
	      function isEndDate(day) {
	        return (0, _isSameDay2['default'])(day, this.props.endDate);
	      }

	      return isEndDate;
	    }()
	  }, {
	    key: 'isHovered',
	    value: function () {
	      function isHovered(day) {
	        return (0, _isSameDay2['default'])(day, this.state.hoverDate);
	      }

	      return isHovered;
	    }()
	  }, {
	    key: 'isInHoveredSpan',
	    value: function () {
	      function isInHoveredSpan(day) {
	        var _props5 = this.props;
	        var startDate = _props5.startDate;
	        var endDate = _props5.endDate;
	        var hoverDate = this.state.hoverDate;

	        var isForwardRange = !!startDate && !endDate && (day.isBetween(startDate, hoverDate) || (0, _isSameDay2['default'])(hoverDate, day));
	        var isBackwardRange = !!endDate && !startDate && (day.isBetween(hoverDate, endDate) || (0, _isSameDay2['default'])(hoverDate, day));

	        var isValidDayHovered = hoverDate && !this.isBlocked(hoverDate);

	        return (isForwardRange || isBackwardRange) && isValidDayHovered;
	      }

	      return isInHoveredSpan;
	    }()
	  }, {
	    key: 'isInSelectedSpan',
	    value: function () {
	      function isInSelectedSpan(day) {
	        var _props6 = this.props;
	        var startDate = _props6.startDate;
	        var endDate = _props6.endDate;

	        return day.isBetween(startDate, endDate);
	      }

	      return isInSelectedSpan;
	    }()
	  }, {
	    key: 'isLastInRange',
	    value: function () {
	      function isLastInRange(day) {
	        return this.isInSelectedSpan(day) && (0, _isNextDay2['default'])(day, this.props.endDate);
	      }

	      return isLastInRange;
	    }()
	  }, {
	    key: 'isStartDate',
	    value: function () {
	      function isStartDate(day) {
	        return (0, _isSameDay2['default'])(day, this.props.startDate);
	      }

	      return isStartDate;
	    }()
	  }, {
	    key: 'isBlocked',
	    value: function () {
	      function isBlocked(day) {
	        var _props7 = this.props;
	        var isDayBlocked = _props7.isDayBlocked;
	        var isOutsideRange = _props7.isOutsideRange;

	        return isDayBlocked(day) || isOutsideRange(day) || this.doesNotMeetMinimumNights(day);
	      }

	      return isBlocked;
	    }()
	  }, {
	    key: 'isToday',
	    value: function () {
	      function isToday(day) {
	        return (0, _isSameDay2['default'])(day, this.today);
	      }

	      return isToday;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var _this2 = this;

	        var _props8 = this.props;
	        var isDayBlocked = _props8.isDayBlocked;
	        var isDayHighlighted = _props8.isDayHighlighted;
	        var isOutsideRange = _props8.isOutsideRange;
	        var numberOfMonths = _props8.numberOfMonths;
	        var orientation = _props8.orientation;
	        var monthFormat = _props8.monthFormat;
	        var navPrev = _props8.navPrev;
	        var navNext = _props8.navNext;
	        var onOutsideClick = _props8.onOutsideClick;
	        var onPrevMonthClick = _props8.onPrevMonthClick;
	        var onNextMonthClick = _props8.onNextMonthClick;
	        var withPortal = _props8.withPortal;
	        var enableOutsideDays = _props8.enableOutsideDays;
	        var initialVisibleMonth = _props8.initialVisibleMonth;
	        var focusedInput = _props8.focusedInput;
	        var renderDay = _props8.renderDay;

	        var modifiers = {
	          today: function () {
	            function today(day) {
	              return _this2.isToday(day);
	            }

	            return today;
	          }(),
	          blocked: function () {
	            function blocked(day) {
	              return _this2.isBlocked(day);
	            }

	            return blocked;
	          }(),
	          'blocked-calendar': function () {
	            function blockedCalendar(day) {
	              return isDayBlocked(day);
	            }

	            return blockedCalendar;
	          }(),
	          'blocked-out-of-range': function () {
	            function blockedOutOfRange(day) {
	              return isOutsideRange(day);
	            }

	            return blockedOutOfRange;
	          }(),
	          'blocked-minimum-nights': function () {
	            function blockedMinimumNights(day) {
	              return _this2.doesNotMeetMinimumNights(day);
	            }

	            return blockedMinimumNights;
	          }(),
	          'highlighted-calendar': function () {
	            function highlightedCalendar(day) {
	              return isDayHighlighted(day);
	            }

	            return highlightedCalendar;
	          }(),
	          valid: function () {
	            function valid(day) {
	              return !_this2.isBlocked(day);
	            }

	            return valid;
	          }(),
	          // before anything has been set or after both are set
	          hovered: function () {
	            function hovered(day) {
	              return _this2.isHovered(day);
	            }

	            return hovered;
	          }(),

	          // while start date has been set, but end date has not been
	          'hovered-span': function () {
	            function hoveredSpan(day) {
	              return _this2.isInHoveredSpan(day);
	            }

	            return hoveredSpan;
	          }(),
	          'after-hovered-start': function () {
	            function afterHoveredStart(day) {
	              return _this2.isDayAfterHoveredStartDate(day);
	            }

	            return afterHoveredStart;
	          }(),
	          'last-in-range': function () {
	            function lastInRange(day) {
	              return _this2.isLastInRange(day);
	            }

	            return lastInRange;
	          }(),

	          // once a start date and end date have been set
	          'selected-start': function () {
	            function selectedStart(day) {
	              return _this2.isStartDate(day);
	            }

	            return selectedStart;
	          }(),
	          'selected-end': function () {
	            function selectedEnd(day) {
	              return _this2.isEndDate(day);
	            }

	            return selectedEnd;
	          }(),
	          'selected-span': function () {
	            function selectedSpan(day) {
	              return _this2.isInSelectedSpan(day);
	            }

	            return selectedSpan;
	          }()
	        };

	        return _react2['default'].createElement(_DayPicker2['default'], {
	          ref: function () {
	            function ref(_ref) {
	              _this2.dayPicker = _ref;
	            }

	            return ref;
	          }(),
	          orientation: orientation,
	          enableOutsideDays: enableOutsideDays,
	          modifiers: modifiers,
	          numberOfMonths: numberOfMonths,
	          onDayClick: this.onDayClick,
	          onDayMouseEnter: this.onDayMouseEnter,
	          onDayMouseLeave: this.onDayMouseLeave,
	          onPrevMonthClick: onPrevMonthClick,
	          onNextMonthClick: onNextMonthClick,
	          monthFormat: monthFormat,
	          withPortal: withPortal,
	          hidden: !focusedInput,
	          initialVisibleMonth: initialVisibleMonth,
	          onOutsideClick: onOutsideClick,
	          navPrev: navPrev,
	          navNext: navNext,
	          renderDay: renderDay
	        });
	      }

	      return render;
	    }()
	  }]);

	  return DayPickerRangeController;
	}(_react2['default'].Component);

	exports['default'] = DayPickerRangeController;

	DayPickerRangeController.propTypes = propTypes;
	DayPickerRangeController.defaultProps = defaultProps;

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
/* 8 */
/***/ function(module, exports) {

	module.exports = require("../shapes/ScrollableOrientationShape");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("../../constants");

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	module.exports = require("../utils/isTouchDevice");

/***/ },
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
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports) {

	module.exports = require("../utils/isNextDay");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("../utils/isSameDay");

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("../shapes/FocusedInputShape");

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("./DayPicker");

/***/ }
/******/ ]);