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

  describe('Daylight Savings Time issues', () => {
    it('last of February does not equal first of March', () => {
      expect(isSameDay(toMomentObject('2017-02-28'), toMomentObject('2017-03-01'))).to.equal(false);
    });

    it('last of March does not equal first of April', () => {
      expect(isSameDay(toMomentObject('2017-03-31'), toMomentObject('2017-04-01'))).to.equal(false);
    });
  });

  describe('Catalan locale', () => {
    before(() => {
      moment.locale('ca');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Czech locale', () => {
    before(() => {
      moment.locale('cs');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13.07.1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Danish locale', () => {
    before(() => {
      moment.locale('da');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('German locale', () => {
    before(() => {
      moment.locale('de');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13.07.1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Greek locale', () => {
    before(() => {
      moment.locale('el');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('British-English locale', () => {
    before(() => {
      moment.locale('en-gb');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('American-English locale', () => {
    before(() => {
      moment.locale('en');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('07/13/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Spanish locale', () => {
    before(() => {
      moment.locale('es');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Finnish locale', () => {
    before(() => {
      moment.locale('fi');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13.07.1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('French locale', () => {
    before(() => {
      moment.locale('fr');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Hungarian locale', () => {
    before(() => {
      moment.locale('hu');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('1991.07.13.');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Indonesian locale', () => {
    before(() => {
      moment.locale('id');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Icelandic locale', () => {
    before(() => {
      moment.locale('is');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13.07.1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Italian locale', () => {
    before(() => {
      moment.locale('it');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Japanese locale', () => {
    before(() => {
      moment.locale('ja');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('1991/07/13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Korean locale', () => {
    before(() => {
      moment.locale('ko');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('1991.07.13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Malaysian locale', () => {
    before(() => {
      moment.locale('ms-my');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Dutch locale', () => {
    before(() => {
      moment.locale('nl');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13-07-1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Norwegian locale', () => {
    before(() => {
      moment.locale('nb');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13.07.1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Polish locale', () => {
    before(() => {
      moment.locale('pl');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13.07.1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Portuguese locale', () => {
    before(() => {
      moment.locale('pt');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13/07/1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Russian locale', () => {
    before(() => {
      moment.locale('ru');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13.07.1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Swedish locale', () => {
    before(() => {
      moment.locale('sv');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Thai locale', () => {
    before(() => {
      moment.locale('th');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('1991/07/13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Turkish locale', () => {
    before(() => {
      moment.locale('cs');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('13.07.1991');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Mainland Chinese locale', () => {
    before(() => {
      moment.locale('zh-cn');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('Taiwanese Chinese locale', () => {
    before(() => {
      moment.locale('zh-tw');
    });

    it('parses internationalized format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('xx locale', () => {
    before(() => {
      moment.locale('xx');
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });

  describe('xxlong locale', () => {
    before(() => {
      moment.locale('xxlong');
    });

    it('parses ISO-8601 format', () => {
      const date = toMomentObject('1991-07-13');

      expect(date).not.to.equal(null);
      expect(date.month()).to.equal(6); // moment months are zero-indexed
      expect(date.date()).to.equal(13);
      expect(date.year()).to.equal(1991);
    });
  });
});
