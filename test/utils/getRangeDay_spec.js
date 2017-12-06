import { expect } from 'chai';
import moment from 'moment';

import getRangeDay from '../../src/utils/getRangeDay';

const today = moment('2017-12-06T12:41:00+11:00');

describe('#getRangeDay', () => {
  it('returns a function modified moment object', () => {
    const fn = day => day.add(2, 'days');
    const modifiedDay = getRangeDay(fn, today);
    expect(modifiedDay.format()).to.equal('2017-12-08T12:41:00+11:00');
  });

  it('returns the passed day when function is undefined', () => {
    const modifiedDay = getRangeDay(undefined, today);
    expect(modifiedDay.format()).to.equal('2017-12-06T12:41:00+11:00');
  });

  it('modifies the returned day using the modifier callback', () => {
    const fn = day => day.add(2, 'days');
    const modifier = day => day.subtract(2, 'days');
    const modifiedDay = getRangeDay(fn, today, modifier);
    expect(modifiedDay.format()).to.equal('2017-12-06T12:41:00+11:00');
  });

  it('does not apply the modifier if function is undefined', () => {
    const modifier = day => day.subtract(2, 'days');
    const modifiedDay = getRangeDay(undefined, today, modifier);
    expect(modifiedDay.format()).to.equal('2017-12-06T12:41:00+11:00');
  });
});
