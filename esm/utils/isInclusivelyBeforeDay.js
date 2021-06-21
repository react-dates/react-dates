import isAfterDay from './isAfterDay';
import DateObj from './DateObj';
export default function isInclusivelyBeforeDay(a, b) {
  if (!DateObj.isDate(a) || !DateObj.isDate(b)) return false;
  return !isAfterDay(a, b);
}