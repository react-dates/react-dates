"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CalendarWeek;

var _react = _interopRequireDefault(require("react"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _CalendarDay = _interopRequireDefault(require("./CalendarDay"));

var _CustomizableCalendarDay = _interopRequireDefault(require("./CustomizableCalendarDay"));

var propTypes = process.env.NODE_ENV !== "production" ? (0, _airbnbPropTypes.forbidExtraProps)({
  children: (0, _airbnbPropTypes.or)([(0, _airbnbPropTypes.childrenOfType)(_CalendarDay["default"]), (0, _airbnbPropTypes.childrenOfType)(_CustomizableCalendarDay["default"])]).isRequired
}) : {};

function CalendarWeek(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("tr", null, children);
}

CalendarWeek.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};