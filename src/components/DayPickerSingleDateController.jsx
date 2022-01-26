import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import values from 'object.values';
import isTouchDeviceUtil from 'is-touch-device';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isSameDay from '../utils/isSameDay';
import isAfterDay from '../utils/isAfterDay';
import isDayVisible from '../utils/isDayVisible';

import getVisibleDays from '../utils/getVisibleDays';

import toISODateString from '../utils/toISODateString';
import { addModifier as addModifierUtil, deleteModifier as deleteModifierUtil } from '../utils/modifiers';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
  INFO_POSITION_BOTTOM,
  NAV_POSITION_TOP,
} from '../constants';

import DayPicker from './DayPicker';
import getPooledMoment from '../utils/getPooledMoment';
import usePrevious from '../utils/usePrevious';

// Default value of the date property. Represents the state
// when there is no date selected.
// TODO: use null
const DATE_UNSET_VALUE = undefined;

const propTypes = forbidExtraProps({
  date: momentPropTypes.momentObj,
  minDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,
  onDateChange: PropTypes.func,

  allowUnselect: PropTypes.bool,
  focused: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  verticalHeight: nonNegativeInteger,
  noBorder: PropTypes.bool,
  verticalBorderSpacing: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,
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
  calendarInfoPosition: CalendarInfoPositionShape,

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
  date: DATE_UNSET_VALUE,
  minDate: null,
  maxDate: null,
  onDateChange() {},

  allowUnselect: false,
  focused: false,
  onFocusChange() {},
  onClose() {},

  keepOpenOnDateSelect: false,
  isOutsideRange() {},
  isDayBlocked() {},
  isDayHighlighted() {},

  // DayPicker props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hideKeyboardShortcutsPanel: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  daySize: DAY_SIZE,
  verticalHeight: null,
  noBorder: false,
  verticalBorderSpacing: undefined,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,

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
  calendarInfoPosition: INFO_POSITION_BOTTOM,

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

const DayPickerSingleDateController = memo((props) => {
  const {
    isDayBlocked,
    isOutsideRange,
    isDayHighlighted,
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
    noNavPrevButton,
    noNavNextButton,
    onOutsideClick,
    onShiftTab,
    onTab,
    withPortal,
    focused,
    enableOutsideDays,
    hideKeyboardShortcutsPanel,
    daySize,
    firstDayOfWeek,
    renderCalendarDay,
    renderDayContents,
    renderCalendarInfo,
    renderMonthElement,
    calendarInfoPosition,
    isFocused,
    isRTL,
    phrases,
    dayAriaLabelFormat,
    onBlur,
    showKeyboardShortcuts,
    weekDayFormat,
    verticalHeight,
    noBorder,
    transitionDuration,
    verticalBorderSpacing,
    horizontalMonthPadding,
    minDate,
    maxDate,
    date,
    initialVisibleMonth,
  } = props;

  let isTouchDevice = isTouchDeviceUtil();
  let today = moment();

  useEffect(() => {
    today = moment();
  });

  const isBlocked = (day) => {
    const { isDayBlocked, isOutsideRange } = props;
    return isDayBlocked(day) || isOutsideRange(day);
  }

  const isHovered = (day) => {
    return isSameDay(day, hoverDate);
  }

  const isSelected = (day) => {
    const { date } = props;
    return isSameDay(day, date);
  }

  const isToday = (day) => {
    return isSameDay(day, today);
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

  const getFirstFocusableDay = (newMonth) => {
    const { date, numberOfMonths } = props;

    let focusedDate = newMonth.clone().startOf('month').hour(12);
    if (date) {
      focusedDate = date.clone();
    }

    if (isBlocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter((day) => !isBlocked(day) && isAfterDay(day, focusedDate));
      if (viableDays.length > 0) {
        ([focusedDate] = viableDays);
      }
    }

    return focusedDate;
  }

  let modifiers = {
    today: (day) => isToday(day),
    blocked: (day) => isBlocked(day),
    'blocked-calendar': (day) => isDayBlocked(day),
    'blocked-out-of-range': (day) => isOutsideRange(day),
    'highlighted-calendar': (day) => isDayHighlighted(day),
    valid: (day) => !isBlocked(day),
    hovered: (day) => isHovered(day),
    selected: (day) => isSelected(day),
    'first-day-of-week': (day) => isFirstDayOfWeek(day),
    'last-day-of-week': (day) => isLastDayOfWeek(day),
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

  const getStateForNewMonth = (props) => {
    const {
      initialVisibleMonth,
      date,
      numberOfMonths,
      orientation,
      enableOutsideDays,
    } = props;
    const initialVisibleMonthThunk = initialVisibleMonth || (date ? () => date : () => today);
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

  const shouldDisableMonthNavigation = (date, visibleMonth) => {
    if (!date) return false;

    const {
      numberOfMonths,
      enableOutsideDays,
    } = props;

    return isDayVisible(date, visibleMonth, numberOfMonths, enableOutsideDays);
  }

  const { currentMonth: initialCurrentMonth, visibleDays: initialVisibleDays } = getStateForNewMonth(props);

  const [hoverDate, setHoverDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(initialCurrentMonth);
  const [visibleDays, setVisibleDays] = useState(initialVisibleDays);
  const [disablePrev, setDisablePrev] = useState(shouldDisableMonthNavigation(minDate, currentMonth));
  const [disableNext, setDisableNext] = useState(shouldDisableMonthNavigation(maxDate, currentMonth));

  const addModifier = (updatedDays, day, modifier) => {
    return addModifierUtil(updatedDays, day, modifier, props, {
      hoverDate,
      currentMonth,
      visibleDays,
      disablePrev,
      disableNext,
    });
  }

  const deleteModifier = (updatedDays, day, modifier) => {
    return deleteModifierUtil(updatedDays, day, modifier, props, {
      hoverDate,
      currentMonth,
      visibleDays,
      disablePrev,
      disableNext,
    });
  }

  const {
    isOutsideRange: prevIsOutsideRange,
    isDayBlocked: prevIsDayBlocked,
    isDayHighlighted: prevIsDayHighlighted,
    numberOfMonths: prevNumberOfMonths,
    enableOutsideDays: prevEnableOutsideDays,
    initialVisibleMonth: prevInitialVisibleMonth,
    focused: prevFocused,
    date: prevDate,
  } = usePrevious(props, props) || {};

  const prevCurrentMonth = usePrevious(currentMonth);

  useEffect(() => {
    const {
      date,
      focused,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
    } = props;
    
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

    if (
      numberOfMonths !== prevNumberOfMonths
      || enableOutsideDays !== prevEnableOutsideDays
      || (
        initialVisibleMonth !== prevInitialVisibleMonth
        && !prevFocused
        && focused
      )
      || (
        prevDate
        && prevDate.diff(date)
        && !isDayVisible(date, prevCurrentMonth, numberOfMonths)
      )
    ) {
      setCurrentMonth(newMonthState);
      setVisibleDays(getStateForNewMonth(nextProps).viableDays);
    }

    const didDateChange = date !== prevDate;
    const didFocusChange = focused !== prevFocused;

    let modifiers = {};

    if (didDateChange) {
      modifiers = deleteModifier(modifiers, prevDate, 'selected');
      modifiers = addModifier(modifiers, date, 'selected');
    }

    if (didFocusChange || recomputePropModifiers) {
      values(visibleDays).forEach((days) => {
        Object.keys(days).forEach((day) => {
          const momentObj = getPooledMoment(day);
          if (isBlocked(momentObj)) {
            modifiers = addModifier(modifiers, momentObj, 'blocked');
          } else {
            modifiers = deleteModifier(modifiers, momentObj, 'blocked');
          }

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(momentObj)) {
              modifiers = addModifier(modifiers, momentObj, 'blocked-out-of-range');
            } else {
              modifiers = deleteModifier(modifiers, momentObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(momentObj)) {
              modifiers = addModifier(modifiers, momentObj, 'blocked-calendar');
            } else {
              modifiers = deleteModifier(modifiers, momentObj, 'blocked-calendar');
            }
          }

          if (didFocusChange || recomputeDayHighlighted) {
            if (isDayHighlighted(momentObj)) {
              modifiers = addModifier(modifiers, momentObj, 'highlighted-calendar');
            } else {
              modifiers = deleteModifier(modifiers, momentObj, 'highlighted-calendar');
            }
          }
        });
      });
    }

    const today = moment();
    if (!isSameDay(today, today)) {
      modifiers = deleteModifier(modifiers, today, 'today');
      modifiers = addModifier(modifiers, today, 'today');
      today = today;
    }

    if (Object.keys(modifiers).length > 0) {
      setVisibleDays({
        ...visibleDays,
        ...modifiers,
      })
    }
  }, [
    date,
    focused,
    isOutsideRange,
    isDayBlocked,
    isDayHighlighted,
    initialVisibleMonth,
    numberOfMonths,
    enableOutsideDays,
    currentMonth,
  ]);

  useEffect(() => {
    const { onNextMonthClick } = props;
    if (currentMonth !== prevCurrentMonth) {
      onNextMonthClick(currentMonth.clone());
    }
  }, [currentMonth])


  const handleDayClick = (day, e) => {
    if (e) e.preventDefault();
    if (isBlocked(day)) return;
    const {
      allowUnselect,
      onDateChange,
      keepOpenOnDateSelect,
      onFocusChange,
      onClose,
    } = props;

    const clickedDay = allowUnselect && isSelected(day) ? DATE_UNSET_VALUE : day;

    onDateChange(clickedDay);
    if (!keepOpenOnDateSelect) {
      onFocusChange({ focused: false });
      onClose({ date: clickedDay });
    }
  }

  const handleDayMouseEnter = (day) => {
    if (isTouchDevice) return;

    let modifiers = deleteModifier({}, hoverDate, 'hovered');
    modifiers = addModifier(modifiers, day, 'hovered');

    setHoverDate(day);
    setVisibleDays({
      ...visibleDays,
      ...modifiers,
    });
  }

  const handleDayMouseLeave = () => {
    if (isTouchDevice || !hoverDate) return;

    const modifiers = deleteModifier({}, hoverDate, 'hovered');

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

    const prevMonth = currentMonth.clone().subtract(1, 'month');
    const prevMonthVisibleDays = getVisibleDays(prevMonth, 1, enableOutsideDays);
    const newCurrentMonth = currentMonth.clone().subtract(1, 'month');

    setCurrentMonth(prevMonth);
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

    const nextMonth = currentMonth.clone().add(numberOfMonths, 'month');
    const nextMonthVisibleDays = getVisibleDays(nextMonth, 1, enableOutsideDays);

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
      onYearChange={handleYearChange}
      onGetNextScrollableMonths={handleGetNextScrollableMonths}
      onGetPrevScrollableMonths={handleGetPrevScrollableMonths}
      monthFormat={monthFormat}
      withPortal={withPortal}
      hidden={!focused}
      hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
      initialVisibleMonth={() => currentMonth}
      firstDayOfWeek={firstDayOfWeek}
      onOutsideClick={onOutsideClick}
      dayPickerNavigationInlineStyles={dayPickerNavigationInlineStyles}
      navPosition={navPosition}
      disablePrev={disablePrev}
      disableNext={disableNext}
      navPrev={navPrev}
      navNext={navNext}
      renderNavPrevButton={renderNavPrevButton}
      renderNavNextButton={renderNavNextButton}
      noNavButtons={noNavButtons}
      noNavNextButton={noNavNextButton}
      noNavPrevButton={noNavPrevButton}
      renderMonthText={renderMonthText}
      renderWeekHeaderElement={renderWeekHeaderElement}
      renderCalendarDay={renderCalendarDay}
      renderDayContents={renderDayContents}
      renderCalendarInfo={renderCalendarInfo}
      renderMonthElement={renderMonthElement}
      calendarInfoPosition={calendarInfoPosition}
      isFocused={isFocused}
      getFirstFocusableDay={getFirstFocusableDay}
      onBlur={onBlur}
      onTab={onTab}
      onShiftTab={onShiftTab}
      phrases={phrases}
      daySize={daySize}
      isRTL={isRTL}
      showKeyboardShortcuts={showKeyboardShortcuts}
      weekDayFormat={weekDayFormat}
      dayAriaLabelFormat={dayAriaLabelFormat}
      verticalHeight={verticalHeight}
      noBorder={noBorder}
      transitionDuration={transitionDuration}
      verticalBorderSpacing={verticalBorderSpacing}
      horizontalMonthPadding={horizontalMonthPadding}
    />
  );
});

DayPickerSingleDateController.propTypes = propTypes;
DayPickerSingleDateController.defaultProps = defaultProps;

export default DayPickerSingleDateController;
