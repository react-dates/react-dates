"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isPrevMonth = _interopRequireDefault(require("../../lib/utils/isPrevMonth"));

var today = (0, _moment["default"])();
var lastMonth = (0, _moment["default"])().subtract(1, 'months');
var twoMonthsAgo = (0, _moment["default"])().subtract(2, 'months');
describe('isPrevMonth', function () {
  it('returns true if second argument is the month before the first', function () {
    (0, _chai.expect)((0, _isPrevMonth["default"])(today, lastMonth)).to.equal(true);
  });
  it('returns false if second argument is not the month before the first', function () {
    (0, _chai.expect)((0, _isPrevMonth["default"])(lastMonth, today)).to.equal(false);
  });
  it('returns false if second argument is more than one month before the first', function () {
    (0, _chai.expect)((0, _isPrevMonth["default"])(today, twoMonthsAgo)).to.equal(false);
  });
  describe('non-moment arguments', function () {
    it('is false if first argument is not a moment object', function () {
      (0, _chai.expect)((0, _isPrevMonth["default"])(null, today)).to.equal(false);
    });
    it('is false if second argument is not a moment object', function () {
      (0, _chai.expect)((0, _isPrevMonth["default"])(today, 'foo')).to.equal(false);
    });
  });
});