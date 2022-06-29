import moment from 'moment';
import isSameMonth from './isSameMonth';
export default function isPrevMonth(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return isSameMonth(a.clone().subtract(1, 'month'), b);
}