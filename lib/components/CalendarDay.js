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
	exports.TOUCHSTART_TIMEOUT = undefined;

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

	var _reactMomentProptypes = __webpack_require__(3);

	var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

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

	var TOUCHSTART_TIMEOUT = exports.TOUCHSTART_TIMEOUT = 200;

	var propTypes = {
	  day: _reactMomentProptypes2['default'].momentObj,
	  modifiers: _react.PropTypes.arrayOf(_react.PropTypes.string),
	  onDayClick: _react.PropTypes.func,
	  onDayMouseDown: _react.PropTypes.func,
	  onDayMouseUp: _react.PropTypes.func,
	  onDayMouseEnter: _react.PropTypes.func,
	  onDayMouseLeave: _react.PropTypes.func,
	  onDayTouchStart: _react.PropTypes.func,
	  onDayTouchEnd: _react.PropTypes.func,
	  onDayTouchTap: _react.PropTypes.func
	};

	var defaultProps = {
	  day: (0, _moment2['default'])(),
	  modifiers: [],
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
	  }()
	};

	var CalendarDay = function (_React$Component) {
	  _inherits(CalendarDay, _React$Component);

	  function CalendarDay(props) {
	    _classCallCheck(this, CalendarDay);

	    var _this = _possibleConstructorReturn(this, (CalendarDay.__proto__ || Object.getPrototypeOf(CalendarDay)).call(this, props));

	    _this.hasActiveTouchStart = false;
	    return _this;
	  }

	  _createClass(CalendarDay, [{
	    key: 'shouldComponentUpdate',
	    value: function () {
	      function shouldComponentUpdate(nextProps, nextState) {
	        return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
	      }

	      return shouldComponentUpdate;
	    }()
	  }, {
	    key: 'handleDayClick',
	    value: function () {
	      function handleDayClick(day, modifiers, e) {
	        this.props.onDayClick(day, modifiers, e);
	      }

	      return handleDayClick;
	    }()
	  }, {
	    key: 'handleDayMouseDown',
	    value: function () {
	      function handleDayMouseDown(day, modifiers, e) {
	        this.props.onDayMouseDown(day, modifiers, e);
	      }

	      return handleDayMouseDown;
	    }()
	  }, {
	    key: 'handleDayMouseUp',
	    value: function () {
	      function handleDayMouseUp(day, modifiers, e) {
	        this.props.onDayMouseUp(day, modifiers, e);
	      }

	      return handleDayMouseUp;
	    }()
	  }, {
	    key: 'handleDayMouseEnter',
	    value: function () {
	      function handleDayMouseEnter(day, modifiers, e) {
	        this.props.onDayMouseEnter(day, modifiers, e);
	      }

	      return handleDayMouseEnter;
	    }()
	  }, {
	    key: 'handleDayMouseLeave',
	    value: function () {
	      function handleDayMouseLeave(day, modifiers, e) {
	        this.props.onDayMouseLeave(day, modifiers, e);
	      }

	      return handleDayMouseLeave;
	    }()
	  }, {
	    key: 'handleDayTouchStart',
	    value: function () {
	      function handleDayTouchStart(day, modifiers, e) {
	        var _this2 = this;

	        this.hasActiveTouchStart = true;
	        setTimeout(function () {
	          _this2.hasActiveTouchStart = false;
	        }, TOUCHSTART_TIMEOUT);

	        this.props.onDayTouchStart(day, modifiers, e);
	      }

	      return handleDayTouchStart;
	    }()
	  }, {
	    key: 'handleDayTouchEnd',
	    value: function () {
	      function handleDayTouchEnd(day, modifiers, e) {
	        if (this.hasActiveTouchStart) {
	          this.hasActiveTouchStart = false;
	          this.handleDayTouchTap(day, modifiers, e);
	        }

	        this.props.onDayTouchEnd(day, modifiers, e);
	      }

	      return handleDayTouchEnd;
	    }()
	  }, {
	    key: 'handleDayTouchTap',
	    value: function () {
	      function handleDayTouchTap(day, modifiers, e) {
	        this.props.onDayTouchTap(day, modifiers, e);
	      }

	      return handleDayTouchTap;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var _this3 = this;

	        var _props = this.props;
	        var day = _props.day;
	        var modifiers = _props.modifiers;

	        var className = (0, _classnames2['default'])("CalendarDay__day", { CalendarDay__today: day.isSame((0, _moment2['default'])(), 'd') });

	        return _react2['default'].createElement('div', {
	          className: 'CalendarDay',
	          onMouseEnter: function () {
	            function onMouseEnter(e) {
	              return _this3.handleDayMouseEnter(day, modifiers, e);
	            }

	            return onMouseEnter;
	          }(),
	          onMouseLeave: function () {
	            function onMouseLeave(e) {
	              return _this3.handleDayMouseLeave(day, modifiers, e);
	            }

	            return onMouseLeave;
	          }(),
	          onMouseDown: function () {
	            function onMouseDown(e) {
	              return _this3.handleDayMouseDown(day, modifiers, e);
	            }

	            return onMouseDown;
	          }(),
	          onMouseUp: function () {
	            function onMouseUp(e) {
	              return _this3.handleDayMouseUp(day, modifiers, e);
	            }

	            return onMouseUp;
	          }(),
	          onClick: function () {
	            function onClick(e) {
	              return _this3.handleDayClick(day, modifiers, e);
	            }

	            return onClick;
	          }(),
	          onTouchStart: function () {
	            function onTouchStart(e) {
	              return _this3.handleDayTouchStart(day, modifiers, e);
	            }

	            return onTouchStart;
	          }(),
	          onTouchEnd: function () {
	            function onTouchEnd(e) {
	              return _this3.handleDayTouchEnd(day, modifiers, e);
	            }

	            return onTouchEnd;
	          }()
	        }, _react2['default'].createElement('span', { className: className }, day.format('D')));
	      }

	      return render;
	    }()
	  }]);

	  return CalendarDay;
	}(_react2['default'].Component);

	exports['default'] = CalendarDay;

	CalendarDay.propTypes = propTypes;
	CalendarDay.defaultProps = defaultProps;

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

/***/ }
/******/ ]);