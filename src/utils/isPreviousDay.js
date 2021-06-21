import DateObj from './DateObj';
import isSameDay from './isSameDay';

export default function isPreviousDay(a, b) {
  if (!DateObj.isDate(a) || !DateObj.isDate(b)) return false;
  const dayBefore = new DateObj(a).subtract(1, 'day');
  return isSameDay(dayBefore, b);
}
