Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getResponsiveContainerStyles;

var _constants = require('../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getResponsiveContainerStyles(anchorDirection, currentOffset, containerEdge, margin) {
  var windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  var calculatedOffset = anchorDirection === _constants.ANCHOR_LEFT ? windowWidth - containerEdge : containerEdge;
  var calculatedMargin = margin || 0;

  return _defineProperty({}, anchorDirection, Math.min(currentOffset + calculatedOffset - calculatedMargin, 0));
}