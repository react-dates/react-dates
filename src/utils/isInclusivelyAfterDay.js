import { driver } from '../drivers/driver';

import isBeforeDay from './isBeforeDay';

export default function isInclusivelyAfterDay(a, b) {
  if (!driver.valid(a) || !driver.valid(b)) return false;
  return !isBeforeDay(a, b);
}
