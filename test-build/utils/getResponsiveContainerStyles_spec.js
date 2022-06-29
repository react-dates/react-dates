"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _mochaWrap = _interopRequireDefault(require("mocha-wrap"));

var _getResponsiveContainerStyles = _interopRequireDefault(require("../../lib/utils/getResponsiveContainerStyles"));

var _constants = require("../../lib/constants");

var describeUnlessWindow = typeof window === 'undefined' ? describe : describe.skip;
describe('#getResponsiveContainerStyles', function () {
  describeUnlessWindow('window.innerWidth', function () {
    (0, _mochaWrap["default"])().withGlobal('window', function () {
      return {};
    }).withOverride(function () {
      return window;
    }, 'innerWidth', function () {
      return -42;
    }).it('uses window.innerWidth', function () {
      var styles = (0, _getResponsiveContainerStyles["default"])(_constants.ANCHOR_LEFT, 0, 0);
      (0, _chai.expect)(styles[_constants.ANCHOR_LEFT]).to.equal(window.innerWidth);
    });
  });
  it('returns a numerical value when margin is not included', function () {
    var styles = (0, _getResponsiveContainerStyles["default"])(_constants.ANCHOR_LEFT, 0, 0);
    (0, _chai.expect)(styles[_constants.ANCHOR_LEFT]).to.be.a('number');
  });
  it('returns left style for left anchored container', function () {
    var styles = (0, _getResponsiveContainerStyles["default"])(_constants.ANCHOR_LEFT, 0, 0, 0);
    (0, _chai.expect)(styles[_constants.ANCHOR_LEFT]).to.not.be.an('undefined');
  });
  it('returns right style for right anchored container', function () {
    var styles = (0, _getResponsiveContainerStyles["default"])(_constants.ANCHOR_RIGHT, 0, 0, 0);
    (0, _chai.expect)(styles[_constants.ANCHOR_RIGHT]).to.not.be.an('undefined');
  });
});