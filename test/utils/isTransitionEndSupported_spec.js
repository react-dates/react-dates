import { expect } from 'chai';
import wrap from 'mocha-wrap';

import isTransitionEndSupported from '../../src/utils/isTransitionEndSupported';

const describeIfNoWindow = typeof window === 'undefined' ? describe : describe.skip;

describeIfNoWindow('isTransitionEndSupported', () => {
  describe('without `window`', () => {
    it('returns false', () => {
      expect(typeof window).to.equal('undefined');
      expect(isTransitionEndSupported()).to.equal(false);
    });
  });

  wrap()
  .withGlobal('window', () => ({}))
  .describe('with `window`', () => {
    it('returns false without `window.TransitionEvent`', () => {
      expect(isTransitionEndSupported()).to.equal(false);
    });

    wrap()
    .withOverride(() => window, 'TransitionEvent', () => () => {})
    .it('returns true with `window.ontouchstart', () => {
      expect(isTransitionEndSupported()).to.equal(true);
    });
  });
});
