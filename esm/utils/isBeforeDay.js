import isDate from 'date-fns/isDate';
import isBefore from 'date-fns/isBefore';
export default function isBeforeDay(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  return isBefore(a, b);
}