import { expect } from 'chai';

import addDays from 'date-fns/addDays';

import isNextDay from '../../src/utils/isNextDay';

const today = new Date();
const tomorrow = addDays(new Date(), 1);

describe('isNextDay', () => {
  it('returns true if second argument is the next day after the first', () => {
    expect(isNextDay(today, tomorrow)).to.equal(true);
  });

  it('returns false if the second arg is not the next day after the first', () => {
    expect(isNextDay(tomorrow, today)).to.equal(false);
  });

  describe('non-Date arguments', () => {
    it('is false if first argument is not a Date object', () => {
      expect(isNextDay(null, today)).to.equal(false);
    });

    it('is false if second argument is not a Date object', () => {
      expect(isNextDay(today, 'foo')).to.equal(false);
    });
  });
});
