/* eslint-disable camelcase */

function getPadding(vertical, top, bottom) {
  const isTopDefined = typeof top === 'number';
  const isBottomDefined = typeof bottom === 'number';
  const isVerticalDefined = typeof vertical === 'number';

  if (isTopDefined && isBottomDefined) {
    return top + bottom;
  }

  if (isTopDefined && isVerticalDefined) {
    return top + vertical;
  }

  if (isTopDefined) {
    return top;
  }

  if (isBottomDefined && isVerticalDefined) {
    return bottom + vertical;
  }

  if (isBottomDefined) {
    return bottom;
  }

  if (isVerticalDefined) {
    return 2 * vertical;
  }

  return 0;
}

export default function getInputHeight({
  font: {
    input: {
      lineHeight,
      lineHeight_small,
    },
  },
  spacing: {
    inputPadding,
    displayTextPaddingVertical,
    displayTextPaddingTop,
    displayTextPaddingBottom,
    displayTextPaddingVertical_small,
    displayTextPaddingTop_small,
    displayTextPaddingBottom_small,
  },
}, small) {
  const calcLineHeight = small ? lineHeight_small : lineHeight;

  const padding = small
    ? getPadding(
      displayTextPaddingVertical_small,
      displayTextPaddingTop_small,
      displayTextPaddingBottom_small,
    )
    : getPadding(
      displayTextPaddingVertical,
      displayTextPaddingTop,
      displayTextPaddingBottom,
    );

  return parseInt(calcLineHeight, 10) + (2 * inputPadding) + padding;
}
