import moment from 'moment';
import { expect } from 'chai';

import { ISO_FORMAT, ISO_YEAR_FORMAT } from '../../constants';
import toISOYearString from '../../src/utils/toISOYearString';

describe('#toISOYearString', () => {
  describe('arg is a moment object', () => {
    it('returns year in ISO_YEAR_FORMAT format', () => {
      const today = moment();
      expect(toISOYearString(today)).to.equal(today.format(ISO_YEAR_FORMAT));
    });
  });

  describe('arg is a string', () => {
    describe('arg is in ISO format', () => {
      it('returns month in ISO_YEAR_FORMAT format', () => {
        const today = moment();
        const todayISO = today.format(ISO_FORMAT);
        expect(toISOYearString(todayISO)).to.equal(today.format(ISO_YEAR_FORMAT));
      });
    });

    describe('arg matches the second arg date format provided', () => {
      it('returns year in ISO_YEAR_FORMAT format', () => {
        const today = moment();
        const dateFormat = 'YY';
        const formattedDate = today.format(dateFormat);
        const yearString = toISOYearString(formattedDate, dateFormat);
        expect(yearString).to.equal(today.format(ISO_YEAR_FORMAT));
      });
    });

    describe('arg is neither in iso format or in the provided format', () => {
      it('returns null', () => {
        const today = moment();
        const dateFormat = 'MM_DD_YYYY';
        const formattedDate = today.format('MM-DD-YYYY');
        expect(toISOYearString(formattedDate, dateFormat)).to.equal(null);
      });
    });

    describe('arg is not a valid date string', () => {
      it('returns null', () => {
        expect(toISOYearString('This is not a date')).to.equal(null);
      });
    });
  });
});
