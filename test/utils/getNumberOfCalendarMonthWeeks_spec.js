import { expect } from 'chai';
import { moment } from '../../src/utils/DateObj';

import getNumberOfCalendarMonthWeeks from '../../src/utils/getNumberOfCalendarMonthWeeks';

describe('getNumberOfCalendarMonthWeeks', () => {
  it('returns 4 weeks for a 4-week month', () => {
    const february2018 = moment('2018-02-01', 'yyyy-mm-dd');
    expect(getNumberOfCalendarMonthWeeks(february2018, 4)).to.equal(4);
  });

  it('returns 5 weeks for a 5-week month', () => {
    const july2018 = moment('2018-07-01', 'yyyy-mm-dd');
    expect(getNumberOfCalendarMonthWeeks(july2018, 0)).to.equal(5);
  });

  it('returns 6 weeks for a 6-week month', () => {
    const september2018 = moment('2018-09-01', 'yyyy-mm-dd');
    expect(getNumberOfCalendarMonthWeeks(september2018, 0)).to.equal(6);
  });

  it('changing the first day of week changes the number of weeks', () => {
    const september2018 = moment('2018-09-01', 'yyyy-mm-dd');
    expect(getNumberOfCalendarMonthWeeks(september2018, 6)).to.equal(5);
  });
});
