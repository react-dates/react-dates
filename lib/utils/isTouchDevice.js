Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isTouchDevice;
function isTouchDevice() {
  return !!(typeof window !== 'undefined' && 'ontouchstart' in window) || !!(typeof navigator !== 'undefined' && navigator.maxTouchPoints);
}