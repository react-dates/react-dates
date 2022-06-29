"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _calculateDimension = _interopRequireDefault(require("../../lib/utils/calculateDimension"));

describe('#calculateDimension', function () {
  it('returns 0 for an empty element', function () {
    (0, _chai.expect)((0, _calculateDimension["default"])(null, 'width')).to.equal(0);
    (0, _chai.expect)((0, _calculateDimension["default"])(null, 'width', false)).to.equal(0);
    (0, _chai.expect)((0, _calculateDimension["default"])(null, 'width', true)).to.equal(0);
  });
  describe('borderBox true', function () {
    var el = {
      offsetWidth: 17,
      offsetHeight: 42
    };
    it('returns el.offsetWidth for "width"', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(el, 'width', true)).to.equal(el.offsetWidth);
    });
    it('returns el.offsetHeight for "height"', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(el, 'height', true)).to.equal(el.offsetHeight);
    });
  });
  /* Requires a DOM */

  describe.skip('withMargin false and borderBox true', function () {
    var testElement = null;
    beforeEach(function () {
      testElement = document.createElement('div');
      testElement.style.width = '100px';
      testElement.style.height = '250px';
      testElement.style.padding = '15px 10px';
      testElement.style.border = '1px solid red';
      testElement.style.margin = '3px 6px 5px 2px';
      testElement.boxSizing = 'border-box';
    });
    it('calculates border-box height', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(testElement, 'height', true)).to.equal(282);
    });
    it('calculates border-box height with margin', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(testElement, 'height', true, true)).to.equal(290);
    });
    it('calculates border-box width', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(testElement, 'width', true)).to.equal(122);
    });
    it('calculates border-box width with margin', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(testElement, 'width', true, true)).to.equal(130);
    });
    it('calculates content-box height', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(testElement, 'height')).to.equal(250);
    });
    it('calculates content-box height with margin', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(testElement, 'height', false, true)).to.equal(258);
    });
    it('calculates content-box width', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(testElement, 'width')).to.equal(100);
    });
    it('calculates content-box width with margin', function () {
      (0, _chai.expect)((0, _calculateDimension["default"])(testElement, 'width', false, true)).to.equal(108);
    });
  });
});