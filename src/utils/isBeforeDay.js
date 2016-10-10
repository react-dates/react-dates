import moment from 'moment';

export default function isBeforeDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return a.isBefore(b);
}
