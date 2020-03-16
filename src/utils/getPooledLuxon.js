import { DateTime } from 'luxon';

const pool = new Map();
export default function getPooledMoment(dayString) {
  if (!pool.has(dayString)) {
    pool.set(dayString, DateTime.fromISO(dayString));
  }

  return pool.get(dayString);
}
