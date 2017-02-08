import { expect } from 'chai';
import moment from 'moment';

import doDateRangesOverlap from '../../src/utils/doDateRangesOverlap';

describe('#doDateRangesOverlap_spec', () => {
  it('returns false for non-overlapping date ranges', () => {
    expect(doDateRangesOverlap(
      moment('2016-01-01'),
      moment('2016-01-02'),
      moment('2016-02-01'),
      moment('2016-02-02'),
    )).to.equal(false);
  });

  it('returns true for overlapping date ranges', () => {
    expect(doDateRangesOverlap(
      moment('2016-01-01'),
      moment('2016-01-10'),
      moment('2016-01-09'),
      moment('2016-02-01'),
    )).to.equal(true);
  });

  it('considers same day as overlap', () => {
    expect(doDateRangesOverlap(
      moment('2016-01-01'),
      moment('2016-01-02'),
      moment('2016-01-02'),
      moment('2016-01-03'),
    )).to.equal(true);
  });
});
