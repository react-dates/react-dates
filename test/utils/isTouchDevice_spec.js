import { expect } from 'chai';
import wrap from 'mocha-wrap';

import isTouchDevice from '../../src/utils/isTouchDevice';

const describeIfNoWindow = typeof window === 'undefined' ? describe : describe.skip;

describeIfNoWindow('isTouchDevice', () => {
  describe('with neither `window` nor `navigator`', () => {
    it('returns false', () => {
      expect(typeof window).to.equal('undefined');
      expect(typeof navigator).to.equal('undefined');
      expect(isTouchDevice()).to.equal(false);
    });
  });

  wrap()
  .withGlobal('window', () => ({}))
  .describe('with `window`', () => {
    it('returns false without `window.ontouchstart`', () => {
      expect(isTouchDevice()).to.equal(false);
    });

    wrap()
    .withOverride(() => window, 'ontouchstart', () => true)
    .it('returns true with `window.ontouchstart', () => {
      expect(isTouchDevice()).to.equal(true);
    });
  });

  wrap()
  .withGlobal('navigator', () => ({}))
  .describe('with `navigator`', () => {
    wrap()
    .withOverride(() => navigator, 'maxTouchPoints', () => {})
    .it('returns false with a falsy maxTouchPoints', () => {
      expect(isTouchDevice()).to.equal(false);
    });

    wrap()
    .withOverride(() => navigator, 'maxTouchPoints', () => 42)
    .it('returns false with a truthy maxTouchPoints', () => {
      expect(isTouchDevice()).to.equal(true);
    });
  });
});
