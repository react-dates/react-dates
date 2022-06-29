"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isInclusivelyBeforeDay = _interopRequireDefault(require("../../lib/utils/isInclusivelyBeforeDay"));

var today = (0, _moment["default"])();
var tomorrow = (0, _moment["default"])().add(1, 'days');
describe('isInclusivelyBeforeDay', function () {
  it('returns true if first argument is before the second', function () {
    (0, _chai.expect)((0, _isInclusivelyBeforeDay["default"])(today, tomorrow)).to.equal(true);
  });
  it('returns true for same day arguments', function () {
    (0, _chai.expect)((0, _isInclusivelyBeforeDay["default"])(today, today)).to.equal(true);
  });
  it('returns false if first argument is after the second', function () {
    (0, _chai.expect)((0, _isInclusivelyBeforeDay["default"])(tomorrow, today)).to.equal(false);
  });
  describe('non-moment object arguments', function () {
    it('is false if first argument is not a moment object', function () {
      (0, _chai.expect)((0, _isInclusivelyBeforeDay["default"])(null, today)).to.equal(false);
    });
    it('is false if second argument is not a moment object', function () {
      (0, _chai.expect)((0, _isInclusivelyBeforeDay["default"])(today, 'foo')).to.equal(false);
    });
  });
});