"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _CalendarWeek = _interopRequireDefault(require("../../lib/components/CalendarWeek"));

var _CalendarDay = _interopRequireDefault(require("../../lib/components/CalendarDay"));

describe('CalendarWeek', function () {
  it('renders a tr', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_CalendarWeek["default"], null, /*#__PURE__*/_react["default"].createElement(_CalendarDay["default"], null)));
    (0, _chai.expect)(wrapper.is('tr')).to.equal(true);
  });
});