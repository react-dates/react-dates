import { expect } from 'chai';

import addMonths from 'date-fns/addMonths';

import isNextMonth from '../../src/utils/isNextMonth';

const today = new Date();
const nextMonth = addMonths(new Date(), 1);
const twoMonths = addMonths(new Date(), 2);

describe('isNextMonth', () => {
  it('returns true if second argument is the next month after the first', () => {
    expect(isNextMonth(today, nextMonth)).to.equal(true);
  });

  it('returns false if second argument is not the next month after the first', () => {
    expect(isNextMonth(nextMonth, today)).to.equal(false);
  });

  it('returns false if second argument is more than one month after the first', () => {
    expect(isNextMonth(today, twoMonths)).to.equal(false);
  });

  describe('non-Date arguments', () => {
    it('is false if first argument is not a Date object', () => {
      expect(isNextMonth(null, today)).to.equal(false);
    });

    it('is false if second argument is not a Date object', () => {
      expect(isNextMonth(today, 'foo')).to.equal(false);
    });
  });
});
