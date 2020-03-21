import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import parts from '../parts';
import formats from '../formats';
import toLuxonObject from './toLuxonObject';

// valid returns whether the given value is a DateTime object
function valid(instance) {
  return instance instanceof DateTime;
}

function now() {
  return DateTime.local();
}

// date constructs a new DateTime object as per the driver's interface.
function date(val, withFormat) {
  if (val && withFormat) {
    return toLuxonObject(val, withFormat);
  }
  if (valid(val)) {
    return val;
  }
  return DateTime.local();
}

// startOf returns a modified version of the date to start from a given date part.
function startOf(d, part) {
  const dateObj = valid(d) ? d : toLuxonObject(d);
  if (!dateObj) return null;
  return dateObj.startOf(part);
}

// endOf returns a modified version of the date to end from a given date part.
function endOf(d, part) {
  const dateObj = valid(d) ? d : toLuxonObject(d);
  if (!dateObj) return null;
  return dateObj.endOf(part);
}

// set sets "parts" of the given date to a specified value.
function set(d, values) {
  const dateObj = valid(d) ? d : toLuxonObject(d);
  if (!dateObj) return null;

  // Luxon's weekdays are 1-7;  if we're setting a weekday, the main library
  // expects weekdays to be 0 indexed.
  if (values[parts.WEEKDAYS] !== undefined) {
    values[parts.WEEKDAYS] -= 1;
  }

  return dateObj.set(values);
}

function add(d, durationObj) {
  const dateObj = valid(d) ? d : toLuxonObject(d);
  if (!dateObj) return null;
  return dateObj.plus(durationObj);
}

function subtract(d, durationObj) {
  const dateObj = valid(d) ? d : toLuxonObject(d);
  if (!dateObj) return null;
  return dateObj.minus(durationObj);
}

function diff(a, b, part) {
  const dateA = valid(a) ? a : toLuxonObject(a);
  const dateB = valid(b) ? b : toLuxonObject(b);
  return dateA.diff(dateB).as(part);
}

function get(d, part) {
  const dateObj = valid(d) ? d : toLuxonObject(d);
  if (!dateObj) return null;

  // Luxon does not provide the ability to call .get('years');
  // you must always invoke .get('year').  Our driver implementation
  // standardizes on the plural of each part so that we have fewer
  // ambiguities.  Test each part manually.
  switch (part) {
    case parts.YEARS:
      return dateObj.year;
    case parts.MONTHS:
      return dateObj.month;
    case parts.WEEKDAYS:
      // Again, luxon weekdays are indexed from 1-7 but we expect 0-6
      return dateObj.weekday - 1;
    case parts.DAYS:
      return dateObj.day;
    case parts.HOURS:
      return dateObj.hour;
    case parts.MINUTES:
      return dateObj.minute;
    case parts.SECOND:
      return dateObj.second;
    default:
      return dateObj.get(part);
  }
}

function format(d, withFormat) {
  const dateObj = valid(d) ? d : toLuxonObject(d);
  if (!dateObj) return null;
  return dateObj.toFormat(withFormat);
}

function daysInMonth(d) {
  const dateObj = valid(d) ? d : toLuxonObject(d);
  if (!dateObj) return null;
  return dateObj.daysInMonth;
}

function firstDayOfWeek() {
  // Luxon does not have this capability
  // Note that Luxon's days of week range from 1-7;  internally we expect a range
  // from 0-6.
  return 0;
}

function weekday(date) {
  // Keep days of weeks 0 indexed
  return date.toFormat('c') - 1;
}

function formatString(type) {
  switch (type) {
    case formats.DAY:
      return 'd';
    case formats.MONTH:
      return 'LLLL y';
    case formats.WEEKDAY:
      return 'ccc';
    case formats.DISPLAY:
      return 'D';
    case formats.ARIA_LABEL:
      return 'cccc, DDD';
    default:
      return 'D';
  }
}

const driver = {
  datePropType: PropTypes.object,

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
