import { expect } from 'chai';

import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';

import isBeforeDay from '../../src/utils/isBeforeDay';

const today = new Date();
const tomorrow = addDays(new Date(), 1);

describe('isBeforeDay', () => {
  it('returns true if first arg is before the second but have same month and year', () => {
    expect(isBeforeDay(today, tomorrow)).to.equal(true);
  });

  it('returns true if first arg is before the second but have same day and year', () => {
    expect(isBeforeDay(today, addYears(new Date(), 1))).to.equal(true);
  });

  it('returns true if first arg is before the second but have same day and month', () => {
    expect(isBeforeDay(today, addMonths(new Date(), 1))).to.equal(true);
  });

  it('returns false if args are the same day', () => {
    expect(isBeforeDay(today, today)).to.equal(false);
  });

  it('returns false if first arg is after the second', () => {
    expect(isBeforeDay(tomorrow, today)).to.equal(false);
  });

  describe('non-Date object arguments', () => {
    it('is false if first argument is not a Date object', () => {
      expect(isBeforeDay(null, today)).to.equal(false);
    });

    it('is false if second argument is not a Date object', () => {
      expect(isBeforeDay(today, 'foo')).to.equal(false);
    });
  });
});
