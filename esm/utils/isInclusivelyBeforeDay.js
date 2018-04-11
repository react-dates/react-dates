import moment from 'moment';

import isAfterDay from './isAfterDay';

export default function isInclusivelyBeforeDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return !isAfterDay(a, b);
}