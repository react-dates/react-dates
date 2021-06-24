import getLocale from './getLocale';
export default function getMonths(locale) {
  var localization = getLocale(locale);
  var monthsArray = [];

  for (var i = 0; i < 12; i += 1) {
    monthsArray.push(localization.localize.month(i));
  }

  return monthsArray;
}