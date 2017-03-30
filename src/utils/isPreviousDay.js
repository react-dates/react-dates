import moment from 'moment';

import isSameDay from './isSameDay';

export default function isPreviousDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  const previousDay = moment(a).subtract(1, 'day');
  return isSameDay(previousDay, b);
}