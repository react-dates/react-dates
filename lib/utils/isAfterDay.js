"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isAfterDay;

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));

function isAfterDay(a, b) {
  if (!(0, _isDate["default"])(a) || !(0, _isDate["default"])(b)) return false;
  return (0, _isAfter["default"])(a, b);
}