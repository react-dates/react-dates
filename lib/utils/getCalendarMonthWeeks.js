"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCalendarMonthWeeks;

var _isValid = _interopRequireDefault(require("date-fns/isValid"));

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));

var _getDay = _interopRequireDefault(require("date-fns/getDay"));

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _differenceInCalendarDays = _interopRequireDefault(require("date-fns/differenceInCalendarDays"));

var _addHours = _interopRequireDefault(require("date-fns/addHours"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

var _getLocale = _interopRequireDefault(require("./getLocale"));

var _constants = require("../constants");

function getCalendarMonthWeeks(month, enableOutsideDays, firstDayOfWeekParam, locale) {
  var localeData = (0, _getLocale["default"])(locale);

  if (!(0, _isDate["default"])(month) || !(0, _isValid["default"])(month)) {
    throw new TypeError('`month` must be a valid Date object');
  }

  var firstDayOfWeek = firstDayOfWeekParam != null ? firstDayOfWeekParam : localeData.options.weekStartsOn;

  if (_constants.WEEKDAYS.indexOf(firstDayOfWeek) === -1) {
    throw new TypeError('`firstDayOfWeek` must be an integer between 0 and 6');
  } // set utc offset to get correct dates in future (when timezone changes)


  var firstOfMonth = (0, _startOfMonth["default"])(month);
  var lastOfMonth = (0, _endOfMonth["default"])(month); // calculate the exact first and last days to fill the entire matrix
  // (considering days outside month)

  var prevDays = ((0, _getDay["default"])(firstOfMonth) + 7 - firstDayOfWeek) % 7;
  var nextDays = (firstDayOfWeek + 6 - (0, _getDay["default"])(lastOfMonth)) % 7;
  var firstDay = (0, _subDays["default"])(firstOfMonth, prevDays);
  var lastDay = (0, _addDays["default"])(lastOfMonth, nextDays);
  var totalDays = (0, _differenceInCalendarDays["default"])(lastDay, firstDay) + 1;
  var weeksInMonth = [];

  for (var i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeksInMonth.push([]);
    }

    var day = null;

    if (i >= prevDays && i < totalDays - nextDays || enableOutsideDays) {
      day = (0, _addHours["default"])((0, _startOfDay["default"])((0, _addDays["default"])(firstDay, i)), 12);
    }

    weeksInMonth[weeksInMonth.length - 1].push(day);
  }

  return weeksInMonth;
}