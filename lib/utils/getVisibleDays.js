"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getVisibleDays;

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));

var _subMonths = _interopRequireDefault(require("date-fns/subMonths"));

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));

var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));

var _isDate = _interopRequireDefault(require("date-fns/isDate"));

var _toISOMonthString = _interopRequireDefault(require("./toISOMonthString"));

var _getLocale = _interopRequireDefault(require("./getLocale"));

function getVisibleDays(month, numberOfMonths, enableOutsideDays, withoutTransitionMonths, locale) {
  if (!(0, _isDate["default"])(month)) return {};
  var visibleDaysByMonth = {};
  var currentMonth = withoutTransitionMonths ? new Date(month) : (0, _subMonths["default"])(month, 1);

  for (var i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    var visibleDays = []; // set utc offset to get correct dates in future (when timezone changes)

    var firstOfMonth = (0, _startOfMonth["default"])(currentMonth);
    var lastOfMonth = (0, _endOfMonth["default"])(currentMonth);
    var currentDay = new Date(firstOfMonth); // days belonging to the previous month

    var localeData = (0, _getLocale["default"])(locale);

    if (enableOutsideDays) {
      for (var j = 0; j < localeData.options.weekStartsOn; j += 1) {
        var prevDay = (0, _subDays["default"])(currentDay, j + 1);
        visibleDays.unshift(prevDay);
      }
    }

    while ((0, _isBefore["default"])(currentDay, lastOfMonth)) {
      visibleDays.push(currentDay);
      currentDay = (0, _addDays["default"])(currentDay, 1);
    }

    if (enableOutsideDays) {
      // weekday() returns the index of the day of the week according to the locale
      // this means if the week starts on Monday, weekday() will return 0 for a Monday date, not 1
      if (localeData.options.weekStartsOn !== 0) {
        // days belonging to the next month
        for (var k = localeData.options.weekStartsOn, count = 0; k < 7; k += 1, count += 1) {
          var nextDay = (0, _addDays["default"])(currentDay, count);
          visibleDays.push(nextDay);
        }
      }
    }

    visibleDaysByMonth[(0, _toISOMonthString["default"])(currentMonth)] = visibleDays;
    currentMonth = (0, _addMonths["default"])(currentMonth, 1);
  }

  return visibleDaysByMonth;
}