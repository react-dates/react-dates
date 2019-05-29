export function isSelected(modifiers) {
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
  return modifiers.has('hovered-span') || modifiers.has('after-hovered-start');
}

export default function getCalendarDaySettings(daySize, modifiers) {
  return {
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
