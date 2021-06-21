import DateObj from './DateObj';

const momentPool = new Map();
export default function getPooledMoment(dayString) {
  if (!momentPool.has(dayString)) {
    momentPool.set(dayString, new DateObj(dayString));
  }

  return momentPool.get(dayString);
}
