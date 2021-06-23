import { expect } from 'chai';

import subMonths from 'date-fns/subMonths';

import isPrevMonth from '../../src/utils/isPrevMonth';

const today = new Date();
const lastMonth = subMonths(new Date(), 1);
const twoMonthsAgo = subMonths(new Date(), 2);

describe('isPrevMonth', () => {
  it('returns true if second argument is the month before the first', () => {
    expect(isPrevMonth(today, lastMonth)).to.equal(true);
  });

  it('returns false if second argument is not the month before the first', () => {
    expect(isPrevMonth(lastMonth, today)).to.equal(false);
  });

  it('returns false if second argument is more than one month before the first', () => {
    expect(isPrevMonth(today, twoMonthsAgo)).to.equal(false);
  });

  describe('non-Date arguments', () => {
    it('is false if first argument is not a Date object', () => {
      expect(isPrevMonth(null, today)).to.equal(false);
    });

    it('is false if second argument is not a Date object', () => {
      expect(isPrevMonth(today, 'foo')).to.equal(false);
    });
  });
});
