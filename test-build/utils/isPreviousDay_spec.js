"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isPreviousDay = _interopRequireDefault(require("../../lib/utils/isPreviousDay"));

var today = (0, _moment["default"])();
var yesterday = (0, _moment["default"])().subtract(1, 'days');
describe('isPreviousDay', function () {
  it('returns true if second argument is the day immediately before the first', function () {
    (0, _chai.expect)((0, _isPreviousDay["default"])(today, yesterday)).to.equal(true);
  });
  it('returns false if the second arg is not the day immediately before the first', function () {
    (0, _chai.expect)((0, _isPreviousDay["default"])(yesterday, today)).to.equal(false);
  });
  describe('non-moment arguments', function () {
    it('is false if first argument is not a moment object', function () {
      (0, _chai.expect)((0, _isPreviousDay["default"])(null, today)).to.equal(false);
    });
    it('is false if second argument is not a moment object', function () {
      (0, _chai.expect)((0, _isPreviousDay["default"])(today, 'foo')).to.equal(false);
    });
  });
});