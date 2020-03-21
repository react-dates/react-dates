import { driver, chain } from '../drivers/driver';
import parts from '../drivers/parts';

import { WEEKDAYS } from '../constants';

export default function getCalendarMonthWeeks(
  month,
  enableOutsideDays,
  firstDayOfWeek = driver.firstDayOfWeek(),
) {
  if (!driver.valid(month)) {
    throw new TypeError('`month` must be a valid driver date instance');
  }
  if (WEEKDAYS.indexOf(firstDayOfWeek) === -1) {
    throw new TypeError('`firstDayOfWeek` must be an integer between 0 and 6');
  }

  // set utc offset to get correct dates in future (when timezone changes)
  const firstOfMonth = chain(month).startOf(parts.MONTHS).set({ [parts.HOURS]: 12 }).value();
  const lastOfMonth = chain(month).endOf(parts.MONTHS).set({ [parts.HOURS]: 12 }).value();

  // calculate the exact first and last days to fill the entire matrix
  // (considering days outside month)
  const prevDays = ((driver.weekday(firstOfMonth) + 7 - firstDayOfWeek) % 7);
  const nextDays = ((firstDayOfWeek + 6 - driver.weekday(lastOfMonth)) % 7);
  const firstDay = driver.subtract(firstOfMonth, { [parts.DAYS]: prevDays });
  const lastDay = driver.add(lastOfMonth, { [parts.DAYS]: nextDays });

  const totalDays = driver.diff(lastDay, firstDay, parts.DAYS) + 1;

  let currentDay = firstDay;
  const weeksInMonth = [];

  for (let i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeksInMonth.push([]);
    }

    let day = null;
    if ((i >= prevDays && i < (totalDays - nextDays)) || enableOutsideDays) {
      day = currentDay;
    }

    weeksInMonth[weeksInMonth.length - 1].push(day);

    currentDay = driver.add(currentDay, { [parts.DAYS]: 1 });
  }

  return weeksInMonth;
}
