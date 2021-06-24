import isDate from 'date-fns/isDate';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
export default function isSameMonthAndYear(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  return isSameMonth(a, b) && isSameYear(a, b);
}