import moment from 'moment';
import toISOMonthString from './toISOMonthString';

export default function getVisibleDays(
  month,
  numberOfMonths,
  enableOutsideDays,
  withoutTransitionMonths,
) {
  if (!moment.isMoment(month)) return {};

  const visibleDaysByMonth = {};
  let currentMonth = withoutTransitionMonths ? month.clone() : month.clone().subtract(1, 'month');
  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    const visibleDays = [];

    // set utc offset to get correct dates in future (when timezone changes)
    const baseDate = currentMonth.clone();
    const firstOfMonth = baseDate.clone().startOf('month').hour(12);
    const lastOfMonth = baseDate.clone().endOf('month').hour(12);

    const currentDay = firstOfMonth.clone();

    // days belonging to the previous month
    if (enableOutsideDays) {
      for (let j = 0; j < currentDay.weekday(); j += 1) {
        const prevDay = currentDay.clone().subtract(j + 1, 'day');
        visibleDays.unshift(prevDay);
      }
    }

    while (currentDay < lastOfMonth) {
      visibleDays.push(currentDay.clone());
      currentDay.add(1, 'day');
    }

    if (enableOutsideDays) {
      // weekday() returns the index of the day of the week according to the locale
      // this means if the week starts on Monday, weekday() will return 0 for a Monday date, not 1
      if (currentDay.weekday() !== 0) {
        // days belonging to the next month
        for (let k = currentDay.weekday(), count = 0; k < 7; k += 1, count += 1) {
          const nextDay = currentDay.clone().add(count, 'day');
          visibleDays.push(nextDay);
        }
      }
    }

    visibleDaysByMonth[toISOMonthString(currentMonth)] = visibleDays;
    currentMonth = currentMonth.clone().add(1, 'month');
  }

  return visibleDaysByMonth;
}
