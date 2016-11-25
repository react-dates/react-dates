import moment from 'moment';
import { expect } from 'chai';

import isSameDay from '../../src/utils/isSameDay';
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

  it('all days have a time of 12PM', () => {
    weeks.forEach((week) => {
      week.forEach((day) => {
        if (day) {
          expect(day.hours()).to.equal(12);
        }
      });
    });
  });

  describe('Daylight Savings Time issues', () => {
    it('last of February does not equal first of March', () => {
      const february = getCalendarMonthWeeks(today.clone().month(1));
      const lastWeekOfFebruary = february[february.length - 1].filter(Boolean);
      const lastOfFebruary = lastWeekOfFebruary[lastWeekOfFebruary.length - 1];

      const march = getCalendarMonthWeeks(today.clone().month(2));
      const firstOfMarch = march[0].filter(Boolean)[0];

      expect(isSameDay(lastOfFebruary, firstOfMarch)).to.equal(false);
    });

    it('last of March does not equal first of April', () => {
      const march = getCalendarMonthWeeks(today.clone().month(2));
      const lastWeekOfMarch = march[march.length - 1].filter(Boolean);
      const lastOfMarch = lastWeekOfMarch[lastWeekOfMarch.length - 1];

      const april = getCalendarMonthWeeks(today.clone().month(3));
      const firstOfApril = april[0].filter(Boolean)[0];

      expect(isSameDay(lastOfMarch, firstOfApril)).to.equal(false);
    });
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

    it('last week contains last of the month', () => {
      const lastOfMonth = today.clone().endOf('month');
      const containsLastOfMonth = weeks[weeksWithOutsideDays.length - 1]
        .filter(day => lastOfMonth.isSame(day, 'day')).length > 0;
      expect(containsLastOfMonth).to.equal(true);
    });

    it('last week contains last of the month if next month begins on Sunday', () => {
      const december2016 = moment('2016-12-01');
      const lastOfMonth = december2016.clone().endOf('month');
      const weeksInDecember = getCalendarMonthWeeks(december2016);
      const containsLastOfMonth = weeksInDecember[weeksInDecember.length - 1]
        .filter(day => lastOfMonth.isSame(day, 'day')).length > 0;
      expect(containsLastOfMonth).to.equal(true);
    });

    it('last week contains last of the month if next month begins on Monday', () => {
      moment.locale('es');
      const april2017 = moment('2017-04-01');
      const lastOfMonth = april2017.clone().endOf('month');
      const weeksInApril = getCalendarMonthWeeks(april2017);
      const containsLastOfMonth = weeksInApril[weeksInApril.length - 1]
        .filter(day => lastOfMonth.isSame(day, 'day')).length > 0;
      expect(containsLastOfMonth).to.equal(true);
    });

    it('last week contains last of the month if next month begins on Saturday', () => {
      const september2016 = moment('2016-09-01');
      const lastOfMonth = september2016.clone().endOf('month');
      const weeksInSeptember = getCalendarMonthWeeks(september2016);
      const containsLastOfMonth = weeksInSeptember[weeksInSeptember.length - 1]
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
