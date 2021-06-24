import isDate from 'date-fns/isDate';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import getLocale from './getLocale';
import { DISPLAY_FORMAT } from '../constants';
export default function toLocalizedDateString(date, currentFormat, locale) {
  var newDate;

  if (!isDate(date)) {
    if (typeof date === 'string') {
      if (currentFormat) {
        newDate = parse(date, currentFormat, new Date());

        if (isValid(newDate)) {
          return format(newDate, DISPLAY_FORMAT, {
            locale: getLocale(locale)
          });
        }
      } else {
        newDate = parseISO(date);

        if (isValid(newDate)) {
          return format(newDate, DISPLAY_FORMAT, {
            locale: getLocale(locale)
          });
        }

        newDate = Date.parse(date);

        if (isValid(newDate)) {
          return format(newDate, DISPLAY_FORMAT, {
            locale: getLocale(locale)
          });
        }
      }
    }
  }

  if (isValid(date)) {
    // if (currentFormat) {
    //   return format(date, DISPLAY_FORMAT, { locale: getLocale(locale) });
    // }
    return format(date, DISPLAY_FORMAT, {
      locale: getLocale(locale)
    });
  }

  return null;
}