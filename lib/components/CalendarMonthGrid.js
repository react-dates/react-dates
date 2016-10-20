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

	var _reactMomentProptypes = __webpack_require__(3);

	var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _CalendarMonth = __webpack_require__(11);

	var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

	var _isTransitionEndSupported = __webpack_require__(12);

	var _isTransitionEndSupported2 = _interopRequireDefault(_isTransitionEndSupported);

	var _getTransformStyles = __webpack_require__(13);

	var _getTransformStyles2 = _interopRequireDefault(_getTransformStyles);

	var _OrientationShape = __webpack_require__(8);

	var _OrientationShape2 = _interopRequireDefault(_OrientationShape);

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
	  enableOutsideDays: _react.PropTypes.bool,
	  firstVisibleMonthIndex: _react.PropTypes.number,
	  initialMonth: _reactMomentProptypes2['default'].momentObj,
	  isAnimating: _react.PropTypes.bool,
	  numberOfMonths: _react.PropTypes.number,
	  modifiers: _react.PropTypes.object,
	  orientation: _OrientationShape2['default'],
	  onDayClick: _react.PropTypes.func,
	  onDayMouseDown: _react.PropTypes.func,
	  onDayMouseUp: _react.PropTypes.func,
	  onDayMouseEnter: _react.PropTypes.func,
	  onDayMouseLeave: _react.PropTypes.func,
	  onDayTouchStart: _react.PropTypes.func,
	  onDayTouchEnd: _react.PropTypes.func,
	  onDayTouchTap: _react.PropTypes.func,
	  onMonthTransitionEnd: _react.PropTypes.func,
	  transformValue: _react.PropTypes.string,

	  // i18n
	  monthFormat: _react.PropTypes.string
	};

	var defaultProps = {
	  enableOutsideDays: false,
	  firstVisibleMonthIndex: 0,
	  initialMonth: (0, _moment2['default'])().locale('en'),
	  isAnimating: false,
	  numberOfMonths: 1,
	  modifiers: {},
	  orientation: _constants.HORIZONTAL_ORIENTATION,
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
	  onDayTouchEnd: function () {
	    function onDayTouchEnd() {}

	    return onDayTouchEnd;
	  }(),
	  onDayTouchTap: function () {
	    function onDayTouchTap() {}

	    return onDayTouchTap;
	  }(),
	  onMonthTransitionEnd: function () {
	    function onMonthTransitionEnd() {}

	    return onMonthTransitionEnd;
	  }(),

	  transform: 'none',

	  // i18n
	  monthFormat: 'MMMM YYYY' };

	var CalendarMonthGrid = function (_React$Component) {
	  _inherits(CalendarMonthGrid, _React$Component);

	  function CalendarMonthGrid(props) {
	    _classCallCheck(this, CalendarMonthGrid);

	    var _this = _possibleConstructorReturn(this, (CalendarMonthGrid.__proto__ || Object.getPrototypeOf(CalendarMonthGrid)).call(this, props));

	    _this.isTransitionEndSupported = (0, _isTransitionEndSupported2['default'])();
	    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
	    return _this;
	  }

	  _createClass(CalendarMonthGrid, [{
	    key: 'componentDidMount',
	    value: function () {
	      function componentDidMount() {
	        this.container = _reactDom2['default'].findDOMNode(this.containerRef);
	        this.container.addEventListener('transitionend', this.onTransitionEnd);
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
	      function componentDidUpdate() {
	        var _props = this.props;
	        var isAnimating = _props.isAnimating;
	        var onMonthTransitionEnd = _props.onMonthTransitionEnd;

	        // For IE9, immediately call onMonthTransitionEnd instead of
	        // waiting for the animation to complete

	        if (!this.isTransitionEndSupported && isAnimating) {
	          onMonthTransitionEnd();
	        }
	      }

	      return componentDidUpdate;
	    }()
	  }, {
	    key: 'componentWillUnmount',
	    value: function () {
	      function componentWillUnmount() {
	        this.container.removeEventListener('transitionend', this.onTransitionEnd);
	      }

	      return componentWillUnmount;
	    }()
	  }, {
	    key: 'onTransitionEnd',
	    value: function () {
	      function onTransitionEnd() {
	        this.props.onMonthTransitionEnd();
	      }

	      return onTransitionEnd;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var _this2 = this;

	        var _props2 = this.props;
	        var enableOutsideDays = _props2.enableOutsideDays;
	        var firstVisibleMonthIndex = _props2.firstVisibleMonthIndex;
	        var initialMonth = _props2.initialMonth;
	        var isAnimating = _props2.isAnimating;
	        var modifiers = _props2.modifiers;
	        var numberOfMonths = _props2.numberOfMonths;
	        var monthFormat = _props2.monthFormat;
	        var orientation = _props2.orientation;
	        var transformValue = _props2.transformValue;
	        var onDayMouseEnter = _props2.onDayMouseEnter;
	        var onDayMouseLeave = _props2.onDayMouseLeave;
	        var onDayMouseDown = _props2.onDayMouseDown;
	        var onDayMouseUp = _props2.onDayMouseUp;
	        var onDayClick = _props2.onDayClick;
	        var onDayTouchStart = _props2.onDayTouchStart;
	        var onDayTouchEnd = _props2.onDayTouchEnd;
	        var onDayTouchTap = _props2.onDayTouchTap;
	        var onMonthTransitionEnd = _props2.onMonthTransitionEnd;

	        var month = initialMonth.clone().subtract(1, 'month');

	        var months = [];
	        for (var i = 0; i < numberOfMonths + 2; i++) {
	          var isVisible = i >= firstVisibleMonthIndex && i < firstVisibleMonthIndex + numberOfMonths;

	          months.push(_react2['default'].createElement(_CalendarMonth2['default'], {
	            key: month.format('MM-YY'),
	            month: month,
	            isVisible: isVisible,
	            enableOutsideDays: enableOutsideDays,
	            modifiers: modifiers,
	            monthFormat: monthFormat,
	            orientation: orientation,
	            onDayMouseEnter: onDayMouseEnter,
	            onDayMouseLeave: onDayMouseLeave,
	            onDayMouseDown: onDayMouseDown,
	            onDayMouseUp: onDayMouseUp,
	            onDayClick: onDayClick,
	            onDayTouchStart: onDayTouchStart,
	            onDayTouchEnd: onDayTouchEnd,
	            onDayTouchTap: onDayTouchTap
	          }));
	          month = month.clone().add(1, 'month');
	        }

	        var className = (0, _classnames2['default'])('CalendarMonthGrid', {
	          'CalendarMonthGrid--horizontal': orientation === _constants.HORIZONTAL_ORIENTATION,
	          'CalendarMonthGrid--vertical': orientation === _constants.VERTICAL_ORIENTATION,
	          'CalendarMonthGrid--animating': isAnimating
	        });

	        return _react2['default'].createElement('div', {
	          ref: function () {
	            function ref(_ref) {
	              _this2.containerRef = _ref;
	            }

	            return ref;
	          }(),
	          className: className,
	          style: (0, _getTransformStyles2['default'])(transformValue),
	          onTransitionEnd: onMonthTransitionEnd
	        }, months);
	      }

	      return render;
	    }()
	  }]);

	  return CalendarMonthGrid;
	}(_react2['default'].Component);

	exports['default'] = CalendarMonthGrid;

	CalendarMonthGrid.propTypes = propTypes;
	CalendarMonthGrid.defaultProps = defaultProps;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-addons-shallow-compare");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-moment-proptypes");

/***/ },
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
/* 11 */
/***/ function(module, exports) {

	module.exports = require("./CalendarMonth");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("../utils/isTransitionEndSupported");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("../utils/getTransformStyles");

/***/ }
/******/ ]);