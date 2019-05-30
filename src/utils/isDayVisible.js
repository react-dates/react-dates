import moment from 'moment';

import isBeforeDay from './isBeforeDay';
import isAfterDay from './isAfterDay';

export default function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  if (!moment.isMoment(day)) return false;

  // Cloning is a little expensive, so we want to do it as little as possible.
  // Here we clone the month once and keep mutating that moment object.
  const mutableMonth = month.clone();

  const firstDayOfFirstMonth = enableOutsideDays
    ? mutableMonth.startOf('month').startOf('week')
    : mutableMonth.startOf('month');

  if (isBeforeDay(day, firstDayOfFirstMonth)) return false;

  const lastDayOfLastMonth = enableOutsideDays
    // We need to call endOf('week') when enableOutsideDays is true, because we
    // are reusing the moment object, and our earlier mutation may have moved it
    // to a previous month. This should snap us back to a good starting place.
    ? mutableMonth.endOf('week').add(numberOfMonths - 1, 'months').endOf('month').endOf('week')
    : mutableMonth.add(numberOfMonths - 1, 'months').endOf('month');

  return !isAfterDay(day, lastDayOfLastMonth);
}
