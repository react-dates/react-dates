import moment from 'moment';
import { DISPLAY_FORMAT, ISO_FORMAT } from '../constants';
export default function toMomentObject(dateString, customFormat) {
  var dateFormats = customFormat ? [customFormat, DISPLAY_FORMAT, ISO_FORMAT] : [DISPLAY_FORMAT, ISO_FORMAT];
  var date = moment(dateString, dateFormats, true);
  return date.isValid() ? date.hour(12) : null;
}