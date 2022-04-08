import moment from 'moment';
import { expect } from 'chai';

import isDayVisible from '../../src/utils/isDayVisible';

describe('#isDayVisible', () => {
  it('returns true if arg is in visible months', () => {
    const test = moment().add(3, 'months');
    const currentMonth = moment().add(2, 'months');
    expect(isDayVisible(test, currentMonth, 2)).to.equal(true);
  });

  it('returns false if arg is before first month', () => {
    const test = moment().add(1, 'months');
    const currentMonth = moment().add(2, 'months');
    expect(isDayVisible(test, currentMonth, 2)).to.equal(false);
  });

  it('returns false if arg is after last month', () => {
    const test = moment().add(4, 'months');
    const currentMonth = moment().add(2, 'months');
    expect(isDayVisible(test, currentMonth, 2)).to.equal(false);
  });

  describe('enableOutsideDays', () => {
    it('returns true if arg is in partial week before visible months', () => {
      const test = moment('2019-04-30');
      const currentMonth = moment('2019-05-01');
      expect(isDayVisible(test, currentMonth, 1, false)).to.equal(false);
      expect(isDayVisible(test, currentMonth, 1, true)).to.equal(true);
    });

    it('returns true if arg is in partial week after visible months', () => {
      const test = moment('2019-06-01');
      const currentMonth = moment('2019-05-01');
      expect(isDayVisible(test, currentMonth, 1, false)).to.equal(false);
      expect(isDayVisible(test, currentMonth, 1, true)).to.equal(true);
    });

    it('returns false if arg is before partial week before visible months', () => {
      const test = moment('2019-04-27');
      const currentMonth = moment('2019-05-01');
      expect(isDayVisible(test, currentMonth, 1, true)).to.equal(false);
    });

    it('returns false if arg is after partial week after visible months', () => {
      const test = moment('2019-06-03');
      const currentMonth = moment('2019-05-01');
      expect(isDayVisible(test, currentMonth, 1, true)).to.equal(false);
    });
  });

  // this test fails when run with the whole suite,
  // potentially due to cache pollution from other tests
  it.skip('works when the first day of the week that starts the month does not have a midnight', () => {
    const march29 = moment('2020-03-29').utcOffset(-1 /* 'Atlantic/Azores' */);
    const april2020 = moment('2020-04-02').utcOffset(-1 /* 'Atlantic/Azores' */);
    expect(isDayVisible(march29, april2020, 1, true)).to.equal(true);
  });
});
