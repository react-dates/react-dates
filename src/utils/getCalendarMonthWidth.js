export default function getCalendarMonthWidth(daySize, calendarMonthPadding = 0) {
  return (7 * daySize) + (2 * calendarMonthPadding) + 1;
}
