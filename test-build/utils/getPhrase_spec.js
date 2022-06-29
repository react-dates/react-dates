"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinonSandbox = _interopRequireDefault(require("sinon-sandbox"));

var _getPhrase = _interopRequireDefault(require("../../lib/utils/getPhrase"));

describe('getPhrase', function () {
  it('returns empty string when arg is falsy', function () {
    (0, _chai.expect)((0, _getPhrase["default"])()).to.equal('');
  });
  it('returns arg if arg is a string', function () {
    var test = 'foobarbaz';
    (0, _chai.expect)((0, _getPhrase["default"])(test)).to.equal(test);
  });
  describe('arg is a function', function () {
    it('returns invoked arg', function () {
      var test = 'this is a new test string';

      var phraseFunc = _sinonSandbox["default"].stub().returns(test);

      var phrase = (0, _getPhrase["default"])(phraseFunc);
      (0, _chai.expect)(phraseFunc.callCount).to.equal(1);
      (0, _chai.expect)(phrase).to.equal(test);
    });
    it('passes second arg into the invoked function', function () {
      var testObj = {
        hello: 'world'
      };

      var phraseFunc = _sinonSandbox["default"].stub();

      (0, _getPhrase["default"])(phraseFunc, testObj);
      (0, _chai.expect)(phraseFunc.getCall(0).args[0]).to.equal(testObj);
    });
  });
});