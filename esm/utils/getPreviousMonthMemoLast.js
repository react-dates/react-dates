var getPreviousMonthMemoKey;
var getPreviousMonthMemoValue;
export default function getPreviousMonthMemoLast(month) {
  if (month !== getPreviousMonthMemoKey) {
    getPreviousMonthMemoKey = month;
    getPreviousMonthMemoValue = month.clone().subtract(1, 'month');
  }

  return getPreviousMonthMemoValue;
}