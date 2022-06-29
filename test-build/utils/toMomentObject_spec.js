"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isSameDay = _interopRequireDefault(require("../../lib/utils/isSameDay"));

var _toMomentObject = _interopRequireDefault(require("../../lib/utils/toMomentObject"));

describe('toMomentObject', function () {
  it('returns null for null input', function () {
    (0, _chai.expect)((0, _toMomentObject["default"])(null)).to.equal(null);
  });
  it('returns null for undefined input', function () {
    (0, _chai.expect)((0, _toMomentObject["default"])(undefined)).to.equal(null);
  });
  it('returns null for empty string', function () {
    (0, _chai.expect)((0, _toMomentObject["default"])('')).to.equal(null);
  });
  it('returns null for no input', function () {
    (0, _chai.expect)((0, _toMomentObject["default"])()).to.equal(null);
  });
  it('output has time of 12PM', function () {
    (0, _chai.expect)((0, _toMomentObject["default"])('1991-07-13').hour()).to.equal(12);
  });
  it('parses custom format', function () {
    var date = (0, _toMomentObject["default"])('1991---13/07', 'YYYY---DD/MM');
    (0, _chai.expect)(date).not.to.equal(null);
    (0, _chai.expect)(date.month()).to.equal(6); // moment months are zero-indexed

    (0, _chai.expect)(date.date()).to.equal(13);
    (0, _chai.expect)(date.year()).to.equal(1991);
  });
  it('parses localized format', function () {
    var date = (0, _toMomentObject["default"])((0, _moment["default"])('1991-07-13').format('L'));
    (0, _chai.expect)(date).not.to.equal(null);
    (0, _chai.expect)(date.month()).to.equal(6); // moment months are zero-indexed

    (0, _chai.expect)(date.date()).to.equal(13);
    (0, _chai.expect)(date.year()).to.equal(1991);
  });
  describe('Daylight Savings Time issues', function () {
    it('last of February does not equal first of March', function () {
      (0, _chai.expect)((0, _isSameDay["default"])((0, _toMomentObject["default"])('2017-02-28'), (0, _toMomentObject["default"])('2017-03-01'))).to.equal(false);
    });
    it('last of March does not equal first of April', function () {
      (0, _chai.expect)((0, _isSameDay["default"])((0, _toMomentObject["default"])('2017-03-31'), (0, _toMomentObject["default"])('2017-04-01'))).to.equal(false);
    });
  });
});