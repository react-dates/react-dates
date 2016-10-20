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

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _isTouchDevice = __webpack_require__(14);

	var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

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
	  id: _react.PropTypes.string.isRequired,
	  placeholder: _react.PropTypes.string, // also used as label
	  dateValue: _react.PropTypes.string,
	  focused: _react.PropTypes.bool,
	  disabled: _react.PropTypes.bool,
	  showCaret: _react.PropTypes.bool,

	  onChange: _react.PropTypes.func,
	  onFocus: _react.PropTypes.func,
	  onKeyDownShiftTab: _react.PropTypes.func,
	  onKeyDownTab: _react.PropTypes.func
	};

	var defaultProps = {
	  placeholder: 'Select Date',
	  dateValue: '',
	  focused: false,
	  disabled: false,
	  showCaret: false,

	  onChange: function () {
	    function onChange() {}

	    return onChange;
	  }(),
	  onFocus: function () {
	    function onFocus() {}

	    return onFocus;
	  }(),
	  onKeyDownShiftTab: function () {
	    function onKeyDownShiftTab() {}

	    return onKeyDownShiftTab;
	  }(),
	  onKeyDownTab: function () {
	    function onKeyDownTab() {}

	    return onKeyDownTab;
	  }()
	};

	var DateInput = function (_React$Component) {
	  _inherits(DateInput, _React$Component);

	  function DateInput(props) {
	    _classCallCheck(this, DateInput);

	    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

	    _this.state = {
	      dateString: ''
	    };

	    _this.onChange = _this.onChange.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);

	    _this.isTouchDevice = (0, _isTouchDevice2['default'])();
	    return _this;
	  }

	  _createClass(DateInput, [{
	    key: 'componentWillReceiveProps',
	    value: function () {
	      function componentWillReceiveProps(nextProps) {
	        if (!this.props.dateValue && nextProps.dateValue) {
	          this.setState({
	            dateString: ''
	          });
	        }
	      }

	      return componentWillReceiveProps;
	    }()
	  }, {
	    key: 'componentDidUpdate',
	    value: function () {
	      function componentDidUpdate(prevProps) {
	        var focused = this.props.focused;

	        if (prevProps.focused !== focused && focused) {
	          var startDateInput = _reactDom2['default'].findDOMNode(this.inputRef);
	          startDateInput.focus();
	          startDateInput.select();
	        }
	      }

	      return componentDidUpdate;
	    }()
	  }, {
	    key: 'onChange',
	    value: function () {
	      function onChange(e) {
	        var dateString = e.target.value;

	        this.setState({ dateString: dateString });
	        this.props.onChange(dateString);
	      }

	      return onChange;
	    }()
	  }, {
	    key: 'onKeyDown',
	    value: function () {
	      function onKeyDown(e) {
	        var _props = this.props;
	        var onKeyDownShiftTab = _props.onKeyDownShiftTab;
	        var onKeyDownTab = _props.onKeyDownTab;

	        if (e.key === 'Tab') {
	          if (e.shiftKey) {
	            onKeyDownShiftTab(e);
	          } else {
	            onKeyDownTab(e);
	          }
	        }
	      }

	      return onKeyDown;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var _this2 = this;

	        var dateString = this.state.dateString;
	        var _props2 = this.props;
	        var id = _props2.id;
	        var placeholder = _props2.placeholder;
	        var dateValue = _props2.dateValue;
	        var focused = _props2.focused;
	        var showCaret = _props2.showCaret;
	        var onFocus = _props2.onFocus;
	        var disabled = _props2.disabled;

	        var value = dateValue || dateString;

	        return _react2['default'].createElement('div', {
	          className: (0, _classnames2['default'])('DateInput', {
	            'DateInput--with-caret': showCaret && focused,
	            'DateInput--disabled': disabled
	          }),
	          onClick: onFocus
	        }, _react2['default'].createElement('label', { className: 'DateInput__label', htmlFor: id }, placeholder), _react2['default'].createElement('input', {
	          className: 'DateInput__input',
	          type: 'text',
	          id: id,
	          name: id,
	          ref: function () {
	            function ref(_ref) {
	              _this2.inputRef = _ref;
	            }

	            return ref;
	          }(),
	          value: value,
	          onChange: this.onChange,
	          onKeyDown: this.onKeyDown,
	          onFocus: onFocus,
	          placeholder: placeholder,
	          autoComplete: 'off',
	          maxLength: 10,
	          disabled: disabled || this.isTouchDevice
	        }), _react2['default'].createElement('div', {
	          className: (0, _classnames2['default'])('DateInput__display-text', {
	            'DateInput__display-text--has-input': !!value,
	            'DateInput__display-text--focused': focused,
	            'DateInput__display-text--disabled': disabled
	          })
	        }, value || placeholder));
	      }

	      return render;
	    }()
	  }]);

	  return DateInput;
	}(_react2['default'].Component);

	exports['default'] = DateInput;

	DateInput.propTypes = propTypes;
	DateInput.defaultProps = defaultProps;

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
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	module.exports = require("../utils/isTouchDevice");

/***/ }
/******/ ]);