"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var ChevronUp = function ChevronUp(props) {
  return /*#__PURE__*/_react["default"].createElement("svg", props, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M32 713l453-453c11-11 21-11 32 0l453 453c5 5 7 10 7 16 0 13-10 23-22 23-7 0-12-2-16-7L501 309 64 745c-4 5-9 7-15 7-7 0-12-2-17-7-9-11-9-21 0-32z"
  }));
};

ChevronUp.defaultProps = {
  focusable: "false",
  viewBox: "0 0 1000 1000"
};
var _default = ChevronUp;
exports["default"] = _default;