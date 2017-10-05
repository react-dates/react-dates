import moment from 'moment';
import { expect } from 'chai';

import getCalendarYearMonths from '../../src/utils/getCalendarYearMonths';

const actualMonth = moment();
const monthsBlock = getCalendarYearMonths(actualMonth);

describe('getCalendarYearMonths', () => {
  it('returns an array of arrays', () => {
    expect(monthsBlock).to.be.instanceof(Array);

    monthsBlock.forEach((monthsTriplet) => {
      expect(monthsTriplet).to.be.instanceof(Array);
    });
  });

  it('actualMonth is included', () => {
    let isIncluded = false;
    monthsBlock.forEach((monthsTriplet) => {
      monthsTriplet.forEach((month) => {
        if (month && month.isSame(actualMonth, 'month')) isIncluded = true;
      });
    });

    expect(isIncluded).to.equal(true);
  });

  it('all months start at day 1', () => {
    monthsBlock.forEach((monthsTriplet) => {
      monthsTriplet.forEach((month) => {
        if (month) {
          expect(month.format('D')).to.equal('1');
        }
      });
    });
  });
});
