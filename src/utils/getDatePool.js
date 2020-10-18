import { driver } from '../drivers/driver';

const pool = new Map();
export default function getPooledMoment(dayString) {
  if (!pool.has(dayString)) {
    pool.set(dayString, driver.date(dayString));
  }

  return pool.get(dayString);
}
