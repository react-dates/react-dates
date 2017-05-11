import moment from 'moment';
import { expect } from 'chai';

import isSameDay from '../../src/utils/isSameDay';
import toMomentObject from '../../src/utils/toMomentObject';

describe('toMomentObject', () => {
  it('returns null for null input', () => {
    expect(toMomentObject(null)).to.equal(null);
  });

  it('returns null for undefined input', () => {
    expect(toMomentObject(undefined)).to.equal(null);
  });

  it('returns null for empty string', () => {
    expect(toMomentObject('')).to.equal(null);
  });

  it('returns null for no input', () => {
    expect(toMomentObject()).to.equal(null);
  });

  it('output has time of 12PM', () => {
    expect(toMomentObject('1991-07-13').hour()).to.equal(12);
  });

  it('parses custom format', () => {
    const date = toMomentObject('1991---13/07', 'YYYY---DD/MM');

    expect(date).not.to.equal(null);
    expect(date.month()).to.equal(6); // moment months are zero-indexed
    expect(date.date()).to.equal(13);
    expect(date.year()).to.equal(1991);
  });

  it('parses localized format', () => {
    const date = toMomentObject(moment('1991-07-13').format('L'));

    expect(date).not.to.equal(null);
    expect(date.month()).to.equal(6); // moment months are zero-indexed
    expect(date.date()).to.equal(13);
    expect(date.year()).to.equal(1991);
  });

  describe('Daylight Savings Time issues', () => {
    it('last of February does not equal first of March', () => {
      expect(isSameDay(toMomentObject('2017-02-28'), toMomentObject('2017-03-01'))).to.equal(false);
    });

    it('last of March does not equal first of April', () => {
      expect(isSameDay(toMomentObject('2017-03-31'), toMomentObject('2017-04-01'))).to.equal(false);
    });
  });
});
