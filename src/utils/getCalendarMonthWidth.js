const CALENDAR_MONTH_WIDTH = 300;
const WEEK_NUMBER_WIDTH = 38;

export default function getCalendarMonthWidth(withWeekNumbers) {
  return withWeekNumbers ?
      CALENDAR_MONTH_WIDTH + WEEK_NUMBER_WIDTH : CALENDAR_MONTH_WIDTH;
}
