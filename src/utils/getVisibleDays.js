import moment from 'moment';
import toISOMonthString from './toISOMonthString';

export default function getVisibleDays(
  month,
  numberOfMonths,
  enableOutsideDays,
  firstDayOfWeek = moment.localeData().firstDayOfWeek(),
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

    // create an array of week days based on the firstDayOfWeek
    const mappedWeekDays = [];
    for (let j = firstDayOfWeek; j < 7; j += 1) {
      mappedWeekDays.push(j);
    }
    for (let k = 0; mappedWeekDays.length < 7; k += 1) {
      mappedWeekDays.push(k);
    }

    // days belonging to the previous month
    if (enableOutsideDays) {
      for (let l = 0; l < mappedWeekDays.indexOf(currentDay.weekday()); l += 1) {
        const prevDay = currentDay.clone().subtract(l + 1, 'day');
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
      // days belonging to the next month
      for (
        let m = mappedWeekDays.indexOf(currentDay.weekday()), count = 0;
        m < 7;
        m += 1, count += 1
      ) {
        const nextDay = currentDay.clone().add(count, 'day');
        visibleDays.push(nextDay);
      }
    }

    visibleDaysByMonth[toISOMonthString(currentMonth)] = visibleDays;
    currentMonth = currentMonth.clone().add(1, 'month');
  }

  return visibleDaysByMonth;
}
