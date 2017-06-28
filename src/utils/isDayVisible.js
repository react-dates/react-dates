import isBeforeDay from './isBeforeDay';
import isAfterDay from './isAfterDay';

export default function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  let firstDayOfFirstMonth = month.clone().subtract(1, 'month').startOf('month');
  if (enableOutsideDays) firstDayOfFirstMonth = firstDayOfFirstMonth.startOf('week');
  if (isBeforeDay(day, firstDayOfFirstMonth)) return false;

  let lastDayOfLastMonth = month.clone().add(numberOfMonths, 'months').endOf('month');
  if (enableOutsideDays) lastDayOfLastMonth = lastDayOfLastMonth.endOf('week');
  return !isAfterDay(day, lastDayOfLastMonth);
}
