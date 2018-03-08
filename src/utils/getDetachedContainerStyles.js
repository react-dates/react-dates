export default function getDetachedContainerStyles(referenceEl) {
  const referenceRect = referenceEl.getBoundingClientRect();
  const offsetX = referenceRect.x;
  const offsetY = referenceRect.y;

  return {
    transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
  };
}
