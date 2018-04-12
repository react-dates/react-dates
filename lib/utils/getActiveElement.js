Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getActiveElement;
function getActiveElement() {
  return typeof document !== 'undefined' && document.activeElement;
}