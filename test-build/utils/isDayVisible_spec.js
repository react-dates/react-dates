"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isDayVisible = _interopRequireDefault(require("../../lib/utils/isDayVisible"));

describe('#isDayVisible', function () {
  it('returns true if arg is in visible months', function () {
    var test = (0, _moment["default"])().add(3, 'months');
    var currentMonth = (0, _moment["default"])().add(2, 'months');
    (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 2)).to.equal(true);
  });
  it('returns false if arg is before first month', function () {
    var test = (0, _moment["default"])().add(1, 'months');
    var currentMonth = (0, _moment["default"])().add(2, 'months');
    (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 2)).to.equal(false);
  });
  it('returns false if arg is after last month', function () {
    var test = (0, _moment["default"])().add(4, 'months');
    var currentMonth = (0, _moment["default"])().add(2, 'months');
    (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 2)).to.equal(false);
  });
  describe('enableOutsideDays', function () {
    it('returns true if arg is in partial week before visible months', function () {
      var test = (0, _moment["default"])('2019-04-30');
      var currentMonth = (0, _moment["default"])('2019-05-01');
      (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 1, false)).to.equal(false);
      (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 1, true)).to.equal(true);
    });
    it('returns true if arg is in partial week after visible months', function () {
      var test = (0, _moment["default"])('2019-06-01');
      var currentMonth = (0, _moment["default"])('2019-05-01');
      (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 1, false)).to.equal(false);
      (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 1, true)).to.equal(true);
    });
    it('returns false if arg is before partial week before visible months', function () {
      var test = (0, _moment["default"])('2019-04-27');
      var currentMonth = (0, _moment["default"])('2019-05-01');
      (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 1, true)).to.equal(false);
    });
    it('returns false if arg is after partial week after visible months', function () {
      var test = (0, _moment["default"])('2019-06-03');
      var currentMonth = (0, _moment["default"])('2019-05-01');
      (0, _chai.expect)((0, _isDayVisible["default"])(test, currentMonth, 1, true)).to.equal(false);
    });
  }); // this test fails when run with the whole suite,
  // potentially due to cache pollution from other tests

  it.skip('works when the first day of the week that starts the month does not have a midnight', function () {
    var march29 = (0, _moment["default"])('2020-03-29').utcOffset(-1
    /* 'Atlantic/Azores' */
    );
    var april2020 = (0, _moment["default"])('2020-04-02').utcOffset(-1
    /* 'Atlantic/Azores' */
    );
    (0, _chai.expect)((0, _isDayVisible["default"])(march29, april2020, 1, true)).to.equal(true);
  });
});