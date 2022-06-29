"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registerInterfaceWithDefaultTheme;

var _ThemedStyleSheet = _interopRequireDefault(require("react-with-styles/lib/ThemedStyleSheet"));

var _DefaultTheme = _interopRequireDefault(require("../theme/DefaultTheme"));

function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  _ThemedStyleSheet["default"].registerInterface(reactWithStylesInterface);

  _ThemedStyleSheet["default"].registerTheme(_DefaultTheme["default"]);
}