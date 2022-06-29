"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isNextMonth = _interopRequireDefault(require("../../lib/utils/isNextMonth"));

var today = (0, _moment["default"])();
var nextMonth = (0, _moment["default"])().add(1, 'months');
var twoMonths = (0, _moment["default"])().add(2, 'months');
describe('isNextMonth', function () {
  it('returns true if second argument is the next month after the first', function () {
    (0, _chai.expect)((0, _isNextMonth["default"])(today, nextMonth)).to.equal(true);
  });
  it('returns false if second argument is not the next month after the first', function () {
    (0, _chai.expect)((0, _isNextMonth["default"])(nextMonth, today)).to.equal(false);
  });
  it('returns false if second argument is more than one month after the first', function () {
    (0, _chai.expect)((0, _isNextMonth["default"])(today, twoMonths)).to.equal(false);
  });
  describe('non-moment arguments', function () {
    it('is false if first argument is not a moment object', function () {
      (0, _chai.expect)((0, _isNextMonth["default"])(null, today)).to.equal(false);
    });
    it('is false if second argument is not a moment object', function () {
      (0, _chai.expect)((0, _isNextMonth["default"])(today, 'foo')).to.equal(false);
    });
  });
});