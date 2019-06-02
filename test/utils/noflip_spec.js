import { expect } from 'chai';

import noflip from '../../src/utils/noflip';

describe('noflip', () => {
  it('appends a noflip comment to a number', () => {
    expect(noflip(42)).to.equal('42px /* @noflip */');
  });

  it('appends a noflip comment to a string', () => {
    expect(noflip('foo')).to.equal('foo /* @noflip */');
  });

  it('throws when value is unexpected type', () => {
    expect(() => {
      noflip([]);
    }).to.throw(TypeError);
  });
});
