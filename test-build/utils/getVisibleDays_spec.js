"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isSameDay = _interopRequireDefault(require("../../lib/utils/isSameDay"));

var _getVisibleDays = _interopRequireDefault(require("../../lib/utils/getVisibleDays"));

var today = (0, _moment["default"])();
describe('getVisibleDays', function () {
  it('has numberOfMonths entries', function () {
    var numberOfMonths = 3;
    var visibleDays = (0, _getVisibleDays["default"])(today, numberOfMonths, false);
    (0, _chai.expect)(Object.keys(visibleDays).length).to.equal(numberOfMonths + 2);
  });
  it('values are all arrays of moment objects', function () {
    var visibleDays = (0, _getVisibleDays["default"])(today, 3, false);
    Object.values(visibleDays).forEach(function (days) {
      (0, _chai.expect)(Array.isArray(days)).to.equal(true);
      days.forEach(function (day) {
        (0, _chai.expect)(_moment["default"].isMoment(day)).to.equal(true);
      });
    });
  });
  it('contains first arg day', function () {
    var visibleDays = (0, _getVisibleDays["default"])(today, 3, false);
    var containsToday = Object.values(visibleDays).filter(function (days) {
      return days.filter(function (day) {
        return (0, _isSameDay["default"])(day, today);
      }).length > 0;
    });
    (0, _chai.expect)(containsToday.length > 0).to.equal(true);
  });
});