import { driver } from '../drivers/driver';
import parts from '../drivers/parts';

export default function isBeforeDay(a, b) {
  if (!driver.valid(a) || !driver.valid(b)) return false;

  const aYear = driver.get(a, parts.YEARS);
  const aMonth = driver.get(a, parts.MONTHS);

  const bYear = driver.get(b, parts.YEARS);
  const bMonth = driver.get(b, parts.MONTHS);

  const isSameYear = aYear === bYear;
  const isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return driver.get(a, parts.DAYS) < driver.get(b, parts.DAYS);
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}
