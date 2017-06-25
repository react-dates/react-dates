const CALENDAR_YEAR_PADDING = 9;

export default function getCalendarYearWidth(monthWidthSize) {
  return (3 * (monthWidthSize + 1)) + (2 * (CALENDAR_YEAR_PADDING + 1));
}
