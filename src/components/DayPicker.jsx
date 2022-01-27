import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { withStyles, withStylesPropTypes } from 'react-with-styles';

import moment from 'moment';
import throttle from 'lodash/throttle';
import isTouchDeviceUtil from 'is-touch-device';
import OutsideClickHandler from 'react-outside-click-handler';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';

import CalendarMonthGrid from './CalendarMonthGrid';
import DayPickerNavigation from './DayPickerNavigation';
import DayPickerKeyboardShortcuts, {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
} from './DayPickerKeyboardShortcuts';

import getNumberOfCalendarMonthWeeks from '../utils/getNumberOfCalendarMonthWeeks';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import calculateDimension from '../utils/calculateDimension';
import getActiveElement from '../utils/getActiveElement';
import isDayVisible from '../utils/isDayVisible';
import isSameMonth from '../utils/isSameMonth';

import ModifiersShape from '../shapes/ModifiersShape';
import NavPositionShape from '../shapes/NavPositionShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
  INFO_POSITION_TOP,
  INFO_POSITION_BOTTOM,
  INFO_POSITION_BEFORE,
  INFO_POSITION_AFTER,
  MODIFIER_KEY_NAMES,
  NAV_POSITION_TOP,
  NAV_POSITION_BOTTOM,
} from '../constants';
import usePrevious from '../utils/usePrevious';

const MONTH_PADDING = 23;
const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';
const MONTH_SELECTION_TRANSITION = 'month_selection';
const YEAR_SELECTION_TRANSITION = 'year_selection';
const PREV_NAV = 'prev_nav';
const NEXT_NAV = 'next_nav';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,

  // calendar presentation props
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  onOutsideClick: PropTypes.func,
  hidden: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  renderCalendarInfo: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  isRTL: PropTypes.bool,
  verticalHeight: nonNegativeInteger,
  noBorder: PropTypes.bool,
  transitionDuration: nonNegativeInteger,
  verticalBorderSpacing: nonNegativeInteger,
  horizontalMonthPadding: nonNegativeInteger,
  renderKeyboardShortcutsButton: PropTypes.func,
  renderKeyboardShortcutsPanel: PropTypes.func,

  // navigation props
  dayPickerNavigationInlineStyles: PropTypes.object,
  disablePrev: PropTypes.bool,
  disableNext: PropTypes.bool,
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
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  onGetNextScrollableMonths: PropTypes.func, // VERTICAL_SCROLLABLE daypickers only
  onGetPrevScrollableMonths: PropTypes.func, // VERTICAL_SCROLLABLE daypickers only

  // month props
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderWeekHeaderElement: PropTypes.func,

  // day props
  modifiers: PropTypes.objectOf(PropTypes.objectOf(ModifiersShape)),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,

  // accessibility props
  isFocused: PropTypes.bool,
  getFirstFocusableDay: PropTypes.func,
  onBlur: PropTypes.func,
  showKeyboardShortcuts: PropTypes.bool,
  onTab: PropTypes.func,
  onShiftTab: PropTypes.func,

  // internationalization
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
  dayAriaLabelFormat: PropTypes.string,
});

export const defaultProps = {
  // calendar presentation props
  enableOutsideDays: false,
  numberOfMonths: 2,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  onOutsideClick() {},
  hidden: false,
  initialVisibleMonth: () => moment(),
  firstDayOfWeek: null,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  verticalHeight: null,
  noBorder: false,
  transitionDuration: undefined,
  verticalBorderSpacing: undefined,
  horizontalMonthPadding: 13,
  renderKeyboardShortcutsButton: undefined,
  renderKeyboardShortcutsPanel: undefined,

  // navigation props
  dayPickerNavigationInlineStyles: null,
  disablePrev: false,
  disableNext: false,
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
  onMonthChange() {},
  onYearChange() {},
  onGetNextScrollableMonths() {},
  onGetPrevScrollableMonths() {},

  // month props
  renderMonthText: null,
  renderMonthElement: null,
  renderWeekHeaderElement: null,

  // day props
  modifiers: {},
  renderCalendarDay: undefined,
  renderDayContents: null,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},

  // accessibility props
  isFocused: false,
  getFirstFocusableDay: null,
  onBlur() {},
  showKeyboardShortcuts: false,
  onTab() {},
  onShiftTab() {},

  // internationalization
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,
};

