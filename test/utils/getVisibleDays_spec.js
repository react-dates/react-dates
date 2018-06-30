import moment from 'moment';
import { expect } from 'chai';

import isSameDay from '../../src/utils/isSameDay';
import getVisibleDays from '../../src/utils/getVisibleDays';

const today = moment();

describe('getVisibleDays', () => {
  it('has numberOfMonths entries', () => {
    const numberOfMonths = 3;
    const visibleDays = getVisibleDays(today, numberOfMonths, false);
    expect(Object.keys(visibleDays).length).to.equal(numberOfMonths + 2);
  });

  it('values are all arrays of moment objects', () => {
    const visibleDays = getVisibleDays(today, 3, false);
    Object.values(visibleDays).forEach((days) => {
      expect(Array.isArray(days)).to.equal(true);
      days.forEach((day) => {
        expect(moment.isMoment(day)).to.equal(true);
      });
    });
  });

  it('contains first arg day', () => {
    const visibleDays = getVisibleDays(today, 3, false);
    const containsToday = Object.values(visibleDays)
      .filter(days => days.filter(day => isSameDay(day, today)).length > 0);
    expect(containsToday.length > 0).to.equal(true);
  });
});
