import DateObj from './DateObj';
export default function isSameDay2(a, b) {
  if (!DateObj.isDate(a) || !DateObj.isDate(b)) return false;
  return a.isSameDay(b);
}