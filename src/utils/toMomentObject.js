import moment from 'moment';

import { DISPLAY_FORMAT, ISO_FORMAT } from '../constants';

export default function toMomentObject(dateString, customFormat) {
  if (customFormat) {
    const customFormatDate = moment(dateString, customFormat, true);
    if (customFormatDate.isValid()) return customFormatDate;
  }

  const date = moment(dateString, DISPLAY_FORMAT, true);
  if (date.isValid()) return date;

  const isoDate = moment(dateString, ISO_FORMAT, true);
  if (isoDate.isValid()) return isoDate;

  return null;
}
