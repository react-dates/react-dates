import moment from 'moment';

import { WEEKDAYS } from '../constants';

export default function getCalendarMonthWeeks(
  month,
  enableOutsideDays,
  firstDayOfWeek = moment.localeData().firstDayOfWeek(),
) {
  if (!moment.isMoment(month) || !month.isValid()) {
    throw new TypeError('`month` must be a valid moment object');
  }
  if (WEEKDAYS.indexOf(firstDayOfWeek) === -1) {
    throw new TypeError('`firstDayOfWeek` must be an integer between 0 and 6');
  }

  // set utc offset to get correct dates in future (when timezone changes)
  const firstOfMonth = month.clone().startOf('month').hour(12);
  const lastOfMonth = month.clone().endOf('month').hour(12);

  // calculate the exact first and last days to fill the entire matrix
  // (considering days outside month)
  const prevDays = ((firstOfMonth.day() + 7 - firstDayOfWeek) % 7);
  const nextDays = ((firstDayOfWeek + 6 - lastOfMonth.day()) % 7);
  const firstDay = firstOfMonth.clone().subtract(prevDays, 'day');
  const lastDay = lastOfMonth.clone().add(nextDays, 'day');

  const totalDays = lastDay.diff(firstDay, 'days') + 1;

  const currentDay = firstDay.clone();
  const weeksInMonth = [];

  for (let i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeksInMonth.push([]);
    }

    let day = null;
    if ((i >= prevDays && i < (totalDays - nextDays)) || enableOutsideDays) {
      day = currentDay.clone();
    }

    weeksInMonth[weeksInMonth.length - 1].push(day);

    currentDay.add(1, 'day');
  }

  return weeksInMonth;
}
