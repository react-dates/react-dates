"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _chai = require("chai");

var _enzyme = require("enzyme");

var _KeyboardShortcutRow = _interopRequireDefault(require("../../lib/components/KeyboardShortcutRow"));

describe('KeyboardShortcutRow', function () {
  it('is an li', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_KeyboardShortcutRow["default"], {
      unicode: "foo",
      label: "bar",
      action: "baz"
    })).dive();
    (0, _chai.expect)(wrapper.is('li')).to.equal(true);
  });
});