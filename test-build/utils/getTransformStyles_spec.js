"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _getTransformStyles = _interopRequireDefault(require("../../lib/utils/getTransformStyles"));

describe('#getTransformStyles', function () {
  it('returns non-prefixed transform style', function () {
    var TRANSFORM_VALUE = 'foo';
    var transformStyles = (0, _getTransformStyles["default"])(TRANSFORM_VALUE);
    (0, _chai.expect)(transformStyles.transform).to.equal(TRANSFORM_VALUE);
  });
  it('returns ms-prefixed transform style', function () {
    var TRANSFORM_VALUE = 'foo';
    var transformStyles = (0, _getTransformStyles["default"])(TRANSFORM_VALUE);
    (0, _chai.expect)(transformStyles.msTransform).to.equal(TRANSFORM_VALUE);
  });
  it('returns moz-prefixed transform style', function () {
    var TRANSFORM_VALUE = 'foo';
    var transformStyles = (0, _getTransformStyles["default"])(TRANSFORM_VALUE);
    (0, _chai.expect)(transformStyles.MozTransform).to.equal(TRANSFORM_VALUE);
  });
  it('returns webkit-prefixed transform style', function () {
    var TRANSFORM_VALUE = 'foo';
    var transformStyles = (0, _getTransformStyles["default"])(TRANSFORM_VALUE);
    (0, _chai.expect)(transformStyles.WebkitTransform).to.equal(TRANSFORM_VALUE);
  });
});