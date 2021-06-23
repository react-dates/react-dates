import isDate from 'date-fns/isDate';
import isAfter from 'date-fns/isAfter';

export default function isAfterDay(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  return isAfter(a, b);
}
