import { addEventListener } from 'consolidated-events';

// Get closest parent element that scrolls.
function getScrollParent(node) {
  if (node === null) return null;

  const parent = node.parentElement;

  if (parent == null) return null;

  const { overflowY } = window.getComputedStyle(parent);
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

  if (isScrollable && parent.scrollHeight > parent.clientHeight) {
    return parent;
  }

  return getScrollParent(parent) || window;
}

// Get all ancestor elements that scroll.
function getScrollAncestors(node, acc = []) {
  const scrollParent = getScrollParent(node);
  if (scrollParent == null) return acc;
  return getScrollAncestors(scrollParent, [...acc, scrollParent]);
}

// Keep scrollTop property of given node as it was in the beginning.
function preventScroll(node) {
  const fixedScrollTop = node.scrollTop;
  let waitingUpdate = false;

  const update = () => {
    waitingUpdate = false;
    node.scrollTo(0, fixedScrollTop);
  };

  const onScroll = () => {
    if (!waitingUpdate) requestAnimationFrame(update);
    waitingUpdate = true;
  };

  return onScroll;
}

// Stateful class that disables/enables scrolling for all ancestors of a given
// element.
export default class ScrollManager {
  constructor(node) {
    this.scrollAncestors = getScrollAncestors(node);
  }

  disableScroll() {
    this.removeListeners = this.scrollAncestors.map(node =>
      addEventListener(node, 'scroll', preventScroll(node), {
        passive: true,
      }));
  }

  enableScroll() {
    this.removeListeners.forEach(removeListener => removeListener());
  }
}
