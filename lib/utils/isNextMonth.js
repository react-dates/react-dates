"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNextMonth;

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));

var _isSameMonthAndYear = _interopRequireDefault(require("./isSameMonthAndYear"));

function isNextMonth(a, b) {
  if (!(0, _isDate["default"])(a) || !(0, _isDate["default"])(b)) return false;
  return (0, _isSameMonthAndYear["default"])((0, _addMonths["default"])(a, 1), b);
}