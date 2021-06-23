import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';

import { ISO_MONTH_FORMAT } from '../constants';

export default function toISOMonthString(date, currentFormat) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (isValid(date)) {
      return format(date, ISO_MONTH_FORMAT);
    }
  }
  if (typeof date === 'string') {
    if (currentFormat) {
      const newDate = parse(date, currentFormat, new Date());
      if (isValid(newDate)) {
        return format(newDate, ISO_MONTH_FORMAT);
      }
    } else {
      let newDate;
      newDate = parseISO(date);
      if (isValid(newDate)) {
        return format(newDate, ISO_MONTH_FORMAT);
      }
      newDate = Date.parse(date);
      if (isValid(newDate)) {
        return format(newDate, ISO_MONTH_FORMAT);
      }
    }
  }
  return null;
}
