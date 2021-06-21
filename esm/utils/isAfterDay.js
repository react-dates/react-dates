import DateObj from './DateObj';
export default function isAfterDay(a, b) {
  if (!DateObj.isDate(a) || !DateObj.isDate(b)) return false;
  return a.isAfterDay(b);
}