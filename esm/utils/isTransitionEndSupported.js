export default function isTransitionEndSupported() {
  return !!(typeof window !== 'undefined' && 'TransitionEvent' in window);
}