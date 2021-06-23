import { expect } from 'chai';

import format from 'date-fns/format';

import toISODateString from '../../src/utils/toISODateString';
import { ISO_FORMAT } from '../../src/constants';

describe('toISODateString', () => {
  it('returns null for falsy argument', () => {
    expect(toISODateString()).to.equal(null);
  });

  it('converts Date object to localized date string', () => {
    const testDate = new Date(1991, 6, 13);
    const dateString = toISODateString(testDate);
    expect(dateString).to.equal('1991-07-13');
  });

  it('converts iso date string to ISO date string', () => {
    const testDate = new Date(1991, 6, 13);
    const dateString = toISODateString(format(testDate, ISO_FORMAT));
    expect(dateString).to.equal('1991-07-13');
  });

  it('convers localized date strings to ISO date string', () => {
    const testDate = new Date(1991, 6, 13);
    const dateString = toISODateString(format(testDate, 'P'));
    expect(dateString).to.equal('1991-07-13');
  });

  it('converts custom format date strings with format passed in', () => {
    const testDate = new Date(1991, 6, 13);
    const dateString = toISODateString(format(testDate, 'yyyy---dd/MM'), 'yyyy---dd/MM');
    expect(dateString).to.equal('1991-07-13');
  });
});
