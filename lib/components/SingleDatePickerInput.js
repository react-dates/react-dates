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
/******/ ({

/***/ 0:
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

	var _airbnbPropTypes = __webpack_require__(42);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _DateInput = __webpack_require__(23);

	var _DateInput2 = _interopRequireDefault(_DateInput);

	var _close = __webpack_require__(21);

	var _close2 = _interopRequireDefault(_close);

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

	var propTypes = (0, _airbnbPropTypes.forbidExtraProps)({
	  id: _react.PropTypes.string.isRequired,
	  placeholder: _react.PropTypes.string, // also used as label
	  displayValue: _react.PropTypes.string,
	  inputValue: _react.PropTypes.string,
	  screenReaderMessage: _react.PropTypes.string,
	  focused: _react.PropTypes.bool,
	  disabled: _react.PropTypes.bool,
	  required: _react.PropTypes.bool,
	  showCaret: _react.PropTypes.bool,
	  showClearDate: _react.PropTypes.bool,

	  onChange: _react.PropTypes.func,
	  onClearDate: _react.PropTypes.func,
	  onFocus: _react.PropTypes.func,
	  onKeyDownShiftTab: _react.PropTypes.func,
	  onKeyDownTab: _react.PropTypes.func,

	  // i18n
	  phrases: _react.PropTypes.shape({
	    clearDate: _react.PropTypes.node
	  })
	});

	var defaultProps = {
	  placeholder: 'Select Date',
	  displayValue: '',
	  inputValue: '',
	  screenReaderMessage: '',
	  focused: false,
	  disabled: false,
	  required: false,
	  showCaret: false,
	  showClearDate: false,

	  onChange: function () {
	    function onChange() {}

	    return onChange;
	  }(),
	  onClearDate: function () {
	    function onClearDate() {}

	    return onClearDate;
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
	  }(),

	  // i18n
	  phrases: {
	    clearDate: 'Clear Date'
	  }
	};

	var SingleDatePickerInput = function (_React$Component) {
	  _inherits(SingleDatePickerInput, _React$Component);

	  function SingleDatePickerInput(props) {
	    _classCallCheck(this, SingleDatePickerInput);

	    var _this = _possibleConstructorReturn(this, (SingleDatePickerInput.__proto__ || Object.getPrototypeOf(SingleDatePickerInput)).call(this, props));

	    _this.state = {
	      isClearDateHovered: false
	    };

	    _this.onClearDateMouseEnter = _this.onClearDateMouseEnter.bind(_this);
	    _this.onClearDateMouseLeave = _this.onClearDateMouseLeave.bind(_this);
	    return _this;
	  }

	  _createClass(SingleDatePickerInput, [{
	    key: 'onClearDateMouseEnter',
	    value: function () {
	      function onClearDateMouseEnter() {
	        this.setState({
	          isClearDateHovered: true
	        });
	      }

	      return onClearDateMouseEnter;
	    }()
	  }, {
	    key: 'onClearDateMouseLeave',
	    value: function () {
	      function onClearDateMouseLeave() {
	        this.setState({
	          isClearDateHovered: false
	        });
	      }

	      return onClearDateMouseLeave;
	    }()
	  }, {
	    key: 'render',
	    value: function () {
	      function render() {
	        var isClearDateHovered = this.state.isClearDateHovered;
	        var _props = this.props;
	        var id = _props.id;
	        var placeholder = _props.placeholder;
	        var displayValue = _props.displayValue;
	        var inputValue = _props.inputValue;
	        var focused = _props.focused;
	        var disabled = _props.disabled;
	        var required = _props.required;
	        var showCaret = _props.showCaret;
	        var showClearDate = _props.showClearDate;
	        var phrases = _props.phrases;
	        var onClearDate = _props.onClearDate;
	        var onChange = _props.onChange;
	        var onFocus = _props.onFocus;
	        var onKeyDownShiftTab = _props.onKeyDownShiftTab;
	        var onKeyDownTab = _props.onKeyDownTab;
	        var screenReaderMessage = _props.screenReaderMessage;

	        return _react2['default'].createElement('div', { className: 'SingleDatePickerInput' }, _react2['default'].createElement(_DateInput2['default'], {
	          id: id,
	          placeholder: placeholder // also used as label
	          , displayValue: displayValue,
	          inputValue: inputValue,
	          screenReaderMessage: screenReaderMessage,
	          focused: focused,
	          disabled: disabled,
	          required: required,
	          showCaret: showCaret,

	          onChange: onChange,
	          onFocus: onFocus,
	          onKeyDownShiftTab: onKeyDownShiftTab,
	          onKeyDownTab: onKeyDownTab
	        }), showClearDate && _react2['default'].createElement('button', {
	          type: 'button',
	          className: (0, _classnames2['default'])('SingleDatePickerInput__clear-date', {
	            'SingleDatePickerInput__clear-date--hide': !displayValue,
	            'SingleDatePickerInput__clear-date--hover': isClearDateHovered
	          }),
	          onMouseEnter: this.onClearDateMouseEnter,
	          onMouseLeave: this.onClearDateMouseLeave,
	          onClick: onClearDate
	        }, _react2['default'].createElement('span', { className: 'screen-reader-only' }, phrases.clearDate), _react2['default'].createElement(_close2['default'], null)));
	      }

	      return render;
	    }()
	  }]);

	  return SingleDatePickerInput;
	}(_react2['default'].Component);

	exports['default'] = SingleDatePickerInput;

	SingleDatePickerInput.propTypes = propTypes;
	SingleDatePickerInput.defaultProps = defaultProps;

/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },

/***/ 5:
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },

/***/ 21:
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

/***/ 23:
/***/ function(module, exports) {

	module.exports = require("./DateInput");

/***/ },

/***/ 42:
/***/ function(module, exports) {

	module.exports = require("airbnb-prop-types");

/***/ }

/******/ });