import { driver } from '../drivers/driver';
import parts from '../drivers/parts';

let getPreviousMonthMemoKey;
let getPreviousMonthMemoValue;

export default function getPreviousMonthMemoLast(month) {
  if (month !== getPreviousMonthMemoKey) {
    getPreviousMonthMemoKey = month;
    getPreviousMonthMemoValue = driver.subtract(month, { [parts.MONTHS]: 1 });
  }

  return getPreviousMonthMemoValue;
}
