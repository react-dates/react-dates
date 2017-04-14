import moment from 'moment';
import { expect } from 'chai';

import { ISO_FORMAT, ISO_MONTH_FORMAT } from '../../constants';
import toISOMonthString from '../../src/utils/toISOMonthString';

describe('#toISOMonthString', () => {
  describe('arg is a moment object', () => {
    it('returns month in ISO_MONTH_FORMAT format', () => {
      const today = moment();
      expect(toISOMonthString(today)).to.equal(today.format(ISO_MONTH_FORMAT));
    });
  });

  describe('arg is a string', () => {
    describe('arg is in ISO format', () => {
      it('returns month in ISO_MONTH_FORMAT format', () => {
        const today = moment();
        const todayISO = today.format(ISO_FORMAT);
        expect(toISOMonthString(todayISO)).to.equal(today.format(ISO_MONTH_FORMAT));
      });
    });

    describe('arg matches the second arg date format provided', () => {
      it('returns month in ISO_MONTH_FORMAT format', () => {
        const today = moment();
        const dateFormat = 'MM_DD_YYYY';
        const formattedDate = today.format(dateFormat);
        const monthString = toISOMonthString(formattedDate, dateFormat);
        expect(monthString).to.equal(today.format(ISO_MONTH_FORMAT));
      });
    });

    describe('arg is neither in iso format or in the provided format', () => {
      it('returns null', () => {
        const today = moment();
        const dateFormat = 'MM_DD_YYYY';
        const formattedDate = today.format('MM-DD-YYYY');
        expect(toISOMonthString(formattedDate, dateFormat)).to.equal(null);
      });
    });

    describe('arg is not a valid date string', () => {
      it('returns null', () => {
        expect(toISOMonthString('This is not a date')).to.equal(null);
      });
    });
  });
});
