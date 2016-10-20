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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getModifiersForDay = getModifiersForDay;
	exports['default'] = CalendarMonth;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactMomentProptypes = __webpack_require__(3);

	var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _CalendarDay = __webpack_require__(6);

	var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

	var _getCalendarMonthWeeks = __webpack_require__(7);

	var _getCalendarMonthWeeks2 = _interopRequireDefault(_getCalendarMonthWeeks);

	var _OrientationShape = __webpack_require__(8);

	var _OrientationShape2 = _interopRequireDefault(_OrientationShape);

	var _constants = __webpack_require__(9);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var propTypes = {
	  month: _reactMomentProptypes2['default'].momentObj,
	  isVisible: _react.PropTypes.bool,
	  enableOutsideDays: _react.PropTypes.bool,
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

	  // i18n
	  monthFormat: _react.PropTypes.string
	};

	var defaultProps = {
	  month: (0, _moment2['default'])().locale('en'),
	  isVisible: true,
	  enableOutsideDays: false,
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

	  // i18n
	  monthFormat: 'MMMM YYYY' };

	function getModifiersForDay(modifiers, day) {
	  return day ? Object.keys(modifiers).filter(function (key) {
	    return modifiers[key](day);
	  }) : [];
	}

	function CalendarMonth(props) {
	  var month = props.month;
	  var monthFormat = props.monthFormat;
	  var orientation = props.orientation;
	  var isVisible = props.isVisible;
	  var modifiers = props.modifiers;
	  var enableOutsideDays = props.enableOutsideDays;
	  var onDayClick = props.onDayClick;
	  var onDayMouseDown = props.onDayMouseDown;
	  var onDayMouseUp = props.onDayMouseUp;
	  var onDayMouseEnter = props.onDayMouseEnter;
	  var onDayMouseLeave = props.onDayMouseLeave;
	  var onDayTouchStart = props.onDayTouchStart;
	  var onDayTouchEnd = props.onDayTouchEnd;
	  var onDayTouchTap = props.onDayTouchTap;

	  var monthTitle = month.format(monthFormat);

	  var calendarMonthClasses = (0, _classnames2['default'])('CalendarMonth', {
	    'CalendarMonth--horizontal': orientation === _constants.HORIZONTAL_ORIENTATION,
	    'CalendarMonth--vertical': orientation === _constants.VERTICAL_ORIENTATION
	  });

	  return _react2['default'].createElement('div', { className: calendarMonthClasses, 'data-visible': isVisible }, _react2['default'].createElement('table', null, _react2['default'].createElement('caption', { className: 'CalendarMonth__caption js-CalendarMonth__caption' }, _react2['default'].createElement('strong', null, monthTitle)), _react2['default'].createElement('tbody', { className: 'js-CalendarMonth__grid' }, (0, _getCalendarMonthWeeks2['default'])(month, enableOutsideDays).map(function (week, i) {
	    return _react2['default'].createElement('tr', { key: i }, week.map(function (day, j) {
	      var modifiersForDay = getModifiersForDay(modifiers, day);
	      var className = (0, _classnames2['default'])('CalendarMonth__day', {
	        'CalendarMonth__day--outside': !day || day.month() !== month.month()
	      }, modifiersForDay.map(function (mod) {
	        return 'CalendarMonth__day--' + String(mod);
	      }));

	      return _react2['default'].createElement('td', { className: className, key: j }, day && _react2['default'].createElement(_CalendarDay2['default'], {
	        day: day,
	        modifiers: modifiersForDay,
	        onDayMouseEnter: onDayMouseEnter,
	        onDayMouseLeave: onDayMouseLeave,
	        onDayMouseDown: onDayMouseDown,
	        onDayMouseUp: onDayMouseUp,
	        onDayClick: onDayClick,
	        onDayTouchStart: onDayTouchStart,
	        onDayTouchEnd: onDayTouchEnd,
	        onDayTouchTap: onDayTouchTap
	      }));
	    }));
	  }))), _react2['default'].createElement('hr', { className: 'DayPicker__month-divider-bottom' }));
	}

	CalendarMonth.propTypes = propTypes;
	CalendarMonth.defaultProps = defaultProps;

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
/* 5 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("./CalendarDay");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("../utils/getCalendarMonthWeeks");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("../shapes/OrientationShape");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("../../constants");

/***/ }
/******/ ]);