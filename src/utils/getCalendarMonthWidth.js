const CALENDAR_MONTH_PADDING = 4;

export default function getCalendarMonthWidth(daySize) {
  return (7 * (daySize + 1)) + (2 * (CALENDAR_MONTH_PADDING + 1));
}
