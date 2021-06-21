"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isPreviousDay;

var _DateObj = _interopRequireDefault(require("./DateObj"));

var _isSameDay = _interopRequireDefault(require("./isSameDay"));

function isPreviousDay(a, b) {
  if (!_DateObj["default"].isDate(a) || !_DateObj["default"].isDate(b)) return false;
  var dayBefore = new _DateObj["default"](a).subtract(1, 'day');
  return (0, _isSameDay["default"])(dayBefore, b);
}