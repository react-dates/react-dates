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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = SingleDatePickerInput;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _DateInput = __webpack_require__(27);

	var _DateInput2 = _interopRequireDefault(_DateInput);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var propTypes = {
	  id: _react.PropTypes.string.isRequired,
	  placeholder: _react.PropTypes.string, // also used as label
	  dateValue: _react.PropTypes.string,
	  border: _react.PropTypes.bool,
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
	  border: false,
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

	function SingleDatePickerInput(props) {
	  var id = props.id;
	  var placeholder = props.placeholder;
	  var dateValue = props.dateValue;
	  var focused = props.focused;
	  var disabled = props.disabled;
	  var showCaret = props.showCaret;
	  var onChange = props.onChange;
	  var onFocus = props.onFocus;
	  var onKeyDownShiftTab = props.onKeyDownShiftTab;
	  var onKeyDownTab = props.onKeyDownTab;

	  return _react2['default'].createElement('div', { className: 'SingleDatePickerInput' }, _react2['default'].createElement(_DateInput2['default'], {
	    id: id,
	    placeholder: placeholder // also used as label
	    , dateValue: dateValue,
	    focused: focused,
	    disabled: disabled,
	    showCaret: showCaret,

	    onChange: onChange,
	    onFocus: onFocus,
	    onKeyDownShiftTab: onKeyDownShiftTab,
	    onKeyDownTab: onKeyDownTab
	  }));
	}

	SingleDatePickerInput.propTypes = propTypes;
	SingleDatePickerInput.defaultProps = defaultProps;

/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },

/***/ 27:
/***/ function(module, exports) {

	module.exports = require("./DateInput");

/***/ }

/******/ });