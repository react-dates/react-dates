import moment from 'moment';

export default function isSameMonth(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return a.month() === b.month()
    && a.year() === b.year();
}
