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
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';
import CalendarInfoPositionShape from '../shapes/CalendarInfoPositionShape';
import NavPositionShape from '../shapes/NavPositionShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import getLocale from '../utils/getLocale';
import { addModifier, deleteModifier } from '../utils/modifiers';
import toISODateString from '../utils/toISODateString';
import getVisibleDays from '../utils/getVisibleDays';
import isAfterDay from '../utils/isAfterDay';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import { DayPickerPhrases } from '../defaultPhrases';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
  INFO_POSITION_BOTTOM,
  NAV_POSITION_TOP,
} from '../constants';

import DayPicker from './DayPicker';

const propTypes = forbidExtraProps({
  date: PropTypes.object,
  onDateChange: PropTypes.func,

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
  locale: PropTypes.string,
});

const defaultProps = {
  date: undefined, // TODO: use null
  onDateChange() {},

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
  monthFormat: 'MMMM yyyy',
  weekDayFormat: 'eee',
  phrases: DayPickerPhrases,
  dayAriaLabelFormat: undefined,

  isRTL: false,
  locale: null,
};

/** @extends React.Component */
export default class DayPickerSingleDateController extends React.PureComponent {
  constructor(props) {
    super(props);

    this.isTouchDevice = false;
    this.today = addHours(startOfDay(new Date()), 12);

    this.modifiers = {
      today: (day) => this.isToday(day),
      blocked: (day) => this.isBlocked(day),
      'blocked-calendar': (day) => props.isDayBlocked(day),
      'blocked-out-of-range': (day) => props.isOutsideRange(day),
      'highlighted-calendar': (day) => props.isDayHighlighted(day),
      valid: (day) => !this.isBlocked(day),
      hovered: (day) => this.isHovered(day),
      selected: (day) => this.isSelected(day),
      'first-day-of-week': (day) => this.isFirstDayOfWeek(day),
      'last-day-of-week': (day) => this.isLastDayOfWeek(day),
    };

    const { currentMonth, visibleDays } = this.getStateForNewMonth(props);

    this.state = {
      hoverDate: null,
      currentMonth,
      visibleDays,
    };

    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);

