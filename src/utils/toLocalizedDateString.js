import { driver } from '../drivers/driver';
import formats from '../drivers/formats';

export default function toLocalizedDateString(date, currentFormat) {
  const dateObj = driver.valid(date) ? date : driver.date(date, currentFormat);
  if (!dateObj) return null;
  return driver.format(dateObj, driver.formatString(formats.DISPLAY_FORMAT));
}
