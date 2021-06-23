import { expect } from 'chai';

import format from 'date-fns/format';

import { ISO_FORMAT, ISO_MONTH_FORMAT } from '../../src/constants';
import toISOMonthString from '../../src/utils/toISOMonthString';

describe('#toISOMonthString', () => {
  describe('arg is a Date object', () => {
    it('returns month in ISO_MONTH_FORMAT format', () => {
      const today = new Date();
      expect(toISOMonthString(today)).to.equal(format(today, ISO_MONTH_FORMAT));
    });
  });

  describe('arg is a string', () => {
    describe('arg is in ISO format', () => {
      it('returns month in ISO_MONTH_FORMAT format', () => {
        const today = new Date();
        const todayISO = format(today, ISO_FORMAT);
        expect(toISOMonthString(todayISO)).to.equal(format(today, ISO_MONTH_FORMAT));
      });
    });

    describe('arg matches the second arg date format provided', () => {
      it('returns month in ISO_MONTH_FORMAT format', () => {
        const today = new Date();
        const dateFormat = 'MM_dd_yyyy';
        const formatteddate = format(today, dateFormat);
        const monthString = toISOMonthString(formatteddate, dateFormat);
        expect(monthString).to.equal(format(today, ISO_MONTH_FORMAT));
      });
    });

    describe('arg is neither in iso format or in the provided format', () => {
      it('returns null', () => {
        const today = new Date();
        const dateFormat = 'MM_dd_yyyy';
        const formatteddate = format(today, 'MM-dd-yyyy');
        expect(toISOMonthString(formatteddate, dateFormat)).to.equal(null);
      });
    });

    describe('arg is not a valid date string', () => {
      it('returns null', () => {
        expect(toISOMonthString('This is not a date')).to.equal(null);
      });
    });
  });
});
