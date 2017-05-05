import { expect } from 'chai';
import wrap from 'mocha-wrap';

import getResponsiveContainerStyles from '../../src/utils/getResponsiveContainerStyles';

import { ANCHOR_LEFT, ANCHOR_RIGHT } from '../../constants';

const describeUnlessWindow = typeof window === 'undefined' ? describe : describe.skip;

describe('#getResponsiveContainerStyles', () => {
  describeUnlessWindow('window.innerWidth', () => {
    wrap()
    .withGlobal('window', () => ({}))
    .withOverride(() => window, 'innerWidth', () => -42)
    .it('uses window.innerWidth', () => {
      const styles = getResponsiveContainerStyles(ANCHOR_LEFT, 0, 0);
      expect(styles[ANCHOR_LEFT]).to.equal(window.innerWidth);
    });
  });

  it('returns a numerical value when margin is not included', () => {
    const styles = getResponsiveContainerStyles(ANCHOR_LEFT, 0, 0);
    expect(styles[ANCHOR_LEFT]).to.be.a('number');
  });

  it('returns left style for left anchored container', () => {
    const styles = getResponsiveContainerStyles(ANCHOR_LEFT, 0, 0, 0);
    expect(styles[ANCHOR_LEFT]).to.not.be.an('undefined');
  });

  it('returns right style for right anchored container', () => {
    const styles = getResponsiveContainerStyles(ANCHOR_RIGHT, 0, 0, 0);
    expect(styles[ANCHOR_RIGHT]).to.not.be.an('undefined');
  });
});
