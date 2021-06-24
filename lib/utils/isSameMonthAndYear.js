"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isSameMonthAndYear;

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));

var _isSameYear = _interopRequireDefault(require("date-fns/isSameYear"));

function isSameMonthAndYear(a, b) {
  if (!(0, _isDate["default"])(a) || !(0, _isDate["default"])(b)) return false;
  return (0, _isSameMonth["default"])(a, b) && (0, _isSameYear["default"])(a, b);
}