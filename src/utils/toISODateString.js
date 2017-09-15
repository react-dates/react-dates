import DateObj from './DateObj';

import { ISO_FORMAT } from '../../constants';

export default function toISODateString(date, currentFormat) {
  const dateObj = DateObj.isDate(date) ? date : DateObj.toDateObject(date, currentFormat);
  if (!dateObj || !DateObj.isValid(dateObj)) {
    return null;
  }

  return dateObj.format(ISO_FORMAT);
}
