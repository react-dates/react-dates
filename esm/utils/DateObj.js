import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _format from 'date-fns/format';
import _parse from 'date-fns/parse';
import _toDate from 'date-fns/toDate';
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
import _isSameDay from 'date-fns/isSameDay';
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
import _isValid from 'date-fns/isValid';
import enUS from 'date-fns/locale/en-US';
import { DISPLAY_FORMAT, ISO_FORMAT } from '../../constants';
var PERIODS_LIST = ['hour', 'day', 'week', 'month', 'year'];
var PERIODS = {
  hour: {
    add: addHours,
    subtract: subHours,
    startOf: startOfHour,
    endOf: endOfHour
  },
  day: {
    add: addDays,
    subtract: subDays,
    startOf: startOfDay,
    endOf: endOfDay,
    diff: differenceInDays,
    isSame: _isSameDay
  },
  week: {
    add: addWeeks,
    subtract: subWeeks,
    startOf: startOfWeek,
    endOf: endOfWeek,
    isSame: isSameWeek
  },
  month: {
    add: addMonths,
    subtract: subMonths,
    startOf: startOfMonth,
    endOf: endOfMonth,
    isSame: isSameMonth
  },
  year: {
    add: addYears,
    subtract: subYears,
    startOf: startOfYear,
    endOf: endOfYear,
    isSame: isSameYear
  }
};

