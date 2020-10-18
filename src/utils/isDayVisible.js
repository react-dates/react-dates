import { driver, chain } from '../drivers/driver';
import parts from '../drivers/parts';

import isBeforeDay from './isBeforeDay';
import isAfterDay from './isAfterDay';
import toISOMonthString from './toISOMonthString';

const startCacheOutsideDays = new Map();
const endCacheOutsideDays = new Map();

const startCacheInsideDays = new Map();
const endCacheInsideDays = new Map();

export default function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  if (!driver.valid(day)) return false;

  // Cloning is a little expensive, so we want to do it as little as possible.

  const startKey = toISOMonthString(month);
  // eslint-disable-next-line prefer-template
  const endKey = startKey + '+' + numberOfMonths;

  if (enableOutsideDays) {
    if (!startCacheOutsideDays.has(startKey)) {
      startCacheOutsideDays.set(startKey, chain(month)
        .startOf(parts.MONTHS)
        .startOf(parts.WEEKS)
        .value());
    }

    if (isBeforeDay(day, startCacheOutsideDays.get(startKey))) return false;

    if (!endCacheOutsideDays.has(endKey)) {
      endCacheOutsideDays.set(
        endKey,
        chain(month)
          .endOf(parts.WEEKS)
          .add({ [parts.MONTHS]: numberOfMonths - 1 })
          .endOf(parts.MONTHS)
          .endOf(parts.WEEKS)
          .value(),
      );
    }

    return !isAfterDay(day, endCacheOutsideDays.get(endKey));
  }

  // !enableOutsideDays

  if (!startCacheInsideDays.has(startKey)) {
    startCacheInsideDays.set(startKey, driver.startOf(month, parts.MONTHS));
  }

  if (isBeforeDay(day, startCacheInsideDays.get(startKey))) return false;

  if (!endCacheInsideDays.has(endKey)) {
    endCacheInsideDays.set(
      endKey,
      chain(month).add({ [parts.MONTHS]: numberOfMonths - 1 }).endOf('month').value(),
    );
  }

  return !isAfterDay(day, endCacheInsideDays.get(endKey));
}
