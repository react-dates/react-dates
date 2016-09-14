export default function getWeekNumberForWeek(week) {
  const validDays = week.filter((d) => (d));

  return validDays[0].week();
}
