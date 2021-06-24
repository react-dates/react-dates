import addDays from 'date-fns/addDays';
import isDate from 'date-fns/isDate';
import isAfterDay from './isAfterDay';
export default function isInclusivelyAfterDay(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  return isAfterDay(addDays(a, 1), b);
}