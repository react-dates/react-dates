import getCalendarMonthWidth from './getCalendarMonthWidth';
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

export default function getCalendarMonthGridWidthStyle(orientation, withWeekNumbers) {
  const calendarMonthWidth = getCalendarMonthWidth(withWeekNumbers);

  switch (orientation) {
    case HORIZONTAL_ORIENTATION:
      return { width: 4 * calendarMonthWidth };
    case VERTICAL_ORIENTATION:
      return { width: calendarMonthWidth };
    default:
      return {};
  }
}

