import { driver } from '../drivers/driver';
import parts from '../drivers/parts';

import isSameDay from './isSameDay';

export default function isPreviousDay(a, b) {
  if (!driver.valid(a) || !driver.valid(b)) return false;
  const dayBefore = driver(a).subtract({ [parts.DAYS]: 1 });
  return isSameDay(dayBefore, b);
}
