import moment from 'moment';

import isBeforeMonth from './isBeforeMonth';
import isSameMonth from './isSameMonth';

export default function isAfterMonth(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return !isBeforeMonth(a, b) && !isSameMonth(a, b);
}
