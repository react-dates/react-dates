Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = calculateDimension;
function calculateDimension(el, axis) {
  var borderBox = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var withMargin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!el) {
    return 0;
  }

  var axisStart = axis === 'width' ? 'Left' : 'Top';
  var axisEnd = axis === 'width' ? 'Right' : 'Bottom';

  // Only read styles if we need to
  var style = !borderBox || withMargin ? window.getComputedStyle(el) : null;

  // Offset includes border and padding
  var offsetWidth = el.offsetWidth,
      offsetHeight = el.offsetHeight;

  var size = axis === 'width' ? offsetWidth : offsetHeight;

  // Get the inner size
  if (!borderBox) {
    size -= parseFloat(style['padding' + axisStart]) + parseFloat(style['padding' + axisEnd]) + parseFloat(style['border' + axisStart + 'Width']) + parseFloat(style['border' + axisEnd + 'Width']);
  }

  // Apply margin
  if (withMargin) {
    size += parseFloat(style['margin' + axisStart]) + parseFloat(style['margin' + axisEnd]);
  }

  return size;
}