import moment from 'moment';
import { expect } from 'chai';

import isSameDay from '../../src/utils/isSameDay';

const today = moment();
const tomorrow = moment().add(1, 'days');

describe('isSameDay', () => {
  it('returns true if args are the same day', () => {
    expect(isSameDay(today, today)).to.equal(true);
  });

  it('returns false if args are not the same day', () => {
    expect(isSameDay(today, tomorrow)).to.equal(false);
  });

  describe('non-moment object arguments', () => {
    it('is false if first argument is not a moment object', () => {
      expect(isSameDay(null, today)).to.equal(false);
    });

    it('is false if second argument is not a moment object', () => {
      expect(isSameDay(today, 'foo')).to.equal(false);
    });
  });
});
