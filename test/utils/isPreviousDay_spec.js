import { expect } from 'chai';
import subDays from 'date-fns/subDays';

import isPreviousDay from '../../src/utils/isPreviousDay';

const today = new Date();
const yesterday = subDays(today, 1);

describe('isPreviousDay', () => {
  it('returns true if second argument is the day immediately before the first', () => {
    expect(isPreviousDay(today, yesterday)).to.equal(true);
  });

  it('returns false if the second arg is not the day immediately before the first', () => {
    expect(isPreviousDay(yesterday, today)).to.equal(false);
  });

  describe('non-Date arguments', () => {
    it('is false if first argument is not a Date object', () => {
      expect(isPreviousDay(null, today)).to.equal(false);
    });

    it('is false if second argument is not a Date object', () => {
      expect(isPreviousDay(today, 'foo')).to.equal(false);
    });
  });
});
