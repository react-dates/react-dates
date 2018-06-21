import { expect } from 'chai';
import wrap from 'mocha-wrap';

import getActiveElement from '../../src/utils/getActiveElement';

const describeIfNoWindow = typeof document === 'undefined' ? describe : describe.skip;
const test = 'FOOBARBAZ';

describeIfNoWindow('getActiveElement', () => {
  describe('without `document`', () => {
    it('returns false', () => {
      expect(typeof document).to.equal('undefined');
      expect(getActiveElement()).to.equal(false);
    });
  });

  wrap()
  .withGlobal('document', () => ({}))
  .describe('with `document`', () => {
    it('returns undefined without `document.activeElement`', () => {
      expect(getActiveElement()).to.be.an('undefined');
    });

    wrap()
    .withOverride(() => document, 'activeElement', () => test)
    .it('returns activeElement value with `document.activeElement', () => {
      expect(getActiveElement()).to.equal(test);
    });
  });
});
