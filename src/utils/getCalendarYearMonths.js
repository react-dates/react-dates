export default function getCalendarYearMonths(year) {
  // set utc offset to get correct dates in future (when timezone changes)
  const baseDate = year.clone();
  const firstMonth = baseDate.clone().startOf('year');
  const lastMonth = baseDate.clone().endOf('year');

  const currentMonth = firstMonth.clone();
  let currentLine = [];
  const monthsInYear = [];

  let offset = 0;
  while (currentMonth < lastMonth) {
    currentLine.push(currentMonth.clone());
    currentMonth.add(1, 'month');
    offset += 1;

    if (offset === 3) {
      monthsInYear.push(currentLine);
      currentLine = [];
      offset = 0;
    }
  }

  return monthsInYear;
}
