import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import values from 'object.values';
import isTouchDeviceUtil from 'is-touch-device';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';
import isBeforeDay from '../utils/isBeforeDay';
import isPreviousDay from '../utils/isPreviousDay';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';

import getSelectedDateOffset from '../utils/getSelectedDateOffset';

import toISODateString from '../utils/toISODateString';
import { addModifier as addModifierUtil, deleteModifier as deleteModifierUtil } from '../utils/modifiers';

import DisabledShape from '../shapes/DisabledShape';
import FocusedInputShape from '../shapes/FocusedInputShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
  INFO_POSITION_BOTTOM,
  NAV_POSITION_TOP,
} from '../constants';

import DayPicker from './DayPicker';
import getPooledMoment from '../utils/getPooledMoment';
import usePrevious from '../utils/usePrevious';

const propTypes = forbidExtraProps({
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  minDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,

  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  disabled: DisabledShape,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,
  getMinNightsForHoverDate: PropTypes.func,
  daysViolatingMinNightsCanBeClicked: PropTypes.bool,

  // DayPicker props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  noBorder: PropTypes.bool,
  verticalBorderSpacing: nonNegativeInteger,
  horizontalMonthPadding: nonNegativeInteger,

  dayPickerNavigationInlineStyles: PropTypes.object,
  navPosition: NavPositionShape,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  renderNavPrevButton: PropTypes.func,
  renderNavNextButton: PropTypes.func,
  noNavButtons: PropTypes.bool,
  noNavNextButton: PropTypes.bool,
  noNavPrevButton: PropTypes.bool,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderCalendarInfo: PropTypes.func,
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  firstDayOfWeek: DayOfWeekShape,
  verticalHeight: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,

  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,
  onTab: PropTypes.func,
  onShiftTab: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,

  isRTL: PropTypes.bool,
});

const defaultProps = {
  startDate: undefined, // TODO: use null
  endDate: undefined, // TODO: use null
  minDate: null,
  maxDate: null,
  onDatesChange() {},
  startDateOffset: undefined,
  endDateOffset: undefined,

  focusedInput: null,
  onFocusChange() {},
  onClose() {},

  keepOpenOnDateSelect: false,
  minimumNights: 1,
  disabled: false,
  isOutsideRange() {},
  isDayBlocked() {},
  isDayHighlighted() {},
  getMinNightsForHoverDate() {},
  daysViolatingMinNightsCanBeClicked: false,

  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  daySize: DAY_SIZE,

  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  noNavButtons: false,
  noNavNextButton: false,
  noNavPrevButton: false,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onOutsideClick() {},

  renderCalendarDay: undefined,
  renderDayContents: null,
  renderCalendarInfo: null,
  renderMonthElement: null,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  firstDayOfWeek: null,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,
  horizontalMonthPadding: 13,

  // accessibility
  onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,
  onTab() {},
  onShiftTab() {},

  // i18n
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,

  isRTL: false,
};

const getChooseAvailableDatePhrase = (phrases, focusedInput) => {
  if (focusedInput === START_DATE) {
    return phrases.chooseAvailableStartDate;
  }
  if (focusedInput === END_DATE) {
    return phrases.chooseAvailableEndDate;
  }
  return phrases.chooseAvailableDate;
};

