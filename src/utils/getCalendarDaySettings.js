import getPhrase from '../utils/getPhrase';
import { BLOCKED_MODIFIER } from '../constants';

export default function getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases) {
  const {
    chooseAvailableDate,
    dateIsUnavailable,
    dateIsSelected,
  } = phrases;

  const daySizeStyles = {
    width: daySize,
    height: daySize - 1,
  };

  const useDefaultCursor = (
    modifiers.has('blocked-minimum-nights')
    || modifiers.has('blocked-calendar')
    || modifiers.has('blocked-out-of-range')
  );

  const selected = (
    modifiers.has('selected')
    || modifiers.has('selected-start')
    || modifiers.has('selected-end')
  );

  const hoveredSpan = !selected && (
    modifiers.has('hovered-span')
    || modifiers.has('after-hovered-start')
  );

  const isOutsideRange = modifiers.has('blocked-out-of-range');

  const formattedDate = { date: day.format(ariaLabelFormat) };

  let ariaLabel = getPhrase(chooseAvailableDate, formattedDate);
  if (modifiers.has(BLOCKED_MODIFIER)) {
    ariaLabel = getPhrase(dateIsUnavailable, formattedDate);
  } else if (selected) {
    ariaLabel = getPhrase(dateIsSelected, formattedDate);
  }

  return {
    daySizeStyles,
    useDefaultCursor,
    selected,
    hoveredSpan,
    isOutsideRange,
    ariaLabel,
  };
}
