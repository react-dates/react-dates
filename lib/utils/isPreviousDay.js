"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isPreviousDay;

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

function isPreviousDay(a, b) {
  if (!(0, _isDate["default"])(a) || !(0, _isDate["default"])(b)) return false;
  var dayBefore = (0, _subDays["default"])(a, 1);
  return (0, _isSameDay["default"])(dayBefore, b);
}