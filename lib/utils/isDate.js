"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isDate;

var _DateObj = _interopRequireDefault(require("./DateObj"));

function isDate(date) {
  return date instanceof _DateObj["default"];
}