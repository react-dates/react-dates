"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMonths;

var _getLocale = _interopRequireDefault(require("./getLocale"));

function getMonths(locale) {
  var localization = (0, _getLocale["default"])(locale);
  var monthsArray = [];

  for (var i = 0; i < 12; i += 1) {
    monthsArray.push(localization.localize.month(i));
  }

  return monthsArray;
}