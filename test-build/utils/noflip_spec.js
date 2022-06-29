"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _noflip = _interopRequireDefault(require("../../lib/utils/noflip"));

describe('noflip', function () {
  it('appends a noflip comment to a number', function () {
    (0, _chai.expect)((0, _noflip["default"])(42)).to.equal('42px /* @noflip */');
  });
  it('appends a noflip comment to a string', function () {
    (0, _chai.expect)((0, _noflip["default"])('foo')).to.equal('foo /* @noflip */');
  });
  it('throws when value is unexpected type', function () {
    (0, _chai.expect)(function () {
      (0, _noflip["default"])([]);
    }).to["throw"](TypeError);
  });
});