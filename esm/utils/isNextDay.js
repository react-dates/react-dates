import moment from 'moment';
import isSameDay from './isSameDay';
export default function isNextDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  var nextDay = moment(a).add(1, 'day');
  return isSameDay(nextDay, b);
}