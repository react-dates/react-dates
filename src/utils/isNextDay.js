import isDate from 'date-fns/isDate';
import isSameDay from 'date-fns/isSameDay';
import addDays from 'date-fns/addDays';

export default function isNextDay(a, b) {
  if (!isDate(a) || !isDate(b)) return false;
  return isSameDay(addDays(a, 1), b);
}
