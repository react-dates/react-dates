import { expect } from 'chai';
import moment from 'moment';

import getSelectedDateOffset from '../../src/utils/getSelectedDateOffset';

const today = moment('2017-12-06T12:41:00+11:00');

describe('#getSelectedDateOffset', () => {
  it('returns a function modified moment object', () => {
    const fn = day => day.add(2, 'days');
    const modifiedDay = getSelectedDateOffset(fn, today);
    expect(modifiedDay.format()).to.equal('2017-12-08T12:41:00+11:00');
  });

  it('returns the passed day when function is undefined', () => {
    const modifiedDay = getSelectedDateOffset(undefined, today);
    expect(modifiedDay.format()).to.equal('2017-12-06T12:41:00+11:00');
  });

  it('modifies the returned day using the modifier callback', () => {
    const fn = day => day.add(2, 'days');
    const modifier = day => day.subtract(2, 'days');
    const modifiedDay = getSelectedDateOffset(fn, today, modifier);
    expect(modifiedDay.format()).to.equal('2017-12-06T12:41:00+11:00');
  });

  it('does not apply the modifier if function is undefined', () => {
    const modifier = day => day.subtract(2, 'days');
    const modifiedDay = getSelectedDateOffset(undefined, today, modifier);
    expect(modifiedDay.format()).to.equal('2017-12-06T12:41:00+11:00');
  });
});
