import moment from 'moment';

import toMomentObject from './toMomentObject';

import { ISO_MONTH_FORMAT } from '../constants';

export default function toISOMonthString(date, currentFormat) {
  const dateObj = moment.isMoment(date) ? date : toMomentObject(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format(ISO_MONTH_FORMAT);
}
