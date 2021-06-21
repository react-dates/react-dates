"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isSameDay2;

var _DateObj = _interopRequireDefault(require("./DateObj"));

function isSameDay2(a, b) {
  if (!_DateObj["default"].isDate(a) || !_DateObj["default"].isDate(b)) return false;
  return a.isSameDay(b);
}