    this.onGetNextScrollableMonths = this.onGetNextScrollableMonths.bind(this);
    this.onGetPrevScrollableMonths = this.onGetPrevScrollableMonths.bind(this);
    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);
  }

  componentDidMount() {
    this.isTouchDevice = isTouchDevice();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      date,
      focused,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      initialVisibleMonth,
      numberOfMonths,
      enableOutsideDays,
    } = nextProps;
    const {
      isOutsideRange: prevIsOutsideRange,
      isDayBlocked: prevIsDayBlocked,
      isDayHighlighted: prevIsDayHighlighted,
      numberOfMonths: prevNumberOfMonths,
      enableOutsideDays: prevEnableOutsideDays,
      initialVisibleMonth: prevInitialVisibleMonth,
      focused: prevFocused,
      date: prevDate,
    } = this.props;

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

    if (
      numberOfMonths !== prevNumberOfMonths
      || enableOutsideDays !== prevEnableOutsideDays
      || (
        initialVisibleMonth !== prevInitialVisibleMonth
        && !prevFocused
        && focused
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

    const didDateChange = date !== prevDate;
    const didFocusChange = focused !== prevFocused;

    let modifiers = {};

    if (didDateChange) {
      modifiers = this.deleteModifier(modifiers, prevDate, 'selected');
      modifiers = this.addModifier(modifiers, date, 'selected');
    }

    if (didFocusChange || recomputePropModifiers) {
      values(visibleDays).forEach((days) => {
        Object.keys(days).forEach((day) => {
          const dateObj = addHours(startOfDay(parseISO(day)), 12);
          if (this.isBlocked(dateObj)) {
            modifiers = this.addModifier(modifiers, dateObj, 'blocked');
          } else {
            modifiers = this.deleteModifier(modifiers, dateObj, 'blocked');
          }

          if (didFocusChange || recomputeOutsideRange) {
            if (isOutsideRange(dateObj)) {
              modifiers = this.addModifier(modifiers, dateObj, 'blocked-out-of-range');
            } else {
              modifiers = this.deleteModifier(modifiers, dateObj, 'blocked-out-of-range');
            }
          }

          if (didFocusChange || recomputeDayBlocked) {
            if (isDayBlocked(dateObj)) {
              modifiers = this.addModifier(modifiers, dateObj, 'blocked-calendar');
            } else {
              modifiers = this.deleteModifier(modifiers, dateObj, 'blocked-calendar');
            }
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
  }

  UNSAFE_componentWillUpdate() {
    // const today = addHours(startOfDay(new Date()), 12);
  }

  onDayClick(day, e) {
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;
    const {
      onDateChange,
      keepOpenOnDateSelect,
      onFocusChange,
      onClose,
    } = this.props;

    onDateChange(day);
    if (!keepOpenOnDateSelect) {
      onFocusChange({ focused: false });
      onClose({ date: day });
    }
  }

  onDayMouseEnter(day) {
    if (this.isTouchDevice) return;
    const { hoverDate, visibleDays } = this.state;

    let modifiers = this.deleteModifier({}, hoverDate, 'hovered');
    modifiers = this.addModifier(modifiers, day, 'hovered');

    this.setState({
      hoverDate: day,
      visibleDays: {
        ...visibleDays,
        ...modifiers,
      },
    });
  }

  onDayMouseLeave() {
    const { hoverDate, visibleDays } = this.state;
    if (this.isTouchDevice || !hoverDate) return;

    const modifiers = this.deleteModifier({}, hoverDate, 'hovered');

    this.setState({
      hoverDate: null,
      visibleDays: {
        ...visibleDays,
        ...modifiers,
      },
    });
  }

  onPrevMonthClick() {
    const { onPrevMonthClick, numberOfMonths, enableOutsideDays } = this.props;
    const { currentMonth, visibleDays } = this.state;

    const newVisibleDays = {};
    Object.keys(visibleDays).sort().slice(0, numberOfMonths + 1).forEach((month) => {
      newVisibleDays[month] = visibleDays[month];
    });

    const prevMonth = subMonths(currentMonth, 1);
    const { locale } = this.props;
    const prevMonthVisibleDays = getVisibleDays(
      prevMonth,
      1,
      enableOutsideDays,
      true,
      locale,
    );

    this.setState({
      currentMonth: prevMonth,
      visibleDays: {
        ...newVisibleDays,
        ...this.getModifiers(prevMonthVisibleDays),
      },
    }, () => {
      onPrevMonthClick(new Date(prevMonth));
    });
  }

  onNextMonthClick() {
    const {
      onNextMonthClick,
      numberOfMonths,
      enableOutsideDays,
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
    const nextMonth = addMonths(currentMonth, numberOfVisibleMonths + 1);
    const newVisibleDays = getVisibleDays(nextMonth, numberOfMonths, enableOutsideDays, true);

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
    const { date, numberOfMonths } = this.props;

    let focusedDate = startOfMonth(newMonth);
    if (date) {
      focusedDate = new Date(date);
    }

    if (this.isBlocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = endOfMonth(addMonths(newMonth, numberOfMonths - 1));
      let currentDay = new Date(focusedDate);
      while (!isAfterDay(currentDay, lastVisibleDay)) {
        currentDay = addDays(currentDay, 1);
        days.push(currentDay);
      }

      const viableDays = days.filter((day) => !this.isBlocked(day) && isAfterDay(day, focusedDate));
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
      date,
      numberOfMonths,
      orientation,
      enableOutsideDays,
    } = nextProps;
    const initialVisibleMonthThunk = initialVisibleMonth || (date ? () => date : () => this.today);
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

  addModifier(updateddays, day, modifier) {
    return addModifier(updateddays, day, modifier, this.props, this.state);
  }

  deleteModifier(updateddays, day, modifier) {
    return deleteModifier(updateddays, day, modifier, this.props, this.state);
  }

  isBlocked(day) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day);
  }

  isHovered(day) {
    const { hoverDate } = this.state || {};
    return isSameDay(day, hoverDate);
  }

  isSelected(day) {
    const { date } = this.props;
    return isSameDay(day, date);
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
      locale,
    } = this.props;

    const { currentMonth, visibleDays } = this.state;

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
        onYearChange={this.onYearChange}
        onGetNextScrollableMonths={this.onGetNextScrollableMonths}
        onGetPrevScrollableMonths={this.onGetPrevScrollableMonths}
        monthFormat={monthFormat}
        withPortal={withPortal}
        hidden={!focused}
        hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
        initialVisibleMonth={() => currentMonth}
        firstDayOfWeek={firstDayOfWeek}
        onOutsideClick={onOutsideClick}
        dayPickerNavigationInlineStyles={dayPickerNavigationInlineStyles}
        navPosition={navPosition}
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
        getFirstFocusableDay={this.getFirstFocusableDay}
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
        locale={locale}
      />
    );
  }
}

DayPickerSingleDateController.propTypes = propTypes;
DayPickerSingleDateController.defaultProps = defaultProps;
