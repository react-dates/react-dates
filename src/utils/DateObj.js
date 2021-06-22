import format from 'date-fns/format';
import parse from 'date-fns/parse';
import toDate from 'date-fns/toDate';
import addHours from 'date-fns/addHours';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import subHours from 'date-fns/subHours';
import subDays from 'date-fns/subDays';
import subWeeks from 'date-fns/subWeeks';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
import isSameDay from 'date-fns/isSameDay';
import isSameWeek from 'date-fns/isSameWeek';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import startOfHour from 'date-fns/startOfHour';
import endOfHour from 'date-fns/endOfHour';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import getDay from 'date-fns/getDay';
import setDay from 'date-fns/setDay';
import differenceInDays from 'date-fns/differenceInDays';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import isValid from 'date-fns/isValid';
import enUS from 'date-fns/locale/en-US';

import { DISPLAY_FORMAT, ISO_FORMAT } from '../../constants';

const PERIODS_LIST = ['hour', 'day', 'week', 'month', 'year'];
const PERIODS = {
  hour: {
    add: addHours,
    subtract: subHours,
    startOf: startOfHour,
    endOf: endOfHour,
  },
  day: {
    add: addDays,
    subtract: subDays,
    startOf: startOfDay,
    endOf: endOfDay,
    diff: differenceInDays,
    isSame: isSameDay,
  },
  week: {
    add: addWeeks,
    subtract: subWeeks,
    startOf: startOfWeek,
    endOf: endOfWeek,
    isSame: isSameWeek,
  },
  month: {
    add: addMonths,
    subtract: subMonths,
    startOf: startOfMonth,
    endOf: endOfMonth,
    isSame: isSameMonth,
  },
  year: {
    add: addYears,
    subtract: subYears,
    startOf: startOfYear,
    endOf: endOfYear,
    isSame: isSameYear,
  },
};

export default class DateObj {
  constructor({ locale } = {}) {
    this.dataDate = new Date();
    this.dataLocale = locale || enUS;
  }

  static parse(date, formatString) {
    const formatArray = Array.isArray(formatString) ? formatString : [formatString];
    let found = DateObj.invalid();
    formatArray.find((formatStringSingle) => {
      const parsedDate = parse(date, formatStringSingle, new Date());

      // Check that date parsing correct, workaround for https://github.com/date-fns/date-fns/issues/549
      if (DateObj.isValid(parsedDate) && format(parsedDate, formatStringSingle) === date) {
        found = new DateObj().setDate(parsedDate);
        return true;
      }

      return undefined;
    });

    return found;
  }

  static toDateObject(dateString, customFormat) {
    const dateFormats = customFormat
      ? [customFormat, DISPLAY_FORMAT, ISO_FORMAT]
      : [DISPLAY_FORMAT, ISO_FORMAT];
    const date = DateObj.parse(dateString, dateFormats);
    if (DateObj.isDate(date) && date.isValid()) {
      date.hours(12);
    }

    if (!date || !DateObj.isValid(date)) {
      return null;
    }

    return date;
  }

  static toDate(date) {
    const newDate = new DateObj();
    if (date != null) {
      newDate.setDate(toDate(date));
    }

    return newDate;
  }

  static isValid(date) {
    return date instanceof DateObj ? isValid(date.dataDate) : isValid(date);
  }

  static isDate(date) {
    return date instanceof DateObj;
  }

  static invalid() {
    const newDate = new DateObj();
    return newDate.setDate(new Date('-'));
  }

  clone() {
    const newDate = new DateObj();
    newDate.dataDate = toDate(this.dataDate);
    newDate.dataLocale = this.dataLocale == null
      ? this.dataLocale : ({ ...this.dataLocale });

    return newDate;
  }

  format(formatString) {
    return format(this.dataDate, formatString, { locale: this.dataLocale });
  }

  isValid() {
    return DateObj.isValid(this.dataDate);
  }

  setDate(date) {
    if (typeof date === 'number') {
      throw new Error('NUMBER!', date);
    }
    this.dataDate = date;
    return this;
  }

