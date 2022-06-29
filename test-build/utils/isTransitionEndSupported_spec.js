"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _chai = require("chai");

var _mochaWrap = _interopRequireDefault(require("mocha-wrap"));

var _isTransitionEndSupported = _interopRequireDefault(require("../../lib/utils/isTransitionEndSupported"));

var describeIfNoWindow = typeof window === 'undefined' ? describe : describe.skip;
describeIfNoWindow('isTransitionEndSupported', function () {
  describe('without `window`', function () {
    it('returns false', function () {
      (0, _chai.expect)(typeof window === "undefined" ? "undefined" : (0, _typeof2["default"])(window)).to.equal('undefined');
      (0, _chai.expect)((0, _isTransitionEndSupported["default"])()).to.equal(false);
    });
  });
  (0, _mochaWrap["default"])().withGlobal('window', function () {
    return {};
  }).describe('with `window`', function () {
    it('returns false without `window.TransitionEvent`', function () {
      (0, _chai.expect)((0, _isTransitionEndSupported["default"])()).to.equal(false);
    });
    (0, _mochaWrap["default"])().withOverride(function () {
      return window;
    }, 'TransitionEvent', function () {
      return function () {};
    }).it('returns true with `window.ontouchstart', function () {
      (0, _chai.expect)((0, _isTransitionEndSupported["default"])()).to.equal(true);
    });
  });
});