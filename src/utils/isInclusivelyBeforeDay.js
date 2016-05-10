import moment from 'moment';

import isSameDay from './isSameDay';

export default function isInclusivelyBeforeDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return a.isBefore(b) || isSameDay(a, b);
}
