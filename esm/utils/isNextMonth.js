import DateObj from './DateObj';
import isSameMonth from './isSameMonth';
export default function isNextMonth(a, b) {
  if (!DateObj().isDate(a) || !DateObj().isDate(b)) return false;
  return isSameMonth(a.clone().add(1, 'month'), b);
}