import { expect } from 'chai';
import DateObj from '../../src/utils/DateObj';

describe('toDateObject', () => {
  it('returns null for null input', () => {
    expect(DateObj.toDateObject(null)).to.equal(null);
  });

  it('returns null for undefined input', () => {
    expect(DateObj.toDateObject(undefined)).to.equal(null);
  });

  it('returns null for empty string', () => {
    expect(DateObj.toDateObject('')).to.equal(null);
  });

  it('returns null for no input', () => {
    expect(DateObj.toDateObject()).to.equal(null);
  });

  it('output has time of 12PM', () => {
    expect(DateObj.toDateObject('1991-07-13').hour()).to.equal(12);
  });

  it('parses custom format', () => {
    const date = DateObj.toDateObject('1991---13/07', 'YYYY---DD/MM');

    expect(date).not.to.equal(null);
    expect(date.month()).to.equal(6); // moment months are zero-indexed
    expect(date.date()).to.equal(13);
    expect(date.year()).to.equal(1991);
  });

  it('parses localized format', () => {
    const date = DateObj.toDateObject(DateObj.toDateObject('1991-07-13').format('L'));

    expect(date).not.to.equal(null);
    expect(date.month()).to.equal(6); // moment months are zero-indexed
    expect(date.date()).to.equal(13);
    expect(date.year()).to.equal(1991);
  });

  describe('Daylight Savings Time issues', () => {
    it('last of February does not equal first of March', () => {
      expect(DateObj.toDateObject('2017-02-28').isSameDay(DateObj.toDateObject('2017-03-01'))).to.equal(false);
    });

    it('last of March does not equal first of April', () => {
      expect(DateObj.toDateObject('2017-03-31').isSameDay(DateObj.toDateObject('2017-04-01'))).to.equal(false);
    });
  });
});
