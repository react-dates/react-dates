// formats are strings passed to a driver's .formatString function to return the
// correct string formatting for a given driver.
//
// For example, the month format string in Luxon is 'LLLL yyyy', and in Moment is
// 'MMMM YYYY'.  Calling `driver.formatString(formats.MONTH)` returns the correct
// formatting string for use with the format function.
const formats = {
  DISPLAY: 'display_format',
  DAY: 'day_format',
  MONTH: 'month_format',
  WEEKDAY: 'weekday_format',
  ARIA_LABEL: 'aria_format',
};

export default formats;
