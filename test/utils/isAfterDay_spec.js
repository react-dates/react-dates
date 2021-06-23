import { expect } from 'chai';

import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import isAfterDay from '../../src/utils/isAfterDay';


const today = new Date();
const tomorrow = addDays(new Date(), 1);

describe('isAfterDay', () => {
  it('returns true if first arg is after the second but have same month and year', () => {
    expect(isAfterDay(tomorrow, today)).to.equal(true);
  });

  it('returns true if first arg is after the second but have same day and year', () => {
    expect(isAfterDay(addMonths(new Date(), 1), today)).to.equal(true);
  });

  it('returns true if first arg is after the second but have same day and month', () => {
    expect(isAfterDay(addYears(new Date(), 1), today)).to.equal(true);
  });

  it('returns false if args are the same day', () => {
    expect(isAfterDay(today, today)).to.equal(false);
  });

  it('returns false if first arg is after the second', () => {
    expect(isAfterDay(today, tomorrow)).to.equal(false);
  });

  describe('non-Date object arguments', () => {
    it('is false if first argument is not a Date object', () => {
      expect(isAfterDay(null, today)).to.equal(false);
    });

    it('is false if second argument is not a Date object', () => {
      expect(isAfterDay(today, 'foo')).to.equal(false);
    });
  });
});
