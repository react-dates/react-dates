import { expect } from 'chai';

import getCalendarMonthWidth from '../../src/utils/getCalendarMonthWidth';

describe('#getCalendarMonthWidth', () => {
  it('correctly calculates width for default day size of 39', () => {
    expect(getCalendarMonthWidth(39, 13)).to.equal(300);
  });

  it('returns a number when padding is undefined', () => {
    expect(Number.isNaN(getCalendarMonthWidth(39, undefined))).to.equal(false);
  });

  it('returns a number when padding is null', () => {
    expect(Number.isNaN(getCalendarMonthWidth(39, null))).to.equal(false);
  });
});
