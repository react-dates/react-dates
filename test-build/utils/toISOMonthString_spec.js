"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _constants = require("../../lib/constants");

var _toISOMonthString = _interopRequireDefault(require("../../lib/utils/toISOMonthString"));

describe('#toISOMonthString', function () {
  describe('arg is a moment object', function () {
    it('returns month in ISO_MONTH_FORMAT format', function () {
      var today = (0, _moment["default"])();
      (0, _chai.expect)((0, _toISOMonthString["default"])(today)).to.equal(today.format(_constants.ISO_MONTH_FORMAT));
    });
  });
  describe('arg is a string', function () {
    describe('arg is in ISO format', function () {
      it('returns month in ISO_MONTH_FORMAT format', function () {
        var today = (0, _moment["default"])();
        var todayISO = today.format(_constants.ISO_FORMAT);
        (0, _chai.expect)((0, _toISOMonthString["default"])(todayISO)).to.equal(today.format(_constants.ISO_MONTH_FORMAT));
      });
    });
    describe('arg matches the second arg date format provided', function () {
      it('returns month in ISO_MONTH_FORMAT format', function () {
        var today = (0, _moment["default"])();
        var dateFormat = 'MM_DD_YYYY';
        var formattedDate = today.format(dateFormat);
        var monthString = (0, _toISOMonthString["default"])(formattedDate, dateFormat);
        (0, _chai.expect)(monthString).to.equal(today.format(_constants.ISO_MONTH_FORMAT));
      });
    });
    describe('arg is neither in iso format or in the provided format', function () {
      it('returns null', function () {
        var today = (0, _moment["default"])();
        var dateFormat = 'MM_DD_YYYY';
        var formattedDate = today.format('MM-DD-YYYY');
        (0, _chai.expect)((0, _toISOMonthString["default"])(formattedDate, dateFormat)).to.equal(null);
      });
    });
    describe('arg is not a valid date string', function () {
      it('returns null', function () {
        (0, _chai.expect)((0, _toISOMonthString["default"])('This is not a date')).to.equal(null);
      });
    });
  });
});