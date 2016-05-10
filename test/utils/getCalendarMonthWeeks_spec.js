import moment from 'moment';
import { expect } from 'chai';

import getCalendarMonthWeeks from '../../src/utils/getCalendarMonthWeeks';

const today = moment();
const weeks = getCalendarMonthWeeks(today);
const weeksWithOutsideDays = getCalendarMonthWeeks(today, true);

describe('getCalendarMonthWeeks', () => {
  it('returns an array of arrays', () => {
    expect(weeks).to.be.instanceof(Array);

    weeks.forEach((week) => {
      expect(week).to.be.instanceof(Array);
    });
  });

  it('today is included', () => {
    let isIncluded = false;
    weeks.forEach((week) => {
      week.forEach((day) => {
        if (day && day.isSame(today, 'day')) isIncluded = true;
      });
    });

    expect(isIncluded).to.equal(true);
  });

  describe('enableOutsideDays arg is false', () => {
    it('first non-null element is first of the month', () => {
      const firstOfMonth = today.clone().startOf('month');
      const firstNonNullDay = weeks[0].filter(day => day)[0];
      expect(firstOfMonth.isSame(firstNonNullDay, 'day')).to.equal(true);
    });

    it('last non-null element is last of the month', () => {
      const lastOfMonth = today.clone().endOf('month');
      const lastWeek = weeks[weeks.length - 1].filter(day => day);
      const lastNonNullDay = lastWeek[lastWeek.length - 1];
      expect(lastOfMonth.isSame(lastNonNullDay, 'day')).to.equal(true);
    });

    it('number of non-null elements is equal to number of days in month', () => {
      const daysInCalendarMonthWeeks = weeks.reduce((a, b) => a + b.filter(day => day).length, 0);
      expect(daysInCalendarMonthWeeks).to.equal(today.daysInMonth());
    });
  });

  describe('enableOutsideDays arg is true', () => {
    it('contains first of the month', () => {
      const firstOfMonth = today.clone().startOf('month');
      const containsFirstOfMonth =
        weeksWithOutsideDays[0].filter(day => firstOfMonth.isSame(day, 'day')).length > 0;
      expect(containsFirstOfMonth).to.equal(true);
    });

    it('contains last of the month', () => {
      const lastOfMonth = today.clone().endOf('month');
      const containsLastOfMonth = weeks[weeksWithOutsideDays.length - 1]
        .filter(day => lastOfMonth.isSame(day, 'day')).length > 0;
      expect(containsLastOfMonth).to.equal(true);
    });

    it('each week has 7 non-null elements', () => {
      const hasNoNullElements = weeksWithOutsideDays
        .reduce((w1, w2) => w1 && w2.reduce((d1, d2) => d1 && !!d2, true), true);
      expect(hasNoNullElements).to.equal(true);
    });
  });
});
