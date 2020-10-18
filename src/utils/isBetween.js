import { driver } from '../drivers/driver';
import isBeforeDay from './isBeforeDay';
import isAfterDay from './isAfterDay';

// isBetween checks that the given date is between a and b.  a must be before b.
export default function isBetween(date, a, b) {
  if (!driver.valid(date) || !driver.valid(a) || !driver.valid(b)) return false;
  return isBeforeDay(a, date) && isAfterDay(b, date);
}
