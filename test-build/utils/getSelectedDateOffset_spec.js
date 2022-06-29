"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _moment = _interopRequireDefault(require("moment"));

var _getSelectedDateOffset = _interopRequireDefault(require("../../lib/utils/getSelectedDateOffset"));

var today = (0, _moment["default"])();
describe('#getSelectedDateOffset', function () {
  it('returns a function modified moment object', function () {
    var fn = function fn(day) {
      return day.add(2, 'days');
    };

    var modifiedDay = (0, _getSelectedDateOffset["default"])(fn, today);
    (0, _chai.expect)(modifiedDay.format()).to.equal(today.clone().add(2, 'days').format());
  });
  it('returns the passed day when function is undefined', function () {
    var modifiedDay = (0, _getSelectedDateOffset["default"])(undefined, today);
    (0, _chai.expect)(modifiedDay.format()).to.equal(today.format());
  });
  it('modifies the returned day using the modifier callback', function () {
    var fn = function fn(day) {
      return day.add(2, 'days');
    };

    var modifier = function modifier(day) {
      return day.subtract(2, 'days');
    };

    var modifiedDay = (0, _getSelectedDateOffset["default"])(fn, today, modifier);
    (0, _chai.expect)(modifiedDay.format()).to.equal(today.clone().format());
  });
  it('does not apply the modifier if function is undefined', function () {
    var modifier = function modifier(day) {
      return day.subtract(2, 'days');
    };

    var modifiedDay = (0, _getSelectedDateOffset["default"])(undefined, today, modifier);
    (0, _chai.expect)(modifiedDay.format()).to.equal(today.format());
  });
});