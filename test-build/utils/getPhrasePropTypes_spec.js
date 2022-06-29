"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _getPhrasePropTypes = _interopRequireDefault(require("../../lib/utils/getPhrasePropTypes"));

var PhraseObject = {
  foo: 'x',
  bar: 'y',
  baz: 'z'
};
describe('#getPhrasePropTypes', function () {
  it('contains each key from the original object', function () {
    var propTypes = (0, _getPhrasePropTypes["default"])(PhraseObject);
    Object.keys(PhraseObject).forEach(function (key) {
      (0, _chai.expect)(Object.keys(propTypes).filter(function (type) {
        return type === key;
      }).length).to.not.equal(0);
    });
  });
});