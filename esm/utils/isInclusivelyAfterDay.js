import isBeforeDay from './isBeforeDay';
import DateObj from './DateObj';
export default function isInclusivelyAfterDay(a, b) {
  if (!DateObj.isDate(a) || !DateObj.isDate(b)) return false;
  return !isBeforeDay(a, b);
}