import { expect } from 'chai';
import wrap from 'mocha-wrap';

import getActiveElement from '../../src/utils/getActiveElement';

const describeIfNoWindow = typeof document === 'undefined' ? describe : describe.skip;
const test = 'FOOBARBAZ';

describeIfNoWindow('getActiveElement', () => {
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
