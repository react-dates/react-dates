import isDate from 'date-fns/isDate';
import addMonths from 'date-fns/addMonths';
import isSameMonthAndYear from './isSameMonthAndYear';

export default function isNextMonth(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  return isSameMonthAndYear(addMonths(a, 1), b);
}
