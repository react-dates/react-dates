import { driver, chain } from '../drivers/driver';
import parts from '../drivers/parts';
import toISOMonthString from './toISOMonthString';

export default function getVisibleDays(
  month,
  numberOfMonths,
  enableOutsideDays,
  withoutTransitionMonths,
) {
  if (!driver.valid(month)) return {};

  const visibleDaysByMonth = {};
  let currentMonth = withoutTransitionMonths
    ? month : driver.subtract(month, { [parts.MONTHS]: 1 });
  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    const visibleDays = [];

    // set utc offset to get correct dates in future (when timezone changes)
    const baseDate = currentMonth;
    const firstOfMonth = chain(baseDate).startOf(parts.MONTHS).set({ [parts.HOURS]: 12 }).value();
    const lastOfMonth = chain(baseDate).endOf(parts.MONTHS).set({ [parts.HOURS]: 12 }).value();

    let currentDay = firstOfMonth;

    // days belonging to the previous month
    if (enableOutsideDays) {
      // TODO tonyhb: Weekday call
      for (let j = 0; j < driver.weekday(currentDay); j += 1) {
        const prevDay = driver.subtract(currentDay, { [parts.DAYS]: j + 1 });
        visibleDays.unshift(prevDay);
      }
    }

    while (currentDay < lastOfMonth) {
      visibleDays.push(currentDay);
      currentDay = driver.add(currentDay, { [parts.DAYS]: 1 });
    }

    if (enableOutsideDays) {
      // weekday() returns the index of the day of the week according to the locale
      // this means if the week starts on Monday, weekday() will return 0 for a Monday date, not 1
      if (driver.weekday(currentDay) !== 0) {
        // days belonging to the next month
        for (let k = driver.weekday(currentDay), count = 0; k < 7; k += 1, count += 1) {
          const nextDay = driver.add(currentDay, { [parts.DAYS]: count });
          visibleDays.push(nextDay);
        }
      }
    }

    visibleDaysByMonth[toISOMonthString(currentMonth)] = visibleDays;
    currentMonth = driver.add(currentMonth, { [parts.MONTHS]: 1 });
  }

  return visibleDaysByMonth;
}