  setLocale(locale) {
    if (locale) {
      this.dataLocale = locale;
    }

    return this;
  }

  valueOf() {
    return this.dataDate.valueOf();
  }

  hour(val) {
    if (val == null) {
      return this.dataDate.getHours();
    }

    this.dataDate.setHours(val);

    return this;
  }

  hours(val) {
    return this.hour(val);
  }

  date(val) {
    if (val == null) {
      return this.dataDate.getDate();
    }

    this.dataDate.setDate(val);

    return this;
  }

  day(day) {
    if (day != null) {
      return this.setDate(setDay(this.dataDate, day));
    }

    return getDay(this.dataDate);
  }

  weekday(day) {
    return this.day(day);
  }

  month(val) {
    if (val == null) {
      return this.dataDate.getMonth();
    }

    this.dataDate.setMonth(val);

    return this;
  }

  months(val) {
    return this.month(val);
  }

  year(val) {
    if (val == null) {
      return this.dataDate.getFullYear();
    }

    this.dataDate.setFullYear(val);

    return this;
  }

  years(val) {
    return this.year(val);
  }

  daysInMonth() {
    return getDaysInMonth(this.dataDate);
  }

  static getRealPeriod(period) {
    return typeof period === 'string' && period.endsWith('s') ? period.substr(0, period.length - 1) : period;
  }

  addOrSub(action, val, period) {
    this.dataDate = PERIODS[DateObj.getRealPeriod(period)][action](this.dataDate, val);

    return this;
  }

  add(val, period) {
    return this.addOrSub('add', val, period);
  }

  subtract(val, period) {
    return this.addOrSub('subtract', val, period);
  }

  isAfterDay(date) {
    return isAfter(this.dataDate, date.dataDate);
  }

  isBeforeDay(date) {
    return isBefore(this.dataDate, date.dataDate);
  }

  isSame(date, period) {
    if (!period) {
      return isEqual(this.dataDate, date);
    }
    const i = PERIODS_LIST.indexOf(period);
    if (i === -1) {
      throw new Error(`Period ${period} is not supported in DateObj.isSame()`);
    }
    let notSameCount = 0;
    PERIODS_LIST.slice(i).find((p) => {
      if (!PERIODS[p].isSame(this.dataDate, date)) {
        notSameCount += 1;
        return true;
      }

      return undefined;
    });

    return notSameCount === 0;
  }

  isSameDay(date) {
    return isSameDay(this.dataDate, date.dataDate);
  }

  isBetween(date1, date2) {
    return DateObj.isDate(date1) && DateObj.isDate(date2) && this.isAfterDay(date1)
      && this.isBeforeDay(date2);
  }

  periodAction(action, period, date) {
    return this.setDate(PERIODS[DateObj.getRealPeriod(period)][action](this.dataDate, date));
  }

  periodActionValue(action, period, date) {
    return PERIODS[DateObj.getRealPeriod(period)][action](new Date(), new Date(date));
  }

  startOf(period) {
    return this.periodAction('startOf', period);
  }

  endOf(period) {
    return this.periodAction('endOf', period);
  }

  diff(date, period) {
    return this.periodActionValue('diff', period, date);
  }

  localeData() {
    if (this.dataLocale) {
      return {
        firstDayOfWeek: () => this.dataLocale.options.weekStartsOn,
        longDateFormat: () => ((this.dataLocale || enUS).formatLong.date({ width: 'short' })),

        // TODO fix this
        // firstDayOfWeek: () => (this.dataLocale || enUS).options?.weekStartsOn,
        // longDateFormat: () => enUS.formatLong,
      };
    }

    return {
      firstDayOfWeek: () => 0,
      longDateFormat: () => 'yyyy-mm-dd',
    };
  }
}

export function moment(date) {
  if (date instanceof DateObj) {
    return date.clone();
  }

  return DateObj.toDate(date);
}

moment.isMoment = function isMoment(date) {
  return DateObj.isDate(date);
};

moment.invalid = function invalid() {
  return DateObj.invalid();
};
