"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isInclusivelyAfterDay;

var _isBeforeDay = _interopRequireDefault(require("./isBeforeDay"));

var _DateObj = _interopRequireDefault(require("./DateObj"));

function isInclusivelyAfterDay(a, b) {
  if (!_DateObj["default"].isDate(a) || !_DateObj["default"].isDate(b)) return false;
  return !(0, _isBeforeDay["default"])(a, b);
}