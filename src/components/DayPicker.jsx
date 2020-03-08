import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import moment from 'moment';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';
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

class DayPicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const currentMonth = props.hidden ? moment() : props.initialVisibleMonth();

    let focusedDate = currentMonth.clone().startOf('month');
    if (props.getFirstFocusableDay) {
      focusedDate = props.getFirstFocusableDay(currentMonth);
    }

    const { horizontalMonthPadding } = props;

    const translationValue = props.isRTL && this.isHorizontal()
      ? -getCalendarMonthWidth(props.daySize, horizontalMonthPadding)
      : 0;

    this.hasSetInitialVisibleMonth = !props.hidden;
    this.state = {
      currentMonthScrollTop: null,
      currentMonth,
      monthTransition: null,
      translationValue,
      scrollableMonthMultiple: 1,
      calendarMonthWidth: getCalendarMonthWidth(props.daySize, horizontalMonthPadding),
      focusedDate: (!props.hidden || props.isFocused) ? focusedDate : null,
      nextFocusedDate: null,
      showKeyboardShortcuts: props.showKeyboardShortcuts,
      onKeyboardShortcutsPanelClose() {},
      isTouchDevice: isTouchDevice(),
      withMouseInteractions: true,
      calendarInfoWidth: 0,
      monthTitleHeight: null,
      hasSetHeight: false,
    };

    this.setCalendarMonthWeeks(currentMonth);

    this.calendarMonthGridHeight = 0;
    this.setCalendarInfoWidthTimeout = null;
    this.setCalendarMonthGridHeightTimeout = null;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.throttledKeyDown = throttle(this.onFinalKeyDown, 200, { trailing: false });
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onPrevMonthTransition = this.onPrevMonthTransition.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onNextMonthTransition = this.onNextMonthTransition.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);

    this.getNextScrollableMonths = this.getNextScrollableMonths.bind(this);
    this.getPrevScrollableMonths = this.getPrevScrollableMonths.bind(this);
    this.updateStateAfterMonthTransition = this.updateStateAfterMonthTransition.bind(this);

    this.openKeyboardShortcutsPanel = this.openKeyboardShortcutsPanel.bind(this);
    this.closeKeyboardShortcutsPanel = this.closeKeyboardShortcutsPanel.bind(this);

    this.setCalendarInfoRef = this.setCalendarInfoRef.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
    this.setTransitionContainerRef = this.setTransitionContainerRef.bind(this);
    this.setMonthTitleHeight = this.setMonthTitleHeight.bind(this);
  }

  componentDidMount() {
    const { orientation } = this.props;
    const { currentMonth } = this.state;

    const calendarInfoWidth = this.calendarInfo
      ? calculateDimension(this.calendarInfo, 'width', true, true)
      : 0;
    const currentMonthScrollTop = this.transitionContainer && orientation === VERTICAL_SCROLLABLE
      ? this.transitionContainer.scrollHeight - this.transitionContainer.scrollTop
      : null;

    this.setState({
      isTouchDevice: isTouchDevice(),
      calendarInfoWidth,
      currentMonthScrollTop,
    });

    this.setCalendarMonthWeeks(currentMonth);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const {
      hidden,
      isFocused,
      showKeyboardShortcuts,
      onBlur,
      orientation,
      renderMonthText,
      horizontalMonthPadding,
    } = nextProps;
    const { currentMonth } = this.state;
    const { currentMonth: nextCurrentMonth } = nextState;

    if (!hidden) {
      if (!this.hasSetInitialVisibleMonth) {
        this.hasSetInitialVisibleMonth = true;
        this.setState({
          currentMonth: nextProps.initialVisibleMonth(),
        });
      }
    }

    const {
      daySize,
      isFocused: prevIsFocused,
      renderMonthText: prevRenderMonthText,
    } = this.props;

    if (nextProps.daySize !== daySize) {
      this.setState({
        calendarMonthWidth: getCalendarMonthWidth(
          nextProps.daySize,
          horizontalMonthPadding,
        ),
      });
    }

    if (isFocused !== prevIsFocused) {
      if (isFocused) {
        const focusedDate = this.getFocusedDay(currentMonth);

        let { onKeyboardShortcutsPanelClose } = this.state;
        if (nextProps.showKeyboardShortcuts) {
          // the ? shortcut came from the input and we should return input there once it is close
          onKeyboardShortcutsPanelClose = onBlur;
        }

        this.setState({
          showKeyboardShortcuts,
          onKeyboardShortcutsPanelClose,
          focusedDate,
          withMouseInteractions: false,
        });
      } else {
        this.setState({ focusedDate: null });
      }
    }

    if (renderMonthText !== prevRenderMonthText) {
      this.setState({
        monthTitleHeight: null,
      });
    }

    // Capture the scroll position so when previous months are rendered above the current month
    // we can adjust scroll after the component has updated and the previous current month
    // stays in view.
    if (
      orientation === VERTICAL_SCROLLABLE
      && this.transitionContainer
      && !isSameMonth(currentMonth, nextCurrentMonth)
    ) {
      this.setState({
        currentMonthScrollTop:
          this.transitionContainer.scrollHeight - this.transitionContainer.scrollTop,
      });
    }
  }

  componentWillUpdate() {
    const { transitionDuration } = this.props;

    // Calculating the dimensions trigger a DOM repaint which
    // breaks the CSS transition.
    // The setTimeout will wait until the transition ends.
    if (this.calendarInfo) {
      this.setCalendarInfoWidthTimeout = setTimeout(() => {
        const { calendarInfoWidth } = this.state;
        const calendarInfoPanelWidth = calculateDimension(this.calendarInfo, 'width', true, true);
        if (calendarInfoWidth !== calendarInfoPanelWidth) {
          this.setState({
            calendarInfoWidth: calendarInfoPanelWidth,
          });
        }
      }, transitionDuration);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      orientation, daySize, isFocused, numberOfMonths,
    } = this.props;
    const {
      currentMonth,
      currentMonthScrollTop,
      focusedDate,
      monthTitleHeight,
    } = this.state;

    if (
      this.isHorizontal()
      && (orientation !== prevProps.orientation || daySize !== prevProps.daySize)
    ) {
      const visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
      const calendarMonthWeeksHeight = Math.max(0, ...visibleCalendarWeeks) * (daySize - 1);
      const newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }

    if (!prevProps.isFocused && isFocused && !focusedDate) {
      this.container.focus();
    }

    // If orientation is VERTICAL_SCROLLABLE and currentMonth has changed adjust scrollTop so the
    // new months rendered above the current month don't push the current month out of view.
    if (
      orientation === VERTICAL_SCROLLABLE
      && !isSameMonth(prevState.currentMonth, currentMonth)
      && currentMonthScrollTop
      && this.transitionContainer
    ) {
      this.transitionContainer.scrollTop = this.transitionContainer.scrollHeight
        - currentMonthScrollTop;
    }
  }

  componentWillUnmount() {
    clearTimeout(this.setCalendarInfoWidthTimeout);
    clearTimeout(this.setCalendarMonthGridHeightTimeout);
  }

  onKeyDown(e) {
    e.stopPropagation();

    if (!MODIFIER_KEY_NAMES.has(e.key)) {
      this.throttledKeyDown(e);
    }
  }

  onFinalKeyDown(e) {
    this.setState({ withMouseInteractions: false });

    const {
      onBlur,
      onTab,
      onShiftTab,
      isRTL,
    } = this.props;
    const { focusedDate, showKeyboardShortcuts } = this.state;
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
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (isRTL) {
          newFocusedDate.add(1, 'day');
        } else {
          newFocusedDate.subtract(1, 'day');
        }
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'Home':
        e.preventDefault();
        newFocusedDate.startOf('week');
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;
      case 'PageUp':
        e.preventDefault();
        newFocusedDate.subtract(1, 'month');
        didTransitionMonth = this.maybeTransitionPrevMonth(newFocusedDate);
        break;

      case 'ArrowDown':
        e.preventDefault();
        newFocusedDate.add(1, 'week');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (isRTL) {
          newFocusedDate.subtract(1, 'day');
        } else {
          newFocusedDate.add(1, 'day');
        }
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'End':
        e.preventDefault();
        newFocusedDate.endOf('week');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;
      case 'PageDown':
        e.preventDefault();
        newFocusedDate.add(1, 'month');
        didTransitionMonth = this.maybeTransitionNextMonth(newFocusedDate);
        break;

      case '?':
        this.openKeyboardShortcutsPanel(onKeyboardShortcutsPanelClose);
        break;

      case 'Escape':
        if (showKeyboardShortcuts) {
          this.closeKeyboardShortcutsPanel();
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
      this.setState({
        focusedDate: newFocusedDate,
      });
    }
  }

  onPrevMonthClick(e) {
    if (e) e.preventDefault();
    this.onPrevMonthTransition();
  }

  onPrevMonthTransition(nextFocusedDate) {
    const { daySize, isRTL, numberOfMonths } = this.props;
    const { calendarMonthWidth, monthTitleHeight } = this.state;

    let translationValue;
    if (this.isVertical()) {
      const calendarMonthWeeksHeight = this.calendarMonthWeeks[0] * (daySize - 1);
      translationValue = monthTitleHeight + calendarMonthWeeksHeight + 1;
    } else if (this.isHorizontal()) {
      translationValue = calendarMonthWidth;
      if (isRTL) {
        translationValue = -2 * calendarMonthWidth;
      }

      const visibleCalendarWeeks = this.calendarMonthWeeks.slice(0, numberOfMonths);
      const calendarMonthWeeksHeight = Math.max(0, ...visibleCalendarWeeks) * (daySize - 1);
      const newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }

    this.setState({
      monthTransition: PREV_TRANSITION,
      translationValue,
      focusedDate: null,
      nextFocusedDate,
    });
  }

  onMonthChange(currentMonth) {
    this.setCalendarMonthWeeks(currentMonth);
    this.calculateAndSetDayPickerHeight();

    // Translation value is a hack to force an invisible transition that
    // properly rerenders the CalendarMonthGrid
    this.setState({
      monthTransition: MONTH_SELECTION_TRANSITION,
      translationValue: 0.00001,
      focusedDate: null,
      nextFocusedDate: currentMonth,
      currentMonth,
    });
  }

  onYearChange(currentMonth) {
    this.setCalendarMonthWeeks(currentMonth);
    this.calculateAndSetDayPickerHeight();

    // Translation value is a hack to force an invisible transition that
    // properly rerenders the CalendarMonthGrid
    this.setState({
      monthTransition: YEAR_SELECTION_TRANSITION,
      translationValue: 0.0001,
      focusedDate: null,
      nextFocusedDate: currentMonth,
      currentMonth,
    });
  }

  onNextMonthClick(e) {
    if (e) e.preventDefault();
    this.onNextMonthTransition();
  }

  onNextMonthTransition(nextFocusedDate) {
    const { isRTL, numberOfMonths, daySize } = this.props;
    const { calendarMonthWidth, monthTitleHeight } = this.state;

    let translationValue;

    if (this.isVertical()) {
      const firstVisibleMonthWeeks = this.calendarMonthWeeks[1];
      const calendarMonthWeeksHeight = firstVisibleMonthWeeks * (daySize - 1);
      translationValue = -(monthTitleHeight + calendarMonthWeeksHeight + 1);
    }

    if (this.isHorizontal()) {
      translationValue = -calendarMonthWidth;
      if (isRTL) {
        translationValue = 0;
      }

      const visibleCalendarWeeks = this.calendarMonthWeeks.slice(2, numberOfMonths + 2);
      const calendarMonthWeeksHeight = Math.max(0, ...visibleCalendarWeeks) * (daySize - 1);
      const newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;
      this.adjustDayPickerHeight(newMonthHeight);
    }

    this.setState({
      monthTransition: NEXT_TRANSITION,
      translationValue,
      focusedDate: null,
      nextFocusedDate,
    });
  }

  getFirstDayOfWeek() {
    const { firstDayOfWeek } = this.props;
    if (firstDayOfWeek == null) {
      return moment.localeData().firstDayOfWeek();
    }

    return firstDayOfWeek;
  }

  getWeekHeaders() {
    const { weekDayFormat } = this.props;
    const { currentMonth } = this.state;
    const firstDayOfWeek = this.getFirstDayOfWeek();

    const weekHeaders = [];
    for (let i = 0; i < 7; i += 1) {
      weekHeaders.push(currentMonth.clone().day((i + firstDayOfWeek) % 7).format(weekDayFormat));
    }

    return weekHeaders;
  }

  getFirstVisibleIndex() {
    const { orientation } = this.props;
    const { monthTransition } = this.state;

    if (orientation === VERTICAL_SCROLLABLE) return 0;

    let firstVisibleMonthIndex = 1;
    if (monthTransition === PREV_TRANSITION) {
      firstVisibleMonthIndex -= 1;
    } else if (monthTransition === NEXT_TRANSITION) {
      firstVisibleMonthIndex += 1;
    }

    return firstVisibleMonthIndex;
  }

  getFocusedDay(newMonth) {
    const { getFirstFocusableDay, numberOfMonths } = this.props;

    let focusedDate;
    if (getFirstFocusableDay) {
      focusedDate = getFirstFocusableDay(newMonth);
    }

    if (newMonth && (!focusedDate || !isDayVisible(focusedDate, newMonth, numberOfMonths))) {
      focusedDate = newMonth.clone().startOf('month');
    }

    return focusedDate;
  }

  setMonthTitleHeight(monthTitleHeight) {
    this.setState({
      monthTitleHeight,
    }, () => {
      this.calculateAndSetDayPickerHeight();
    });
  }

  setCalendarMonthWeeks(currentMonth) {
    const { numberOfMonths } = this.props;

    this.calendarMonthWeeks = [];
    let month = currentMonth.clone().subtract(1, 'months');
    const firstDayOfWeek = this.getFirstDayOfWeek();
    for (let i = 0; i < numberOfMonths + 2; i += 1) {
      const numberOfWeeks = getNumberOfCalendarMonthWeeks(month, firstDayOfWeek);
      this.calendarMonthWeeks.push(numberOfWeeks);
      month = month.add(1, 'months');
    }
  }

  setContainerRef(ref) {
    this.container = ref;
  }

  setCalendarInfoRef(ref) {
    this.calendarInfo = ref;
  }

  setTransitionContainerRef(ref) {
    this.transitionContainer = ref;
  }

  getNextScrollableMonths(e) {
    const { onGetNextScrollableMonths } = this.props;
    if (e) e.preventDefault();

    if (onGetNextScrollableMonths) onGetNextScrollableMonths(e);

    this.setState(({ scrollableMonthMultiple }) => ({
      scrollableMonthMultiple: scrollableMonthMultiple + 1,
    }));
  }

  getPrevScrollableMonths(e) {
    const { numberOfMonths, onGetPrevScrollableMonths } = this.props;
    if (e) e.preventDefault();

    if (onGetPrevScrollableMonths) onGetPrevScrollableMonths(e);

    this.setState(({ currentMonth, scrollableMonthMultiple }) => ({
      currentMonth: currentMonth.clone().subtract(numberOfMonths, 'month'),
      scrollableMonthMultiple: scrollableMonthMultiple + 1,
    }));
  }

  maybeTransitionNextMonth(newFocusedDate) {
    const { numberOfMonths } = this.props;
    const { currentMonth, focusedDate } = this.state;

    const newFocusedDateMonth = newFocusedDate.month();
    const focusedDateMonth = focusedDate.month();
    const isNewFocusedDateVisible = isDayVisible(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      this.onNextMonthTransition(newFocusedDate);
      return true;
    }

    return false;
  }

  maybeTransitionPrevMonth(newFocusedDate) {
    const { numberOfMonths } = this.props;
    const { currentMonth, focusedDate } = this.state;

    const newFocusedDateMonth = newFocusedDate.month();
    const focusedDateMonth = focusedDate.month();
    const isNewFocusedDateVisible = isDayVisible(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      this.onPrevMonthTransition(newFocusedDate);
      return true;
    }

    return false;
  }

  isHorizontal() {
    const { orientation } = this.props;
    return orientation === HORIZONTAL_ORIENTATION;
  }

  isVertical() {
    const { orientation } = this.props;
    return orientation === VERTICAL_ORIENTATION || orientation === VERTICAL_SCROLLABLE;
  }

  updateStateAfterMonthTransition() {
    const {
      onPrevMonthClick,
      onNextMonthClick,
      numberOfMonths,
      onMonthChange,
      onYearChange,
      isRTL,
    } = this.props;

    const {
      currentMonth,
      monthTransition,
      focusedDate,
      nextFocusedDate,
      withMouseInteractions,
      calendarMonthWidth,
    } = this.state;

    if (!monthTransition) return;

    const newMonth = currentMonth.clone();
    const firstDayOfWeek = this.getFirstDayOfWeek();
    if (monthTransition === PREV_TRANSITION) {
      newMonth.subtract(1, 'month');
      if (onPrevMonthClick) onPrevMonthClick(newMonth);
      const newInvisibleMonth = newMonth.clone().subtract(1, 'month');
      const numberOfWeeks = getNumberOfCalendarMonthWeeks(newInvisibleMonth, firstDayOfWeek);
      this.calendarMonthWeeks = [numberOfWeeks, ...this.calendarMonthWeeks.slice(0, -1)];
    } else if (monthTransition === NEXT_TRANSITION) {
      newMonth.add(1, 'month');
      if (onNextMonthClick) onNextMonthClick(newMonth);
      const newInvisibleMonth = newMonth.clone().add(numberOfMonths, 'month');
      const numberOfWeeks = getNumberOfCalendarMonthWeeks(newInvisibleMonth, firstDayOfWeek);
      this.calendarMonthWeeks = [...this.calendarMonthWeeks.slice(1), numberOfWeeks];
    } else if (monthTransition === MONTH_SELECTION_TRANSITION) {
      if (onMonthChange) onMonthChange(newMonth);
    } else if (monthTransition === YEAR_SELECTION_TRANSITION) {
      if (onYearChange) onYearChange(newMonth);
    }

    let newFocusedDate = null;
    if (nextFocusedDate) {
      newFocusedDate = nextFocusedDate;
    } else if (!focusedDate && !withMouseInteractions) {
      newFocusedDate = this.getFocusedDay(newMonth);
    }

    this.setState({
      currentMonth: newMonth,
      monthTransition: null,
      translationValue: (isRTL && this.isHorizontal()) ? -calendarMonthWidth : 0,
      nextFocusedDate: null,
      focusedDate: newFocusedDate,
    }, () => {
      // we don't want to focus on the relevant calendar day after a month transition
      // if the user is navigating around using a mouse
      if (withMouseInteractions) {
        const activeElement = getActiveElement();
        if (
          activeElement
          && activeElement !== document.body
          && this.container.contains(activeElement)
          && activeElement.blur
        ) {
          activeElement.blur();
        }
      }
    });
  }

  adjustDayPickerHeight(newMonthHeight) {
    const monthHeight = newMonthHeight + MONTH_PADDING;
    if (monthHeight !== this.calendarMonthGridHeight) {
      this.transitionContainer.style.height = `${monthHeight}px`;
      if (!this.calendarMonthGridHeight) {
        this.setCalendarMonthGridHeightTimeout = setTimeout(() => {
          this.setState({ hasSetHeight: true });
        }, 0);
      }
      this.calendarMonthGridHeight = monthHeight;
    }
  }

  calculateAndSetDayPickerHeight() {
    const { daySize, numberOfMonths } = this.props;
    const { monthTitleHeight } = this.state;

    const visibleCalendarWeeks = this.calendarMonthWeeks.slice(1, numberOfMonths + 1);
    const calendarMonthWeeksHeight = Math.max(0, ...visibleCalendarWeeks) * (daySize - 1);
    const newMonthHeight = monthTitleHeight + calendarMonthWeeksHeight + 1;

    if (this.isHorizontal()) {
      this.adjustDayPickerHeight(newMonthHeight);
    }
  }

  openKeyboardShortcutsPanel(onCloseCallBack) {
    this.setState({
      showKeyboardShortcuts: true,
      onKeyboardShortcutsPanelClose: onCloseCallBack,
    });
  }

  closeKeyboardShortcutsPanel() {
    const { onKeyboardShortcutsPanelClose } = this.state;

    if (onKeyboardShortcutsPanelClose) {
      onKeyboardShortcutsPanelClose();
    }

    this.setState({
      onKeyboardShortcutsPanelClose: null,
      showKeyboardShortcuts: false,
    });
  }

  renderNavigation(navDirection) {
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
    } = this.props;

    if (noNavButtons) {
      return null;
    }

    const onPrevMonthClick = orientation === VERTICAL_SCROLLABLE
      ? this.getPrevScrollableMonths
      : this.onPrevMonthClick;

    const onNextMonthClick = orientation === VERTICAL_SCROLLABLE
      ? this.getNextScrollableMonths
      : this.onNextMonthClick;

    return (
      <DayPickerNavigation
        disablePrev={disablePrev}
        disableNext={disableNext}
        inlineStyles={dayPickerNavigationInlineStyles}
        onPrevMonthClick={onPrevMonthClick}
        onNextMonthClick={onNextMonthClick}
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

  renderWeekHeader(index) {
    const {
      daySize,
      horizontalMonthPadding,
      orientation,
      renderWeekHeaderElement,
      styles,
    } = this.props;

    const { calendarMonthWidth } = this.state;

    const verticalScrollable = orientation === VERTICAL_SCROLLABLE;

    const horizontalStyle = {
      left: index * calendarMonthWidth,
    };
    const verticalStyle = {
      marginLeft: -calendarMonthWidth / 2,
    };

    let weekHeaderStyle = {}; // no styles applied to the vertical-scrollable orientation
    if (this.isHorizontal()) {
      weekHeaderStyle = horizontalStyle;
    } else if (this.isVertical() && !verticalScrollable) {
      weekHeaderStyle = verticalStyle;
    }

    const weekHeaders = this.getWeekHeaders();
    const header = weekHeaders.map((day) => (
      <li key={day} {...css(styles.DayPicker_weekHeader_li, { width: daySize })}>
        {renderWeekHeaderElement ? renderWeekHeaderElement(day) : <small>{day}</small>}
      </li>
    ));

    return (
      <div
        {...css(
          styles.DayPicker_weekHeader,
          this.isVertical() && styles.DayPicker_weekHeader__vertical,
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

  render() {
    const {
      calendarMonthWidth,
      currentMonth,
      monthTransition,
      translationValue,
      scrollableMonthMultiple,
      focusedDate,
      showKeyboardShortcuts,
      isTouchDevice: isTouch,
      hasSetHeight,
      calendarInfoWidth,
      monthTitleHeight,
    } = this.state;

    const {
      enableOutsideDays,
      numberOfMonths,
      orientation,
      modifiers,
      withPortal,
      onDayClick,
      onDayMouseEnter,
      onDayMouseLeave,
      firstDayOfWeek,
      renderMonthText,
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
      daySize,
      isFocused,
      isRTL,
      styles,
      theme,
      phrases,
      verticalHeight,
      dayAriaLabelFormat,
      noBorder,
      transitionDuration,
      verticalBorderSpacing,
      horizontalMonthPadding,
      navPosition,
    } = this.props;

    const { reactDates: { spacing: { dayPickerHorizontalPadding } } } = theme;

    const isHorizontal = this.isHorizontal();

    const numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
    const weekHeaders = [];
    for (let i = 0; i < numOfWeekHeaders; i += 1) {
      weekHeaders.push(this.renderWeekHeader(i));
    }

    const verticalScrollable = orientation === VERTICAL_SCROLLABLE;
    let height;
    if (isHorizontal) {
      height = this.calendarMonthGridHeight;
    } else if (this.isVertical() && !verticalScrollable && !withPortal) {
      // If the user doesn't set a desired height,
      // we default back to this kind of made-up value that generally looks good
      height = verticalHeight || 1.75 * calendarMonthWidth;
    }

    const isCalendarMonthGridAnimating = monthTransition !== null;

    const shouldFocusDate = !isCalendarMonthGridAnimating && isFocused;

    let keyboardShortcutButtonLocation = BOTTOM_RIGHT;
    if (this.isVertical()) {
      keyboardShortcutButtonLocation = withPortal ? TOP_LEFT : TOP_RIGHT;
    }

    const shouldAnimateHeight = isHorizontal && hasSetHeight;

    const calendarInfoPositionTop = calendarInfoPosition === INFO_POSITION_TOP;
    const calendarInfoPositionBottom = calendarInfoPosition === INFO_POSITION_BOTTOM;
    const calendarInfoPositionBefore = calendarInfoPosition === INFO_POSITION_BEFORE;
    const calendarInfoPositionAfter = calendarInfoPosition === INFO_POSITION_AFTER;
    const calendarInfoIsInline = calendarInfoPositionBefore || calendarInfoPositionAfter;

    const calendarInfo = renderCalendarInfo && (
      <div
        ref={this.setCalendarInfoRef}
        {...css((calendarInfoIsInline) && styles.DayPicker_calendarInfo__horizontal)}
      >
        {renderCalendarInfo()}
      </div>
    );

    const calendarInfoPanelWidth = renderCalendarInfo && calendarInfoIsInline
      ? calendarInfoWidth
      : 0;

    const firstVisibleMonthIndex = this.getFirstVisibleIndex();
    const wrapperHorizontalWidth = (calendarMonthWidth * numberOfMonths)
      + (2 * dayPickerHorizontalPadding);
    // Adding `1px` because of whitespace between 2 inline-block
    const fullHorizontalWidth = wrapperHorizontalWidth + calendarInfoPanelWidth + 1;

    const transitionContainerStyle = {
      width: isHorizontal && wrapperHorizontalWidth,
      height,
    };

    const dayPickerWrapperStyle = {
      width: isHorizontal && wrapperHorizontalWidth,
    };

    const dayPickerStyle = {
      width: isHorizontal && fullHorizontalWidth,

      // These values are to center the datepicker (approximately) on the page
      marginLeft: isHorizontal && withPortal ? -fullHorizontalWidth / 2 : null,
      marginTop: isHorizontal && withPortal ? -calendarMonthWidth / 2 : null,
    };

    return (
      <div
        {...css(
          styles.DayPicker,
          isHorizontal && styles.DayPicker__horizontal,
          verticalScrollable && styles.DayPicker__verticalScrollable,
          isHorizontal && withPortal && styles.DayPicker_portal__horizontal,
          this.isVertical() && withPortal && styles.DayPicker_portal__vertical,
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
              calendarInfoIsInline && isHorizontal && styles.DayPicker_wrapper__horizontal,
            )}
          >

            <div
              {...css(
                styles.DayPicker_weekHeaders,
                isHorizontal && styles.DayPicker_weekHeaders__horizontal,
              )}
              aria-hidden="true"
              role="presentation"
            >
              {weekHeaders}
            </div>

            <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
              {...css(styles.DayPicker_focusRegion)}
              ref={this.setContainerRef}
              onClick={(e) => { e.stopPropagation(); }}
              onKeyDown={this.onKeyDown}
              onMouseUp={() => { this.setState({ withMouseInteractions: true }); }}
              tabIndex={-1}
              role="application"
              aria-roledescription={phrases.roleDescription}
              aria-label={phrases.calendarLabel}
            >
              {!verticalScrollable && navPosition === NAV_POSITION_TOP && this.renderNavigation()}

              <div
                {...css(
                  styles.DayPicker_transitionContainer,
                  shouldAnimateHeight && styles.DayPicker_transitionContainer__horizontal,
                  this.isVertical() && styles.DayPicker_transitionContainer__vertical,
                  verticalScrollable && styles.DayPicker_transitionContainer__verticalScrollable,
                  transitionContainerStyle,
                )}
                ref={this.setTransitionContainerRef}
              >
                {verticalScrollable && this.renderNavigation(PREV_NAV)}
                <CalendarMonthGrid
                  setMonthTitleHeight={!monthTitleHeight ? this.setMonthTitleHeight : undefined}
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
                  onMonthChange={this.onMonthChange}
                  onYearChange={this.onYearChange}
                  renderMonthText={renderMonthText}
                  renderCalendarDay={renderCalendarDay}
                  renderDayContents={renderDayContents}
                  renderMonthElement={renderMonthElement}
                  onMonthTransitionEnd={this.updateStateAfterMonthTransition}
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
                {verticalScrollable && this.renderNavigation(NEXT_NAV)}
              </div>

              {!verticalScrollable
                && navPosition === NAV_POSITION_BOTTOM
                && this.renderNavigation()}

              {!isTouch && !hideKeyboardShortcutsPanel && (
                <DayPickerKeyboardShortcuts
                  block={this.isVertical() && !withPortal}
                  buttonLocation={keyboardShortcutButtonLocation}
                  showKeyboardShortcutsPanel={showKeyboardShortcuts}
                  openKeyboardShortcutsPanel={this.openKeyboardShortcutsPanel}
                  closeKeyboardShortcutsPanel={this.closeKeyboardShortcutsPanel}
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
  }
}

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
