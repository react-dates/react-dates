export default function getDetachedContainerStyles(referenceEl) {
  const referenceRect = referenceEl.getBoundingClientRect();
  const offsetX = referenceRect.left;
  const offsetY = referenceRect.top;

  return {
    transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
  };
}
