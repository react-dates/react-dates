"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ThemedStyleSheet = _interopRequireDefault(require("react-with-styles/lib/ThemedStyleSheet"));

var _reactWithStylesInterfaceAphrodite = _interopRequireDefault(require("react-with-styles-interface-aphrodite"));

var _aphrodite = require("aphrodite");

var _DefaultTheme = _interopRequireDefault(require("../../lib/theme/DefaultTheme"));

_ThemedStyleSheet["default"].registerTheme(_DefaultTheme["default"]);

_ThemedStyleSheet["default"].registerInterface(_reactWithStylesInterfaceAphrodite["default"]);

beforeEach(function () {
  _aphrodite.StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(function () {
  _aphrodite.StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});