import moment from 'moment';

export default function isBeforeMonth(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

  const aYear = a.year();
  const aMonth = a.month();

  const bYear = b.year();
  const bMonth = b.month();

  const isSameYear = aYear === bYear;

  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}
