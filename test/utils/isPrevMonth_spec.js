import moment from 'moment';
import { expect } from 'chai';

import isPrevMonth from '../../src/utils/isPrevMonth';

const today = moment();
const lastMonth = moment().subtract(1, 'months');
const twoMonthsAgo = moment().subtract(2, 'months');

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

  describe('non-moment arguments', () => {
    it('is false if first argument is not a moment object', () => {
      expect(isPrevMonth(null, today)).to.equal(false);
    });

    it('is false if second argument is not a moment object', () => {
      expect(isPrevMonth(today, 'foo')).to.equal(false);
    });
  });
});
