import moment from 'moment';

import isBeforeDay from './isBeforeDay';
import isAfterDay from './isAfterDay';

export default function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  if (!moment.isMoment(day)) return false;
  let firstDayOfFirstMonth = month.clone().startOf('month');
  if (enableOutsideDays) firstDayOfFirstMonth = firstDayOfFirstMonth.startOf('week');
  if (isBeforeDay(day, firstDayOfFirstMonth)) return false;

  let lastDayOfLastMonth = month.clone().add(numberOfMonths - 1, 'months').endOf('month');
  if (enableOutsideDays) lastDayOfLastMonth = lastDayOfLastMonth.endOf('week');
  return !isAfterDay(day, lastDayOfLastMonth);
}
