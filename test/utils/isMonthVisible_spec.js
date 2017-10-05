import moment from 'moment';
import { expect } from 'chai';

import isMonthVisible from '../../src/utils/isMonthVisible';

describe('#isYearVisible', () => {
  it('returns true if arg is in visible year', () => {
    const testMonth = moment().endOf('year');
    const currentYear = moment();
    expect(isMonthVisible(testMonth, currentYear, 2)).to.equal(true);
  });

  it('returns false if arg is before first year', () => {
    const testMonth = moment().add(1, 'years');
    const currentYear = moment().add(2, 'years');
    expect(isMonthVisible(testMonth, currentYear, 2)).to.equal(false);
  });

  it('returns false if arg is after last year', () => {
    const testMonth = moment().add(3, 'years');
    const currentYear = moment();
    expect(isMonthVisible(testMonth, currentYear, 2)).to.equal(false);
  });
});
