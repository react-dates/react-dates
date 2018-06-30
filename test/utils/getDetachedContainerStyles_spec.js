import { expect } from 'chai';
import wrap from 'mocha-wrap';

import getDetachedContainerStyles from '../../src/utils/getDetachedContainerStyles';

import {
  OPEN_DOWN,
  OPEN_UP,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
} from '../../src/constants';

const describeIfNoWindow = typeof document === 'undefined' ? describe : describe.skip;

const windowWidth = 100;
const windowHeight = 100;

// Fake 30x100px element on x,y = 10,10
const referenceElRect = {
  top: 10,
  bottom: 40,
  left: 10,
  right: 110,
};
const referenceEl = {
  getBoundingClientRect() {
    return referenceElRect;
  },
};

describeIfNoWindow('#getDetachedContainerStyles', () => {
  wrap()
    .withGlobal('window', () => ({}))
    .withOverride(() => window, 'innerWidth', () => windowWidth)
    .withOverride(() => window, 'innerHeight', () => windowHeight)
    .describe('with `window`', () => {
      describe('on down-left positioning', () => {
        it('returns translation from top-left of window to top-left of reference el', () => {
          const styles = getDetachedContainerStyles(OPEN_DOWN, ANCHOR_LEFT, referenceEl);
          expect(styles.transform).to.equal(`translate3d(${Math.round(referenceElRect.left)}px, ${Math.round(referenceElRect.top)}px, 0)`);
        });
      });

      describe('on up-left positioning', () => {
        it('returns translation from bottom-left of window to bottom-left of reference el', () => {
          const styles = getDetachedContainerStyles(OPEN_UP, ANCHOR_LEFT, referenceEl);
          const offsetY = -(windowHeight - referenceElRect.bottom);
          expect(styles.transform).to.equal(`translate3d(${Math.round(referenceElRect.left)}px, ${Math.round(offsetY)}px, 0)`);
        });
      });

      describe('on down-right positioning', () => {
        it('returns translation from top-right of window to top-right of reference el', () => {
          const styles = getDetachedContainerStyles(OPEN_DOWN, ANCHOR_RIGHT, referenceEl);
          const offsetX = -(windowWidth - referenceElRect.right);
          expect(styles.transform).to.equal(`translate3d(${Math.round(offsetX)}px, ${Math.round(referenceElRect.top)}px, 0)`);
        });
      });

      describe('on up-right positioning', () => {
        it('returns translation from bottom-right of window to bottom-right of reference el', () => {
          const styles = getDetachedContainerStyles(OPEN_UP, ANCHOR_RIGHT, referenceEl);
          const offsetX = -(windowWidth - referenceElRect.right);
          const offsetY = -(windowHeight - referenceElRect.bottom);
          expect(styles.transform).to.equal(`translate3d(${Math.round(offsetX)}px, ${Math.round(offsetY)}px, 0)`);
        });
      });
    });
});
