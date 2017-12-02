import { expect } from 'chai';
import getInputHeight from '../../src/utils/getInputHeight';

describe('#getInputHeight', () => {
  it('returns the expected value', () => {
    const inputHeight = getInputHeight({
      lineHeight: 7,
      inputPadding: 13,
      displayTextPaddingVertical: 91,
    });
    expect(inputHeight).to.equal(215);
  });
});
