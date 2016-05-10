import moment from 'moment';
import { expect } from 'chai';

import isInclusivelyBeforeDay from '../../src/utils/isInclusivelyBeforeDay';

const today = moment();
const tomorrow = moment().add(1, 'days');

describe('isInclusivelyBeforeDay', () => {
  it('returns true if first argument is before the second', () => {
    expect(isInclusivelyBeforeDay(today, tomorrow)).to.equal(true);
  });

  it('returns true for same day arguments', () => {
    expect(isInclusivelyBeforeDay(today, today)).to.equal(true);
  });

  it('returns false if first argument is after the second', () => {
    expect(isInclusivelyBeforeDay(tomorrow, today)).to.equal(false);
  });

  describe('non-moment object arguments', () => {
    it('is false if first argument is not a moment object', () => {
      expect(isInclusivelyBeforeDay(null, today)).to.equal(false);
    });

    it('is false if second argument is not a moment object', () => {
      expect(isInclusivelyBeforeDay(today, 'foo')).to.equal(false);
    });
  });
});
