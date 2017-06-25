import isBeforeMonth from './isBeforeMonth';
import isAfterMonth from './isAfterMonth';

export default function isMonthVisible(month, year, numberOfYears) {
  const firstDayOfYear = year.clone().startOf('year');
  if (isBeforeMonth(month, firstDayOfYear)) return false;

  const lastDayOfLastYear = year.clone().add(numberOfYears - 1, 'years').endOf('year');
  return !isAfterMonth(month, lastDayOfLastYear);
}
