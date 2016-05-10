import { expect } from 'chai';

import getTransformStyles from '../../src/utils/getTransformStyles';

describe('#getTransformStyles', () => {
  it('returns non-prefixed transform style', () => {
    const TRANSFORM_VALUE = 'foo';
    const transformStyles = getTransformStyles(TRANSFORM_VALUE);
    expect(transformStyles.transform).to.equal(TRANSFORM_VALUE);
  });

  it('returns ms-prefixed transform style', () => {
    const TRANSFORM_VALUE = 'foo';
    const transformStyles = getTransformStyles(TRANSFORM_VALUE);
    expect(transformStyles.msTransform).to.equal(TRANSFORM_VALUE);
  });

  it('returns moz-prefixed transform style', () => {
    const TRANSFORM_VALUE = 'foo';
    const transformStyles = getTransformStyles(TRANSFORM_VALUE);
    expect(transformStyles.MozTransform).to.equal(TRANSFORM_VALUE);
  });

  it('returns webkit-prefixed transform style', () => {
    const TRANSFORM_VALUE = 'foo';
    const transformStyles = getTransformStyles(TRANSFORM_VALUE);
    expect(transformStyles.WebkitTransform).to.equal(TRANSFORM_VALUE);
  });
});
