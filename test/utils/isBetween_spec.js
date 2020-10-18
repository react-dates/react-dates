import moment from 'moment';
import { expect } from 'chai';

import isBetween from '../../src/utils/isBetween';

const today = moment();
const tomorrow = moment().add(1, 'days');
const yesterday = moment().subtract(1, 'days');

describe('isBetween', () => {
  it('returns true when between two dates', () => {
    expect(isBetween(today, yesterday, tomorrow)).to.equal(true);
  });

  it('returns false if the date is after', () => {
    expect(isBetween(tomorrow, today, yesterday)).to.equal(false);
  });

  it('returns false if the date is before', () => {
    expect(isBetween(yesterday, today, tomorrow)).to.equal(false);
  });

  describe('non-moment object arguments', () => {
    it('is false if first argument is not a moment object', () => {
      expect(isBetween(null, tomorrow, yesterday)).to.equal(false);
    });

    it('is false if second argument is not a moment object', () => {
      expect(isBetween(today, 'foo', 'foo')).to.equal(false);
    });
  });
});
