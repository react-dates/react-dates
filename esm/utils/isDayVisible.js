import isBeforeDay from './isBeforeDay';
import isAfterDay from './isAfterDay';

export default function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  var firstDayOfFirstMonth = month.clone().startOf('month');
  if (enableOutsideDays) firstDayOfFirstMonth = firstDayOfFirstMonth.startOf('week');
  if (isBeforeDay(day, firstDayOfFirstMonth)) return false;

  var lastDayOfLastMonth = month.clone().add(numberOfMonths - 1, 'months').endOf('month');
  if (enableOutsideDays) lastDayOfLastMonth = lastDayOfLastMonth.endOf('week');
  return !isAfterDay(day, lastDayOfLastMonth);
}