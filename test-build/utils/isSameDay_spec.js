"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isSameDay = _interopRequireDefault(require("../../lib/utils/isSameDay"));

var today = (0, _moment["default"])();
var tomorrow = (0, _moment["default"])().add(1, 'days');
describe('isSameDay', function () {
  it('returns true if args are the same day', function () {
    (0, _chai.expect)((0, _isSameDay["default"])(today, today)).to.equal(true);
  });
  it('returns false if args are not the same day', function () {
    (0, _chai.expect)((0, _isSameDay["default"])(today, tomorrow)).to.equal(false);
  });
  it('returns false for same days of week', function () {
    // Flags accidentally use of moment's day() function, which returns index
    // within the week.
    (0, _chai.expect)((0, _isSameDay["default"])((0, _moment["default"])('2000-01-01'), (0, _moment["default"])('2000-01-08'))).to.equal(false);
  });
  describe('non-moment object arguments', function () {
    it('is false if first argument is not a moment object', function () {
      (0, _chai.expect)((0, _isSameDay["default"])(null, today)).to.equal(false);
    });
    it('is false if second argument is not a moment object', function () {
      (0, _chai.expect)((0, _isSameDay["default"])(today, 'foo')).to.equal(false);
    });
  });
});