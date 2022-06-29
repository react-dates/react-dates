"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _getCalendarMonthWidth = _interopRequireDefault(require("../../lib/utils/getCalendarMonthWidth"));

describe('#getCalendarMonthWidth', function () {
  it('correctly calculates width for default day size of 39', function () {
    (0, _chai.expect)((0, _getCalendarMonthWidth["default"])(39, 13)).to.equal(300);
  });
  it('returns a number when padding is undefined', function () {
    (0, _chai.expect)(Number.isNaN((0, _getCalendarMonthWidth["default"])(39, undefined))).to.equal(false);
  });
  it('returns a number when padding is null', function () {
    (0, _chai.expect)(Number.isNaN((0, _getCalendarMonthWidth["default"])(39, null))).to.equal(false);
  });
});