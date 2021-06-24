"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toLocalizedDateString;

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _isValid = _interopRequireDefault(require("date-fns/isValid"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _parse = _interopRequireDefault(require("date-fns/parse"));

var _parseISO = _interopRequireDefault(require("date-fns/parseISO"));

var _getLocale = _interopRequireDefault(require("./getLocale"));

var _constants = require("../constants");

function toLocalizedDateString(date, currentFormat, locale) {
  var newDate;

  if (!(0, _isDate["default"])(date)) {
    if (typeof date === 'string') {
      if (currentFormat) {
        newDate = (0, _parse["default"])(date, currentFormat, new Date());

        if ((0, _isValid["default"])(newDate)) {
          return (0, _format["default"])(newDate, _constants.DISPLAY_FORMAT, {
            locale: (0, _getLocale["default"])(locale)
          });
        }
      } else {
        newDate = (0, _parseISO["default"])(date);

        if ((0, _isValid["default"])(newDate)) {
          return (0, _format["default"])(newDate, _constants.DISPLAY_FORMAT, {
            locale: (0, _getLocale["default"])(locale)
          });
        }

        newDate = Date.parse(date);

        if ((0, _isValid["default"])(newDate)) {
          return (0, _format["default"])(newDate, _constants.DISPLAY_FORMAT, {
            locale: (0, _getLocale["default"])(locale)
          });
        }
      }
    }
  }

  if ((0, _isValid["default"])(date)) {
    // if (currentFormat) {
    //   return format(date, DISPLAY_FORMAT, { locale: getLocale(locale) });
    // }
    return (0, _format["default"])(date, _constants.DISPLAY_FORMAT, {
      locale: (0, _getLocale["default"])(locale)
    });
  }

  return null;
}