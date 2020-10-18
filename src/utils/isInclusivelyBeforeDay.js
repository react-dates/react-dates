import { driver } from '../drivers/driver';

import isAfterDay from './isAfterDay';

export default function isInclusivelyBeforeDay(a, b) {
  if (!driver.valid(a) || !driver.valid(b)) return false;
  return !isAfterDay(a, b);
}
