import moment from 'moment';
import { expect } from 'chai';

import toLocalizedDateString from '../../src/utils/toLocalizedDateString';

describe('toLocalizedDateString', () => {
  it('returns null for falsy argument', () => {
    expect(toLocalizedDateString()).to.equal(null);
  });

  describe('Catalan locale', () => {
    before(() => {
      moment.locale('ca');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('Czech locale', () => {
    before(() => {
      moment.locale('cs');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13.07.1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13.07.1991');
    });
  });

  describe('Danish locale', () => {
    before(() => {
      moment.locale('da');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('German locale', () => {
    before(() => {
      moment.locale('de');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13.07.1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13.07.1991');
    });
  });

  describe('Greek locale', () => {
    before(() => {
      moment.locale('el');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('British-English locale', () => {
    before(() => {
      moment.locale('en-gb');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('American-English locale', () => {
    before(() => {
      moment.locale('en');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('07/13/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('07/13/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '07/13/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('07/13/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('07/13/1991');
    });
  });

  describe('Spanish locale', () => {
    before(() => {
      moment.locale('es');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('Finnish locale', () => {
    before(() => {
      moment.locale('fi');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13.07.1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13.07.1991');
    });
  });

  describe('French locale', () => {
    before(() => {
      moment.locale('fr');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('Hungarian locale', () => {
    before(() => {
      moment.locale('hu');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991.07.13.');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991.07.13.');
    });

    it('localized date strings stay the same', () => {
      const testDate = '1991.07.13.';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991.07.13.');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('1991.07.13.');
    });
  });

  describe('Indonesian locale', () => {
    before(() => {
      moment.locale('id');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('Icelandic locale', () => {
    before(() => {
      moment.locale('is');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13.07.1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13.07.1991');
    });
  });

  describe('Italian locale', () => {
    before(() => {
      moment.locale('it');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('Japanese locale', () => {
    before(() => {
      moment.locale('ja');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991/07/13');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991/07/13');
    });

    it('localized date strings stay the same', () => {
      const testDate = '1991/07/13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991/07/13');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('1991/07/13');
    });
  });

  describe('Korean locale', () => {
    before(() => {
      moment.locale('ko');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991.07.13');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991.07.13');
    });

    it('localized date strings stay the same', () => {
      const testDate = '1991.07.13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991.07.13');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('1991.07.13');
    });
  });

  describe('Malaysian locale', () => {
    before(() => {
      moment.locale('ms-my');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('Dutch locale', () => {
    before(() => {
      moment.locale('nl');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13-07-1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13-07-1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13-07-1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13-07-1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13-07-1991');
    });
  });

  describe('Norwegian locale', () => {
    before(() => {
      moment.locale('nb');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13.07.1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13.07.1991');
    });
  });

  describe('Polish locale', () => {
    before(() => {
      moment.locale('pl');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13.07.1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13.07.1991');
    });
  });

  describe('Portuguese locale', () => {
    before(() => {
      moment.locale('pt');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13/07/1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13/07/1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13/07/1991');
    });
  });

  describe('Russian locale', () => {
    before(() => {
      moment.locale('ru');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13.07.1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13.07.1991');
    });
  });

  describe('Swedish locale', () => {
    before(() => {
      moment.locale('sv');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991-07-13');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991-07-13');
    });

    it('localized date strings stay the same', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991-07-13');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('1991-07-13');
    });
  });

  describe('Thai locale', () => {
    before(() => {
      moment.locale('th');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991/07/13');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991/07/13');
    });

    it('localized date strings stay the same', () => {
      const testDate = '1991/07/13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991/07/13');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('1991/07/13');
    });
  });

  describe('Turkish locale', () => {
    before(() => {
      moment.locale('cs');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('localized date strings stay the same', () => {
      const testDate = '13.07.1991';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('13.07.1991');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('13.07.1991');
    });
  });

  describe('Mainland Chinese locale', () => {
    before(() => {
      moment.locale('zh-cn');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991-07-13');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991-07-13');
    });

    it('localized date strings stay the same', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991-07-13');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('1991-07-13');
    });
  });

  describe('Taiwanese Chinese locale', () => {
    before(() => {
      moment.locale('zh-tw');
    });

    it('converts moment object to localized date string', () => {
      const testDate = moment('1991-07-13');
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991年7月13日');
    });

    it('converts iso date string to localized date string', () => {
      const testDate = '1991-07-13';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991年7月13日');
    });

    it('localized date strings stay the same', () => {
      const testDate = '1991年7月13日';
      const dateString = toLocalizedDateString(testDate);
      expect(dateString).to.equal('1991年7月13日');
    });

    it('converts custom format date strings with format passed in', () => {
      const testDate = '1991---13/07';
      const dateString = toLocalizedDateString(testDate, 'YYYY---DD/MM');
      expect(dateString).to.equal('1991年7月13日');
    });
  });
});