var DateObj = /*#__PURE__*/function () {
  function DateObj() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        locale = _ref.locale;

    this.dataDate = new Date();
    this.dataLocale = locale || enUS;
  }

  DateObj.parse = function parse(date, formatString) {
    var formatArray = Array.isArray(formatString) ? formatString : [formatString];
    var found = DateObj.invalid();
    formatArray.find(function (formatStringSingle) {
      var parsedDate = _parse(date, formatStringSingle, new Date()); // Check that date parsing correct, workaround for https://github.com/date-fns/date-fns/issues/549


      if (DateObj.isValid(parsedDate) && _format(parsedDate, formatStringSingle) === date) {
        found = new DateObj().setDate(parsedDate);
        return true;
      }

      return undefined;
    });
    return found;
  };

  DateObj.toDateObject = function toDateObject(dateString, customFormat) {
    var dateFormats = customFormat ? [customFormat, DISPLAY_FORMAT, ISO_FORMAT] : [DISPLAY_FORMAT, ISO_FORMAT];
    var date = DateObj.parse(dateString, dateFormats);

    if (DateObj.isDate(date) && date.isValid()) {
      date.hours(12);
    }

    if (!date || !DateObj.isValid(date)) {
      return null;
    }

    return date;
  };

  DateObj.toDate = function toDate(date) {
    var newDate = new DateObj();

    if (date != null) {
      newDate.setDate(_toDate(date));
    }

    return newDate;
  };

  DateObj.isValid = function isValid(date) {
    return date instanceof DateObj ? _isValid(date.dataDate) : _isValid(date);
  };

  DateObj.isDate = function isDate(date) {
    return date instanceof DateObj;
  };

  DateObj.invalid = function invalid() {
    var newDate = new DateObj();
    return newDate.setDate(new Date('-'));
  };

  var _proto = DateObj.prototype;

  _proto.clone = function clone() {
    var newDate = new DateObj();
    newDate.dataDate = _toDate(this.dataDate);
    newDate.dataLocale = this.dataLocale == null ? this.dataLocale : _objectSpread({}, this.dataLocale);
    return newDate;
  };

  _proto.format = function format(formatString) {
    return _format(this.dataDate, formatString, {
      locale: this.dataLocale
    });
  };

  _proto.isValid = function isValid() {
    return DateObj.isValid(this.dataDate);
  };

  _proto.setDate = function setDate(date) {
    if (typeof date === 'number') {
      throw new Error('NUMBER!', date);
    }

    this.dataDate = date;
    return this;
  };

  _proto.setLocale = function setLocale(locale) {
    if (locale) {
      this.dataLocale = locale;
    }

    return this;
  };

  _proto.valueOf = function valueOf() {
    return this.dataDate.valueOf();
  };

  _proto.hour = function hour(val) {
    if (val == null) {
      return this.dataDate.getHours();
    }

    this.dataDate.setHours(val);
    return this;
  };

  _proto.hours = function hours(val) {
    return this.hour(val);
  };

  _proto.date = function date(val) {
    if (val == null) {
      return this.dataDate.getDate();
    }

    this.dataDate.setDate(val);
    return this;
  };

  _proto.day = function day(_day) {
    if (_day != null) {
      return this.setDate(setDay(this.dataDate, _day));
    }

    return getDay(this.dataDate);
  };

  _proto.weekday = function weekday(day) {
    return this.day(day);
  };

  _proto.month = function month(val) {
    if (val == null) {
      return this.dataDate.getMonth();
    }

    this.dataDate.setMonth(val);
    return this;
  };

  _proto.months = function months(val) {
    return this.month(val);
  };

  _proto.year = function year(val) {
    if (val == null) {
      return this.dataDate.getFullYear();
    }

    this.dataDate.setFullYear(val);
    return this;
  };

  _proto.years = function years(val) {
    return this.year(val);
  };

  _proto.daysInMonth = function daysInMonth() {
    return getDaysInMonth(this.dataDate);
  };

  DateObj.getRealPeriod = function getRealPeriod(period) {
    return typeof period === 'string' && period.endsWith('s') ? period.substr(0, period.length - 1) : period;
  };

  _proto.addOrSub = function addOrSub(action, val, period) {
    this.dataDate = PERIODS[DateObj.getRealPeriod(period)][action](this.dataDate, val);
    return this;
  };

  _proto.add = function add(val, period) {
    return this.addOrSub('add', val, period);
  };

  _proto.subtract = function subtract(val, period) {
    return this.addOrSub('subtract', val, period);
  };

  _proto.isAfterDay = function isAfterDay(date) {
    return isAfter(this.dataDate, date.dataDate);
  };

  _proto.isBeforeDay = function isBeforeDay(date) {
    return isBefore(this.dataDate, date.dataDate);
  };

  _proto.isSame = function isSame(date, period) {
    var _this = this;

    if (!period) {
      return isEqual(this.dataDate, date);
    }

    var i = PERIODS_LIST.indexOf(period);

    if (i === -1) {
      throw new Error("Period ".concat(period, " is not supported in DateObj.isSame()"));
    }

    var notSameCount = 0;
    PERIODS_LIST.slice(i).find(function (p) {
      if (!PERIODS[p].isSame(_this.dataDate, date)) {
        notSameCount += 1;
        return true;
      }

      return undefined;
    });
    return notSameCount === 0;
  };

  _proto.isSameDay = function isSameDay(date) {
    return _isSameDay(this.dataDate, date.dataDate);
  };

  _proto.isBetween = function isBetween(date1, date2) {
    return DateObj.isDate(date1) && DateObj.isDate(date2) && this.isAfterDay(date1) && this.isBeforeDay(date2);
  };

  _proto.periodAction = function periodAction(action, period, date) {
    return this.setDate(PERIODS[DateObj.getRealPeriod(period)][action](this.dataDate, date));
  };

  _proto.periodActionValue = function periodActionValue(action, period, date) {
    return PERIODS[DateObj.getRealPeriod(period)][action](this.dataDate, date);
  };

  _proto.startOf = function startOf(period) {
    return this.periodAction('startOf', period);
  };

  _proto.endOf = function endOf(period) {
    return this.periodAction('endOf', period);
  };

  _proto.diff = function diff(date, period) {
    return this.periodActionValue('diff', period, date);
  };

  _proto.localeData = function localeData() {
    var _this2 = this;

    if (this.dataLocale) {
      return {
        firstDayOfWeek: function firstDayOfWeek() {
          return _this2.dataLocale.options.weekStartsOn;
        },
        longDateFormat: function longDateFormat(formatString) {
          return _this2.dataLocale.formatLong(formatString);
        }
      };
    }

    return {
      firstDayOfWeek: function firstDayOfWeek() {
        return 0;
      },
      longDateFormat: function longDateFormat() {
        return 'YYYY-MM-DD';
      }
    };
  };

  return DateObj;
}();

export { DateObj as default };
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