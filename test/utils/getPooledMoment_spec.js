import { expect } from 'chai';
import moment from 'moment';

import getPooledMoment from '../../src/utils/getPooledMoment';

describe('getPooledMoment', () => {
  it('returns a moment given a day string', () => {
    const momentObj = getPooledMoment('2017-12-10');
    expect(moment.isMoment(momentObj)).to.equal(true);
    expect(momentObj.format('YYYY MM DD')).to.equal('2017 12 10');
  });

  it('returns the same moment given the same day string', () => {
    const momentObj1 = getPooledMoment('2017-12-10');
    const momentObj2 = getPooledMoment('2017-12-10');
    expect(momentObj1).to.equal(momentObj2);
  });

  it('returns a different moment given a different day string', () => {
    const momentObj1 = getPooledMoment('2017-12-10');
    const momentObj2 = getPooledMoment('2017-12-11');
    expect(momentObj1).not.to.equal(momentObj2);
  });
});
