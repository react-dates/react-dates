import DateObj from './DateObj';
export default function isDate(date) {
  return date instanceof DateObj;
}