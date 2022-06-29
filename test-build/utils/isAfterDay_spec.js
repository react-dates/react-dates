"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isAfterDay = _interopRequireDefault(require("../../lib/utils/isAfterDay"));

var today = (0, _moment["default"])();
var tomorrow = (0, _moment["default"])().add(1, 'days');
describe('isAfterDay', function () {
  it('returns true if first arg is after the second but have same month and year', function () {
    (0, _chai.expect)((0, _isAfterDay["default"])(tomorrow, today)).to.equal(true);
  });
  it('returns true if first arg is after the second but have same day and year', function () {
    (0, _chai.expect)((0, _isAfterDay["default"])((0, _moment["default"])().clone().add(1, 'month'), today)).to.equal(true);
  });
  it('returns true if first arg is after the second but have same day and month', function () {
    (0, _chai.expect)((0, _isAfterDay["default"])((0, _moment["default"])().clone().add(1, 'year'), today)).to.equal(true);
  });
  it('returns false if args are the same day', function () {
    (0, _chai.expect)((0, _isAfterDay["default"])(today, today)).to.equal(false);
  });
  it('returns false if first arg is after the second', function () {
    (0, _chai.expect)((0, _isAfterDay["default"])(today, tomorrow)).to.equal(false);
  });
  describe('non-moment object arguments', function () {
    it('is false if first argument is not a moment object', function () {
      (0, _chai.expect)((0, _isAfterDay["default"])(null, today)).to.equal(false);
    });
    it('is false if second argument is not a moment object', function () {
      (0, _chai.expect)((0, _isAfterDay["default"])(today, 'foo')).to.equal(false);
    });
  });
});