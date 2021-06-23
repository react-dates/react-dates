import subDays from 'date-fns/subDays';
import isDate from 'date-fns/isDate';
import isBeforeDay from './isBeforeDay';

export default function isInclusivelyBeforeDay(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  return isBeforeDay(subDays(a, 1), b);
}
