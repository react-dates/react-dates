"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _toISODateString = _interopRequireDefault(require("../../lib/utils/toISODateString"));

var _constants = require("../../lib/constants");

describe('toISODateString', function () {
  it('returns null for falsy argument', function () {
    (0, _chai.expect)((0, _toISODateString["default"])()).to.equal(null);
  });
  it('converts moment object to localized date string', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toISODateString["default"])(testDate);
    (0, _chai.expect)(dateString).to.equal('1991-07-13');
  });
  it('matches moment format behavior', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toISODateString["default"])(testDate);
    (0, _chai.expect)(dateString).to.equal(testDate.format(_constants.ISO_FORMAT));
  });
  it('converts iso date string to ISO date string', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toISODateString["default"])(testDate.format(_constants.ISO_FORMAT));
    (0, _chai.expect)(dateString).to.equal('1991-07-13');
  });
  it('convers localized date strings to ISO date string', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toISODateString["default"])(testDate.format('L'));
    (0, _chai.expect)(dateString).to.equal('1991-07-13');
  });
  it('converts custom format date strings with format passed in', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toISODateString["default"])(testDate.format('YYYY---DD/MM'), 'YYYY---DD/MM');
    (0, _chai.expect)(dateString).to.equal('1991-07-13');
  });
});