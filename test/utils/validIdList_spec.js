import { expect } from 'chai';

import validIdList from '../../src/utils/validIdList';

describe('#valididList', () => {
  it('returns null if no property', () => {
    const result = validIdList({ }, 'propertyName');
    expect(result).to.equal(null);
  });

  it('returns null with valid ids', () => {
    const result = validIdList({ prop1: 'validId' }, 'prop1');
    const result2 = validIdList({ prop1: 'validId validId2' }, 'prop1');
    const result3 = validIdList({ prop1: 'validId validId2 validId3' }, 'prop1');

    expect(result).to.equal(null, 'validIdList incorrectly invalidates one id');
    expect(result2).to.equal(null, 'validIdList incorrectly invalidates two ids');
    expect(result3).to.equal(null, 'validIdList incorrectly invalidates three ids');
  });

  it('returns an error with invalid ids', () => {
    const result = validIdList({ prop1: '1validId' }, 'prop1');
    const result2 = validIdList({ prop1: 'validId .validId2' }, 'prop1');
    const result3 = validIdList({ prop1: 'validId 5validId2 -validId3' }, 'prop1');

    expect(result).to.be.an('error', 'validIdList incorrectly validates one id');
    expect(result2).to.be.an('error', 'validIdList incorrectly validates two ids');
    expect(result3).to.be.an('error', 'validIdList incorrectly validates three ids');
  });
});
