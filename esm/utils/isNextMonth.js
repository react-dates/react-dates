import moment from 'moment';
import isSameMonth from './isSameMonth';
export default function isNextMonth(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return isSameMonth(a.clone().add(1, 'month'), b);
}