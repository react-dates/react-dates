import DateObj from './DateObj';
export default function isBeforeDay(a, b) {
  if (!DateObj.isDate(a) || !DateObj.isDate(b)) return false;
  return a.isBeforeDay(b);
}