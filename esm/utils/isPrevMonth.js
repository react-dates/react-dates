import DateObj from './DateObj';
import isSameMonth from './isSameMonth';
export default function isPrevMonth(a, b) {
  if (!DateObj().isMoment(a) || !DateObj().isMoment(b)) return false;
  return isSameMonth(a.clone().subtract(1, 'month'), b);
}