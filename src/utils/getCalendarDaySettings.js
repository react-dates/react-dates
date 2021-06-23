import format from 'date-fns/format';

import getPhrase from './getPhrase';
import { BLOCKED_MODIFIER } from '../constants';

function isSelected(modifiers) {
  return modifiers.has('selected')
  || modifiers.has('selected-span')
  || modifiers.has('selected-start')
  || modifiers.has('selected-end');
}

function shouldUseDefaultCursor(modifiers) {
  return modifiers.has('blocked-minimum-nights')
  || modifiers.has('blocked-calendar')
  || modifiers.has('blocked-out-of-range');
}

function isHoveredSpan(modifiers) {
  if (isSelected(modifiers)) return false;
  return modifiers.has('hovered-span') || modifiers.has('after-hovered-start') || modifiers.has('before-hovered-end');
}

function getAriaLabel(phrases, modifiers, day, ariaLabelFormat) {
  const {
    chooseAvailableDate,
    dateIsUnavailable,
    dateIsSelected,
    dateIsSelectedAsStartDate,
    dateIsSelectedAsEnddate,
  } = phrases;

  const formatteddate = {
    date: format(day, ariaLabelFormat),
  };

  if (modifiers.has('selected-start') && dateIsSelectedAsStartDate) {
    return getPhrase(dateIsSelectedAsStartDate, formatteddate);
  }
  if (modifiers.has('selected-end') && dateIsSelectedAsEnddate) {
    return getPhrase(dateIsSelectedAsEnddate, formatteddate);
  }
  if (isSelected(modifiers) && dateIsSelected) {
    return getPhrase(dateIsSelected, formatteddate);
  }
  if (modifiers.has(BLOCKED_MODIFIER)) {
    return getPhrase(dateIsUnavailable, formatteddate);
  }

  return getPhrase(chooseAvailableDate, formatteddate);
}

export default function getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases) {
  return {
    ariaLabel: getAriaLabel(phrases, modifiers, day, ariaLabelFormat),
    hoveredSpan: isHoveredSpan(modifiers),
    isOutsideRange: modifiers.has('blocked-out-of-range'),
    selected: isSelected(modifiers),
    useDefaultCursor: shouldUseDefaultCursor(modifiers),

    daySizeStyles: {
      width: daySize,
      height: daySize - 1,
    },
  };
}
