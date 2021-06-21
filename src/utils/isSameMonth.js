import DateObj from './DateObj';

export default function isSameMonth(a, b) {
  if (!DateObj.isDate(a) || !DateObj.isDate(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return a.month() === b.month()
    && a.year() === b.year();
}
