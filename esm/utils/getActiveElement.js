export default function getActiveElement() {
  return typeof document !== 'undefined' && document.activeElement;
}