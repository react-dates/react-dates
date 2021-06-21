"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toISOMonthString;

var _DateObj = _interopRequireDefault(require("./DateObj"));

var _constants = require("../../constants");

function toISOMonthString(date, currentFormat) {
  var dateObj = _DateObj["default"].isDate(date) ? date : _DateObj["default"].toDateObject(date, currentFormat);

  if (!dateObj || !_DateObj["default"].isValid(dateObj)) {
    return null;
  }

  return dateObj.format(_constants.ISO_MONTH_FORMAT);
} // TODO return format ?
//   // Template strings compiled in strict mode uses concat, which is slow. Since
//   // this code is in a hot path and we want it to be as fast as possible, we
//   // want to use old-fashioned +.
//   // eslint-disable-next-line prefer-template
//   return dateObj.year() + '-' + String(dateObj.month() + 1).padStart(2, '0');
// }