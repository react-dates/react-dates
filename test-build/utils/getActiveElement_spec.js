"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _chai = require("chai");

var _mochaWrap = _interopRequireDefault(require("mocha-wrap"));

var _getActiveElement = _interopRequireDefault(require("../../lib/utils/getActiveElement"));

var describeIfNoWindow = typeof document === 'undefined' ? describe : describe.skip;
var test = 'FOOBARBAZ';
describeIfNoWindow('getActiveElement', function () {
  describe('without `document`', function () {
    it('returns false', function () {
      (0, _chai.expect)(typeof document === "undefined" ? "undefined" : (0, _typeof2["default"])(document)).to.equal('undefined');
      (0, _chai.expect)((0, _getActiveElement["default"])()).to.equal(false);
    });
  });
  (0, _mochaWrap["default"])().withGlobal('document', function () {
    return {};
  }).describe('with `document`', function () {
    it('returns undefined without `document.activeElement`', function () {
      (0, _chai.expect)((0, _getActiveElement["default"])()).to.be.an('undefined');
    });
    (0, _mochaWrap["default"])().withOverride(function () {
      return document;
    }, 'activeElement', function () {
      return test;
    }).it('returns activeElement value with `document.activeElement', function () {
      (0, _chai.expect)((0, _getActiveElement["default"])()).to.equal(test);
    });
  });
});