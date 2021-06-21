import DateObj from './DateObj';
import { ISO_MONTH_FORMAT } from '../../constants';
export default function toISOMonthString(date, currentFormat) {
  var dateObj = DateObj.isDate(date) ? date : DateObj.toDateObject(date, currentFormat);

  if (!dateObj || !DateObj.isValid(dateObj)) {
    return null;
  }

  return dateObj.format(ISO_MONTH_FORMAT);
} // TODO return format ?
//   // Template strings compiled in strict mode uses concat, which is slow. Since
//   // this code is in a hot path and we want it to be as fast as possible, we
//   // want to use old-fashioned +.
//   // eslint-disable-next-line prefer-template
//   return dateObj.year() + '-' + String(dateObj.month() + 1).padStart(2, '0');
// }