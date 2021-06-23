import getLocale from './getLocale';

export default function getMonths(locale) {
  const localization = getLocale(locale);
  const monthsArray = [];
  for (let i = 0; i < 12; i += 1) {
    monthsArray.push(localization.localize.month(i));
  }

  return monthsArray;
}
