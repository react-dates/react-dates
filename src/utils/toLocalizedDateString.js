import moment from 'moment';

import toMomentObject from './toMomentObject';

import { DISPLAY_FORMAT } from '../constants';

export default function toLocalizedDateString(date, currentFormat) {
  const dateObj = moment.isMoment(date) ? date : toMomentObject(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format(DISPLAY_FORMAT);
}
