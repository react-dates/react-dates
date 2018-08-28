import moment from 'moment';

import { DISPLAY_FORMAT, ISO_FORMAT } from '../constants';

export default function toMomentObject(dateString, customFormats) {
  const dateFormats = customFormats
    ? [...customFormats, DISPLAY_FORMAT, ISO_FORMAT]
    : [DISPLAY_FORMAT, ISO_FORMAT];

  const date = moment(dateString, dateFormats, true);
  return date.isValid() ? date.hour(12) : null;
}
