import { expect } from 'chai';

import format from 'date-fns/format';

import toLocalizedDateString from '../../src/utils/toLocalizedDateString';
import { ISO_FORMAT } from '../../src/constants';

describe('toLocalizedDateString', () => {
  it('returns null for falsy argument', () => {
    expect(toLocalizedDateString()).to.equal(null);
  });

  it('converts Date object to localized date string', () => {
    const testDate = new Date(1991, 7, 13);
    const dateString = toLocalizedDateString(testDate);
    expect(dateString).to.equal(format(testDate, 'P'));
  });

  it('converts iso date string to localized date string', () => {
    const testDate = new Date(1991, 7, 13);
    const dateString = toLocalizedDateString(format(testDate, ISO_FORMAT));
    expect(dateString).to.equal(format(testDate, 'P'));
  });

  it('localized date strings stay the same', () => {
    const testDate = new Date(1991, 7, 13);
    const dateString = toLocalizedDateString(format(testDate, 'P'));
    expect(dateString).to.equal(format(testDate, 'P'));
  });

  it('converts custom format date strings with format passed in', () => {
    const testDate = new Date(1991, 7, 13);
    const dateString = toLocalizedDateString(format(testDate, 'yyyy---dd/MM'), 'yyyy---dd/MM');
    expect(dateString).to.equal(format(testDate, 'P'));
  });
});
