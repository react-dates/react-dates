"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isSameMonth = _interopRequireDefault(require("../../lib/utils/isSameMonth"));

var today = (0, _moment["default"])();
var nextMonth = (0, _moment["default"])().add(1, 'month');
describe('isSameMonth', function () {
  it('returns true if args are the same month', function () {
    (0, _chai.expect)((0, _isSameMonth["default"])(today, today)).to.equal(true);
  });
  it('returns false if args are not the same month', function () {
    (0, _chai.expect)((0, _isSameMonth["default"])(today, nextMonth)).to.equal(false);
  });
  describe('non-moment object arguments', function () {
    it('is false if first argument is not a moment object', function () {
      (0, _chai.expect)((0, _isSameMonth["default"])(null, today)).to.equal(false);
    });
    it('is false if second argument is not a moment object', function () {
      (0, _chai.expect)((0, _isSameMonth["default"])(today, 'foo')).to.equal(false);
    });
  });
});