import { expect } from 'chai';

import addMonths from 'date-fns/addMonths';

import isDayVisible from '../../src/utils/isDayVisible';

describe('#isDayVisible', () => {
  it('returns true if arg is in visible months', () => {
    const test = addMonths(new Date(), 3);
    const currentMonth = addMonths(new Date(), 2);
    expect(isDayVisible(test, currentMonth, 2)).to.equal(true);
  });

  it('returns false if arg is before first month', () => {
    const test = addMonths(new Date(), 1);
    const currentMonth = addMonths(new Date(), 2);
    expect(isDayVisible(test, currentMonth, 2)).to.equal(false);
  });

  it('returns false if arg is after last month', () => {
    const test = addMonths(new Date(), 4);
    const currentMonth = addMonths(new Date(), 2);
    expect(isDayVisible(test, currentMonth, 2)).to.equal(false);
  });
});
