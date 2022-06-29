"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _mochaWrap = _interopRequireDefault(require("mocha-wrap"));

var _getDetachedContainerStyles = _interopRequireDefault(require("../../lib/utils/getDetachedContainerStyles"));

var _constants = require("../../lib/constants");

var describeIfNoWindow = typeof document === 'undefined' ? describe : describe.skip;
var windowWidth = 100;
var windowHeight = 100; // Fake 30x100px element on x,y = 10,10

var referenceElRect = {
  top: 10,
  bottom: 40,
  left: 10,
  right: 110
};
var referenceEl = {
  getBoundingClientRect: function getBoundingClientRect() {
    return referenceElRect;
  }
};
describeIfNoWindow('#getDetachedContainerStyles', function () {
  (0, _mochaWrap["default"])().withGlobal('window', function () {
    return {};
  }).withOverride(function () {
    return window;
  }, 'innerWidth', function () {
    return windowWidth;
  }).withOverride(function () {
    return window;
  }, 'innerHeight', function () {
    return windowHeight;
  }).describe('with `window`', function () {
    describe('on down-left positioning', function () {
      it('returns translation from top-left of window to top-left of reference el', function () {
        var styles = (0, _getDetachedContainerStyles["default"])(_constants.OPEN_DOWN, _constants.ANCHOR_LEFT, referenceEl);
        (0, _chai.expect)(styles.transform).to.equal("translate3d(".concat(Math.round(referenceElRect.left), "px, ").concat(Math.round(referenceElRect.top), "px, 0)"));
      });
    });
    describe('on up-left positioning', function () {
      it('returns translation from bottom-left of window to bottom-left of reference el', function () {
        var styles = (0, _getDetachedContainerStyles["default"])(_constants.OPEN_UP, _constants.ANCHOR_LEFT, referenceEl);
        var offsetY = -(windowHeight - referenceElRect.bottom);
        (0, _chai.expect)(styles.transform).to.equal("translate3d(".concat(Math.round(referenceElRect.left), "px, ").concat(Math.round(offsetY), "px, 0)"));
      });
    });
    describe('on down-right positioning', function () {
      it('returns translation from top-right of window to top-right of reference el', function () {
        var styles = (0, _getDetachedContainerStyles["default"])(_constants.OPEN_DOWN, _constants.ANCHOR_RIGHT, referenceEl);
        var offsetX = -(windowWidth - referenceElRect.right);
        (0, _chai.expect)(styles.transform).to.equal("translate3d(".concat(Math.round(offsetX), "px, ").concat(Math.round(referenceElRect.top), "px, 0)"));
      });
    });
    describe('on up-right positioning', function () {
      it('returns translation from bottom-right of window to bottom-right of reference el', function () {
        var styles = (0, _getDetachedContainerStyles["default"])(_constants.OPEN_UP, _constants.ANCHOR_RIGHT, referenceEl);
        var offsetX = -(windowWidth - referenceElRect.right);
        var offsetY = -(windowHeight - referenceElRect.bottom);
        (0, _chai.expect)(styles.transform).to.equal("translate3d(".concat(Math.round(offsetX), "px, ").concat(Math.round(offsetY), "px, 0)"));
      });
    });
  });
});