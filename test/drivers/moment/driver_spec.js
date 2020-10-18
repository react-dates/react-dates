import { expect } from 'chai';

import moment from 'moment';
import parts from '../../../src/drivers/parts';
import formats from '../../../src/drivers/formats';
import driver from '../../../src/drivers/moment/driver';

describe('moment driver', () => {
  describe('valid', () => {
    it('returns true given a moment instance', () => {
      expect(driver.valid(moment())).to.equal(true);
    });

    it('returns false given a string', () => {
      expect(driver.valid('2019-01-01')).to.equal(false);
    });
  });

  describe('startOf', () => {
    it('returns the start of a day', () => {
      const date = moment('2019-02-05T19:12:14');
      const result = driver.startOf(date, parts.DAYS);
      expect(date.startOf('date').valueOf()).to.equal(result.valueOf());
      const expected = moment('2019-02-05T00:00:00');
      expect(date.startOf('date').valueOf()).to.equal(expected.valueOf());
    });

    it('returns the start of each supported part', () => {
      const map = {
        [parts.SECONDS]: 'second',
        [parts.MINUTES]: 'minute',
        [parts.HOURS]: 'hour',
        [parts.DAYS]: 'day',
        [parts.WEEKS]: 'week',
        [parts.MONTHS]: 'month',
        [parts.YEARS]: 'year',
      };

      Object.keys(map).forEach((key) => {
        const date = moment('2019-02-05T19:12:14');
        const result = driver.startOf(date, key);
        expect(date.startOf(map[key]).valueOf()).to.equal(result.valueOf());
      });
    });

    it('doesnt work with mismatching date parts', () => {
      const date = moment('2019-02-05T19:12:14');
      const result = driver.startOf(date, parts.MONTHS);
      expect(date.startOf('date').valueOf()).to.not.equal(result.valueOf());
    });
  });

  describe('endOf', () => {
    it('returns the end of a day', () => {
      const date = moment().hour(12);
      const result = driver.endOf(date, parts.DAYS);
      expect(date.endOf('date').valueOf()).to.equal(result.valueOf());
    });

    it('returns the end of each supported part', () => {
      const map = {
        [parts.SECONDS]: 'second',
        [parts.MINUTES]: 'minute',
        [parts.HOURS]: 'hour',
        [parts.DAYS]: 'day',
        [parts.WEEKS]: 'week',
        [parts.MONTHS]: 'month',
        [parts.YEARS]: 'year',
      };

      Object.keys(map).forEach((key) => {
        const date = moment('2019-02-05T19:12:14');
        const result = driver.endOf(date, key);
        expect(date.endOf(map[key]).valueOf()).to.equal(result.valueOf());
      });
    });

    it('doesnt work with mismatching date parts', () => {
      const date = moment('2019-02-05T19:12:14');
      const result = driver.endOf(date, parts.MONTHS);
      expect(date.endOf('day').valueOf()).to.not.equal(result.valueOf());
    });
  });

  describe('set', () => {
    it('sets a day', () => {
      const date = moment('2019-02-05T19:12:14');
      const result = driver.set(date, { [parts.DAYS]: 1 });
      const actual = moment('2019-02-01T19:12:14');
      expect(result.format('LLLL')).to.equal(actual.format('LLLL'));
    });

    it('sets a date part', () => {
      const map = {
        [parts.SECONDS]: 'second',
        [parts.MINUTES]: 'minute',
        [parts.HOURS]: 'hour',
        [parts.DAYS]: 'date',
        [parts.MONTHS]: 'month',
        [parts.YEARS]: 'year',
      };

      Object.keys(map).forEach((key) => {
        const date = moment('2019-02-05T19:12:14');
        const result = driver.set(date, { [key]: 1 });
        const actual = date.set(map[key], 1);
        expect(actual.format('LLLL')).to.equal(result.format('LLLL'));
      });
    });
  });

  describe('add', () => {
    it('adds time to a date', () => {
      const date = moment('2019-02-05T19:12:14');
      const result = driver.add(date, {
        [parts.SECONDS]: 46,
        [parts.MINUTES]: 47,
        [parts.HOURS]: 1,
        [parts.DAYS]: 1,
        [parts.WEEKS]: 1,
        [parts.MONTHS]: 1,
        [parts.YEARS]: 1,
      });
      const actual = moment('2020-03-13T21:00:00');
      expect(result.format('LLLL')).to.equal(actual.format('LLLL'));
    });

    it('subtracts time using negatives', () => {
      const date = moment('2019-02-05T19:12:14');
      const result = driver.add(date, {
        [parts.SECONDS]: -14,
        [parts.MINUTES]: -12,
        [parts.HOURS]: -1,
        [parts.DAYS]: -1,
        [parts.WEEKS]: -1,
        [parts.MONTHS]: -1,
        [parts.YEARS]: -1,
      });
      const actual = moment('2017-12-28T18:00:00');
      expect(result.format('LLLL')).to.equal(actual.format('LLLL'));
    });
  });

  describe('subtract', () => {
    it('adds time to a date using negatives', () => {
      const date = moment('2019-02-05T19:12:14');
      const result = driver.subtract(date, {
        [parts.SECONDS]: -46,
        [parts.MINUTES]: -47,
        [parts.HOURS]: -1,
        [parts.DAYS]: -1,
        [parts.WEEKS]: -1,
        [parts.MONTHS]: -1,
        [parts.YEARS]: -1,
      });
      const actual = moment('2020-03-13T21:00:00');
      expect(result.format('LLLL')).to.equal(actual.format('LLLL'));
    });

    it('subtracts time', () => {
      const date = moment('2019-02-05T19:12:14');
      const result = driver.subtract(date, {
        [parts.SECONDS]: 14,
        [parts.MINUTES]: 12,
        [parts.HOURS]: 1,
        [parts.DAYS]: 1,
        [parts.WEEKS]: 1,
        [parts.MONTHS]: 1,
        [parts.YEARS]: 1,
      });
      const actual = moment('2017-12-28T18:00:00');
      expect(result.format('LLLL')).to.equal(actual.format('LLLL'));
    });

    it('is the opposite of add', () => {
      const date = moment('2019-02-05T19:12:14');
      const intermediate = driver.subtract(date, {
        [parts.SECONDS]: 14,
        [parts.MINUTES]: 12,
        [parts.HOURS]: 1,
        [parts.DAYS]: 1,
        [parts.WEEKS]: 1,
        [parts.MONTHS]: 1,
        [parts.YEARS]: 1,
      });
      const result = driver.add(intermediate, {
        [parts.SECONDS]: 14,
        [parts.MINUTES]: 12,
        [parts.HOURS]: 1,
        [parts.DAYS]: 1,
        [parts.WEEKS]: 1,
        [parts.MONTHS]: 1,
        [parts.YEARS]: 1,
      });
      expect(result.format('LLLL')).to.equal(date.format('LLLL'));
    });
  });

  describe('diff', () => {
    it('returns the diff of two dates', () => {
      const a = moment('2019-02-01T12:00:00');
      const b = moment('2019-03-01T18:00:00');

      expect(driver.diff(b, a, parts.DAYS)).to.equal(28);
      expect(driver.diff(b, a, parts.WEEKS)).to.equal(4);
      expect(driver.diff(b, a, parts.MONTHS)).to.equal(1);
      expect(driver.diff(b, a, parts.HOURS)).to.equal(678);
    });
  });

  describe('get', () => {
    it('gets a part', () => {
      const date = moment('2019-02-05T19:12:14');
      expect(driver.get(date, parts.SECONDS)).to.equal(14);
      expect(driver.get(date, parts.MINUTES)).to.equal(12);
      expect(driver.get(date, parts.HOURS)).to.equal(19);
      expect(driver.get(date, parts.DAYS)).to.equal(5);
      expect(driver.get(date, parts.MONTHS)).to.equal(1);
      expect(driver.get(date, parts.YEARS)).to.equal(2019);
    });
  });

  describe('format', () => {
    it('formats correctly', () => {
      const date = moment('2019-02-05T19:12:14');
      expect(driver.format(date, driver.formatString(formats.DAY)))
        .to.equal('5');
      expect(driver.format(date, driver.formatString(formats.MONTH)))
        .to.equal('February 2019');
      expect(driver.format(date, driver.formatString(formats.WEEKDAY)))
        .to.equal('Tu');
      expect(driver.format(date, driver.formatString(formats.DISPLAY)))
        .to.equal('02/05/2019');
    });
  });
});
