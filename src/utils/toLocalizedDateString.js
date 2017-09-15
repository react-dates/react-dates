import DateObj from './DateObj';

import { DISPLAY_FORMAT } from '../../constants';

export default function toLocalizedDateString(date, currentFormat) {
  const dateObj = DateObj.isDate(date) ? date : DateObj.toDateObject(date, currentFormat);
  if (!dateObj || !DateObj.isValid(dateObj)) {
    return null;
  }

  return dateObj.format(DISPLAY_FORMAT);
}
