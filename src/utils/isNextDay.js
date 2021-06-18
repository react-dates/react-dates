import DateObj from './DateObj';

export default function isNextDay(a, b) {
  if (!DateObj.isDate(a) || !DateObj.isDate(b)) return false;
  const nextDay = a.add(1, 'day');
  return nextDay.isSameDay(b);
}
