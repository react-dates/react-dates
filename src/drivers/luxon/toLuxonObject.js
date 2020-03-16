import { DateTime } from 'luxon';
import { DISPLAY_FORMAT, ISO_FORMAT } from './constants';

export default function toLuxonObject(dateString, customFormat) {
  if (dateString instanceof DateTime) {
    return dateString;
  }

  if (!dateString) {
    return DateTime.local();
  }

  const dateFormats = customFormat
    ? [customFormat, DISPLAY_FORMAT, ISO_FORMAT]
    : [DISPLAY_FORMAT, ISO_FORMAT];

  let date;
  dateFormats.find((format) => {
    date = DateTime.fromFormat(dateString, format);
    return date.isValid;
  });

  return date ? date.hour(12) : null;
}
