import { expect } from 'chai';

import disableScroll, {
  getScrollParent,
  getScrollAncestorsOverflowY,
} from '../../src/utils/disableScroll';

const describeIfWindow = typeof document === 'undefined' ? describe.skip : describe;

const createScrollContainer = (level = 1) => {
  const el = document.createElement('div');
  el.style.width = '300px';
  el.style.height = `${level * 100}px`;
  el.style.overflow = 'auto';
  return el;
};

const createScrollContent = () => {
  const el = document.createElement('div');
  el.style.width = '100%';
  el.style.height = '99999px';
  return el;
};

const createTargetElement = () => {
  const el = document.createElement('div');
  return el;
};

describeIfWindow('#disableScroll', () => {
  let grandParentScrollContainer;
  let parentScrollContainer;
  let scrollContent;
  let targetElement;

  before(() => {
    grandParentScrollContainer = createScrollContainer(1);
    parentScrollContainer = createScrollContainer(2);
    scrollContent = createScrollContent();
    targetElement = createTargetElement();
    scrollContent.appendChild(targetElement);
  });

  describe('#getScrollParent', () => {
    describe('with no parent', () => {
      before(() => {
        document.body.appendChild(scrollContent);
      });

      after(() => {
        document.body.removeChild(scrollContent);
      });

      it('returns scrolling root if no scroll parent', () => {
        const scrollParent = getScrollParent(targetElement);
        expect(scrollParent).to.equal(document.documentElement);
      });
    });

    describe('with a single scroll container', () => {
      before(() => {
        parentScrollContainer.appendChild(scrollContent);
        document.body.appendChild(parentScrollContainer);
      });

      after(() => {
        parentScrollContainer.appendChild(scrollContent);
        document.body.removeChild(parentScrollContainer);
      });

      it('returns the scroll container', () => {
        const scrollParent = getScrollParent(targetElement);
        expect(scrollParent).to.equal(parentScrollContainer);
      });
    });

    describe('with multiple scroll containers', () => {
      before(() => {
        parentScrollContainer.appendChild(scrollContent);
        grandParentScrollContainer.appendChild(parentScrollContainer);
        document.body.appendChild(grandParentScrollContainer);
      });

      after(() => {
        parentScrollContainer.removeChild(scrollContent);
        grandParentScrollContainer.removeChild(parentScrollContainer);
        document.body.removeChild(grandParentScrollContainer);
      });

      it('returns the closest scroll container', () => {
        const scrollParent = getScrollParent(targetElement);
        expect(scrollParent).to.equal(parentScrollContainer);
      });
    });
  });

  describe('#getScrollAncestorsOverflowY', () => {
    before(() => {
      parentScrollContainer.appendChild(scrollContent);
      grandParentScrollContainer.appendChild(parentScrollContainer);
      document.body.appendChild(grandParentScrollContainer);
    });

    after(() => {
      parentScrollContainer.removeChild(scrollContent);
      grandParentScrollContainer.removeChild(parentScrollContainer);
      document.body.removeChild(grandParentScrollContainer);
    });

    it('returns a map with the overflowY of all scrollable ancestors', () => {
      const scrollAncestorsOverflowY = getScrollAncestorsOverflowY(targetElement);
      expect(scrollAncestorsOverflowY.size).to.equal(3); // both scroll containers + root

      expect(scrollAncestorsOverflowY.has(parentScrollContainer)).to.equal(true);
      expect(scrollAncestorsOverflowY.has(grandParentScrollContainer)).to.equal(true);
      expect(scrollAncestorsOverflowY.has(document.documentElement)).to.equal(true);

      expect(scrollAncestorsOverflowY.get(parentScrollContainer)).to.equal('auto');
      expect(scrollAncestorsOverflowY.get(grandParentScrollContainer)).to.equal('auto');
      // document is a special case - it doesn't have an explicit overflow property set,
      // but scrolls by default.
      expect(scrollAncestorsOverflowY.get(document.documentElement)).to.equal('');
    });
  });

  describe('#disableScroll', () => {
    before(() => {
      parentScrollContainer.appendChild(scrollContent);
      grandParentScrollContainer.appendChild(parentScrollContainer);
      document.body.appendChild(grandParentScrollContainer);
    });

    after(() => {
      parentScrollContainer.removeChild(scrollContent);
      grandParentScrollContainer.removeChild(parentScrollContainer);
      document.body.removeChild(grandParentScrollContainer);
    });

    describe('disable', () => {
      it('should set all scroll ancestors overflow to hidden', () => {
        const enableScroll = disableScroll(targetElement);
        const scrollAncestorsOverflowY = getScrollAncestorsOverflowY(targetElement);

        // eslint-disable-next-line no-restricted-syntax
        for (const [, overflowY] of scrollAncestorsOverflowY) {
          expect(overflowY).to.equal('hidden');
        }

        // reset to initial state
        enableScroll();
      });
    });

    describe('enable', () => {
      it('should set all scroll ancestors overflow to their previous value', () => {
        const scrollAncestorsOverflowYBefore = getScrollAncestorsOverflowY(targetElement);
        const enableScroll = disableScroll(targetElement);
        enableScroll();
        const scrollAncestorsOverflowY = getScrollAncestorsOverflowY(targetElement);

        // eslint-disable-next-line no-restricted-syntax
        for (const [element, overflowY] of scrollAncestorsOverflowY) {
          expect(scrollAncestorsOverflowYBefore.get(element)).to.equal(overflowY);
        }
      });
    });
  });
});
