"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isBeforeDay;

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));

function isBeforeDay(a, b) {
  if (!(0, _isDate["default"])(a) || !(0, _isDate["default"])(b)) return false;
  return (0, _isBefore["default"])(a, b);
}