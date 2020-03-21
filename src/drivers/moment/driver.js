import momentPropTypes from 'react-moment-proptypes';

import moment from 'moment';
import parts from '../parts';
import formats from '../formats';
import toMomentObject from './toMomentObject';

// valid returns whether the given value is a DateTime object
function valid(instance) {
  return moment.isMoment(instance) && instance.isValid();
}

function now() {
  return moment();
}

// date constructs a new DateTime object as per the driver's interface.
function date(val, withFormat) {
  if (valid(val)) {
    return val;
  }
  return toMomentObject(val, withFormat);
}

// startOf returns a modified version of the date to start from a given date part.
function startOf(d, part) {
  const dateObj = valid(d) ? d : toMomentObject(d);
  if (!dateObj) return null;

  const normalized = part === parts.DAY ? 'date' : part;

  return dateObj.clone().startOf(normalized);
}

// endOf returns a modified version of the date to end from a given date part.
function endOf(d, part) {
  const dateObj = valid(d) ? d : toMomentObject(d);
  if (!dateObj) return null;
  const normalized = part === parts.DAY ? 'date' : part;
  return dateObj.clone().endOf(normalized);
}

// set sets "parts" of the given date to a specified value.
function set(d, withParts) {
  const dateObj = valid(d) ? d : toMomentObject(d);
  if (!dateObj) return null;

  // Normalize setting the day part of the date (eg. 31st) within moment.
  let copy = { ...withParts };
  if (withParts[parts.DAYS] !== undefined) {
    copy = { date: withParts[parts.DAYS], ...withParts };
    delete copy[parts.DAYS];
  }

  // Normalize setting weekdays in moment.  Weekdays in moment
  // are set with the "day" key, even though the weekday key
  // exists.
  if (withParts[parts.WEEKDAYS] !== undefined) {
    copy = { day: withParts[parts.WEEKDAYS], ...withParts };
    delete copy[parts.WEEKDAYS];
  }

  return dateObj.clone().set(copy);
}

function add(d, durationObj) {
  const dateObj = valid(d) ? d : toMomentObject(d);
  if (!dateObj) return null;

  const cloned = dateObj.clone();
  Object.keys(durationObj).forEach((key) => {
    cloned.add(durationObj[key], key);
  });

  return cloned;
}

function subtract(d, durationObj) {
  const dateObj = valid(d) ? d : toMomentObject(d);
  if (!dateObj) return null;

  const cloned = dateObj.clone();
  Object.keys(durationObj).forEach((key) => {
    cloned.subtract(durationObj[key], key);
  });

  return cloned;
}

function diff(a, b, part) {
  const dateA = valid(a) ? a : toMomentObject(a);
  const dateB = valid(b) ? b : toMomentObject(b);
  return dateA.diff(dateB, part);
}

function get(d, part) {
  const dateObj = valid(d) ? d : toMomentObject(d);
  if (!dateObj) return null;

  // Luxon does not provide the ability to call .get('years');
  // you must always invoke .get('year').  Our driver implementation
  // standardizes on the plural of each part so that we have fewer
  // ambiguities.  Test each part manually.
  switch (part) {
    case parts.YEARS:
      return dateObj.year();
    case parts.MONTHS:
      return dateObj.month();
    case parts.DAYS:
      return dateObj.date();
    case parts.WEEKDAYS:
      return dateObj.day();
    case parts.HOURS:
      return dateObj.hour();
    case parts.MINUTES:
      return dateObj.minute();
    case parts.SECOND:
      return dateObj.second();
    default:
      return dateObj.get(part);
  }
}

function format(d, withFormat) {
  const dateObj = valid(d) ? d : toMomentObject(d);
  if (!dateObj) return null;
  return dateObj.format(withFormat);
}

function daysInMonth(d) {
  const dateObj = valid(d) ? d : toMomentObject(d);
  if (!dateObj) return null;
  return dateObj.daysInMonth();
}

function firstDayOfWeek() {
  return moment.localeData().firstDayOfWeek();
}

function formatString(type) {
  switch (type) {
    case formats.DAY:
      return 'D';
    case formats.MONTH:
      return 'MMMM YYYY';
    case formats.WEEKDAY:
      return 'dd';
    case formats.DISPLAY:
      return 'L';
    case formats.ARIA_LABEL:
      return 'dddd, LL';
    default:
      return 'L';
  }
}

function weekday(date) {
  return date.weekday();
}


const driver = {
  datePropType: momentPropTypes.momentObj,

  valid,
  date,
  now,
  firstDayOfWeek,

  // Modifiers.
  startOf,
  endOf,
  set,
  add,
  subtract,

  // Getters/formatters
  diff,
  get,
  format,
  formatString,
  daysInMonth,
  weekday,
};

export default driver;
