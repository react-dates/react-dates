"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getNumberOfCalendarMonthWeeks;

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _getDaysInMonth = _interopRequireDefault(require("date-fns/getDaysInMonth"));

var _getDay = _interopRequireDefault(require("date-fns/getDay"));

var _getLocale = _interopRequireDefault(require("./getLocale"));

function getBlankDaysBeforeFirstDay(firstDayOfMonth, firstDayOfWeek) {
  var weekDayDiff = (0, _getDay["default"])(firstDayOfMonth) - firstDayOfWeek;
  return (weekDayDiff + 7) % 7;
}

function getNumberOfCalendarMonthWeeks(month, firstDayOfWeek, locale) {
  var newFirstDayOfWeek;

  if (firstDayOfWeek === null) {
    var localeData = (0, _getLocale["default"])(locale);
    newFirstDayOfWeek = localeData.options.weekStartsOn;
  } else {
    newFirstDayOfWeek = firstDayOfWeek;
  }

  var firstDayOfMonth = (0, _startOfMonth["default"])(month);
  var numBlankDays = getBlankDaysBeforeFirstDay(firstDayOfMonth, newFirstDayOfWeek);
  return Math.ceil((numBlankDays + (0, _getDaysInMonth["default"])(month)) / 7);
}