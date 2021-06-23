import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addMonths from 'date-fns/addMonths';
import isDate from 'date-fns/isDate';
import isBeforeDay from './isBeforeDay';
import isAfterDay from './isAfterDay';

export default function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  if (!isDate(day)) return false;
  let firstDayOfFirstMonth = startOfMonth(month);
  if (enableOutsideDays) firstDayOfFirstMonth = startOfWeek(firstDayOfFirstMonth);
  if (isBeforeDay(day, firstDayOfFirstMonth)) return false;

  let lastDayOfLastMonth = endOfMonth(addMonths(month, numberOfMonths - 1));
  if (enableOutsideDays) lastDayOfLastMonth = endOfWeek(lastDayOfLastMonth);
  return !isAfterDay(day, lastDayOfLastMonth);
}
