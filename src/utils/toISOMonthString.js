import { driver } from '../drivers/driver';
import parts from '../drivers/parts';

export default function toISODateString(date, currentFormat) {
  const dateObj = driver.valid(date) ? date : driver.date(date, currentFormat);
  if (!dateObj) return null;

  // Template strings compiled in strict mode uses concat, which is slow. Since
  // this code is in a hot path and we want it to be as fast as possible, we
  // want to use old-fashioned +.
  // eslint-disable-next-line prefer-template
  return driver.get(dateObj, parts.YEARS) + '-'
    + String(driver.get(dateObj, parts.MONTHS) + 1).padStart(2, '0');
}
