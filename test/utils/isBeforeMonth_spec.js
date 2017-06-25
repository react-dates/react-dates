import moment from 'moment';
import { expect } from 'chai';

import isBeforeMonth from '../../src/utils/isBeforeMonth';

const actualMonth = moment().startOf('month');
const nextMonth = moment().add(1, 'month');

describe('isBeforeMonth', () => {
  it('returns true if first arg is before the second but have same day and year', () => {
    expect(isBeforeMonth(actualMonth, nextMonth)).to.equal(true);
  });

  it('returns true if first arg is before the second but have same day and month', () => {
    expect(isBeforeMonth(actualMonth, moment().add(1, 'year'))).to.equal(true);
  });

  it('returns false if args are the same day', () => {
    expect(isBeforeMonth(actualMonth, actualMonth)).to.equal(false);
  });

  it('returns false if args are in the same month', () => {
    expect(isBeforeMonth(moment().add(1, 'days'), actualMonth)).to.equal(false);
  });

  it('returns false if first arg is after the second', () => {
    expect(isBeforeMonth(nextMonth, actualMonth)).to.equal(false);
  });

  describe('non-moment object arguments', () => {
    it('is false if first argument is not a moment object', () => {
      expect(isBeforeMonth(null, actualMonth)).to.equal(false);
    });

    it('is false if second argument is not a moment object', () => {
      expect(isBeforeMonth(actualMonth, 'foo')).to.equal(false);
    });
  });
});
