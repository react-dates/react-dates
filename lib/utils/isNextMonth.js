"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isNextMonth;

var _DateObj = _interopRequireDefault(require("./DateObj"));

var _isSameMonth = _interopRequireDefault(require("./isSameMonth"));

function isNextMonth(a, b) {
  if (!(0, _DateObj["default"])().isDate(a) || !(0, _DateObj["default"])().isDate(b)) return false;
  return (0, _isSameMonth["default"])(a.clone().add(1, 'month'), b);
}