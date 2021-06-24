import isValid from 'date-fns/isValid';
import isDate from 'date-fns/isDate';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import addHours from 'date-fns/addHours';
import startOfDay from 'date-fns/startOfDay';
import getLocale from './getLocale';
import { WEEKDAYS } from '../constants';
export default function getCalendarMonthWeeks(month, enableOutsideDays, firstDayOfWeekParam, locale) {
  var localeData = getLocale(locale);

  if (!isDate(month) || !isValid(month)) {
    throw new TypeError('`month` must be a valid Date object');
  }

  var firstDayOfWeek = firstDayOfWeekParam != null ? firstDayOfWeekParam : localeData.options.weekStartsOn;

  if (WEEKDAYS.indexOf(firstDayOfWeek) === -1) {
    throw new TypeError('`firstDayOfWeek` must be an integer between 0 and 6');
  } // set utc offset to get correct dates in future (when timezone changes)


  var firstOfMonth = startOfMonth(month);
  var lastOfMonth = endOfMonth(month); // calculate the exact first and last days to fill the entire matrix
  // (considering days outside month)

  var prevDays = (getDay(firstOfMonth) + 7 - firstDayOfWeek) % 7;
  var nextDays = (firstDayOfWeek + 6 - getDay(lastOfMonth)) % 7;
  var firstDay = subDays(firstOfMonth, prevDays);
  var lastDay = addDays(lastOfMonth, nextDays);
  var totalDays = differenceInCalendarDays(lastDay, firstDay) + 1;
  var weeksInMonth = [];

  for (var i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeksInMonth.push([]);
    }

    var day = null;

    if (i >= prevDays && i < totalDays - nextDays || enableOutsideDays) {
      day = addHours(startOfDay(addDays(firstDay, i)), 12);
    }

    weeksInMonth[weeksInMonth.length - 1].push(day);
  }

  return weeksInMonth;
}