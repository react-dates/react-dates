import DateObj from './DateObj';

import { ISO_MONTH_FORMAT } from '../../constants';

export default function toISOMonthString(date, currentFormat) {
  const dateObj = DateObj.isDate(date) ? date : DateObj.toDateObject(date, currentFormat);
  if (!dateObj || !DateObj.isValid(dateObj)) {
    return null;
  }

  return dateObj.format(ISO_MONTH_FORMAT);
}
