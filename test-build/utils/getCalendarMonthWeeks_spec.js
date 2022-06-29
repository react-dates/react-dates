"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _moment = _interopRequireDefault(require("moment"));

var _chai = require("chai");

var _isSameDay = _interopRequireDefault(require("../../lib/utils/isSameDay"));

var _getCalendarMonthWeeks = _interopRequireDefault(require("../../lib/utils/getCalendarMonthWeeks"));

var today = (0, _moment["default"])();
var weeks = (0, _getCalendarMonthWeeks["default"])(today);
var weeksWithOutsideDays = (0, _getCalendarMonthWeeks["default"])(today, true);
describe('getCalendarMonthWeeks', function () {
  describe('input validation', function () {
    it('throws a TypeError if first arg is not a valid moment object', function () {
      var invalidValues = [null, '2017-01-01T00:00:00Z', new Date(), _moment["default"].invalid()];
      invalidValues.forEach(function (value) {
        (0, _chai.expect)(function () {
          return (0, _getCalendarMonthWeeks["default"])(value);
        }).to["throw"](TypeError, '`month` must be a valid moment object');
      });
    });
    it('throws a TypeError if third arg is not an integer between 0 and 6', function () {
      var invalidValues = [null, -1, 7, '0', '1', 1.5];
      invalidValues.forEach(function (value) {
        (0, _chai.expect)(function () {
          return (0, _getCalendarMonthWeeks["default"])(today, true, value);
        }).to["throw"](TypeError, '`firstDayOfWeek` must be an integer between 0 and 6');
      });
    });
  });
  it('returns an array of arrays', function () {
    (0, _chai.expect)(weeks).to.be["instanceof"](Array);
    weeks.forEach(function (week) {
      (0, _chai.expect)(week).to.be["instanceof"](Array);
    });
  });
  it('today is included', function () {
    var isIncluded = false;
    weeks.forEach(function (week) {
      week.forEach(function (day) {
        if (day && day.isSame(today, 'day')) isIncluded = true;
      });
    });
    (0, _chai.expect)(isIncluded).to.equal(true);
  });
  it('all days have a time of 12PM', function () {
    weeks.forEach(function (week) {
      week.forEach(function (day) {
        if (day) {
          (0, _chai.expect)(day.hours()).to.equal(12);
        }
      });
    });
  });
  describe('padding when enableOutsideDays is false', function () {
    var weeksWithPadding;
    beforeEach(function () {
      // using specific month Feb 2017 to manually compare with calendar
      weeksWithPadding = (0, _getCalendarMonthWeeks["default"])((0, _moment["default"])('2017-02-01'), false);
    });
    it('null pads leading days', function () {
      var firstWeek = weeksWithPadding[0];
      (0, _chai.expect)(firstWeek[0]).to.equal(null); // Sun Jan 29

      (0, _chai.expect)(firstWeek[1]).to.equal(null); // Mon Jan 30

      (0, _chai.expect)(firstWeek[2]).to.equal(null); // Tue Jan 31

      (0, _chai.expect)(firstWeek[3]).to.not.equal(null); // Wed Feb 1
    });
    it('null pads trailing days', function () {
      var lastWeek = weeksWithPadding[weeksWithPadding.length - 1];
      (0, _chai.expect)(lastWeek[2]).to.not.equal(null); // Tue Feb 28

      (0, _chai.expect)(lastWeek[3]).to.equal(null); // Wed Mar 1

      (0, _chai.expect)(lastWeek[4]).to.equal(null); // Thu Mar 2

      (0, _chai.expect)(lastWeek[5]).to.equal(null); // Fri Mar 3

      (0, _chai.expect)(lastWeek[6]).to.equal(null); // Sat Mar 4
    });
  });
  describe('Daylight Savings Time issues', function () {
    it('last of February does not equal first of March', function () {
      var february = (0, _getCalendarMonthWeeks["default"])(today.clone().month(1));
      var lastWeekOfFebruary = february[february.length - 1].filter(Boolean);
      var lastOfFebruary = lastWeekOfFebruary[lastWeekOfFebruary.length - 1];
      var march = (0, _getCalendarMonthWeeks["default"])(today.clone().month(2));
      var firstOfMarch = march[0].filter(Boolean)[0];
      (0, _chai.expect)((0, _isSameDay["default"])(lastOfFebruary, firstOfMarch)).to.equal(false);
    });
    it('last of March does not equal first of April', function () {
      var march = (0, _getCalendarMonthWeeks["default"])(today.clone().month(2));
      var lastWeekOfMarch = march[march.length - 1].filter(Boolean);
      var lastOfMarch = lastWeekOfMarch[lastWeekOfMarch.length - 1];
      var april = (0, _getCalendarMonthWeeks["default"])(today.clone().month(3));
      var firstOfApril = april[0].filter(Boolean)[0];
      (0, _chai.expect)((0, _isSameDay["default"])(lastOfMarch, firstOfApril)).to.equal(false);
    });
  });
  describe('enableOutsideDays arg is false', function () {
    it('first non-null element is first of the month', function () {
      var firstOfMonth = today.clone().startOf('month');
      var firstNonNullDay = weeks[0].filter(function (day) {
        return day;
      })[0];
      (0, _chai.expect)(firstOfMonth.isSame(firstNonNullDay, 'day')).to.equal(true);
    });
    it('last non-null element is last of the month', function () {
      var lastOfMonth = today.clone().endOf('month');
      var lastWeek = weeks[weeks.length - 1].filter(function (day) {
        return day;
      });
      var lastNonNullDay = lastWeek[lastWeek.length - 1];
      (0, _chai.expect)(lastOfMonth.isSame(lastNonNullDay, 'day')).to.equal(true);
    });
    it('number of non-null elements is equal to number of days in month', function () {
      var daysInCalendarMonthWeeks = weeks.reduce(function (a, b) {
        return a + b.filter(function (day) {
          return day;
        }).length;
      }, 0);
      (0, _chai.expect)(daysInCalendarMonthWeeks).to.equal(today.daysInMonth());
    });
  });
  describe('enableOutsideDays arg is true', function () {
    it('contains first of the month', function () {
      var firstOfMonth = today.clone().startOf('month');
      var containsFirstOfMonth = weeksWithOutsideDays[0].filter(function (day) {
        return firstOfMonth.isSame(day, 'day');
      }).length > 0;
      (0, _chai.expect)(containsFirstOfMonth).to.equal(true);
    });
    it('last week contains last of the month', function () {
      var lastOfMonth = today.clone().endOf('month');
      var containsLastOfMonth = weeks[weeksWithOutsideDays.length - 1].filter(function (day) {
        return lastOfMonth.isSame(day, 'day');
      }).length > 0;
      (0, _chai.expect)(containsLastOfMonth).to.equal(true);
    });
    it('last week contains last of the month if next month begins on Sunday', function () {
      var december2016 = (0, _moment["default"])('2016-12-01');
      var lastOfMonth = december2016.clone().endOf('month');
      var weeksInDecember = (0, _getCalendarMonthWeeks["default"])(december2016);
      var containsLastOfMonth = weeksInDecember[weeksInDecember.length - 1].filter(function (day) {
        return lastOfMonth.isSame(day, 'day');
      }).length > 0;
      (0, _chai.expect)(containsLastOfMonth).to.equal(true);
    });
    it('last week contains last of the month if next month begins on Monday', function () {
      _moment["default"].locale('es');

      var april2017 = (0, _moment["default"])('2017-04-01');
      var lastOfMonth = april2017.clone().endOf('month');
      var weeksInApril = (0, _getCalendarMonthWeeks["default"])(april2017);
      var containsLastOfMonth = weeksInApril[weeksInApril.length - 1].filter(function (day) {
        return lastOfMonth.isSame(day, 'day');
      }).length > 0;
      (0, _chai.expect)(containsLastOfMonth).to.equal(true);
    });
    it('last week contains last of the month if next month begins on Saturday', function () {
      var september2016 = (0, _moment["default"])('2016-09-01');
      var lastOfMonth = september2016.clone().endOf('month');
      var weeksInSeptember = (0, _getCalendarMonthWeeks["default"])(september2016);
      var containsLastOfMonth = weeksInSeptember[weeksInSeptember.length - 1].filter(function (day) {
        return lastOfMonth.isSame(day, 'day');
      }).length > 0;
      (0, _chai.expect)(containsLastOfMonth).to.equal(true);
    });
    it('each week has 7 non-null elements', function () {
      var hasNoNullElements = weeksWithOutsideDays.reduce(function (w1, w2) {
        return w1 && w2.reduce(function (d1, d2) {
          return d1 && !!d2;
        }, true);
      }, true);
      (0, _chai.expect)(hasNoNullElements).to.equal(true);
    });
  });
  describe('setting firstDayOfWeek argument', function () {
    // using these known dates to see if they appear at the right position of the calendar
    // trying different firstDayOfWeek values
    var january2017Start = (0, _moment["default"])('2017-01-01'); // Sunday

    var january2017End = january2017Start.clone().endOf('month'); // Tuesday

    it('month starts at [0][0] when first day is Sunday and first day of week is Sunday', function () {
      var weeksInJanuary2017 = (0, _getCalendarMonthWeeks["default"])(january2017Start, false, 0); // 0: Sun

      var firstDayOfMonth = weeksInJanuary2017[0][0];
      var rightPosition = january2017Start.isSame(firstDayOfMonth, 'day');
      (0, _chai.expect)(rightPosition).to.equal(true);
    });
    it('month ends at [n][2] when last day is Tuesday and first day of week is Sunday', function () {
      var weeksInJanuary2017 = (0, _getCalendarMonthWeeks["default"])(january2017Start, false, 0); // 0: Sun

      var lastDayOfMonth = weeksInJanuary2017[weeksInJanuary2017.length - 1][2];
      var rightPosition = january2017End.isSame(lastDayOfMonth, 'day');
      (0, _chai.expect)(rightPosition).to.equal(true);
    });
    it('month starts at [0][4] when first day is Sunday and first day of week is Wednesday', function () {
      var weeksInJanuary2017 = (0, _getCalendarMonthWeeks["default"])(january2017Start, false, 3); // 3: Wed

      var firstDayOfMonth = weeksInJanuary2017[0][4];
      var rightPosition = january2017Start.isSame(firstDayOfMonth, 'day');
      (0, _chai.expect)(rightPosition).to.equal(true);
    });
    it('month ends at [n][6] when last day is Tuesday and first day of week is Wednesday', function () {
      var weeksInJanuary2017 = (0, _getCalendarMonthWeeks["default"])(january2017Start, false, 3); // 3: Wed

      var lastDayOfMonth = weeksInJanuary2017[weeksInJanuary2017.length - 1][6];
      var rightPosition = january2017End.isSame(lastDayOfMonth, 'day');
      (0, _chai.expect)(rightPosition).to.equal(true);
    });
  });
  describe('firstDayOfWeek default value locale-aware', function () {
    // using these known dates to see if they appear at the right position of the calendar
    // trying different firstDayOfWeek values
    var january2017Start = (0, _moment["default"])('2017-01-01'); // Sunday

    var january2017End = january2017Start.clone().endOf('month'); // Tuesday

    describe('locale with Sunday as first day of week', function () {
      beforeEach(function () {
        _moment["default"].locale('en');
      });
      it('month starts at [0][0] if first day is Sunday', function () {
        var weeksInJanuary2017 = (0, _getCalendarMonthWeeks["default"])(january2017Start);
        var firstDayOfMonth = weeksInJanuary2017[0][0];
        var rightPosition = january2017Start.isSame(firstDayOfMonth, 'day');
        (0, _chai.expect)(rightPosition).to.equal(true);
      });
      it('month ends at [n][2] if last day is Tuesday', function () {
        var weeksInJanuary2017 = (0, _getCalendarMonthWeeks["default"])(january2017Start);
        var lastDayOfMonth = weeksInJanuary2017[weeksInJanuary2017.length - 1][2];
        var rightPosition = january2017End.isSame(lastDayOfMonth, 'day');
        (0, _chai.expect)(rightPosition).to.equal(true);
      });
    });
    describe('locale with Monday as first day of week', function () {
      beforeEach(function () {
        _moment["default"].locale('es');
      });
      it('month starts at [0][6] if first day is Sunday', function () {
        var weeksInJanuary2017 = (0, _getCalendarMonthWeeks["default"])(january2017Start);
        var firstDayOfMonth = weeksInJanuary2017[0][6];
        var rightPosition = january2017Start.isSame(firstDayOfMonth, 'day');
        (0, _chai.expect)(rightPosition).to.equal(true);
      });
      it('month ends at [n][1] if last day is Tuesday', function () {
        var weeksInJanuary2017 = (0, _getCalendarMonthWeeks["default"])(january2017Start);
        var lastDayOfMonth = weeksInJanuary2017[weeksInJanuary2017.length - 1][1];
        var rightPosition = january2017End.isSame(lastDayOfMonth, 'day');
        (0, _chai.expect)(rightPosition).to.equal(true);
      });
    });
  });
});