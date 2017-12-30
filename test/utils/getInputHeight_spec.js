import { expect } from 'chai';
import getInputHeight from '../../src/utils/getInputHeight';

const theme = {
  font: {
    input: {
      lineHeight: 13,
      lineHeight_small: 7,
    },
  },
  spacing: {
    inputPadding: 10,
    displayTextPaddingVertical: 8,
    displayTextPaddingTop: 10,
    displayTextPaddingBottom: 12,
    displayTextPaddingVertical_small: 2,
    displayTextPaddingTop_small: 4,
    displayTextPaddingBottom_small: 6,
  },
};

describe('#getInputHeight', () => {
  it('returns the expected value with falsy second arg', () => {
    const inputHeight = getInputHeight(theme);
    expect(inputHeight).to.equal(55);
  });

  it('returns the expected value with truthy second arg', () => {
    const inputHeight = getInputHeight(theme, true);
    expect(inputHeight).to.equal(37);
  });
});