const DayPicker = memo((props) => {
  const { 
    getFirstFocusableDay,
    daySize, 
    hidden, 
    horizontalMonthPadding, 
    initialVisibleMonth, 
    isFocused, 
    orientation,
    showKeyboardShortcuts: initialShowKeyboardShortcuts,
    onBlur,
    renderMonthText,
    transitionDuration,
    enableOutsideDays,
    numberOfMonths,
    modifiers,
    withPortal,
    onDayClick,
    onDayMouseEnter,
    onDayMouseLeave,
    firstDayOfWeek,
    renderCalendarDay,
    renderDayContents,
    renderCalendarInfo,
    renderMonthElement,
    renderKeyboardShortcutsButton,
    renderKeyboardShortcutsPanel,
    calendarInfoPosition,
    hideKeyboardShortcutsPanel,
    onOutsideClick,
    monthFormat,
    isRTL,
    css,
    styles,
    theme,
    phrases,
    verticalHeight,
    dayAriaLabelFormat,
    noBorder,
    verticalBorderSpacing,
    navPosition,
  } = props;

  let calendarMonthWeeks;
  let calendarMonthGridHeight = 0;
  let setCalendarInfoWidthTimeout = null;
  let setCalendarMonthGridHeightTimeout = null;

  let hasSetInitialVisibleMonth = !hidden;
  
  const [currentMonthScrollTop, setCurrentMonthScrollTop] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(hidden ? moment() : initialVisibleMonth());
  const [monthTransition, setMonthTransition] = useState(null);
  const [translationValue, setTranslationValue] = useState(
    isRTL && isHorizontal()
      ? -getCalendarMonthWidth(daySize, horizontalMonthPadding)
      : 0
  );
  const [scrollableMonthMultiple, setScrollableMonthMultiple] = useState(1);
  const [calendarMonthWidth, setCalendarMonthWidth] = useState(getCalendarMonthWidth(daySize, horizontalMonthPadding));

  let initialFocusedDate = currentMonth.clone().startOf('month').hour(12);
  if (getFirstFocusableDay) {
    initialFocusedDate = getFirstFocusableDay(currentMonth);
  }
  const [focusedDate, setFocusedDate] = useState((!hidden || isFocused) ? initialFocusedDate : null);
  const [nextFocusedDate, setNextFocusedDate] = useState(null);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(initialShowKeyboardShortcuts);
  const [onKeyboardShortcutsPanelClose, setOnKeyboardShortcutsPanelClose] = useState(() => {});
  const [isTouchDevice, setIsTouchDevice] = useState(isTouchDeviceUtil());
  const [withMouseInteractions, setWithMouseInteractions] = useState(true);
  const [calendarInfoWidth, setCalendarInfoWidth] = useState(0);
  const [monthTitleHeight, setMonthTitleHeightOnState] = useState(null);
  const [hasSetHeight, setHasSetHeight] = useState(false);

  const containerRef = useRef(null);
  const calendarInfoRef = useRef(null);
  const transitionContainerRef = useRef(null);

  const isHorizontal = () => {
    const { orientation } = props;
    return orientation === HORIZONTAL_ORIENTATION;
  }

  const isVertical = () => {
    const { orientation } = props;
    return orientation === VERTICAL_ORIENTATION || orientation === VERTICAL_SCROLLABLE;
  }

  const getFirstDayOfWeek = () => {
    const { firstDayOfWeek } = props;
    if (firstDayOfWeek == null) {
      return moment.localeData().firstDayOfWeek();
    }

    return firstDayOfWeek;
  }

  const getWeekHeaders = () => {
    const { weekDayFormat } = props;
    const firstDayOfWeek = getFirstDayOfWeek();

    const weekHeaders = [];
    for (let i = 0; i < 7; i += 1) {
      weekHeaders.push(currentMonth.clone().day((i + firstDayOfWeek) % 7).format(weekDayFormat));
    }

    return weekHeaders;
  }

  const getFirstVisibleIndex = () => {
    const { orientation } = props;

    if (orientation === VERTICAL_SCROLLABLE) return 0;

    let firstVisibleMonthIndex = 1;
    if (monthTransition === PREV_TRANSITION) {
      firstVisibleMonthIndex -= 1;
    } else if (monthTransition === NEXT_TRANSITION) {
      firstVisibleMonthIndex += 1;
    }

    return firstVisibleMonthIndex;
  }

  const getFocusedDay = (newMonth) => {
    const { getFirstFocusableDay, numberOfMonths } = props;

    let focusedDate;
    if (getFirstFocusableDay) {
      focusedDate = getFirstFocusableDay(newMonth);
    }

    if (newMonth && (!focusedDate || !isDayVisible(focusedDate, newMonth, numberOfMonths))) {
      focusedDate = newMonth.clone().startOf('month').hour(12);
    }

    return focusedDate;
  }

  const adjustDayPickerHeight = (newMonthHeight) => {
    const monthHeight = newMonthHeight + MONTH_PADDING;
    if (monthHeight !== calendarMonthGridHeight) {
      transitionContainerRef.current.style.height = `${monthHeight}px`;
      if (!calendarMonthGridHeight) {
        setCalendarMonthGridHeightTimeout = setTimeout(() => {
          setHasSetHeight(true)
        }, 0);
      }
      calendarMonthGridHeight = monthHeight;
    }
  }

  const calculateAndSetDayPickerHeight = () => {
    const { daySize, numberOfMonths } = props;

    const visibleCalendarWeeks = calendarMonthWeeks.slice(1, numberOfMonths + 1);
    const calendarMonthWeeksHeight = Math.max(0, ...visibleCalendarWeeks) * (daySize - 1);
    const newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;

    if (isHorizontal()) {
      adjustDayPickerHeight(newMonthHeight);
    }
  }

  const setMonthTitleHeight = (monthTitleHeight) => {
    setMonthTitleHeightOnState(monthTitleHeight);
  };

  const setCalendarMonthWeeks = (currentMonth) => {
    const { numberOfMonths } = props;

    calendarMonthWeeks = [];
    let month = currentMonth.clone().subtract(1, 'months');
    const firstDayOfWeek = getFirstDayOfWeek();
    for (let i = 0; i < numberOfMonths + 2; i += 1) {
      const numberOfWeeks = getNumberOfCalendarMonthWeeks(month, firstDayOfWeek);
      calendarMonthWeeks.push(numberOfWeeks);
      month = month.add(1, 'months');
    }
  }

  const getNextScrollableMonths = (e) => {
    const { onGetNextScrollableMonths } = props;
    if (e) e.preventDefault();

    if (onGetNextScrollableMonths) onGetNextScrollableMonths(e);

    setScrollableMonthMultiple(scrollableMonthMultiple + 1);
  }

  const getPrevScrollableMonths = (e) => {
    const { numberOfMonths, onGetPrevScrollableMonths } = props;
    if (e) e.preventDefault();

    if (onGetPrevScrollableMonths) onGetPrevScrollableMonths(e);

    setCurrentMonth(currentMonth.clone().subtract(numberOfMonths, 'month'));
    setScrollableMonthMultiple(scrollableMonthMultiple + 1);
  }

  const handleNextMonthTransition = (nextFocusedDate) => {
    const { isRTL, numberOfMonths, daySize } = props;

    let translationValue;

    if (isVertical()) {
      const firstVisibleMonthWeeks = calendarMonthWeeks[1];
      const calendarMonthWeeksHeight = firstVisibleMonthWeeks * (daySize - 1);
      translationValue = -(monthTitleHeight + calendarMonthWeeksHeight + 1);
    }

    if (isHorizontal()) {
      translationValue = -calendarMonthWidth;
      if (isRTL) {
        translationValue = 0;
      }

      const visibleCalendarWeeks = calendarMonthWeeks.slice(2, numberOfMonths + 2);
      const calendarMonthWeeksHeight = Math.max(0, ...visibleCalendarWeeks) * (daySize - 1);
      const newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      adjustDayPickerHeight(newMonthHeight);
    }

    setMonthTransition(NEXT_TRANSITION);
    setTranslationValue(translationValue);
    setFocusedDate(null);
    setNextFocusedDate(nextFocusedDate);
  };

  const maybeTransitionNextMonth = (newFocusedDate) => {
    const { numberOfMonths } = props;

    const newFocusedDateMonth = newFocusedDate.month();
    const focusedDateMonth = focusedDate.month();
    const isNewFocusedDateVisible = isDayVisible(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      handleNextMonthTransition(newFocusedDate);
      return true;
    }

    return false;
  }

  const maybeTransitionPrevMonth = (newFocusedDate) => {
    const { numberOfMonths } = props;

    const newFocusedDateMonth = newFocusedDate.month();
    const focusedDateMonth = focusedDate.month();
    const isNewFocusedDateVisible = isDayVisible(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      handlePrevMonthTransition(newFocusedDate);
      return true;
    }

    return false;
  }

  const handleFinalKeyDown = (e) => {
    setWithMouseInteractions(false);

    const {
      onBlur,
      onTab,
      onShiftTab,
      isRTL,
    } = props;

    if (!focusedDate) return;

    const newFocusedDate = focusedDate.clone();

    let didTransitionMonth = false;

    // focus might be anywhere when the keyboard shortcuts panel is opened so we want to
    // return it to wherever it was before when the panel was opened
    const activeElement = getActiveElement();
    const onKeyboardShortcutsPanelClose = () => {
      if (activeElement) activeElement.focus();
    };

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newFocusedDate.subtract(1, 'week');
        didTransitionMonth = maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (isRTL) {
          newFocusedDate.add(1, 'day');
          didTransitionMonth = maybeTransitionNextMonth(newFocusedDate);
        } else {
          newFocusedDate.subtract(1, 'day');
          didTransitionMonth = maybeTransitionPrevMonth(newFocusedDate);
        }
        break;
      case 'Home':
        e.preventDefault();
        newFocusedDate.startOf('week').hour(12);
        didTransitionMonth = maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'PageUp':
        e.preventDefault();
        newFocusedDate.subtract(1, 'month');
        didTransitionMonth = maybeTransitionPrevMonth(newFocusedDate);
        break;

      case 'ArrowDown':
        e.preventDefault();
        newFocusedDate.add(1, 'week');
        didTransitionMonth = maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (isRTL) {
          newFocusedDate.subtract(1, 'day');
          didTransitionMonth = maybeTransitionPrevMonth(newFocusedDate);
        } else {
          newFocusedDate.add(1, 'day');
          didTransitionMonth = maybeTransitionNextMonth(newFocusedDate);
        }
        break;
      case 'End':
        e.preventDefault();
        newFocusedDate.endOf('week');
        didTransitionMonth = maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'PageDown':
        e.preventDefault();
        newFocusedDate.add(1, 'month');
        didTransitionMonth = maybeTransitionNextMonth(newFocusedDate);
        break;

      case '?':
        openKeyboardShortcutsPanel(onKeyboardShortcutsPanelClose);
        break;

      case 'Escape':
        if (showKeyboardShortcuts) {
          closeKeyboardShortcutsPanel();
        } else {
          onBlur(e);
        }
        break;

      case 'Tab':
        if (e.shiftKey) {
          onShiftTab();
        } else {
          onTab(e);
        }
        break;

      default:
        break;
    }

    // If there was a month transition, do not update the focused date until the transition has
    // completed. Otherwise, attempting to focus on a DOM node may interrupt the CSS animation. If
    // didTransitionMonth is true, the focusedDate gets updated in #updateStateAfterMonthTransition
    if (!didTransitionMonth) {
      setFocusedDate(newFocusedDate);
    }
  }

  let throttledKeyDown = throttle(handleFinalKeyDown, 200, { trailing: false });
  
  const handleKeyDown = (e) => {
    e.stopPropagation();

    if (!MODIFIER_KEY_NAMES.has(e.key)) {
      throttledKeyDown(e);
    }
  };

  const handlePrevMonthTransition = (nextFocusedDate) => {
    const { daySize, isRTL, numberOfMonths } = props;

    let translationValue;
    if (isVertical()) {
      const calendarMonthWeeksHeight = calendarMonthWeeks[0] * (daySize - 1);
      translationValue = monthTitleHeight + calendarMonthWeeksHeight + 1;
    } else if (isHorizontal()) {
      translationValue = calendarMonthWidth;
      if (isRTL) {
        translationValue = -2 * calendarMonthWidth;
      }

      const visibleCalendarWeeks = calendarMonthWeeks.slice(0, numberOfMonths);
      const calendarMonthWeeksHeight = Math.max(0, ...visibleCalendarWeeks) * (daySize - 1);
      const newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      adjustDayPickerHeight(newMonthHeight);
    }

    setMonthTransition(PREV_TRANSITION);
    setTranslationValue(translationValue);
    setFocusedDate(null);
    setNextFocusedDate(nextFocusedDate);
  }

  const handlePrevMonthClick = (e) => {
    if (e) e.preventDefault();
    handlePrevMonthTransition();
  }

  const handleMonthChange = (currentMonth) => {
    setCalendarMonthWeeks(currentMonth);
    calculateAndSetDayPickerHeight();

    // Translation value is a hack to force an invisible transition that
    // properly rerenders the CalendarMonthGrid
    setMonthTransition(MONTH_SELECTION_TRANSITION);
    setTranslationValue(0.00001);
    setFocusedDate(null);
    setNextFocusedDate(currentMonth);
    setCurrentMonth(currentMonth);
  }

  const handleYearChange = (currentMonth) => {
    setCalendarMonthWeeks(currentMonth);
    calculateAndSetDayPickerHeight();

    // Translation value is a hack to force an invisible transition that
    // properly rerenders the CalendarMonthGrid
    setMonthTransition(YEAR_SELECTION_TRANSITION);
    setTranslationValue(0.0001);
    setFocusedDate(null);
    setNextFocusedDate(currentMonth);
    setCurrentMonth(currentMonth);
  }

  const handleNextMonthClick = (e) => {
    if (e) e.preventDefault();
    handleNextMonthTransition();
  }  

  const updateStateAfterMonthTransition = () => {
    const {
      onPrevMonthClick,
      onNextMonthClick,
      numberOfMonths,
      onMonthChange,
      onYearChange,
      isRTL,
    } = props;

    if (!monthTransition) return;

    const newMonth = currentMonth.clone();
    const firstDayOfWeek = getFirstDayOfWeek();
    if (monthTransition === PREV_TRANSITION) {
      newMonth.subtract(1, 'month');
      if (onPrevMonthClick) onPrevMonthClick(newMonth);
      const newInvisibleMonth = newMonth.clone().subtract(1, 'month');
      const numberOfWeeks = getNumberOfCalendarMonthWeeks(newInvisibleMonth, firstDayOfWeek);
      calendarMonthWeeks = [numberOfWeeks, ...calendarMonthWeeks.slice(0, -1)];
    } else if (monthTransition === NEXT_TRANSITION) {
      newMonth.add(1, 'month');
      if (onNextMonthClick) onNextMonthClick(newMonth);
      const newInvisibleMonth = newMonth.clone().add(numberOfMonths, 'month');
      const numberOfWeeks = getNumberOfCalendarMonthWeeks(newInvisibleMonth, firstDayOfWeek);
      calendarMonthWeeks = [...calendarMonthWeeks.slice(1), numberOfWeeks];
    } else if (monthTransition === MONTH_SELECTION_TRANSITION) {
      if (onMonthChange) onMonthChange(newMonth);
    } else if (monthTransition === YEAR_SELECTION_TRANSITION) {
      if (onYearChange) onYearChange(newMonth);
    }

    let newFocusedDate = null;
    if (nextFocusedDate) {
      newFocusedDate = nextFocusedDate;
    } else if (!focusedDate && !withMouseInteractions) {
      newFocusedDate = getFocusedDay(newMonth);
    }

    setCurrentMonth(newMonth);
    setMonthTransition(null);
    setTranslationValue((isRTL && isHorizontal()) ? -calendarMonthWidth : 0);
    setNextFocusedDate(null);
    setFocusedDate(newFocusedDate);
  }

  const openKeyboardShortcutsPanel = (onCloseCallBack) => {
    setShowKeyboardShortcuts(true);
    setOnKeyboardShortcutsPanelClose(onCloseCallBack);
  }

  const closeKeyboardShortcutsPanel = () => {
    if (onKeyboardShortcutsPanelClose) {
      onKeyboardShortcutsPanelClose();
    }

    setShowKeyboardShortcuts(false);
    setOnKeyboardShortcutsPanelClose(null);
  }

  const { 
    numberOfMonths: prevNumberOfMonths,
    daySize: prevDaySize,
    isFocused: prevIsFocused,
    renderMonthText: prevRenderMonthText,
    orientation: prevOrientation,
  } = usePrevious(props, props) || {};
  const prevCurrentMonth = usePrevious(currentMonth, currentMonth);
  const prevMonthTitleHeight = usePrevious(monthTitleHeight);

  setCalendarMonthWeeks(currentMonth);

  useEffect(() => {
    const calendarInfoWidth = calendarInfoRef.current
      ? calculateDimension(calendarInfoRef.current, 'width', true, true)
      : 0;
    const currentMonthScrollTop = transitionContainerRef.current && orientation === VERTICAL_SCROLLABLE
      ? transitionContainerRef.current.scrollHeight - transitionContainerRef.current.scrollTop
      : null;

    setIsTouchDevice(isTouchDeviceUtil());
    setCalendarInfoWidth(calendarInfoWidth);
    setCurrentMonthScrollTop(currentMonthScrollTop);
    
    setCalendarMonthWeeks(currentMonth);

    return () => {
      if (setCalendarInfoWidthTimeout) clearTimeout(setCalendarInfoWidthTimeout);
      if (setCalendarMonthGridHeightTimeout) clearTimeout(setCalendarMonthGridHeightTimeout);
    }
  }, []);

  useEffect(() => {
    if (!hidden) {
      if (!hasSetInitialVisibleMonth) {
        hasSetInitialVisibleMonth = true;
        setCurrentMonth(initialVisibleMonth())
      } else {
        const newDate = initialVisibleMonth();
        if (!isDayVisible(newDate, prevCurrentMonth, numberOfMonths)) {
          handleMonthChange(newDate);
        }
      }
    }

    if (daySize !== prevDaySize) {
      setCalendarMonthWidth(getCalendarMonthWidth(
        daySize,
        horizontalMonthPadding,
      ));
    }

    if (isFocused !== prevIsFocused) {
      if (isFocused) {
        const focusedDate = getFocusedDay(prevCurrentMonth);

        if (showKeyboardShortcuts) {
          // the ? shortcut came from the input and we should return input there once it is close
          onKeyboardShortcutsPanelClose = onBlur;
        }

        setShowKeyboardShortcuts(showKeyboardShortcuts);
        setOnKeyboardShortcutsPanelClose(onKeyboardShortcutsPanelClose);
        setFocusedDate(focusedDate);
        setWithMouseInteractions(false);
      } else {
        setFocusedDate(null);
      }
    }

    if (renderMonthText !== null && prevRenderMonthText !== null
        && renderMonthText(prevCurrentMonth) !== prevRenderMonthText(prevCurrentMonth)) {
      setMonthTitleHeight(null);
    }

    // Capture the scroll position so when previous months are rendered above the current month
    // we can adjust scroll after the component has updated and the previous current month
    // stays in view.
    if (
      orientation === VERTICAL_SCROLLABLE
      && transitionContainerRef.current
      && !isSameMonth(prevCurrentMonth, currentMonth)
    ) {
      setCurrentMonthScrollTop(transitionContainerRef.current.scrollHeight - transitionContainerRef.current.scrollTop);
    }
  }, [hidden, daySize, isFocused, renderMonthText, orientation]);  

  useEffect(() => {
    let shouldAdjustHeight = false;
    if (numberOfMonths !== prevNumberOfMonths) {
      setCalendarMonthWeeks(currentMonth);
      shouldAdjustHeight = true;
    }
    if (
      isHorizontal()
      && (orientation !== prevOrientation || daySize !== prevDaySize)
    ) {
      shouldAdjustHeight = true;
    }

    if (shouldAdjustHeight) {
      const visibleCalendarWeeks = calendarMonthWeeks.slice(1, numberOfMonths + 1);
      const calendarMonthWeeksHeight = Math.max(0, ...visibleCalendarWeeks) * (daySize - 1);
      const newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      adjustDayPickerHeight(newMonthHeight);
    }

    if (!prevIsFocused && isFocused && !focusedDate) {
      containerRef.current.focus();
    }

    // If orientation is VERTICAL_SCROLLABLE and currentMonth has changed adjust scrollTop so the
    // new months rendered above the current month don't push the current month out of view.
    if (
      orientation === VERTICAL_SCROLLABLE
      && !isSameMonth(prevCurrentMonth, currentMonth)
      && currentMonthScrollTop
      && transitionContainerRef.current
    ) {
      transitionContainerRef.current.scrollTop = transitionContainerRef.current.scrollHeight
        - currentMonthScrollTop;
    }
  }, [orientation, daySize, isFocused, numberOfMonths]);

  // we don't want to focus on the relevant calendar day after a month transition
  // if the user is navigating around using a mouse
  useEffect(() => {
    if (currentMonth != prevCurrentMonth && withMouseInteractions) {
      const activeElement = getActiveElement();
        if (
          activeElement
          && activeElement !== document.body
          && containerRef.current.contains(activeElement)
          && activeElement.blur
        ) {
          activeElement.blur();
        }
    }
  }, [currentMonth]);

  useEffect(() => {
    if (monthTitleHeight !== prevMonthTitleHeight) {
      calculateAndSetDayPickerHeight();
    }
  }, [monthTitleHeight])
  
  useEffect(() => {
    // Calculating the dimensions trigger a DOM repaint which
    // breaks the CSS transition.
    // The Timeout will wait until the transition ends.
    if (calendarInfoRef.current) {
      setCalendarInfoWidthTimeout = setTimeout(() => {
        const calendarInfoPanelWidth = calculateDimension(calendarInfoRef.current, 'width', true, true);
        if (calendarInfoWidth !== calendarInfoPanelWidth) {
          setCalendarInfoWidth(calendarInfoPanelWidth);
        }
      }, transitionDuration);
    }
  }, []);

  const renderNavigation = (navDirection) => {
    const {
      dayPickerNavigationInlineStyles,
      disablePrev,
      disableNext,
      navPosition,
      navPrev,
      navNext,
      noNavButtons,
      noNavNextButton,
      noNavPrevButton,
      orientation,
      phrases,
      renderNavPrevButton,
      renderNavNextButton,
      isRTL,
    } = props;

    if (noNavButtons) {
      return null;
    }

    const handleNavigationPrevMonthClick = orientation === VERTICAL_SCROLLABLE
      ? getPrevScrollableMonths
      : handlePrevMonthClick;

    const handleNavigationNextMonthClick = orientation === VERTICAL_SCROLLABLE
      ? getNextScrollableMonths
      : handleNextMonthClick;

    return (
      <DayPickerNavigation
        disablePrev={disablePrev}
        disableNext={disableNext}
        inlineStyles={dayPickerNavigationInlineStyles}
        onPrevMonthClick={handleNavigationPrevMonthClick}
        onNextMonthClick={handleNavigationNextMonthClick}
        navPosition={navPosition}
        navPrev={navPrev}
        navNext={navNext}
        renderNavPrevButton={renderNavPrevButton}
        renderNavNextButton={renderNavNextButton}
        orientation={orientation}
        phrases={phrases}
        isRTL={isRTL}
        showNavNextButton={
          !(noNavNextButton || (orientation === VERTICAL_SCROLLABLE && navDirection === PREV_NAV))
        }
        showNavPrevButton={
          !(noNavPrevButton || (orientation === VERTICAL_SCROLLABLE && navDirection === NEXT_NAV))
        }
      />
    );
  }

  const renderWeekHeader = (index) => {
    const {
      daySize,
      horizontalMonthPadding,
      orientation,
      renderWeekHeaderElement,
      css,
      styles,
    } = props;

    const verticalScrollable = orientation === VERTICAL_SCROLLABLE;

    const horizontalStyle = {
      left: index * calendarMonthWidth,
    };
    const verticalStyle = {
      marginLeft: -calendarMonthWidth / 2,
    };

    let weekHeaderStyle = {}; // no styles applied to the vertical-scrollable orientation
    if (isHorizontal()) {
      weekHeaderStyle = horizontalStyle;
    } else if (isVertical() && !verticalScrollable) {
      weekHeaderStyle = verticalStyle;
    }

    const weekHeaders = getWeekHeaders();
    const header = weekHeaders.map((day) => (
      <li key={day} {...css(styles.DayPicker_weekHeader_li, { width: daySize })}>
        {renderWeekHeaderElement ? renderWeekHeaderElement(day) : <small>{day}</small>}
      </li>
    ));

    return (
      <div
        {...css(
          styles.DayPicker_weekHeader,
          isVertical() && styles.DayPicker_weekHeader__vertical,
          verticalScrollable && styles.DayPicker_weekHeader__verticalScrollable,
          weekHeaderStyle,
          { padding: `0 ${horizontalMonthPadding}px` },
        )}
        key={`week-${index}`}
      >
        <ul {...css(styles.DayPicker_weekHeader_ul)}>
          {header}
        </ul>
      </div>
    );
  }

  const { reactDates: { spacing: { dayPickerHorizontalPadding } } } = theme;

  const cachedIsHorizontal = isHorizontal();

  const numOfWeekHeaders = isVertical() ? 1 : numberOfMonths;
  const weekHeaders = [];
  for (let i = 0; i < numOfWeekHeaders; i += 1) {
    weekHeaders.push(renderWeekHeader(i));
  }

  const verticalScrollable = orientation === VERTICAL_SCROLLABLE;
  let height;
  if (cachedIsHorizontal) {
    height = calendarMonthGridHeight;
  } else if (isVertical() && !verticalScrollable && !withPortal) {
    // If the user doesn't set a desired height,
    // we default back to this kind of made-up value that generally looks good
    height = verticalHeight || 1.75 * calendarMonthWidth;
  }

  const isCalendarMonthGridAnimating = monthTransition !== null;

  const shouldFocusDate = !isCalendarMonthGridAnimating && isFocused;

  let keyboardShortcutButtonLocation = BOTTOM_RIGHT;
  if (isVertical()) {
    keyboardShortcutButtonLocation = withPortal ? TOP_LEFT : TOP_RIGHT;
  }

  const shouldAnimateHeight = cachedIsHorizontal && hasSetHeight;

  const calendarInfoPositionTop = calendarInfoPosition === INFO_POSITION_TOP;
  const calendarInfoPositionBottom = calendarInfoPosition === INFO_POSITION_BOTTOM;
  const calendarInfoPositionBefore = calendarInfoPosition === INFO_POSITION_BEFORE;
  const calendarInfoPositionAfter = calendarInfoPosition === INFO_POSITION_AFTER;
  const calendarInfoIsInline = calendarInfoPositionBefore || calendarInfoPositionAfter;

  const calendarInfo = renderCalendarInfo && (
    <div
      ref={calendarInfoRef}
      {...css((calendarInfoIsInline) && styles.DayPicker_calendarInfo__horizontal)}
    >
      {renderCalendarInfo()}
    </div>
  );

  const calendarInfoPanelWidth = renderCalendarInfo && calendarInfoIsInline
    ? calendarInfoWidth
    : 0;

  const firstVisibleMonthIndex = getFirstVisibleIndex();
  const wrapperHorizontalWidth = (calendarMonthWidth * numberOfMonths)
    + (2 * dayPickerHorizontalPadding);
  // Adding `1px` because of whitespace between 2 inline-block
  const fullHorizontalWidth = wrapperHorizontalWidth + calendarInfoPanelWidth + 1;

  const transitionContainerStyle = {
    width: cachedIsHorizontal && wrapperHorizontalWidth,
    height,
  };

  const dayPickerWrapperStyle = {
    width: cachedIsHorizontal && wrapperHorizontalWidth,
  };

  const dayPickerStyle = {
    width: cachedIsHorizontal && fullHorizontalWidth,

    // These values are to center the datepicker (approximately) on the page
    marginLeft: cachedIsHorizontal && withPortal ? -fullHorizontalWidth / 2 : null,
    marginTop: cachedIsHorizontal && withPortal ? -calendarMonthWidth / 2 : null,
  };

  return (
    <div
      {...css(
        styles.DayPicker,
        cachedIsHorizontal && styles.DayPicker__horizontal,
        verticalScrollable && styles.DayPicker__verticalScrollable,
        cachedIsHorizontal && withPortal && styles.DayPicker_portal__horizontal,
        isVertical() && withPortal && styles.DayPicker_portal__vertical,
        dayPickerStyle,
        !monthTitleHeight && styles.DayPicker__hidden,
        !noBorder && styles.DayPicker__withBorder,
      )}
    >
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        {(calendarInfoPositionTop || calendarInfoPositionBefore) && calendarInfo}

        <div
          {...css(
            dayPickerWrapperStyle,
            calendarInfoIsInline && cachedIsHorizontal && styles.DayPicker_wrapper__horizontal,
          )}
        >

          <div
            {...css(
              styles.DayPicker_weekHeaders,
              cachedIsHorizontal && styles.DayPicker_weekHeaders__horizontal,
            )}
            aria-hidden="true"
            role="presentation"
          >
            {weekHeaders}
          </div>

          <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
            {...css(styles.DayPicker_focusRegion)}
            ref={containerRef}
            onClick={(e) => { e.stopPropagation(); }}
            onKeyDown={handleKeyDown}
            onMouseUp={() => { setWithMouseInteractions(true); }}
            tabIndex={-1}
            role="application"
            aria-roledescription={phrases.roleDescription}
            aria-label={phrases.calendarLabel}
          >
            {!verticalScrollable && navPosition === NAV_POSITION_TOP && renderNavigation()}

            <div
              {...css(
                styles.DayPicker_transitionContainer,
                shouldAnimateHeight && styles.DayPicker_transitionContainer__horizontal,
                isVertical() && styles.DayPicker_transitionContainer__vertical,
                verticalScrollable && styles.DayPicker_transitionContainer__verticalScrollable,
                transitionContainerStyle,
              )}
              ref={transitionContainerRef}
            >
              {verticalScrollable && renderNavigation(PREV_NAV)}
              <CalendarMonthGrid
                setMonthTitleHeight={!monthTitleHeight ? setMonthTitleHeight : undefined}
                translationValue={translationValue}
                enableOutsideDays={enableOutsideDays}
                firstVisibleMonthIndex={firstVisibleMonthIndex}
                initialMonth={currentMonth}
                isAnimating={isCalendarMonthGridAnimating}
                modifiers={modifiers}
                orientation={orientation}
                numberOfMonths={numberOfMonths * scrollableMonthMultiple}
                onDayClick={onDayClick}
                onDayMouseEnter={onDayMouseEnter}
                onDayMouseLeave={onDayMouseLeave}
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
                renderMonthText={renderMonthText}
                renderCalendarDay={renderCalendarDay}
                renderDayContents={renderDayContents}
                renderMonthElement={renderMonthElement}
                onMonthTransitionEnd={updateStateAfterMonthTransition}
                monthFormat={monthFormat}
                daySize={daySize}
                firstDayOfWeek={firstDayOfWeek}
                isFocused={shouldFocusDate}
                focusedDate={focusedDate}
                phrases={phrases}
                isRTL={isRTL}
                dayAriaLabelFormat={dayAriaLabelFormat}
                transitionDuration={transitionDuration}
                verticalBorderSpacing={verticalBorderSpacing}
                horizontalMonthPadding={horizontalMonthPadding}
              />
              {verticalScrollable && renderNavigation(NEXT_NAV)}
            </div>

            {!verticalScrollable
              && navPosition === NAV_POSITION_BOTTOM
              && renderNavigation()}

            {!isTouchDevice && !hideKeyboardShortcutsPanel && (
              <DayPickerKeyboardShortcuts
                block={isVertical() && !withPortal}
                buttonLocation={keyboardShortcutButtonLocation}
                showKeyboardShortcutsPanel={showKeyboardShortcuts}
                openKeyboardShortcutsPanel={openKeyboardShortcutsPanel}
                closeKeyboardShortcutsPanel={closeKeyboardShortcutsPanel}
                phrases={phrases}
                renderKeyboardShortcutsButton={renderKeyboardShortcutsButton}
                renderKeyboardShortcutsPanel={renderKeyboardShortcutsPanel}
              />
            )}
          </div>
        </div>

        {(calendarInfoPositionBottom || calendarInfoPositionAfter) && calendarInfo}
      </OutsideClickHandler>
    </div>
  );
});

DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;

export { DayPicker as PureDayPicker };

export default withStyles(({
  reactDates: {
    color,
    font,
    noScrollBarOnVerticalScrollable,
    spacing,
    zIndex,
  },
}) => ({
  DayPicker: {
    background: color.background,
    position: 'relative',
    textAlign: noflip('left'),
  },

  DayPicker__horizontal: {
    background: color.background,
  },

  DayPicker__verticalScrollable: {
    height: '100%',
  },

  DayPicker__hidden: {
    visibility: 'hidden',
  },

  DayPicker__withBorder: {
    boxShadow: noflip('0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07)'),
    borderRadius: 3,
  },

  DayPicker_portal__horizontal: {
    boxShadow: 'none',
    position: 'absolute',
    left: noflip('50%'),
    top: '50%',
  },

  DayPicker_portal__vertical: {
    position: 'initial',
  },

  DayPicker_focusRegion: {
    outline: 'none',
  },

  DayPicker_calendarInfo__horizontal: {
    display: 'inline-block',
    verticalAlign: 'top',
  },

  DayPicker_wrapper__horizontal: {
    display: 'inline-block',
    verticalAlign: 'top',
  },

  DayPicker_weekHeaders: {
    position: 'relative',
  },

  DayPicker_weekHeaders__horizontal: {
    marginLeft: noflip(spacing.dayPickerHorizontalPadding),
  },

  DayPicker_weekHeader: {
    color: color.placeholderText,
    position: 'absolute',
    top: 62,
    zIndex: zIndex + 2,
    textAlign: noflip('left'),
  },

  DayPicker_weekHeader__vertical: {
    left: noflip('50%'),
  },

  DayPicker_weekHeader__verticalScrollable: {
    top: 0,
    display: 'table-row',
    borderBottom: `1px solid ${color.core.border}`,
    background: color.background,
    marginLeft: noflip(0),
    left: noflip(0),
    width: '100%',
    textAlign: 'center',
  },

  DayPicker_weekHeader_ul: {
    listStyle: 'none',
    margin: '1px 0',
    paddingLeft: noflip(0),
    paddingRight: noflip(0),
    fontSize: font.size,
  },

  DayPicker_weekHeader_li: {
    display: 'inline-block',
    textAlign: 'center',
  },

  DayPicker_transitionContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 3,
  },

  DayPicker_transitionContainer__horizontal: {
    transition: 'height 0.2s ease-in-out',
  },

  DayPicker_transitionContainer__vertical: {
    width: '100%',
  },

  DayPicker_transitionContainer__verticalScrollable: {
    paddingTop: 20,
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: noflip(0),
    left: noflip(0),
    overflowY: 'scroll',
    ...(noScrollBarOnVerticalScrollable && {
      '-webkitOverflowScrolling': 'touch',
      '::-webkit-scrollbar': {
        '-webkit-appearance': 'none',
        display: 'none',
      },
    }),
  },
}), { pureComponent: typeof React.PureComponent !== 'undefined' })(DayPicker);
