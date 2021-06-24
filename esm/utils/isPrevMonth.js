import isDate from 'date-fns/isDate';
import subMonths from 'date-fns/subMonths';
import isSameMonthAndYear from './isSameMonthAndYear';
export default function isPrevMonth(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  return isSameMonthAndYear(subMonths(a, 1), b);
}