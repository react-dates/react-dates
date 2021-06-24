"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toISOMonthString;

var _isValid = _interopRequireDefault(require("date-fns/isValid"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _parse = _interopRequireDefault(require("date-fns/parse"));

var _parseISO = _interopRequireDefault(require("date-fns/parseISO"));

var _constants = require("../constants");

function toISOMonthString(date, currentFormat) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if ((0, _isValid["default"])(date)) {
      return (0, _format["default"])(date, _constants.ISO_MONTH_FORMAT);
    }
  }

  if (typeof date === 'string') {
    if (currentFormat) {
      var newDate = (0, _parse["default"])(date, currentFormat, new Date());

      if ((0, _isValid["default"])(newDate)) {
        return (0, _format["default"])(newDate, _constants.ISO_MONTH_FORMAT);
      }
    } else {
      var _newDate;

      _newDate = (0, _parseISO["default"])(date);

      if ((0, _isValid["default"])(_newDate)) {
        return (0, _format["default"])(_newDate, _constants.ISO_MONTH_FORMAT);
      }

      _newDate = Date.parse(date);

      if ((0, _isValid["default"])(_newDate)) {
        return (0, _format["default"])(_newDate, _constants.ISO_MONTH_FORMAT);
      }
    }
  }

  return null;
}