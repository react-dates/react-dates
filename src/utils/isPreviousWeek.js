import moment from 'moment';

import isSameDay from './isSameDay';

export default function isPreviousWeek(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  const previousWeek = moment(a).subtract(7, 'day');
  return isSameDay(previousWeek, b);
}