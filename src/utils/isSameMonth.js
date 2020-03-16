import { driver } from '../drivers/driver';
import parts from '../drivers/parts';

export default function isSameMonth(a, b) {
  if (!driver.valid(a) || !driver.valid(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return driver.get(a, parts.MONTHS) === driver.get(b, parts.MONTHS)
    && driver.get(a, parts.YEARS) === driver.get(b, parts.YEARS);
}
