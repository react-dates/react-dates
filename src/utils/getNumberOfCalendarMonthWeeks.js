import startOfMonth from 'date-fns/startOfMonth';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import getDay from 'date-fns/getDay';
import getLocale from './getLocale';

function getBlankDaysBeforeFirstDay(firstDayOfMonth, firstDayOfWeek) {
  const weekDayDiff = getDay(firstDayOfMonth) - firstDayOfWeek;
  return (weekDayDiff + 7) % 7;
}

export default function getNumberOfCalendarMonthWeeks(
  month,
  firstDayOfWeek,
  locale,
) {
  let newFirstDayOfWeek;
  if (firstDayOfWeek === null) {
    const localeData = getLocale(locale);
    newFirstDayOfWeek = localeData.options.weekStartsOn;
  } else {
    newFirstDayOfWeek = firstDayOfWeek;
  }
  const firstDayOfMonth = startOfMonth(month);
  const numBlankDays = getBlankDaysBeforeFirstDay(firstDayOfMonth, newFirstDayOfWeek);

  return Math.ceil((numBlankDays + getDaysInMonth(month)) / 7);
}
