"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getTransformStyles;
function getTransformStyles(transformValue) {
  return {
    transform: transformValue,
    msTransform: transformValue,
    MozTransform: transformValue,
    WebkitTransform: transformValue
  };
}