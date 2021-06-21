"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isPrevMonth;

var _DateObj = _interopRequireDefault(require("./DateObj"));

var _isSameMonth = _interopRequireDefault(require("./isSameMonth"));

function isPrevMonth(a, b) {
  if (!(0, _DateObj["default"])().isMoment(a) || !(0, _DateObj["default"])().isMoment(b)) return false;
  return (0, _isSameMonth["default"])(a.clone().subtract(1, 'month'), b);
}