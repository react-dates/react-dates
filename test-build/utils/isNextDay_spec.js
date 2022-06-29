"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isNextDay = _interopRequireDefault(require("../../lib/utils/isNextDay"));

var today = (0, _moment["default"])();
var tomorrow = (0, _moment["default"])().add(1, 'days');
describe('isNextDay', function () {
  it('returns true if second argument is the next day after the first', function () {
    (0, _chai.expect)((0, _isNextDay["default"])(today, tomorrow)).to.equal(true);
  });
  it('returns false if the second arg is not the next day after the first', function () {
    (0, _chai.expect)((0, _isNextDay["default"])(tomorrow, today)).to.equal(false);
  });
  describe('non-moment arguments', function () {
    it('is false if first argument is not a moment object', function () {
      (0, _chai.expect)((0, _isNextDay["default"])(null, today)).to.equal(false);
    });
    it('is false if second argument is not a moment object', function () {
      (0, _chai.expect)((0, _isNextDay["default"])(today, 'foo')).to.equal(false);
    });
  });
});