import moment from 'moment';

import isSameDay from './isSameDay';

export default function isNextWeek(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  const nextWeek = moment(a).add(7, 'day');
  return isSameDay(nextWeek, b);
}