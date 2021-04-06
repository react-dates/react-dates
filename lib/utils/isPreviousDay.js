"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isPreviousDay;

var _moment = _interopRequireDefault(require("moment"));

var _isSameDay = _interopRequireDefault(require("./isSameDay"));

function isPreviousDay(a, b) {
  if (!_moment["default"].isMoment(a) || !_moment["default"].isMoment(b)) return false;
  var dayBefore = (0, _moment["default"])(a).subtract(1, 'day');
  return (0, _isSameDay["default"])(dayBefore, b);
}