import { driver } from '../drivers/driver';
import parts from '../drivers/parts';

import isSameDay from './isSameDay';

export default function isNextDay(a, b) {
  if (!driver.valid(a) || !driver.valid(b)) return false;
  const nextDay = driver.add(a, { [parts.DAYS]: 1 });
  return isSameDay(nextDay, b);
}