const DayPickerRangeController = memo((props) => {
  const isTouchDevice = isTouchDeviceUtil();
  const today = moment();

  const isToday = (day) => {
    return isSameDay(day, today);
  }

  const doesNotMeetMinimumNights = (day) => {
    const {
      startDate,
      isOutsideRange,
      focusedInput,
      minimumNights,
    } = props;
    if (focusedInput !== END_DATE) return false;

    if (startDate) {
      const dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minimumNights && dayDiff >= 0;
    }
    return isOutsideRange(moment(day).subtract(minimumNights, 'days'));
  }

  const isBlocked = (day, blockDaysViolatingMinNights = true) => {
    const { isDayBlocked, isOutsideRange } = props;
    return isDayBlocked(day)
      || isOutsideRange(day)
      || (blockDaysViolatingMinNights && doesNotMeetMinimumNights(day));
  }

  const isStartDate = (day) => {
    const { startDate } = props;
    return isSameDay(day, startDate);
  }

  const isEndDate = (day) => {
    const { endDate } = props;
    return isSameDay(day, endDate);
  }

  const isInSelectedSpan = (day) => {
    const { startDate, endDate } = props;
    return day.isBetween(startDate, endDate, 'days');
  }

  const isLastInRange = (day) => {
    const { endDate } = props;
    return isInSelectedSpan(day) && isNextDay(day, endDate);
  }

  const getFirstDayOfWeek = () => {
    const { firstDayOfWeek } = props;
    if (firstDayOfWeek == null) {
      return moment.localeData().firstDayOfWeek();
    }

    return firstDayOfWeek;
  }

  const isFirstDayOfWeek = (day) => {
    return day.day() === getFirstDayOfWeek();
  }

  const isLastDayOfWeek = (day) => {
    return day.day() === (getFirstDayOfWeek() + 6) % 7;
  }

  const isFirstPossibleEndDateForHoveredStartDate = (day, hoverDate) => {
    const { focusedInput, getMinNightsForHoverDate } = props;
    if (focusedInput !== END_DATE || !hoverDate || isBlocked(hoverDate)) return false;
    const minNights = getMinNightsForHoverDate(hoverDate);
    const firstAvailableEndDate = hoverDate.clone().add(minNights, 'days');
    return isSameDay(day, firstAvailableEndDate);
  }

  const doesNotMeetMinNightsForHoveredStartDate = (day, hoverDate) => {
    const {
      focusedInput,
      getMinNightsForHoverDate,
    } = props;
    if (focusedInput !== END_DATE) return false;

    if (hoverDate && !isBlocked(hoverDate)) {
      const minNights = getMinNightsForHoverDate(hoverDate);
      const dayDiff = day.diff(hoverDate.clone().startOf('day').hour(12), 'days');
      return dayDiff < minNights && dayDiff >= 0;
    }
    return false;
  }

  const [hoverDate, setHoverDate] = useState(null);

  const isHovered = (day) => {
    const { focusedInput } = props;
    return !!focusedInput && isSameDay(day, hoverDate);
  }

  const isInHoveredSpan = (day) => {
    const { startDate, endDate } = props;

    const isForwardRange = !!startDate && !endDate && (
      day.isBetween(startDate, hoverDate) || isSameDay(hoverDate, day)
    );
    const isBackwardRange = !!endDate && !startDate && (
      day.isBetween(hoverDate, endDate) || isSameDay(hoverDate, day)
    );

    const isValidDayHovered = hoverDate && !isBlocked(hoverDate);

    return (isForwardRange || isBackwardRange) && isValidDayHovered;
  }

  const isDayAfterHoveredStartDate = (day) => {
    const { startDate, endDate, minimumNights } = props;
    return !!startDate
      && !endDate
      && !isBlocked(day)
      && isNextDay(hoverDate, day)
      && minimumNights > 0
      && isSameDay(hoverDate, startDate);
  }

  const isDayBeforeHoveredEndDate = (day) => {
    const { startDate, endDate, minimumNights } = props;
    return !!endDate
      && !startDate
      && !isBlocked(day)
      && isPreviousDay(hoverDate, day)
      && minimumNights > 0
      && isSameDay(hoverDate, endDate);
  }

  const beforeSelectedEnd = (day) => {
    const { endDate } = props;
    return isBeforeDay(day, endDate);
  }

  const {
    isDayBlocked,
    isOutsideRange,
    isDayHighlighted,
    startDate,
    endDate,
  } = props;
  
  let modifiers = {
    today: (day) => isToday(day),
    blocked: (day) => isBlocked(day),
    'blocked-calendar': (day) => isDayBlocked(day),
    'blocked-out-of-range': (day) => isOutsideRange(day),
    'highlighted-calendar': (day) => isDayHighlighted(day),
    valid: (day) => !isBlocked(day),
    'selected-start': (day) => isStartDate(day),
    'selected-end': (day) => isEndDate(day),
    'blocked-minimum-nights': (day) => doesNotMeetMinimumNights(day),
    'selected-span': (day) => isInSelectedSpan(day),
    'last-in-range': (day) => isLastInRange(day),
    hovered: (day) => isHovered(day),
    'hovered-span': (day) => isInHoveredSpan(day),
    'hovered-offset': (day) => isInHoveredSpan(day),
    'after-hovered-start': (day) => isDayAfterHoveredStartDate(day),
    'first-day-of-week': (day) => isFirstDayOfWeek(day),
    'last-day-of-week': (day) => isLastDayOfWeek(day),
    'hovered-start-first-possible-end': (day, hoverDate) => isFirstPossibleEndDateForHoveredStartDate(day, hoverDate),
    'hovered-start-blocked-minimum-nights': (day, hoverDate) => doesNotMeetMinNightsForHoveredStartDate(day, hoverDate),
    'before-hovered-end': (day) => isDayBeforeHoveredEndDate(day),
    'no-selected-start-before-selected-end': (day) => beforeSelectedEnd(day) && !startDate,
    'selected-start-in-hovered-span': (day, hoverDate) => isStartDate(day) && isAfterDay(hoverDate, day),
    'selected-start-no-selected-end': (day) => isStartDate(day) && !endDate,
    'selected-end-no-selected-start': (day) => isEndDate(day) && !startDate,
  };

  const getModifiersForDay = (day) => {
    return new Set(Object.keys(modifiers).filter((modifier) => modifiers[modifier](day)));
  }

  const getModifiers = (visibleDays) => {
    const modifiers = {};
    Object.keys(visibleDays).forEach((month) => {
      modifiers[month] = {};
      visibleDays[month].forEach((day) => {
        modifiers[month][toISODateString(day)] = getModifiersForDay(day);
      });
    });

    return modifiers;
  }
    
  const getStateForNewMonth = (nextProps) => {
    const {
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
      orientation,
      startDate,
    } = nextProps;
    const initialVisibleMonthThunk = initialVisibleMonth || (
      startDate ? () => startDate : () => today
    );
    const currentMonth = initialVisibleMonthThunk();
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const visibleDays = getModifiers(getVisibleDays(
      currentMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
    ));
    return { currentMonth, visibleDays };
  }

  const { currentMonth: initialCurrentMonth, visibleDays: initialVisibleDays } = getStateForNewMonth(props);

  // initialize phrases
  // set the appropriate CalendarDay phrase based on focusedInput
  const { phrases: phrasesProp, focusedInput } = props;
  const chooseAvailableDate = getChooseAvailableDatePhrase(phrasesProp, focusedInput);

  const shouldDisableMonthNavigation = (date, visibleMonth) => {
    if (!date) return false;

    const {
      numberOfMonths,
      enableOutsideDays,
    } = props;

    return isDayVisible(date, visibleMonth, numberOfMonths, enableOutsideDays);
  }

  const [currentMonth, setCurrentMonth] = useState(initialCurrentMonth);
  const [phrases, setPhrases] = useState({
    ...phrasesProp,
    chooseAvailableDate,
  });
  const [visibleDays, setVisibleDays] = useState(initialVisibleDays);

  const { minDate, maxDate } = props;
  const [disablePrev, setDisablePrev] = useState(shouldDisableMonthNavigation(minDate, currentMonth));
  const [disableNext, setDisableNext] = useState(shouldDisableMonthNavigation(maxDate, currentMonth));

  const addModifier = (updatedDays, day, modifier) => {
    return addModifierUtil(updatedDays, day, modifier, props, {
      hoverDate,
      currentMonth,
      phrases,
      visibleDays,
      disablePrev,
      disableNext,
    });
  }

  const addModifierToRange = (updatedDays, start, end, modifier) => {
    let days = updatedDays;

    let spanStart = start.clone();
    while (isBeforeDay(spanStart, end)) {
      days = addModifier(days, spanStart, modifier);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  }

  const deleteModifier = (updatedDays, day, modifier) => {
    return deleteModifierUtil(updatedDays, day, modifier, props, {
      hoverDate,
      currentMonth,
      phrases,
      visibleDays,
      disablePrev,
      disableNext,
    });
  }

  const deleteModifierFromRange = (updatedDays, start, end, modifier) => {
    let days = updatedDays;

    let spanStart = start.clone();
    while (isBeforeDay(spanStart, end)) {
      days = deleteModifier(days, spanStart, modifier);
      spanStart = spanStart.clone().add(1, 'day');
    }

    return days;
  }

  const {
    getMinNightsForHoverDate,
    minimumNights,
    initialVisibleMonth,
    numberOfMonths,
    enableOutsideDays,
  } = props;

  const {
    startDate: prevStartDate,
    endDate: prevEndDate,
    focusedInput: prevFocusedInput,
    minimumNights: prevMinimumNights,
    isOutsideRange: prevIsOutsideRange,
    isDayBlocked: prevIsDayBlocked,
    isDayHighlighted: prevIsDayHighlighted,
    phrases: prevPhrases,
    initialVisibleMonth: prevInitialVisibleMonth,
    numberOfMonths: prevNumberOfMonths,
    enableOutsideDays: prevEnableOutsideDays,
  } = usePrevious(props, props);

  useEffect(() => {
    let currentVisibleDays = visibleDays;

    let recomputeOutsideRange = false;
    let recomputeDayBlocked = false;
    let recomputeDayHighlighted = false;

    if (isOutsideRange !== prevIsOutsideRange) {
      modifiers['blocked-out-of-range'] = (day) => isOutsideRange(day);
      recomputeOutsideRange = true;
    }

    if (isDayBlocked !== prevIsDayBlocked) {
      modifiers['blocked-calendar'] = (day) => isDayBlocked(day);
      recomputeDayBlocked = true;
    }

    if (isDayHighlighted !== prevIsDayHighlighted) {
      modifiers['highlighted-calendar'] = (day) => isDayHighlighted(day);
      recomputeDayHighlighted = true;
    }

    const recomputePropModifiers = (
      recomputeOutsideRange || recomputeDayBlocked || recomputeDayHighlighted
    );

    const didStartDateChange = startDate !== prevStartDate;
    const didEndDateChange = endDate !== prevEndDate;
    const didFocusChange = focusedInput !== prevFocusedInput;

    if (
      numberOfMonths !== prevNumberOfMonths
      || enableOutsideDays !== prevEnableOutsideDays
      || (
        initialVisibleMonth !== prevInitialVisibleMonth
        && !prevFocusedInput
        && didFocusChange
      )
    ) {
      const newMonthState = getStateForNewMonth(props);
      const { currentCurrentMonth } = newMonthState;
      ({ currentVisibleDays } = newMonthState);

      setCurrentMonth(currentCurrentMonth);
      setVisibleDays(currentVisibleDays);
    }

    let currentModifiers = {};

    if (didStartDateChange) {
      currentModifiers = deleteModifier(currentModifiers, prevStartDate, 'selected-start');
      currentModifiers = addModifier(currentModifiers, startDate, 'selected-start');

      if (prevStartDate) {
        const startSpan = prevStartDate.clone().add(1, 'day');
        const endSpan = prevStartDate.clone().add(prevMinimumNights + 1, 'days');
        currentModifiers = deleteModifierFromRange(currentModifiers, startSpan, endSpan, 'after-hovered-start');

        if (!endDate || !prevEndDate) {
          currentModifiers = deleteModifier(currentModifiers, prevStartDate, 'selected-start-no-selected-end');
        }
      }

      if (!prevStartDate && endDate && startDate) {
        currentModifiers = deleteModifier(currentModifiers, endDate, 'selected-end-no-selected-start');
        currentModifiers = deleteModifier(currentModifiers, endDate, 'selected-end-in-hovered-span');

        values(currentModifiers).forEach((days) => {
          Object.keys(days).forEach((day) => {
            const momentObj = moment(day);
            currentModifiers = deleteModifier(currentModifiers, momentObj, 'no-selected-start-before-selected-end');
          });
        });
      }
    }

    if (didEndDateChange) {
      currentModifiers = deleteModifier(currentModifiers, prevEndDate, 'selected-end');
      currentModifiers = addModifier(currentModifiers, endDate, 'selected-end');

      if (prevEndDate && (!startDate || !prevStartDate)) {
        currentModifiers = deleteModifier(currentModifiers, prevEndDate, 'selected-end-no-selected-start');
      }
    }

    if (didStartDateChange || didEndDateChange) {
      if (prevStartDate && prevEndDate) {
        currentModifiers = deleteModifierFromRange(
          currentModifiers,
          prevStartDate,
          prevEndDate.clone().add(1, 'day'),
          'selected-span',
        );
      }

      if (startDate && endDate) {
        currentModifiers = deleteModifierFromRange(
          currentModifiers,
          startDate,
          endDate.clone().add(1, 'day'),
          'hovered-span',
        );

        currentModifiers = addModifierToRange(
          currentModifiers,
          startDate.clone().add(1, 'day'),
          endDate,
          'selected-span',
        );
      }

      if (startDate && !endDate) {
        currentModifiers = addModifier(currentModifiers, startDate, 'selected-start-no-selected-end');
      }

      if (endDate && !startDate) {
        currentModifiers = addModifier(currentModifiers, endDate, 'selected-end-no-selected-start');
      }

      if (!startDate && endDate) {
        values(currentModifiers).forEach((days) => {
          Object.keys(days).forEach((day) => {
            const momentObj = moment(day);

            if (isBeforeDay(momentObj, endDate)) {
              currentModifiers = addModifier(currentModifiers, momentObj, 'no-selected-start-before-selected-end');
            }
          });
        });
      }
    }

    if (!isTouchDevice && didStartDateChange && startDate && !endDate) {
      const startSpan = startDate.clone().add(1, 'day');
      const endSpan = startDate.clone().add(minimumNights + 1, 'days');
      currentModifiers = addModifierToRange(currentModifiers, startSpan, endSpan, 'after-hovered-start');
    }

    if (!isTouchDevice && didEndDateChange && !startDate && endDate) {
      const startSpan = endDate.clone().subtract(minimumNights, 'days');
      const endSpan = endDate.clone();
      currentModifiers = addModifierToRange(currentModifiers, startSpan, endSpan, 'before-hovered-end');
    }

    if (prevMinimumNights > 0) {
      if (didFocusChange || didStartDateChange || minimumNights !== prevMinimumNights) {
        const startSpan = prevStartDate || today;
        currentModifiers = deleteModifierFromRange(
          currentModifiers,
          startSpan,
          startSpan.clone().add(prevMinimumNights, 'days'),
          'blocked-minimum-nights',
        );

        currentModifiers = deleteModifierFromRange(
          currentModifiers,
          startSpan,
          startSpan.clone().add(prevMinimumNights, 'days'),
          'blocked',
        );
      }
    }

    if (didFocusChange || recomputePropModifiers) {
      values(currentModifiers).forEach((days) => {
        Object.keys(days).forEach((day) => {
          const momentObj = getPooledMoment(day);
          let isBlocked = false;

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              currentModifiers = addModifier(currentModifiers, momentObj, 'blocked-out-of-range');
              isBlocked = true;
            } else {
              currentModifiers = deleteModifier(currentModifiers, momentObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              currentModifiers = addModifier(currentModifiers, momentObj, 'blocked-calendar');
              isBlocked = true;
            } else {
              currentModifiers = deleteModifier(currentModifiers, momentObj, 'blocked-calendar');
            }
          }

          if (isBlocked) {
            currentModifiers = addModifier(currentModifiers, momentObj, 'blocked');
          } else {
            currentModifiers = deleteModifier(currentModifiers, momentObj, 'blocked');
          }

          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(momentObj)) {
              currentModifiers = addModifier(currentModifiers, momentObj, 'highlighted-calendar');
            } else {
              currentModifiers = deleteModifier(currentModifiers, momentObj, 'highlighted-calendar');
            }
          }
        });
      });
    }

    if (!isTouchDevice && didFocusChange && hoverDate && !isBlocked(hoverDate)) {
      const minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);
      if (minNightsForHoverDate > 0 && focusedInput === END_DATE) {
        currentModifiers = deleteModifierFromRange(
          currentModifiers,
          hoverDate.clone().add(1, 'days'),
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-blocked-minimum-nights',
        );

        currentModifiers = deleteModifier(
          currentModifiers,
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-first-possible-end',
        );
      }

      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        currentModifiers = addModifierToRange(
          currentModifiers,
          hoverDate.clone().add(1, 'days'),
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-blocked-minimum-nights',
        );

        currentModifiers = addModifier(
          currentModifiers,
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-first-possible-end',
        );
      }
    }

    if (minimumNights > 0 && startDate && focusedInput === END_DATE) {
      currentModifiers = addModifierToRange(
        currentModifiers,
        startDate,
        startDate.clone().add(minimumNights, 'days'),
        'blocked-minimum-nights',
      );

      currentModifiers = addModifierToRange(
        currentModifiers,
        startDate,
        startDate.clone().add(minimumNights, 'days'),
        'blocked',
      );
    }

    const currentToday = moment();
    if (!isSameDay(today, currentToday)) {
      currentModifiers = deleteModifier(currentModifiers, today, 'today');
      currentModifiers = addModifier(currentModifiers, currentToday, 'today');
      today = currentToday;
    }

    if (Object.keys(currentModifiers).length > 0) {
      setVisibleDays({
        ...currentVisibleDays,
        ...currentModifiers,
      });
    }

    if (didFocusChange || phrasesProp !== prevPhrases) {
      // set the appropriate CalendarDay phrase based on focusedInput
      const chooseAvailableDate = getChooseAvailableDatePhrase(phrasesProp, focusedInput);

      setPhrases({
        ...phrasesProp,
        chooseAvailableDate,
      })
    }
  }, [
    // props
    startDate,
    endDate,
    focusedInput,
    getMinNightsForHoverDate,
    minimumNights,
    isOutsideRange,
    isDayBlocked,
    isDayHighlighted,
    phrasesProp,
    initialVisibleMonth,
    numberOfMonths,
    enableOutsideDays,

    // state
    hoverDate,
    visibleDays
  ]);

  const prevCurrentMonth = usePrevious(currentMonth, currentMonth);

  useEffect(() => {
    const { onPrevMonthClick } = props;
    if (currentMonth !== prevCurrentMonth) {
      onPrevMonthClick(currentMonth.clone());
    }
  }, [currentMonth]);

  const handleDayClick = (day, e) => {
    const {
      keepOpenOnDateSelect,
      minimumNights,
      onBlur,
      focusedInput,
      onFocusChange,
      onClose,
      onDatesChange,
      startDateOffset,
      endDateOffset,
      disabled,
      daysViolatingMinNightsCanBeClicked,
    } = props;

    if (e) e.preventDefault();
    if (isBlocked(day, !daysViolatingMinNightsCanBeClicked)) return;

    let { startDate, endDate } = props;

    if (startDateOffset || endDateOffset) {
      startDate = getSelectedDateOffset(startDateOffset, day);
      endDate = getSelectedDateOffset(endDateOffset, day);

      if (isBlocked(startDate) || isBlocked(endDate)) {
        return;
      }

      onDatesChange({ startDate, endDate });

      if (!keepOpenOnDateSelect) {
        onFocusChange(null);
        onClose({ startDate, endDate });
      }
    } else if (focusedInput === START_DATE) {
      const lastAllowedStartDate = endDate && endDate.clone().subtract(minimumNights, 'days');
      const isStartDateAfterEndDate = isBeforeDay(lastAllowedStartDate, day)
        || isAfterDay(startDate, endDate);
      const isEndDateDisabled = disabled === END_DATE;

      if (!isEndDateDisabled || !isStartDateAfterEndDate) {
        startDate = day;
        if (isStartDateAfterEndDate) {
          endDate = null;
        }
      }

      onDatesChange({ startDate, endDate });

      if (isEndDateDisabled && !isStartDateAfterEndDate) {
        onFocusChange(null);
        onClose({ startDate, endDate });
      } else if (!isEndDateDisabled) {
        onFocusChange(END_DATE);
      }
    } else if (focusedInput === END_DATE) {
      const firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

      if (!startDate) {
        endDate = day;
        onDatesChange({ startDate, endDate });
        onFocusChange(START_DATE);
      } else if (isInclusivelyAfterDay(day, firstAllowedEndDate)) {
        endDate = day;
        onDatesChange({ startDate, endDate });
        if (!keepOpenOnDateSelect) {
          onFocusChange(null);
          onClose({ startDate, endDate });
        }
      } else if (
        daysViolatingMinNightsCanBeClicked
        && doesNotMeetMinimumNights(day)
      ) {
        endDate = day;
        onDatesChange({ startDate, endDate });
      } else if (disabled !== START_DATE) {
        startDate = day;
        endDate = null;
        onDatesChange({ startDate, endDate });
      } else {
        onDatesChange({ startDate, endDate });
      }
    } else {
      onDatesChange({ startDate, endDate });
    }

    onBlur();
  }

  const handleDayMouseEnter = (day) => {
    /* eslint react/destructuring-assignment: 1 */
    if (isTouchDevice) return;
    const {
      startDate,
      endDate,
      focusedInput,
      getMinNightsForHoverDate,
      minimumNights,
      startDateOffset,
      endDateOffset,
    } = props;

    let nextDateOffset = null;

    if (focusedInput) {
      const hasOffset = startDateOffset || endDateOffset;
      let modifiers = {};

      if (hasOffset) {
        const start = getSelectedDateOffset(startDateOffset, day);
        const end = getSelectedDateOffset(endDateOffset, day, (rangeDay) => rangeDay.add(1, 'day'));

        nextDateOffset = {
          start,
          end,
        };

        // eslint-disable-next-line react/destructuring-assignment
        if (dateOffset && dateOffset.start && dateOffset.end) {
          modifiers = deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset');
        }
        modifiers = addModifierToRange(modifiers, start, end, 'hovered-offset');
      }

      if (!hasOffset) {
        modifiers = deleteModifier(modifiers, hoverDate, 'hovered');
        modifiers = addModifier(modifiers, day, 'hovered');

        if (startDate && !endDate && focusedInput === END_DATE) {
          if (isAfterDay(hoverDate, startDate)) {
            const endSpan = hoverDate.clone().add(1, 'day');
            modifiers = deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
          }

          if (isBeforeDay(day, startDate) || isSameDay(day, startDate)) {
            modifiers = deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span');
          }

          if (!isBlocked(day) && isAfterDay(day, startDate)) {
            const endSpan = day.clone().add(1, 'day');
            modifiers = addModifierToRange(modifiers, startDate, endSpan, 'hovered-span');
            modifiers = addModifier(modifiers, startDate, 'selected-start-in-hovered-span');
          }
        }

        if (!startDate && endDate && focusedInput === START_DATE) {
          if (isBeforeDay(hoverDate, endDate)) {
            modifiers = deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
          }

          if (isAfterDay(day, endDate) || isSameDay(day, endDate)) {
            modifiers = deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
          }

          if (!isBlocked(day) && isBeforeDay(day, endDate)) {
            modifiers = addModifierToRange(modifiers, day, endDate, 'hovered-span');
            modifiers = addModifier(modifiers, endDate, 'selected-end-in-hovered-span');
          }
        }

        if (startDate) {
          const startSpan = startDate.clone().add(1, 'day');
          const endSpan = startDate.clone().add(minimumNights + 1, 'days');
          modifiers = deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');

          if (isSameDay(day, startDate)) {
            const newStartSpan = startDate.clone().add(1, 'day');
            const newEndSpan = startDate.clone().add(minimumNights + 1, 'days');
            modifiers = addModifierToRange(
              modifiers,
              newStartSpan,
              newEndSpan,
              'after-hovered-start',
            );
          }
        }

        if (endDate) {
          const startSpan = endDate.clone().subtract(minimumNights, 'days');
          modifiers = deleteModifierFromRange(modifiers, startSpan, endDate, 'before-hovered-end');

          if (isSameDay(day, endDate)) {
            const newStartSpan = endDate.clone().subtract(minimumNights, 'days');
            modifiers = addModifierToRange(
              modifiers,
              newStartSpan,
              endDate,
              'before-hovered-end',
            );
          }
        }

        if (hoverDate && !isBlocked(hoverDate)) {
          const minNightsForPrevHoverDate = getMinNightsForHoverDate(hoverDate);
          if (minNightsForPrevHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = deleteModifierFromRange(
              modifiers,
              hoverDate.clone().add(1, 'days'),
              hoverDate.clone().add(minNightsForPrevHoverDate, 'days'),
              'hovered-start-blocked-minimum-nights',
            );

            modifiers = deleteModifier(
              modifiers,
              hoverDate.clone().add(minNightsForPrevHoverDate, 'days'),
              'hovered-start-first-possible-end',
            );
          }
        }

        if (!isBlocked(day)) {
          const minNightsForHoverDate = getMinNightsForHoverDate(day);
          if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = addModifierToRange(
              modifiers,
              day.clone().add(1, 'days'),
              day.clone().add(minNightsForHoverDate, 'days'),
              'hovered-start-blocked-minimum-nights',
            );

            modifiers = addModifier(
              modifiers,
              day.clone().add(minNightsForHoverDate, 'days'),
              'hovered-start-first-possible-end',
            );
          }
        }
      }

      setHoverDate(day);
      setDateOffset(nextDateOffset);
      setVisibleDays({
        ...visibleDays,
        ...modifiers,
      });
    }
  }

  const handleDayMouseLeave = (day) => {
    const {
      startDate,
      endDate,
      focusedInput,
      getMinNightsForHoverDate,
      minimumNights,
    } = props;

    if (isTouchDevice || !hoverDate) return;

    let modifiers = {};
    modifiers = deleteModifier(modifiers, hoverDate, 'hovered');

    if (dateOffset) {
      modifiers = deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset');
    }

    if (startDate && !endDate) {
      if (isAfterDay(hoverDate, startDate)) {
        const endSpan = hoverDate.clone().add(1, 'day');
        modifiers = deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
      }

      if (isAfterDay(day, startDate)) {
        modifiers = deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span');
      }
    }

    if (!startDate && endDate) {
      if (isAfterDay(endDate, hoverDate)) {
        modifiers = deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
      }

      if (isBeforeDay(day, endDate)) {
        modifiers = deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
      }
    }

    if (startDate && isSameDay(day, startDate)) {
      const startSpan = startDate.clone().add(1, 'day');
      const endSpan = startDate.clone().add(minimumNights + 1, 'days');
      modifiers = deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');
    }

    if (endDate && isSameDay(day, endDate)) {
      const startSpan = endDate.clone().subtract(minimumNights, 'days');
      modifiers = deleteModifierFromRange(modifiers, startSpan, endDate, 'before-hovered-end');
    }

    if (!isBlocked(hoverDate)) {
      const minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);
      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        modifiers = deleteModifierFromRange(
          modifiers,
          hoverDate.clone().add(1, 'days'),
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-blocked-minimum-nights',
        );

        modifiers = deleteModifier(
          modifiers,
          hoverDate.clone().add(minNightsForHoverDate, 'days'),
          'hovered-start-first-possible-end',
        );
      }
    }

    setHoverDate(null);
    setVisibleDays({
      ...visibleDays,
      ...modifiers,
    });
  }

  const handlePrevMonthClick = () => {
    const {
      enableOutsideDays,
      maxDate,
      minDate,
      numberOfMonths,
    } = props;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const prevMonth = currentMonth.clone().subtract(2, 'months');
    const prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays, true);

    const newCurrentMonth = currentMonth.clone().subtract(1, 'month');
    
    setCurrentMonth(newCurrentMonth);
    setDisablePrev(shouldDisableMonthNavigation(minDate, newCurrentMonth));
    setDisableNext(shouldDisableMonthNavigation(maxDate, newCurrentMonth));
    setVisibleDays({
      ...newVisibleDays,
      ...getModifiers(prevMonthVisibleDays),
    });
  }

  const handleNextMonthClick = () => {
    const {
      enableOutsideDays,
      maxDate,
      minDate,
      numberOfMonths,
    } = props;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const nextMonth = currentMonth.clone().add(numberOfMonths + 1, 'month');
    const nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays, true);
    const newCurrentMonth = currentMonth.clone().add(1, 'month');

    setCurrentMonth(newCurrentMonth);
    setDisablePrev(shouldDisableMonthNavigation(minDate, newCurrentMonth));
    setDisableNext(shouldDisableMonthNavigation(maxDate, newCurrentMonth));
    setVisibleDays({
      ...newVisibleDays,
      ...getModifiers(nextMonthVisibleDays),
    });
  }

  const handleMonthChange = (newMonth) => {
    const { numberOfMonths, enableOutsideDays, orientation } = props;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const newVisibleDays = getVisibleDays(
      newMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
    );

    setCurrentMonth(newMonth.clone());
    setVisibleDays(getModifiers(newVisibleDays));
  }

  const handleYearChange = (newMonth) => {
    const { numberOfMonths, enableOutsideDays, orientation } = props;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const newVisibleDays = getVisibleDays(
      newMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
    );

    setCurrentMonth(newMonth.clone());
    setVisibleDays(getModifiers(newVisibleDays));
  }

  const handleGetNextScrollableMonths = () => {
    const { numberOfMonths, enableOutsideDays } = props;

    const numberOfVisibleMonths = Object.keys(visibleDays).length;
    const nextMonth = currentMonth.clone().add(numberOfVisibleMonths, 'month');
    const newVisibleDays = getVisibleDays(nextMonth, numberOfMonths, enableOutsideDays, true);

    setVisibleDays({
      ...visibleDays,
      ...getModifiers(newVisibleDays),
    });
  }

  const handleGetPrevScrollableMonths = () => {
    const { numberOfMonths, enableOutsideDays } = props;

    const firstPreviousMonth = currentMonth.clone().subtract(numberOfMonths, 'month');
    const newVisibleDays = getVisibleDays(firstPreviousMonth, numberOfMonths, enableOutsideDays, true);

    setCurrentMonth(firstPreviousMonth.clone());
    setVisibleDays({
      ...visibleDays,
      ...getModifiers(newVisibleDays),
    });
  }

  const getFirstFocusableDay = (newMonth) => {
    const {
      startDate,
      endDate,
      focusedInput,
      minimumNights,
      numberOfMonths,
    } = props;

    let focusedDate = newMonth.clone().startOf('month').hour(12);
    if (focusedInput === START_DATE && startDate) {
      focusedDate = startDate.clone();
    } else if (focusedInput === END_DATE && !endDate && startDate) {
      focusedDate = startDate.clone().add(minimumNights, 'days');
    } else if (focusedInput === END_DATE && endDate) {
      focusedDate = endDate.clone();
    }

    if (isBlocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter((day) => !isBlocked(day));

      if (viableDays.length > 0) {
        ([focusedDate] = viableDays);
      }
    }

    return focusedDate;
  }

  const {
    orientation,
    monthFormat,
    renderMonthText,
    renderWeekHeaderElement,
    dayPickerNavigationInlineStyles,
    navPosition,
    navPrev,
    navNext,
    renderNavPrevButton,
    renderNavNextButton,
    noNavButtons,
    noNavNextButton,
    noNavPrevButton,
    onOutsideClick,
    withPortal,
    firstDayOfWeek,
    renderKeyboardShortcutsButton,
    renderKeyboardShortcutsPanel,
    hideKeyboardShortcutsPanel,
    daySize,
    renderCalendarDay,
    renderDayContents,
    renderCalendarInfo,
    renderMonthElement,
    calendarInfoPosition,
    onBlur,
    onShiftTab,
    onTab,
    isFocused,
    showKeyboardShortcuts,
    isRTL,
    weekDayFormat,
    dayAriaLabelFormat,
    verticalHeight,
    noBorder,
    transitionDuration,
    verticalBorderSpacing,
    horizontalMonthPadding,
  } = props;

  return (
    <DayPicker
      orientation={orientation}
      enableOutsideDays={enableOutsideDays}
      modifiers={visibleDays}
      numberOfMonths={numberOfMonths}
      onDayClick={handleDayClick}
      onDayMouseEnter={handleDayMouseEnter}
      onDayMouseLeave={handleDayMouseLeave}
      onPrevMonthClick={handlePrevMonthClick}
      onNextMonthClick={handleNextMonthClick}
      onMonthChange={handleMonthChange}
      onTab={onTab}
      onShiftTab={onShiftTab}
      onYearChange={handleYearChange}
      onGetNextScrollableMonths={handleGetNextScrollableMonths}
      onGetPrevScrollableMonths={handleGetPrevScrollableMonths}
      monthFormat={monthFormat}
      renderMonthText={renderMonthText}
      renderWeekHeaderElement={renderWeekHeaderElement}
      withPortal={withPortal}
      hidden={!focusedInput}
      initialVisibleMonth={() => currentMonth}
      daySize={daySize}
      onOutsideClick={onOutsideClick}
      disablePrev={disablePrev}
      disableNext={disableNext}
      dayPickerNavigationInlineStyles={dayPickerNavigationInlineStyles}
      navPosition={navPosition}
      navPrev={navPrev}
      navNext={navNext}
      renderNavPrevButton={renderNavPrevButton}
      renderNavNextButton={renderNavNextButton}
      noNavButtons={noNavButtons}
      noNavPrevButton={noNavPrevButton}
      noNavNextButton={noNavNextButton}
      renderCalendarDay={renderCalendarDay}
      renderDayContents={renderDayContents}
      renderCalendarInfo={renderCalendarInfo}
      renderMonthElement={renderMonthElement}
      renderKeyboardShortcutsButton={renderKeyboardShortcutsButton}
      renderKeyboardShortcutsPanel={renderKeyboardShortcutsPanel}
      calendarInfoPosition={calendarInfoPosition}
      firstDayOfWeek={firstDayOfWeek}
      hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
      isFocused={isFocused}
      getFirstFocusableDay={getFirstFocusableDay}
      onBlur={onBlur}
      showKeyboardShortcuts={showKeyboardShortcuts}
      phrases={phrases}
      isRTL={isRTL}
      weekDayFormat={weekDayFormat}
      dayAriaLabelFormat={dayAriaLabelFormat}
      verticalHeight={verticalHeight}
      verticalBorderSpacing={verticalBorderSpacing}
      noBorder={noBorder}
      transitionDuration={transitionDuration}
      horizontalMonthPadding={horizontalMonthPadding}
    />
  );
});

DayPickerRangeController.propTypes = propTypes;
DayPickerRangeController.defaultProps = defaultProps;

export default DayPickerRangeController;
