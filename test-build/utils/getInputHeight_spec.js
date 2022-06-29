"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _getInputHeight = _interopRequireDefault(require("../../lib/utils/getInputHeight"));

var theme = {
  font: {
    input: {
      lineHeight: 13,
      lineHeight_small: 7
    }
  },
  spacing: {
    inputPadding: 10,
    displayTextPaddingVertical: 8,
    displayTextPaddingTop: 10,
    displayTextPaddingBottom: 12,
    displayTextPaddingVertical_small: 2,
    displayTextPaddingTop_small: 4,
    displayTextPaddingBottom_small: 6
  }
};
describe('#getInputHeight', function () {
  it('returns the expected value with falsy second arg', function () {
    var inputHeight = (0, _getInputHeight["default"])(theme);
    (0, _chai.expect)(inputHeight).to.equal(55);
  });
  it('returns the expected value with truthy second arg', function () {
    var inputHeight = (0, _getInputHeight["default"])(theme, true);
    (0, _chai.expect)(inputHeight).to.equal(37);
  });
});