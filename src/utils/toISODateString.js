import moment from 'moment';

import toMomentObject from './toMomentObject';

import { ISO_FORMAT } from '../constants';

export default function toLocalizedDateString(date, currentFormat) {
  const dateObj = moment.isMoment(date) ? date : toMomentObject(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format(ISO_FORMAT);
}
