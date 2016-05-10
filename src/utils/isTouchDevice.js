export default function isTouchDevice() {
  return !!(typeof window !== 'undefined' && 'ontouchstart' in window) ||
    !!(typeof navigator !== 'undefined' && navigator.maxTouchPoints);
}
