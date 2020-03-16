import { driver } from '../drivers/driver';

import isBeforeDay from './isBeforeDay';
import isSameDay from './isSameDay';

export default function isAfterDay(a, b) {
  if (!driver.valid(a) || !driver.valid(b)) return false;
  return !isBeforeDay(a, b) && !isSameDay(a, b);
}
