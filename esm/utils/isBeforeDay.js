import moment from 'moment';

export default function isBeforeDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

  var aYear = a.year();
  var aMonth = a.month();

  var bYear = b.year();
  var bMonth = b.month();

  var isSameYear = aYear === bYear;
  var isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return a.date() < b.date();
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}