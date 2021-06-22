"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moment = moment;
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _format2 = _interopRequireDefault(require("date-fns/format"));

var _parse2 = _interopRequireDefault(require("date-fns/parse"));

var _toDate2 = _interopRequireDefault(require("date-fns/toDate"));

var _addHours = _interopRequireDefault(require("date-fns/addHours"));

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

var _addWeeks = _interopRequireDefault(require("date-fns/addWeeks"));

var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));

var _addYears = _interopRequireDefault(require("date-fns/addYears"));

var _subHours = _interopRequireDefault(require("date-fns/subHours"));

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _subWeeks = _interopRequireDefault(require("date-fns/subWeeks"));

var _subMonths = _interopRequireDefault(require("date-fns/subMonths"));

var _subYears = _interopRequireDefault(require("date-fns/subYears"));

var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));

var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));

var _isEqual = _interopRequireDefault(require("date-fns/isEqual"));

var _isSameDay2 = _interopRequireDefault(require("date-fns/isSameDay"));

var _isSameWeek = _interopRequireDefault(require("date-fns/isSameWeek"));

var _isSameMonth = _interopRequireDefault(require("date-fns/isSameMonth"));

var _isSameYear = _interopRequireDefault(require("date-fns/isSameYear"));

var _startOfHour = _interopRequireDefault(require("date-fns/startOfHour"));

var _endOfHour = _interopRequireDefault(require("date-fns/endOfHour"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));

var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));

var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));

var _startOfYear = _interopRequireDefault(require("date-fns/startOfYear"));

var _endOfYear = _interopRequireDefault(require("date-fns/endOfYear"));

var _getDay = _interopRequireDefault(require("date-fns/getDay"));

var _setDay = _interopRequireDefault(require("date-fns/setDay"));

var _differenceInDays = _interopRequireDefault(require("date-fns/differenceInDays"));

var _getDaysInMonth = _interopRequireDefault(require("date-fns/getDaysInMonth"));

var _isValid2 = _interopRequireDefault(require("date-fns/isValid"));

var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));

var _constants = require("../../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PERIODS_LIST = ['hour', 'day', 'week', 'month', 'year'];
var PERIODS = {
  hour: {
    add: _addHours["default"],
    subtract: _subHours["default"],
    startOf: _startOfHour["default"],
    endOf: _endOfHour["default"]
  },
  day: {
    add: _addDays["default"],
    subtract: _subDays["default"],
    startOf: _startOfDay["default"],
    endOf: _endOfDay["default"],
    diff: _differenceInDays["default"],
    isSame: _isSameDay2["default"]
  },
  week: {
    add: _addWeeks["default"],
    subtract: _subWeeks["default"],
    startOf: _startOfWeek["default"],
    endOf: _endOfWeek["default"],
    isSame: _isSameWeek["default"]
  },
  month: {
    add: _addMonths["default"],
    subtract: _subMonths["default"],
    startOf: _startOfMonth["default"],
    endOf: _endOfMonth["default"],
    isSame: _isSameMonth["default"]
  },
  year: {
    add: _addYears["default"],
    subtract: _subYears["default"],
    startOf: _startOfYear["default"],
    endOf: _endOfYear["default"],
    isSame: _isSameYear["default"]
  }
};

var DateObj = /*#__PURE__*/function () {
  function DateObj() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        locale = _ref.locale;

    this.dataDate = new Date();
    this.dataLocale = locale || _enUS["default"];
  }

  DateObj.parse = function parse(date, formatString) {
    var formatArray = Array.isArray(formatString) ? formatString : [formatString];
    var found = DateObj.invalid();
    formatArray.find(function (formatStringSingle) {
      var parsedDate = (0, _parse2["default"])(date, formatStringSingle, new Date()); // Check that date parsing correct, workaround for https://github.com/date-fns/date-fns/issues/549

      if (DateObj.isValid(parsedDate) && (0, _format2["default"])(parsedDate, formatStringSingle) === date) {
        found = new DateObj().setDate(parsedDate);
        return true;
      }

      return undefined;
    });
    return found;
  };

  DateObj.toDateObject = function toDateObject(dateString, customFormat) {
    var dateFormats = customFormat ? [customFormat, _constants.DISPLAY_FORMAT, _constants.ISO_FORMAT] : [_constants.DISPLAY_FORMAT, _constants.ISO_FORMAT];
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
      newDate.setDate((0, _toDate2["default"])(date));
    }

    return newDate;
  };

  DateObj.isValid = function isValid(date) {
    return date instanceof DateObj ? (0, _isValid2["default"])(date.dataDate) : (0, _isValid2["default"])(date);
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
    newDate.dataDate = (0, _toDate2["default"])(this.dataDate);
    newDate.dataLocale = this.dataLocale == null ? this.dataLocale : _objectSpread({}, this.dataLocale);
    return newDate;
  };

  _proto.format = function format(formatString) {
    return (0, _format2["default"])(this.dataDate, formatString, {
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
      return this.setDate((0, _setDay["default"])(this.dataDate, _day));
    }

    return (0, _getDay["default"])(this.dataDate);
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
    return (0, _getDaysInMonth["default"])(this.dataDate);
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
    return (0, _isAfter["default"])(this.dataDate, date.dataDate);
  };

  _proto.isBeforeDay = function isBeforeDay(date) {
    return (0, _isBefore["default"])(this.dataDate, date.dataDate);
  };

  _proto.isSame = function isSame(date, period) {
    var _this = this;

    if (!period) {
      return (0, _isEqual["default"])(this.dataDate, date);
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
    return (0, _isSameDay2["default"])(this.dataDate, date.dataDate);
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
        return 'yyyy-mm-dd';
      }
    };
  };

  return DateObj;
}();

exports["default"] = DateObj;

function moment(date) {
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