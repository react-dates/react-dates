import moment from 'moment';

import { DISPLAY_FORMAT, ISO_FORMAT } from '../constants';

export default function toMomentObject(dateString, customFormat) {
  let dateFormats = [];
  
  if (Array.isArray(customFormat)) {
    dateFormats = [...customFormat, DISPLAY_FORMAT, ISO_FORMAT]
  } else if (customFormat) {
    dateFormats = [customFormat, DISPLAY_FORMAT, ISO_FORMAT]
  } else {
    dateFormats = [DISPLAY_FORMAT, ISO_FORMAT]
  }
  
  const date = moment(dateString, dateFormats, true);
  return date.isValid() ? date.hour(12) : null;
}
