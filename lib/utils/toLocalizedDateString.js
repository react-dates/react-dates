"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toLocalizedDateString;

var _DateObj = _interopRequireDefault(require("./DateObj"));

var _constants = require("../../constants");

function toLocalizedDateString(date, currentFormat) {
  var dateObj = _DateObj["default"].isDate(date) ? date : _DateObj["default"].toDateObject(date, currentFormat);

  if (!dateObj || !_DateObj["default"].isValid(dateObj)) {
    return null;
  }

  return dateObj.format(_constants.DISPLAY_FORMAT);
}