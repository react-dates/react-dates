import { expect } from 'chai';

import getCalendarYearWidth from '../../src/utils/getCalendarYearWidth';

describe('#getCalendarYearWidth', () => {
  it('correctly calculates width for default month size of 90', () => {
    expect(getCalendarYearWidth(90)).to.equal(293);
  });
});
