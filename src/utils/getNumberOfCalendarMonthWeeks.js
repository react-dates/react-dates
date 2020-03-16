import { driver } from '../drivers/driver';
import parts from '../drivers/parts';

function getBlankDaysBeforeFirstDay(firstDayOfMonth, firstDayOfWeek) {
  const weekDayDiff = driver.get(firstDayOfMonth, parts.DAYS) - firstDayOfWeek;
  return (weekDayDiff + 7) % 7;
}

export default function getNumberOfCalendarMonthWeeks(
  month,
  firstDayOfWeek = driver.firstDayOfWeek(),
) {
  const firstDayOfMonth = driver.startOf(month, parts.MONTHS);
  const numBlankDays = getBlankDaysBeforeFirstDay(firstDayOfMonth, firstDayOfWeek);
  // TODO: @tonyhb what if `month` is already a driver instance??
  return Math.ceil((numBlankDays + driver.daysInMonth(month)) / 7);
}
