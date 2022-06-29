"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _toLocalizedDateString = _interopRequireDefault(require("../../lib/utils/toLocalizedDateString"));

var _constants = require("../../lib/constants");

describe('toLocalizedDateString', function () {
  it('returns null for falsy argument', function () {
    (0, _chai.expect)((0, _toLocalizedDateString["default"])()).to.equal(null);
  });
  it('converts moment object to localized date string', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toLocalizedDateString["default"])(testDate);
    (0, _chai.expect)(dateString).to.equal(testDate.format('L'));
  });
  it('converts iso date string to localized date string', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toLocalizedDateString["default"])(testDate.format(_constants.ISO_FORMAT));
    (0, _chai.expect)(dateString).to.equal(testDate.format('L'));
  });
  it('localized date strings stay the same', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toLocalizedDateString["default"])(testDate.format('L'));
    (0, _chai.expect)(dateString).to.equal(testDate.format('L'));
  });
  it('converts custom format date strings with format passed in', function () {
    var testDate = (0, _moment["default"])('1991-07-13');
    var dateString = (0, _toLocalizedDateString["default"])(testDate.format('YYYY---DD/MM'), 'YYYY---DD/MM');
    (0, _chai.expect)(dateString).to.equal(testDate.format('L'));
  });
});