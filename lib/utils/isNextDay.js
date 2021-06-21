"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNextDay;

var _DateObj = _interopRequireDefault(require("./DateObj"));

function isNextDay(a, b) {
  if (!_DateObj["default"].isDate(a) || !_DateObj["default"].isDate(b)) return false;
  var nextDay = a.add(1, 'day');
  return nextDay.isSameDay(b);
}