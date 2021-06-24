import isDate from 'date-fns/isDate';
import subDays from 'date-fns/subDays';
import isSameDay from 'date-fns/isSameDay';
export default function isPreviousDay(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  var dayBefore = subDays(a, 1);
  return isSameDay(dayBefore, b);
}