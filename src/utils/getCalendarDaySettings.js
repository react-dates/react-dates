import getPhrase from './getPhrase';
import { BLOCKED_MODIFIER } from '../constants';

export default function getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases) {
  const {
    chooseAvailableDate,
    dateIsUnavailable,
    dateIsSelected,
    dateIsSelectedAsCheckin,
    dateIsSelectedAsCheckout,
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
  if (selected) {
    if (modifiers.has('selected-start')) {
      ariaLabel = getPhrase(dateIsSelectedAsCheckin, formattedDate);
    } else if (modifiers.has('selected-end')) {
      ariaLabel = getPhrase(dateIsSelectedAsCheckout, formattedDate);
    } else {
      ariaLabel = getPhrase(dateIsSelected, formattedDate);
    }
  } else if (modifiers.has(BLOCKED_MODIFIER)) {
    ariaLabel = getPhrase(dateIsUnavailable, formattedDate);
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
