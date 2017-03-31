import { expect } from 'chai';

import getCalendarMonthWidth from '../../src/utils/getCalendarMonthWidth';

describe('#getCalendarMonthWidth', () => {
  it('correctly calculates width for default day size of 39', () => {
    expect(getCalendarMonthWidth(39)).to.equal(300);
  });
});
