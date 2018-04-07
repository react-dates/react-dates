const getScrollingRoot = () => document.scrollingElement || document.documentElement;

/**
 * Recursively finds the scroll parent of a node. The scroll parrent of a node
 * is the closest node that is scrollable. A node is scrollable if:
 *  - it is allowed to scroll via CSS ('overflow-y' not visible or hidden);
 *  - and its children/content are "bigger" than the node's box height.
 *
 * The root of the document always scrolls by default.
 *
 * @param {HTMLElement} node Any DOM element.
 * @return {HTMLElement} The scroll parent element.
 */
export function getScrollParent(node) {
  const parent = node.parentElement;

  if (parent == null) return getScrollingRoot();

  const { overflowY } = window.getComputedStyle(parent);
  const canScroll = overflowY !== 'visible' && overflowY !== 'hidden';

  if (canScroll && parent.scrollHeight > parent.clientHeight) {
    return parent;
  }

  return getScrollParent(parent);
}

/**
 * Recursively traverses the tree upwards from the given node, capturing all
 * ancestor nodes that scroll along with their current 'overflow-y' CSS
 * property.
 *
 * @param {HTMLElement} node Any DOM element.
 * @param {Map<HTMLElement,string>} [acc] Accumulator map.
 * @return {Map<HTMLElement,string>} Map of ancestors with their 'overflow-y' value.
 */
export function getScrollAncestorsOverflowY(node, acc = new Map()) {
  const scrollingRoot = getScrollingRoot();
  const scrollParent = getScrollParent(node);
  acc.set(scrollParent, scrollParent.style.overflowY);

  if (scrollParent === scrollingRoot) return acc;
  return getScrollAncestorsOverflowY(scrollParent, acc);
}

/**
 * Disabling the scroll on a node involves finding all the scrollable ancestors
 * and set their 'overflow-y' CSS property to 'hidden'. When all ancestors have
 * 'overflow-y: hidden' (up to the document element) there is no scroll
 * container, thus all the scroll outside of the node is disabled. In order to
 * enable scroll again, we store the previous value of the 'overflow-y' for
 * every ancestor in a closure and reset it back.
 *
 * @param {HTMLElement} node Any DOM element.
 */
export default function disableScroll(node) {
  const scrollAncestorsOverflowY = getScrollAncestorsOverflowY(node);
  const toggle = on =>
    scrollAncestorsOverflowY.forEach((overflowY, ancestor) => {
      ancestor.style.setProperty('overflow-y', on ? 'hidden' : overflowY);
    });

  toggle(true);
  return () => toggle(false);
}
