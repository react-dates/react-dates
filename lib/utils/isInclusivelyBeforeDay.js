"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isInclusivelyBeforeDay;

var _isAfterDay = _interopRequireDefault(require("./isAfterDay"));

var _DateObj = _interopRequireDefault(require("./DateObj"));

function isInclusivelyBeforeDay(a, b) {
  if (!_DateObj["default"].isDate(a) || !_DateObj["default"].isDate(b)) return false;
  return !(0, _isAfterDay["default"])(a, b);
}