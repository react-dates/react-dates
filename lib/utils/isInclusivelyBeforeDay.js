"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isInclusivelyBeforeDay;

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _isBeforeDay = _interopRequireDefault(require("./isBeforeDay"));

function isInclusivelyBeforeDay(a, b) {
  if (!(0, _isDate["default"])(a) || !(0, _isDate["default"])(b)) return false;
  return (0, _isBeforeDay["default"])((0, _subDays["default"])(a, 1), b);
}