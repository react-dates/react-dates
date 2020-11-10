function getStyleOrDefault(style, propertyName) {
  return parseFloat(style[propertyName] || 0);
}

export default function calculateDimension(el, axis, borderBox = false, withMargin = false) {
  if (!el) {
    return 0;
  }

  const axisStart = axis === 'width' ? 'Left' : 'Top';
  const axisEnd = axis === 'width' ? 'Right' : 'Bottom';

  // Only read styles if we need to
  const style = (!borderBox || withMargin) ? window.getComputedStyle(el) : null;

  // Offset includes border and padding
  const { offsetWidth, offsetHeight } = el;
  let size = axis === 'width' ? offsetWidth : offsetHeight;

  // Get the inner size
  if (!borderBox) {
    size -= (
      getStyleOrDefault(style, `padding${axisStart}`)
      + getStyleOrDefault(style, `padding${axisEnd}`)
      + getStyleOrDefault(style, `border${axisStart}Width`)
      + getStyleOrDefault(style, `border${axisEnd}Width`)
    );
  }

  // Apply margin
  if (withMargin) {
    size += (getStyleOrDefault(style, `margin${axisStart}`) + getStyleOrDefault(style, `margin${axisEnd}`));
  }

  return size;
}
