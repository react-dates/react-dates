import { expect } from 'chai';
import wrap from 'mocha-wrap';

import isTouchDevice from '../../src/utils/isTouchDevice';

const describeIfNoWindow = typeof window === 'undefined' ? describe : describe.skip;
function DocumentTouch() { }

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

    wrap()
    .withOverride(() => window, 'DocumentTouch', () => DocumentTouch)
    .withGlobal('document', () => new (function Document() {})())
    .it('returns false when document is not an instance of DocumentTouch', () => {
      expect(document).not.to.be.an.instanceof(DocumentTouch);
      expect(isTouchDevice()).to.equal(false);
    });

    wrap()
    .withOverride(() => window, 'DocumentTouch', () => DocumentTouch)
    .withGlobal('document', () => new DocumentTouch())
    .it('returns true when document is an instance of DocumentTouch', () => {
      expect(document).to.be.an.instanceof(DocumentTouch);
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
    .it('returns true with a truthy maxTouchPoints', () => {
      expect(isTouchDevice()).to.equal(true);
    });

    wrap()
    .withOverride(() => navigator, 'msMaxTouchPoints', () => {})
    .it('returns false with a falsy msMaxTouchPoints', () => {
      expect(isTouchDevice()).to.equal(false);
    });

    wrap()
    .withOverride(() => navigator, 'msMaxTouchPoints', () => 42)
    .it('returns true with a truthy msMaxTouchPoints', () => {
      expect(isTouchDevice()).to.equal(true);
    });
  });
});
