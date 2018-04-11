Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCalendarMonthWidth;
var CALENDAR_MONTH_PADDING = 9;

function getCalendarMonthWidth(daySize) {
  return 7 * (daySize + 1) + 2 * (CALENDAR_MONTH_PADDING + 1);
}