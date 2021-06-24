"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNextDay;

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

function isNextDay(a, b) {
  if (!(0, _isDate["default"])(a) || !(0, _isDate["default"])(b)) return false;
  return (0, _isSameDay["default"])((0, _addDays["default"])(a, 1), b);
}