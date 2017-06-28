import moment from 'moment';
import { expect } from 'chai';

import isDayVisible from '../../src/utils/isDayVisible';

describe('#isDayVisible', () => {
  it('returns true if arg is in visible months', () => {
    const test = moment().add(3, 'months');
    const currentMonth = moment().add(2, 'months');
    expect(isDayVisible(test, currentMonth, 2)).to.equal(true);
  });

  it('returns false if arg is before the visible months', () => {
    const numberOfMonths = 2;
    const test = moment().add(1, 'months');
    const currentMonth = moment().add(1 + numberOfMonths, 'months');
    expect(isDayVisible(test, currentMonth, numberOfMonths)).to.equal(false);
  });

  it('returns false if arg is after the visible months', () => {
    const numberOfMonths = 2;
    const test = moment().add(4, 'months');
    const currentMonth = moment().add(4 - (numberOfMonths + 1), 'months');
    expect(isDayVisible(test, currentMonth, numberOfMonths)).to.equal(false);
  });
});
