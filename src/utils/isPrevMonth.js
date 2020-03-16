import { driver } from '../drivers/driver';
import parts from '../drivers/parts';

import isSameMonth from './isSameMonth';

export default function isPrevMonth(a, b) {
  if (!driver.valid(a) || !driver.valid(b)) return false;
  return isSameMonth(driver.subtract(a, { [parts.MONTHS]: 1 }), b);
}
