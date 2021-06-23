import { expect } from 'chai';

import addMonths from 'date-fns/addMonths';

import isSameMonthAndYear from '../../src/utils/isSameMonthAndYear';

const today = new Date();
const nextMonth = addMonths(new Date(), 1);

describe('isSameMonthAndYear', () => {
  it('returns true if args are the same month', () => {
    expect(isSameMonthAndYear(today, today)).to.equal(true);
  });

  it('returns false if args are not the same month', () => {
    expect(isSameMonthAndYear(today, nextMonth)).to.equal(false);
  });

  describe('non-Date object arguments', () => {
    it('is false if first argument is not a Date object', () => {
      expect(isSameMonthAndYear(null, today)).to.equal(false);
    });

    it('is false if second argument is not a Date object', () => {
      expect(isSameMonthAndYear(today, 'foo')).to.equal(false);
    });
  });
});
