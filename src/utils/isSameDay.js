import moment from 'moment';

export default function isSameDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  // Speeding up by comparing most likely to differ unit first
  return a.day() === b.day() &&
    a.month() === b.month() &&
    a.year() === b.year();
}
