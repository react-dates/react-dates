import { expect } from 'chai';

import validIDList from '../../src/utils/validIDList';

describe('#validIDList', () => {
  it('returns null if no property', () => {
    const result = validIDList({ }, 'propertyName');
    expect(result).to.equal(null);
  });

  it('returns null with valid ids', () => {
    const result = validIDList({ prop1: 'validId' }, 'prop1');
    const result2 = validIDList({ prop1: 'validId validId2' }, 'prop1');
    const result3 = validIDList({ prop1: 'validId validId2 validId3' }, 'prop1');

    expect(result).to.equal(null, 'validIDList incorrectly invalidates one id');
    expect(result2).to.equal(null, 'validIDList incorrectly invalidates two ids');
    expect(result3).to.equal(null, 'validIDList incorrectly invalidates three ids');
  });

  it('returns an error with invalid ids', () => {
    const result = validIDList({ prop1: '1validId' }, 'prop1');
    const result2 = validIDList({ prop1: 'validId .validId2' }, 'prop1');
    const result3 = validIDList({ prop1: 'validId 5validId2 -validId3' }, 'prop1');

    expect(result).to.be.an('error', 'validIDList incorrectly validates one id');
    expect(result2).to.be.an('error', 'validIDList incorrectly validates two ids');
    expect(result3).to.be.an('error', 'validIDList incorrectly validates three ids');
  });
});
