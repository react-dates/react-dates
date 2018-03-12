function getScrollParent(node, rootNode) {
  const parent = node.parentElement;

  if (parent == null) return null;

  const { overflowY } = window.getComputedStyle(parent);
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

  if (isScrollable && parent.scrollHeight > parent.clientHeight) {
    return parent;
  }

  return getScrollParent(parent) || rootNode;
}

function getScrollAncestorsOverflow(node, acc = new Map()) {
  const rootNode = document.scrollingElement || document.documentElement;
  const scrollParent = getScrollParent(node, rootNode);
  acc.set(scrollParent, scrollParent.style.overflowY);

  if (scrollParent === rootNode) return acc;
  return getScrollAncestorsOverflow(scrollParent, acc);
}

// Get and store all ancestor elements that scroll along with its overflowY
// CSS property, so they can be reset when enabling scroll again.
export default function disableScroll(node) {
  const scrollAncestorsOverflow = getScrollAncestorsOverflow(node);
  const toggle = on =>
    scrollAncestorsOverflow.forEach((overflowY, ancestor) => {
      ancestor.style.setProperty('overflow-y', on ? 'hidden' : overflowY);
    });

  toggle(true);
  return () => toggle(false);
}
