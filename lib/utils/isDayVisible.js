"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isDayVisible;

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));

var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));

var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));

var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _isBeforeDay = _interopRequireDefault(require("./isBeforeDay"));

var _isAfterDay = _interopRequireDefault(require("./isAfterDay"));

function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  if (!(0, _isDate["default"])(day)) return false;
  var firstDayOfFirstMonth = (0, _startOfMonth["default"])(month);
  if (enableOutsideDays) firstDayOfFirstMonth = (0, _startOfWeek["default"])(firstDayOfFirstMonth);
  if ((0, _isBeforeDay["default"])(day, firstDayOfFirstMonth)) return false;
  var lastDayOfLastMonth = (0, _endOfMonth["default"])((0, _addMonths["default"])(month, numberOfMonths - 1));
  if (enableOutsideDays) lastDayOfLastMonth = (0, _endOfWeek["default"])(lastDayOfLastMonth);
  return !(0, _isAfterDay["default"])(day, lastDayOfLastMonth);
}