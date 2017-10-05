import moment from 'moment';
import { expect } from 'chai';

import isAfterMonth from '../../src/utils/isAfterMonth';

const actualMonth = moment().startOf('month');
const nextMonth = moment().add(1, 'month');

describe('isAfterMonth', () => {
  it('returns true if first arg is after the second but have same year', () => {
    expect(isAfterMonth(nextMonth, actualMonth)).to.equal(true);
  });

  it('returns true if first arg is after the second but have same day and month', () => {
    expect(isAfterMonth(moment().clone().add(1, 'year'), actualMonth)).to.equal(true);
  });

  it('returns false if args are the same day', () => {
    expect(isAfterMonth(actualMonth, actualMonth)).to.equal(false);
  });

  it('returns false if args are in the same month', () => {
    expect(isAfterMonth(moment().add(1, 'days'), actualMonth)).to.equal(false);
  });

  it('returns false if first arg is after the second', () => {
    expect(isAfterMonth(actualMonth, nextMonth)).to.equal(false);
  });

  describe('non-moment object arguments', () => {
    it('is false if first argument is not a moment object', () => {
      expect(isAfterMonth(null, actualMonth)).to.equal(false);
    });

    it('is false if second argument is not a moment object', () => {
      expect(isAfterMonth(actualMonth, 'foo')).to.equal(false);
    });
  });
});
