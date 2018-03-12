import { OPEN_UP, ANCHOR_RIGHT } from '../constants';

export default function getDetachedContainerStyles(openDirection, anchorDirection, referenceEl) {
  const referenceRect = referenceEl.getBoundingClientRect();
  let offsetX = referenceRect.left;
  let offsetY = referenceRect.top;

  if (openDirection === OPEN_UP) {
    offsetY = -(window.innerHeight - referenceRect.bottom);
  }

  if (anchorDirection === ANCHOR_RIGHT) {
    offsetX = -(window.innerWidth - referenceRect.right);
  }

  return {
    transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
  };
}
