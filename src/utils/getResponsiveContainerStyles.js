import { ANCHOR_LEFT } from '../../constants';

export default function getResponsiveContainerStyles(
  anchorDirection,
  currentOffset,
  containerEdge,
  margin
) {
  const newStyles = {};

  const windowWidth = typeof window !== 'undefined' && window.innerWidth;
  const calculatedOffset =
    anchorDirection === ANCHOR_LEFT ? windowWidth - containerEdge : containerEdge;
  const calculatedMargin = margin || 0;

  newStyles[anchorDirection] = Math.min(currentOffset + calculatedOffset - calculatedMargin, 0);

  return newStyles;
}
