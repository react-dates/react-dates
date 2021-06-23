import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import values from 'object.values';
import isTouchDevice from 'is-touch-device';

import startOfDay from 'date-fns/startOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isWithinInterval from 'date-fns/isWithinInterval';
import differenceInDays from 'date-fns/differenceInDays';
import isDate from 'date-fns/isDate';
import addHours from 'date-fns/addHours';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isAfterDay from '../utils/isAfterDay';
import isBeforeDay from '../utils/isBeforeDay';
import getLocale from '../utils/getLocale';

import getVisibleDays from '../utils/getVisibleDays';
import isDayVisible from '../utils/isDayVisible';
import isPreviousDay from '../utils/isPreviousDay';

import getSelectedDateOffset from '../utils/getSelectedDateOffset';

import toISODateString from '../utils/toISODateString';
import { addModifier, deleteModifier } from '../utils/modifiers';

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

const propTypes = forbidExtraProps({
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onDatesChange: PropTypes.func,
  startDateOffset: PropTypes.func,
  endDateOffset: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,

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
  locale: PropTypes.string,
});

const defaultProps = {
  startDate: null,
  endDate: null,
  onDatesChange() {},
  startDateOffset: undefined,
  endDateOffset: undefined,
  minDate: null,
  maxDate: null,

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
  monthFormat: 'MMMM yyyy',
  weekDayFormat: 'eee',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,

  isRTL: false,
  locale: null,
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

/** @extends React.Component */
export default class DayPickerRangeController extends React.PureComponent {
  constructor(props) {
    super(props);

    this.isTouchDevice = isTouchDevice();
    this.today = addHours(startOfDay(new Date()), 12);
    this.modifiers = {
      today: (day) => this.isToday(day),
      blocked: (day) => this.isBlocked(day),
      'blocked-calendar': (day) => props.isDayBlocked(day),
      'blocked-out-of-range': (day) => props.isOutsideRange(day),
      'highlighted-calendar': (day) => props.isDayHighlighted(day),
      valid: (day) => !this.isBlocked(day),
      'selected-start': (day) => this.isStartDate(day),
      'selected-end': (day) => this.isEndDate(day),
      'blocked-minimum-nights': (day) => this.doesNotMeetMinimumNights(day),
      'selected-span': (day) => this.isInSelectedSpan(day),
      'last-in-range': (day) => this.isLastInRange(day),
      hovered: (day) => this.isHovered(day),
      'hovered-span': (day) => this.isInHoveredSpan(day),
      'hovered-offset': (day) => this.isInHoveredSpan(day),
      'after-hovered-start': (day) => this.isDayAfterHoveredStartDate(day),
      'first-day-of-week': (day) => this.isFirstDayOfWeek(day),
      'last-day-of-week': (day) => this.isLastDayOfWeek(day),
      'hovered-start-first-possible-end': (day, hoverDate) => this.isFirstPossibleEndDateForHoveredStartDate(day, hoverDate),
      'hovered-start-blocked-minimum-nights': (day, hoverDate) => this.doesNotMeetMinNightsForHoveredStartDate(day, hoverDate),
      'before-hovered-end': (day) => this.isDayBeforeHoveredEndDate(day),
      'no-selected-start-before-selected-end': (day) => this.beforeSelectedEnd(day) && !props.startDate,
      'selected-start-in-hovered-span': (day, hoverDate) => this.isStartDate(day) && isAfterDay(hoverDate, day),
      'selected-start-no-selected-end': (day) => this.isStartDate(day) && !props.endDate,
      'selected-end-no-selected-start': (day) => this.isEndDate(day) && !props.startDate,
    };

    const { currentMonth, visibleDays } = this.getStateForNewMonth(props);

    // initialize phrases
    // set the appropriate CalendarDay phrase based on focusedInput
    const chooseAvailableDate = getChooseAvailableDatePhrase(props.phrases, props.focusedInput);

    this.state = {
      hoverDate: null,
      currentMonth,
      phrases: {
        ...props.phrases,
        chooseAvailableDate,
      },
      visibleDays,
      disablePrev: this.shoulddisableMonthNavigation(props.minDate, currentMonth),
      disableNext: this.shoulddisableMonthNavigation(props.maxDate, currentMonth),
    };

    this.onDayClick = this.onDayClick.bind(this);
    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.onGetNextScrollableMonths = this.onGetNextScrollableMonths.bind(this);
    this.onGetPrevScrollableMonths = this.onGetPrevScrollableMonths.bind(this);
    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      startDate,
      endDate,
      focusedInput,
      getMinNightsForHoverDate,
      minimumNights,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      phrases,
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
    } = nextProps;

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
    } = this.props;

    const { hoverDate } = this.state;
    let { visibleDays } = this.state;

    let recomputeOutsideRange = false;
    let recomputeDayBlocked = false;
    let recomputeDayHighlighted = false;

    if (isOutsideRange !== prevIsOutsideRange) {
      this.modifiers['blocked-out-of-range'] = (day) => isOutsideRange(day);
      recomputeOutsideRange = true;
    }

    if (isDayBlocked !== prevIsDayBlocked) {
      this.modifiers['blocked-calendar'] = (day) => isDayBlocked(day);
      recomputeDayBlocked = true;
    }

    if (isDayHighlighted !== prevIsDayHighlighted) {
      this.modifiers['highlighted-calendar'] = (day) => isDayHighlighted(day);
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
      const newMonthState = this.getStateForNewMonth(nextProps);
      const { currentMonth } = newMonthState;
      ({ visibleDays } = newMonthState);
      this.setState({
        currentMonth,
        visibleDays,
      });
    }

    let modifiers = {};

    if (didStartDateChange) {
      modifiers = this.deleteModifier(modifiers, prevStartDate, 'selected-start');
      modifiers = this.addModifier(modifiers, startDate, 'selected-start');

      if (prevStartDate) {
        const startSpan = addDays(prevStartDate, 1);
        const endSpan = addDays(prevStartDate, prevMinimumNights + 1);
        modifiers = this.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');

        if (!endDate || !prevEndDate) {
          modifiers = this.deleteModifier(modifiers, prevStartDate, 'selected-start-no-selected-end');
        }
      }

      if (!prevStartDate && endDate && startDate) {
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-no-selected-start');
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');

        values(visibleDays).forEach((days) => {
          Object.keys(days).forEach((day) => {
            const dateObj = day;
            modifiers = this.deleteModifier(modifiers, dateObj, 'no-selected-start-before-selected-end');
          });
        });
      }
    }

    if (didEndDateChange) {
      modifiers = this.deleteModifier(modifiers, prevEndDate, 'selected-end');
      modifiers = this.addModifier(modifiers, endDate, 'selected-end');

      if (prevEndDate && (!startDate || !prevStartDate)) {
        modifiers = this.deleteModifier(modifiers, prevEndDate, 'selected-end-no-selected-start');
      }
    }

    if (didStartDateChange || didEndDateChange) {
      if (prevStartDate && prevEndDate) {
        modifiers = this.deleteModifierFromRange(
          modifiers,
          prevStartDate,
          addDays(prevEndDate, 1),
          'selected-span',
        );
      }

      if (startDate && endDate) {
        modifiers = this.deleteModifierFromRange(
          modifiers,
          startDate,
          addDays(endDate, 1),
          'hovered-span',
        );

        modifiers = this.addModifierToRange(
          modifiers,
          addDays(startDate, 1),
          endDate,
          'selected-span',
        );
      }

      if (startDate && !endDate) {
        modifiers = this.addModifier(modifiers, startDate, 'selected-start-no-selected-end');
      }

      if (endDate && !startDate) {
        modifiers = this.addModifier(modifiers, endDate, 'selected-end-no-selected-start');
      }

      if (!startDate && endDate) {
        values(visibleDays).forEach((days) => {
          Object.keys(days).forEach((day) => {
            const dateObj = day;

            if (isBeforeDay(dateObj, endDate)) {
              modifiers = this.addModifier(modifiers, dateObj, 'no-selected-start-before-selected-end');
            }
          });
        });
      }
    }

    if (!this.isTouchDevice && didStartDateChange && startDate && !endDate) {
      const startSpan = addDays(startDate, 1);
      const endSpan = addDays(startDate, minimumNights + 1);
      modifiers = this.addModifierToRange(modifiers, startSpan, endSpan, 'after-hovered-start');
    }

    if (!this.isTouchDevice && didEndDateChange && !startDate && endDate) {
      const startSpan = subDays(endDate, minimumNights);
      const endSpan = new Date(endDate);
      modifiers = this.addModifierToRange(modifiers, startSpan, endSpan, 'before-hovered-end');
    }

    if (prevMinimumNights > 0) {
      if (didFocusChange || didStartDateChange || minimumNights !== prevMinimumNights) {
        const startSpan = prevStartDate || this.today;
        modifiers = this.deleteModifierFromRange(
          modifiers,
          startSpan,
          addDays(startSpan, prevMinimumNights),
          'blocked-minimum-nights',
        );

        modifiers = this.deleteModifierFromRange(
          modifiers,
          startSpan,
          addDays(startSpan, prevMinimumNights),
          'blocked',
        );
      }
    }

    if (didFocusChange || recomputePropModifiers) {
      values(visibleDays).forEach((days) => {
        Object.keys(days).forEach((day) => {
          const dateObj = addHours(startOfDay(parseISO(day)), 12);
          let isBlocked = false;

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(dateObj)) {
              modifiers = this.addModifier(modifiers, dateObj, 'blocked-out-of-range');
              isBlocked = true;
            } else {
              modifiers = this.deleteModifier(modifiers, dateObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(dateObj)) {
              modifiers = this.addModifier(modifiers, dateObj, 'blocked-calendar');
              isBlocked = true;
            } else {
              modifiers = this.deleteModifier(modifiers, dateObj, 'blocked-calendar');
            }
          }

          if (isBlocked) {
            modifiers = this.addModifier(modifiers, dateObj, 'blocked');
          } else {
            modifiers = this.deleteModifier(modifiers, dateObj, 'blocked');
          }

          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(dateObj)) {
              modifiers = this.addModifier(modifiers, dateObj, 'highlighted-calendar');
            } else {
              modifiers = this.deleteModifier(modifiers, dateObj, 'highlighted-calendar');
            }
          }
        });
      });
    }

    if (!this.isTouchDevice && didFocusChange && hoverDate && !this.isBlocked(hoverDate)) {
      const minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);
      if (minNightsForHoverDate > 0 && focusedInput === END_DATE) {
        modifiers = this.deleteModifierFromRange(
          modifiers,
          addDays(hoverDate, 1),
          addDays(hoverDate, minNightsForHoverDate),
          'hovered-start-blocked-minimum-nights',
        );

        modifiers = this.deleteModifier(
          modifiers,
          addDays(hoverDate, minNightsForHoverDate),
          'hovered-start-first-possible-end',
        );
      }

      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        modifiers = this.addModifierToRange(
          modifiers,
          addDays(hoverDate, 1),
          addDays(hoverDate, minNightsForHoverDate),
          'hovered-start-blocked-minimum-nights',
        );

        modifiers = this.addModifier(
          modifiers,
          addDays(hoverDate, minNightsForHoverDate),
          'hovered-start-first-possible-end',
        );
      }
    }

    if (minimumNights > 0 && startDate && focusedInput === END_DATE) {
      modifiers = this.addModifierToRange(
        modifiers,
        startDate,
        addDays(startDate, minimumNights),
        'blocked-minimum-nights',
      );

      modifiers = this.addModifierToRange(
        modifiers,
        startDate,
        addDays(startDate, minimumNights),
        'blocked',
      );
    }

    const today = addHours(startOfDay(new Date()), 12);
    if (!isSameDay(this.today, today)) {
      modifiers = this.deleteModifier(modifiers, this.today, 'today');
      modifiers = this.addModifier(modifiers, today, 'today');
      this.today = today;
    }

    if (Object.keys(modifiers).length > 0) {
      this.setState({
        visibleDays: {
          ...visibleDays,
          ...modifiers,
        },
      });
    }

    if (didFocusChange || phrases !== prevPhrases) {
      // set the appropriate CalendarDay phrase based on focusedInput
      const chooseAvailableDate = getChooseAvailableDatePhrase(phrases, focusedInput);

      this.setState({
        phrases: {
          ...phrases,
          chooseAvailableDate,
        },
      });
    }
  }

  onDayClick(day, e) {
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
    } = this.props;

    if (e) e.preventDefault();
    if (this.isBlocked(day, !daysViolatingMinNightsCanBeClicked)) return;

    let { startDate, endDate } = this.props;

    if (startDateOffset || endDateOffset) {
      startDate = getSelectedDateOffset(startDateOffset, day);
      endDate = getSelectedDateOffset(endDateOffset, day);

      if (this.isBlocked(startDate) || this.isBlocked(endDate)) {
        return;
      }

      onDatesChange({ startDate, endDate });

      if (!keepOpenOnDateSelect) {
        onFocusChange(null);
        onClose({ startDate, endDate });
      }
    } else if (
      daysViolatingMinNightsCanBeClicked
      && this.doesNotMeetMinimumNights(day)
    ) {
      endDate = day;
      onDatesChange({ startDate, endDate });
    } else if (focusedInput === START_DATE) {
      const lastAllowedStartDate = endDate && subDays(endDate, minimumNights);
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
      const firstAllowedEndDate = startDate && addDays(startDate, minimumNights);

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

  onDayMouseEnter(day) {
    /* eslint react/destructuring-assignment: 1 */
    if (this.isTouchDevice) return;
    const {
      startDate,
      endDate,
      getMinNightsForHoverDate,
      focusedInput,
      minimumNights,
      startDateOffset,
      endDateOffset,
    } = this.props;

    const {
      hoverDate,
      visibleDays,
      dateOffset,
    } = this.state;

    let nextDateOffset = null;

    if (focusedInput) {
      const hasOffset = startDateOffset || endDateOffset;
      let modifiers = {};

      if (hasOffset) {
        const start = getSelectedDateOffset(startDateOffset, day);
        const end = getSelectedDateOffset(endDateOffset, day, (rangeDay) => addDays(rangeDay, 1));

        nextDateOffset = {
          start,
          end,
        };

        // eslint-disable-next-line react/destructuring-assignment
        if (dateOffset && dateOffset.start && dateOffset.end) {
          modifiers = this.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset');
        }
        modifiers = this.addModifierToRange(modifiers, start, end, 'hovered-offset');
      }

      if (!hasOffset) {
        modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');
        modifiers = this.addModifier(modifiers, day, 'hovered');

        if (startDate && !endDate && focusedInput === END_DATE) {
          if (isAfterDay(hoverDate, startDate)) {
            const endSpan = addDays(hoverDate, 1);
            modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
          }

          if (isBeforeDay(day, startDate) || isSameDay(day, startDate)) {
            modifiers = this.deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span');
          }

          if (!this.isBlocked(day) && isAfterDay(day, startDate)) {
            const endSpan = addDays(day, 1);
            modifiers = this.addModifierToRange(modifiers, startDate, endSpan, 'hovered-span');
            modifiers = this.addModifier(modifiers, startDate, 'selected-start-in-hovered-span');
          }
        }

        if (!startDate && endDate && focusedInput === START_DATE) {
          if (isBeforeDay(hoverDate, endDate)) {
            modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
          }

          if (isAfterDay(day, endDate) || isSameDay(day, endDate)) {
            modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
          }

          if (!this.isBlocked(day) && isBeforeDay(day, endDate)) {
            modifiers = this.addModifierToRange(modifiers, day, endDate, 'hovered-span');
            modifiers = this.addModifier(modifiers, endDate, 'selected-end-in-hovered-span');
          }
        }

        if (startDate) {
          const startSpan = addDays(startDate, 1);
          const endSpan = addDays(startDate, minimumNights + 1);
          modifiers = this.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');

          if (isSameDay(day, startDate)) {
            const newStartSpan = addDays(startDate, 1);
            const newEndSpan = addDays(startDate, minimumNights + 1);
            modifiers = this.addModifierToRange(
              modifiers,
              newStartSpan,
              newEndSpan,
              'after-hovered-start',
            );
          }
        }

        if (endDate) {
          const startSpan = subDays(endDate, minimumNights);
          modifiers = this.deleteModifierFromRange(modifiers, startSpan, endDate, 'before-hovered-end');

          if (isSameDay(day, endDate)) {
            const newStartSpan = subDays(endDate, minimumNights);
            modifiers = this.addModifierToRange(
              modifiers,
              newStartSpan,
              endDate,
              'before-hovered-end',
            );
          }
        }

        if (hoverDate && !this.isBlocked(hoverDate)) {
          const minNightsForPrevHoverDate = getMinNightsForHoverDate(hoverDate);
          if (minNightsForPrevHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = this.deleteModifierFromRange(
              modifiers,
              addDays(hoverDate, 1),
              addDays(hoverDate, minNightsForPrevHoverDate),
              'hovered-start-blocked-minimum-nights',
            );

            modifiers = this.deleteModifier(
              modifiers,
              addDays(hoverDate, minNightsForPrevHoverDate),
              'hovered-start-first-possible-end',
            );
          }
        }

        if (!this.isBlocked(day)) {
          const minNightsForHoverDate = getMinNightsForHoverDate(day);
          if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
            modifiers = this.addModifierToRange(
              modifiers,
              addDays(day, 1),
              addDays(day, minNightsForHoverDate),
              'hovered-start-blocked-minimum-nights',
            );

            modifiers = this.addModifier(
              modifiers,
              addDays(day, minNightsForHoverDate),
              'hovered-start-first-possible-end',
            );
          }
        }
      }

      this.setState({
        hoverDate: day,
        dateOffset: nextDateOffset,
        visibleDays: {
          ...visibleDays,
          ...modifiers,
        },
      });
    }
  }

  onDayMouseLeave(day) {
    const {
      startDate,
      endDate,
      focusedInput,
      getMinNightsForHoverDate,
      minimumNights,
    } = this.props;

    const { hoverDate, visibleDays, dateOffset } = this.state;
    if (this.isTouchDevice || !hoverDate) return;

    let modifiers = {};
    modifiers = this.deleteModifier(modifiers, hoverDate, 'hovered');

    if (dateOffset) {
      modifiers = this.deleteModifierFromRange(modifiers, dateOffset.start, dateOffset.end, 'hovered-offset');
    }

    if (startDate && !endDate) {
      if (isAfterDay(hoverDate, startDate)) {
        const endSpan = addDays(hoverDate, 1);
        modifiers = this.deleteModifierFromRange(modifiers, startDate, endSpan, 'hovered-span');
      }

      if (isAfterDay(day, startDate)) {
        modifiers = this.deleteModifier(modifiers, startDate, 'selected-start-in-hovered-span');
      }
    }

    if (!startDate && endDate) {
      if (isAfterDay(endDate, hoverDate)) {
        modifiers = this.deleteModifierFromRange(modifiers, hoverDate, endDate, 'hovered-span');
      }

      if (isBeforeDay(day, endDate)) {
        modifiers = this.deleteModifier(modifiers, endDate, 'selected-end-in-hovered-span');
      }
    }

    if (startDate && isSameDay(day, startDate)) {
      const startSpan = addDays(startDate, 1);
      const endSpan = addDays(startDate, minimumNights + 1);
      modifiers = this.deleteModifierFromRange(modifiers, startSpan, endSpan, 'after-hovered-start');
    }

    if (endDate && isSameDay(day, endDate)) {
      const startSpan = subDays(endDate, minimumNights);
      modifiers = this.deleteModifierFromRange(modifiers, startSpan, endDate, 'before-hovered-end');
    }

    if (!this.isBlocked(hoverDate)) {
      const minNightsForHoverDate = getMinNightsForHoverDate(hoverDate);
      if (minNightsForHoverDate > 0 && focusedInput === START_DATE) {
        modifiers = this.deleteModifierFromRange(
          modifiers,
          addDays(hoverDate, 1),
          addDays(hoverDate, minNightsForHoverDate),
          'hovered-start-blocked-minimum-nights',
        );

        modifiers = this.deleteModifier(
          modifiers,
          addDays(hoverDate, minNightsForHoverDate),
          'hovered-start-first-possible-end',
        );
      }
    }

    this.setState({
      hoverDate: null,
      visibleDays: {
        ...visibleDays,
        ...modifiers,
      },
    });
  }

  onPrevMonthClick() {
    const {
      enableOutsideDays,
      maxDate,
      minDate,
      numberOfMonths,
      onPrevMonthClick,
    } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const prevMonth = subMonths(currentMonth, 2);
    const { locale } = this.props;
    const prevMonthVisibleDays = getVisibleDays(
      prevMonth,
      1,
      enableOutsideDays,
      true,
      locale,
    );

    const newCurrentMonth = subMonths(currentMonth, 1);
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shoulddisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shoulddisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: {
        ...newVisibleDays,
        ...this.getModifiers(prevMonthVisibleDays),
      },
    }, () => {
      onPrevMonthClick(new Date(newCurrentMonth));
    });
  }

  onNextMonthClick() {
    const {
      enableOutsideDays,
      maxDate,
      minDate,
      numberOfMonths,
      onNextMonthClick,
    } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const nextMonth = addMonths(currentMonth, numberOfMonths + 1);
    const { locale } = this.props;
    const nextMonthVisibleDays = getVisibleDays(
      nextMonth,
      1,
      enableOutsideDays,
      true,
      locale,
    );
    const newCurrentMonth = addMonths(currentMonth, 1);
    this.setState({
      currentMonth: newCurrentMonth,
      disablePrev: this.shoulddisableMonthNavigation(minDate, newCurrentMonth),
      disableNext: this.shoulddisableMonthNavigation(maxDate, newCurrentMonth),
      visibleDays: {
        ...newVisibleDays,
        ...this.getModifiers(nextMonthVisibleDays),
      },
    }, () => {
      onNextMonthClick(new Date(newCurrentMonth));
    });
  }

  onMonthChange(newMonth) {
    const { numberOfMonths, enableOutsideDays, orientation } = this.props;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const { locale } = this.props;
    const newVisibleDays = getVisibleDays(
      newMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
      locale,
    );

    this.setState({
      currentMonth: new Date(newMonth),
      visibleDays: this.getModifiers(newVisibleDays),
    });
  }

  onYearChange(newMonth) {
    const { numberOfMonths, enableOutsideDays, orientation } = this.props;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const { locale } = this.props;
    const newVisibleDays = getVisibleDays(
      newMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
      locale,
    );

    this.setState({
      currentMonth: new Date(newMonth),
      visibleDays: this.getModifiers(newVisibleDays),
    });
  }

  onGetNextScrollableMonths() {
    const { numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const numberOfVisibleMonths = Object.keys(visibleDays).length;
    const nextMonth = addMonths(currentMonth, numberOfVisibleMonths);
    const { locale } = this.props;
    const newVisibleDays = getVisibleDays(
      nextMonth,
      numberOfMonths,
      enableOutsideDays,
      true,
      locale,
    );

    this.setState({
      visibleDays: {
        ...visibleDays,
        ...this.getModifiers(newVisibleDays),
      },
    });
  }

  onGetPrevScrollableMonths() {
    const { numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const firstPreviousMonth = subMonths(currentMonth, numberOfMonths);
    const newVisibleDays = getVisibleDays(
      firstPreviousMonth, numberOfMonths, enableOutsideDays, true,
    );

    this.setState({
      currentMonth: new Date(firstPreviousMonth),
      visibleDays: {
        ...visibleDays,
        ...this.getModifiers(newVisibleDays),
      },
    });
  }

  getFirstFocusableDay(newMonth) {
    const {
      startDate,
      endDate,
      focusedInput,
      minimumNights,
      numberOfMonths,
    } = this.props;

    let focusedDate = startOfMonth(newMonth);
    if (focusedInput === START_DATE && startDate) {
      focusedDate = new Date(startDate);
    } else if (focusedInput === END_DATE && !endDate && startDate) {
      focusedDate = addDays(startDate, minimumNights);
    } else if (focusedInput === END_DATE && endDate) {
      focusedDate = new Date(endDate);
    }

    if (this.isBlocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = endOfMonth(addMonths(newMonth, numberOfMonths - 1));
      let currentDay = new Date(focusedDate);
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = addDays(currentDay, 1);
        days.push(currentDay);
      }

      const viableDays = days.filter((day) => !this.isBlocked(day));

      if (viableDays.length > 0) {
        ([focusedDate] = viableDays);
      }
    }

    return focusedDate;
  }

  getModifiers(visibleDays) {
    const modifiers = {};
    Object.keys(visibleDays).forEach((month) => {
      modifiers[month] = {};
      visibleDays[month].forEach((day) => {
        modifiers[month][toISODateString(day)] = this.getModifiersForDay(day);
      });
    });

    return modifiers;
  }

  getModifiersForDay(day) {
    return new Set(Object.keys(this.modifiers).filter((modifier) => this.modifiers[modifier](day)));
  }

  getStateForNewMonth(nextProps) {
    const {
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
      orientation,
      startDate,
    } = nextProps;
    const initialVisibleMonthThunk = initialVisibleMonth || (
      startDate ? () => startDate : () => this.today
    );
    const currentMonth = initialVisibleMonthThunk();
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    const { locale } = this.props;
    const visibleDays = this.getModifiers(getVisibleDays(
      currentMonth,
      numberOfMonths,
      enableOutsideDays,
      withoutTransitionMonths,
      locale,
    ));
    return { currentMonth, visibleDays };
  }

  shoulddisableMonthNavigation(date, visibleMonth) {
    if (!date) return false;
    const {
      numberOfMonths,
      enableOutsideDays,
    } = this.props;
    return isDayVisible(date, visibleMonth, numberOfMonths, enableOutsideDays);
  }

  addModifier(updateddays, day, modifier) {
    return addModifier(updateddays, day, modifier, this.props, this.state);
  }

  addModifierToRange(updateddays, start, end, modifier) {
    let days = updateddays;

    let spanStart = new Date(start);
    while (isBeforeDay(spanStart, end)) {
      days = this.addModifier(days, spanStart, modifier);
      spanStart = addDays(spanStart, 1);
    }

    return days;
  }

  deleteModifier(updateddays, day, modifier) {
    return deleteModifier(updateddays, day, modifier, this.props, this.state);
  }

  deleteModifierFromRange(updateddays, start, end, modifier) {
    let days = updateddays;

    let spanStart = new Date(start);
    while (isBeforeDay(spanStart, end)) {
      days = this.deleteModifier(days, spanStart, modifier);
      spanStart = addDays(spanStart, 1);
    }

    return days;
  }

  doesNotMeetMinimumNights(day) {
    const {
      startDate,
      isOutsideRange,
      focusedInput,
      minimumNights,
    } = this.props;
    if (focusedInput !== END_DATE) return false;

    if (startDate) {
      const dayDiff = differenceInDays(day, addHours(startOfDay(startDate), 12));
      return dayDiff < minimumNights && dayDiff >= 0;
    }
    return isOutsideRange(subDays(day, minimumNights));
  }

  doesNotMeetMinNightsForHoveredStartDate(day, hoverDate) {
    const {
      focusedInput,
      getMinNightsForHoverDate,
    } = this.props;
    if (focusedInput !== END_DATE) return false;

    if (hoverDate && !this.isBlocked(hoverDate)) {
      const minNights = getMinNightsForHoverDate(hoverDate);
      const dayDiff = differenceInDays(day, addHours(startOfDay(hoverDate), 12));
      return dayDiff < minNights && dayDiff >= 0;
    }
    return false;
  }

  isDayAfterHoveredStartDate(day) {
    const { startDate, endDate, minimumNights } = this.props;
    const { hoverDate } = this.state || {};

    return !!startDate
      && !endDate
      && !this.isBlocked(day)
      && isNextDay(hoverDate, day)
      && minimumNights > 0
      && isSameDay(hoverDate, startDate);
  }

  isEndDate(day) {
    const { endDate } = this.props;
    return isSameDay(day, endDate);
  }

  isHovered(day) {
    const { hoverDate } = this.state || {};
    const { focusedInput } = this.props;
    return !!focusedInput && isSameDay(day, hoverDate);
  }

  isInHoveredSpan(day) {
    const { startDate, endDate } = this.props;
    const { hoverDate } = this.state || {};

    const isForwardRange = !!startDate && !endDate && (
      (hoverDate >= startDate ? isWithinInterval(day, { start: startDate, end: hoverDate }) : false)
      || isSameDay(hoverDate, day)
    );
    const isBackwardRange = !!endDate && !startDate && (
      (hoverDate <= endDate ? isWithinInterval(day, { start: hoverDate, end: endDate }) : false)
      || isSameDay(hoverDate, day)
    );

    const isValiddayHovered = hoverDate && !this.isBlocked(hoverDate);

    return (isForwardRange || isBackwardRange) && isValiddayHovered;
  }

  isInSelectedSpan(day) {
    const { startDate, endDate } = this.props;
    if (!isDate(startDate) || !isDate(endDate)) {
      return false;
    }
    return isWithinInterval(day, { start: startDate, end: endDate });
  }

  isLastInRange(day) {
    const { endDate } = this.props;
    return this.isInSelectedSpan(day) && isNextDay(day, endDate);
  }

  isStartDate(day) {
    const { startDate } = this.props;
    return isSameDay(day, startDate);
  }

  isBlocked(day, blockDaysViolatingMinNights = true) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day)
      || isOutsideRange(day)
      || (blockDaysViolatingMinNights && this.doesNotMeetMinimumNights(day));
  }

  isToday(day) {
    return isSameDay(day, this.today);
  }

  isFirstDayOfWeek(day) {
    const { firstDayOfWeek, locale } = this.props;
    if (firstDayOfWeek) {
      return isSameDay(day, startOfWeek(day, { weekStartsOn: firstDayOfWeek }));
    }
    return isSameDay(day, startOfWeek(day, { locale: getLocale(locale) }));
  }

  isLastDayOfWeek(day) {
    const { firstDayOfWeek, locale } = this.props;
    if (firstDayOfWeek) {
      return isSameDay(day, endOfWeek(day, { weekStartsOn: firstDayOfWeek }));
    }
    return isSameDay(day, endOfWeek(day, { locale: getLocale(locale) }));
  }

  isFirstPossibleEndDateForHoveredStartDate(day, hoverDate) {
    const { focusedInput, getMinNightsForHoverDate } = this.props;
    if (focusedInput !== END_DATE || !hoverDate || this.isBlocked(hoverDate)) return false;
    const minNights = getMinNightsForHoverDate(hoverDate);
    const firstAvailableEndDate = addDays(hoverDate, minNights);
    return isSameDay(day, firstAvailableEndDate);
  }

  beforeSelectedEnd(day) {
    const { endDate } = this.props;
    return isBeforeDay(day, endDate);
  }

  isDayBeforeHoveredEndDate(day) {
    const { startDate, endDate, minimumNights } = this.props;
    const { hoverDate } = this.state || {};

    return !!endDate
      && !startDate
      && !this.isBlocked(day)
      && isPreviousDay(hoverDate, day)
      && minimumNights > 0
      && isSameDay(hoverDate, endDate);
  }

  render() {
    const {
      numberOfMonths,
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
      enableOutsideDays,
      firstDayOfWeek,
      renderKeyboardShortcutsButton,
      renderKeyboardShortcutsPanel,
      hideKeyboardShortcutsPanel,
      daySize,
      focusedInput,
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
      locale,
    } = this.props;

    const {
      currentMonth,
      phrases,
      visibleDays,
      disablePrev,
      disableNext,
    } = this.state;

    return (
      <DayPicker
        orientation={orientation}
        enableOutsideDays={enableOutsideDays}
        modifiers={visibleDays}
        numberOfMonths={numberOfMonths}
        onDayClick={this.onDayClick}
        onDayMouseEnter={this.onDayMouseEnter}
        onDayMouseLeave={this.onDayMouseLeave}
        onPrevMonthClick={this.onPrevMonthClick}
        onNextMonthClick={this.onNextMonthClick}
        onMonthChange={this.onMonthChange}
        onTab={onTab}
        onShiftTab={onShiftTab}
        onYearChange={this.onYearChange}
        onGetNextScrollableMonths={this.onGetNextScrollableMonths}
        onGetPrevScrollableMonths={this.onGetPrevScrollableMonths}
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
        getFirstFocusableDay={this.getFirstFocusableDay}
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
        locale={locale}
      />
    );
  }
}

DayPickerRangeController.propTypes = propTypes;
DayPickerRangeController.defaultProps = defaultProps;
