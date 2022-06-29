"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _getNumberOfCalendarMonthWeeks = _interopRequireDefault(require("../../lib/utils/getNumberOfCalendarMonthWeeks"));

describe('getNumberOfCalendarMonthWeeks', function () {
  it('returns 4 weeks for a 4-week month', function () {
    var february2018 = (0, _moment["default"])('2018-02-01', 'YYYY-MM-DD');
    (0, _chai.expect)((0, _getNumberOfCalendarMonthWeeks["default"])(february2018, 4)).to.equal(4);
  });
  it('returns 5 weeks for a 5-week month', function () {
    var july2018 = (0, _moment["default"])('2018-07-01', 'YYYY-MM-DD');
    (0, _chai.expect)((0, _getNumberOfCalendarMonthWeeks["default"])(july2018, 0)).to.equal(5);
  });
  it('returns 6 weeks for a 6-week month', function () {
    var september2018 = (0, _moment["default"])('2018-09-01', 'YYYY-MM-DD');
    (0, _chai.expect)((0, _getNumberOfCalendarMonthWeeks["default"])(september2018, 0)).to.equal(6);
  });
  it('changing the first day of week changes the number of weeks', function () {
    var september2018 = (0, _moment["default"])('2018-09-01', 'YYYY-MM-DD');
    (0, _chai.expect)((0, _getNumberOfCalendarMonthWeeks["default"])(september2018, 6)).to.equal(5);
  });
});