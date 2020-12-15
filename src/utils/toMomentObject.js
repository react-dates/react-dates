import moment from 'moment';

import { DISPLAY_FORMAT, ISO_FORMAT } from '../constants';

export default function toMomentObject(dateString, customFormat, withDefaultTime = true) {
  const dateFormats = customFormat
    ? [customFormat, DISPLAY_FORMAT, ISO_FORMAT]
    : [DISPLAY_FORMAT, ISO_FORMAT];

  const date = moment(dateString, dateFormats, true);
  if (!date.isValid()) {
    return null
  }
  
  return withDefaultTime ? date.hour(12) : date;
}
