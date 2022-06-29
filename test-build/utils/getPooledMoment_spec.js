"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _moment = _interopRequireDefault(require("moment"));

var _getPooledMoment = _interopRequireDefault(require("../../lib/utils/getPooledMoment"));

describe('getPooledMoment', function () {
  it('returns a moment given a day string', function () {
    var momentObj = (0, _getPooledMoment["default"])('2017-12-10');
    (0, _chai.expect)(_moment["default"].isMoment(momentObj)).to.equal(true);
    (0, _chai.expect)(momentObj.format('YYYY MM DD')).to.equal('2017 12 10');
  });
  it('returns the same moment given the same day string', function () {
    var momentObj1 = (0, _getPooledMoment["default"])('2017-12-10');
    var momentObj2 = (0, _getPooledMoment["default"])('2017-12-10');
    (0, _chai.expect)(momentObj1).to.equal(momentObj2);
  });
  it('returns a different moment given a different day string', function () {
    var momentObj1 = (0, _getPooledMoment["default"])('2017-12-10');
    var momentObj2 = (0, _getPooledMoment["default"])('2017-12-11');
    (0, _chai.expect)(momentObj1).not.to.equal(momentObj2);
  });
});