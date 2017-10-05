import moment from 'moment';
import { expect } from 'chai';

import isSameMonth from '../../src/utils/isSameMonth';

const actualMonth = moment();
const nextMonth = moment().add(1, 'month');

describe('isSameMonth', () => {
  it('returns true if args are the same day', () => {
    expect(isSameMonth(actualMonth, actualMonth)).to.equal(true);
  });

  it('returns false if args are not the same month', () => {
    expect(isSameMonth(actualMonth, nextMonth)).to.equal(false);
  });

  it('returns false for same months but different year', () => {
    expect(isSameMonth(
      moment('2000-01-01'),
      moment('2001-01-01'),
    )).to.equal(false);
  });

  describe('non-moment object arguments', () => {
    it('is false if first argument is not a moment object', () => {
      expect(isSameMonth(null, actualMonth)).to.equal(false);
    });

    it('is false if second argument is not a moment object', () => {
      expect(isSameMonth(actualMonth, 'foo')).to.equal(false);
    });
  });
});
