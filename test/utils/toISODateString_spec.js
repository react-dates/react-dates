import moment from 'moment';
import { expect } from 'chai';

import toISODateString from '../../src/utils/toISODateString';
import { ISO_FORMAT } from '../../constants';

describe('toISODateString', () => {
  it('returns null for falsy argument', () => {
    expect(toISODateString()).to.equal(null);
  });

  it('converts moment object to localized date string', () => {
    const testDate = moment('1991-07-13');
    const dateString = toISODateString(testDate);
    expect(dateString).to.equal('1991-07-13');
  });

  it('converts iso date string to ISO date string', () => {
    const testDate = moment('1991-07-13');
    const dateString = toISODateString(testDate.format(ISO_FORMAT));
    expect(dateString).to.equal('1991-07-13');
  });

  it('convers localized date strings to ISO date string', () => {
    const testDate = moment('1991-07-13');
    const dateString = toISODateString(testDate.format('L'));
    expect(dateString).to.equal('1991-07-13');
  });

  it('converts custom format date strings with format passed in', () => {
    const testDate = moment('1991-07-13');
    const dateString = toISODateString(testDate.format('YYYY---DD/MM'), 'YYYY---DD/MM');
    expect(dateString).to.equal('1991-07-13');
  });
});
