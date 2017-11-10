import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import moment from 'moment';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import OutsideClickHandler from './OutsideClickHandler';
import CalendarMonthGrid from './CalendarMonthGrid';
import DayPickerNavigation from './DayPickerNavigation';
import DayPickerKeyboardShortcuts, {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
} from './DayPickerKeyboardShortcuts';

import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import getActiveElement from '../utils/getActiveElement';
import isDayVisible from '../utils/isDayVisible';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../constants';

const MONTH_PADDING = 23;
const DAY_PICKER_PADDING = 9;
const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';

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
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  isRTL: PropTypes.bool,
  verticalHeight: nonNegativeInteger,

  // navigation props
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onMultiplyScrollableMonths: PropTypes.func, // VERTICAL_SCROLLABLE daypickers only

  // month props
  renderMonth: PropTypes.func,

  // day props
  modifiers: PropTypes.object,
  renderDay: PropTypes.func,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,

  // accessibility props
  isFocused: PropTypes.bool,
  getFirstFocusableDay: PropTypes.func,
  onBlur: PropTypes.func,
  showKeyboardShortcuts: PropTypes.bool,

  // internationalization
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
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
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  verticalHeight: null,

  // navigation props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onMultiplyScrollableMonths() {},

  // month props
  renderMonth: null,

  // day props
  modifiers: {},
  renderDay: null,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},

  // accessibility props
  isFocused: false,
  getFirstFocusableDay: null,
  onBlur() {},
  showKeyboardShortcuts: false,

  // internationalization
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: DayPickerPhrases,
};

class DayPicker extends React.Component {
  constructor(props) {
    super(props);

    const currentMonth = props.hidden ? moment() : props.initialVisibleMonth();

    let focusedDate = currentMonth.clone().startOf('month');
    if (props.getFirstFocusableDay) {
      focusedDate = props.getFirstFocusableDay(currentMonth);
    }

    const translationValue = props.isRTL && this.isHorizontal()
      ? -getCalendarMonthWidth(props.daySize)
      : 0;

    this.hasSetInitialVisibleMonth = !props.hidden;
    this.state = {
      currentMonth,
      monthTransition: null,
      translationValue,
      scrollableMonthMultiple: 1,
      calendarMonthWidth: getCalendarMonthWidth(props.daySize),
      focusedDate: (!props.hidden || props.isFocused) ? focusedDate : null,
      nextFocusedDate: null,
      showKeyboardShortcuts: props.showKeyboardShortcuts,
      onKeyboardShortcutsPanelClose() {},
      isTouchDevice: isTouchDevice(),
      withMouseInteractions: true,
      hasSetHeight: false,
    };

    this.calendarMonthHeights = [];
    this.calendarMonthGridHeight = 0;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.multiplyScrollableMonths = this.multiplyScrollableMonths.bind(this);
    this.updateStateAfterMonthTransition = this.updateStateAfterMonthTransition.bind(this);

    this.openKeyboardShortcutsPanel = this.openKeyboardShortcutsPanel.bind(this);
    this.closeKeyboardShortcutsPanel = this.closeKeyboardShortcutsPanel.bind(this);

    this.setContainerRef = this.setContainerRef.bind(this);
    this.setTransitionContainerRef = this.setTransitionContainerRef.bind(this);
    this.setCalendarMonthHeights = this.setCalendarMonthHeights.bind(this);
  }

  componentDidMount() {
    this.setState({ isTouchDevice: isTouchDevice() });
  }

  componentWillReceiveProps(nextProps) {
    const {
      hidden,
      isFocused,
      showKeyboardShortcuts,
      onBlur,
    } = nextProps;
    const { currentMonth } = this.state;

    if (!hidden) {
      if (!this.hasSetInitialVisibleMonth) {
        this.hasSetInitialVisibleMonth = true;
        this.setState({
          currentMonth: nextProps.initialVisibleMonth(),
        });
      }
    }

    if (nextProps.daySize !== this.props.daySize) {
      this.setState({
        calendarMonthWidth: getCalendarMonthWidth(nextProps.daySize),
      });
    }

    if (isFocused !== this.props.isFocused) {
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
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    const { isFocused } = this.props;
    const { focusedDate } = this.state;

    if (!prevProps.isFocused && isFocused && !focusedDate) {
      this.container.focus();
    }
  }

  onKeyDown(e) {
    e.stopPropagation();

    this.setState({ withMouseInteractions: false });

    const { onBlur, isRTL } = this.props;
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
          onBlur();
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

  onPrevMonthClick(nextFocusedDate, e) {
    const { numberOfMonths, isRTL } = this.props;
    const { calendarMonthWidth } = this.state;

    if (e) e.preventDefault();

    let translationValue = this.isVertical() ? this.calendarMonthHeights[0] : calendarMonthWidth;

    if (this.isHorizontal()) {
      if (isRTL) {
        translationValue = -2 * calendarMonthWidth;
      }

      const newMonthHeight = Math.max(0, ...this.calendarMonthHeights.slice(0, numberOfMonths));
      this.adjustDayPickerHeight(newMonthHeight);
    }

    this.setState({
      monthTransition: PREV_TRANSITION,
      translationValue,
      focusedDate: null,
      nextFocusedDate,
    });
  }

  onNextMonthClick(nextFocusedDate, e) {
    const { isRTL } = this.props;
    const { calendarMonthWidth } = this.state;

    if (e) e.preventDefault();

    let translationValue = this.isVertical() ? -this.calendarMonthHeights[1] : -calendarMonthWidth;

    if (this.isHorizontal()) {
      if (isRTL) {
        translationValue = 0;
      }
      const newMonthHeight = Math.max(0, ...this.calendarMonthHeights.slice(2));
      this.adjustDayPickerHeight(newMonthHeight);
    }

    this.setState({
      monthTransition: NEXT_TRANSITION,
      translationValue,
      focusedDate: null,
      nextFocusedDate,
    });
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

  setCalendarMonthHeights(calendarMonthHeights) {
    const { numberOfMonths } = this.props;
    const firstVisibleMonthIndex = this.getFirstVisibleIndex();
    const lastVisibleMonthIndex = firstVisibleMonthIndex + numberOfMonths;

    this.calendarMonthHeights = calendarMonthHeights;
    const visibleCalendarMonthHeights = calendarMonthHeights
      .filter((_, i) => ((i >= firstVisibleMonthIndex) && (i < lastVisibleMonthIndex)));
    this.calendarMonthGridHeight = Math.max(0, ...visibleCalendarMonthHeights) + MONTH_PADDING;
    this.setState({ hasSetHeight: true });
  }

  setContainerRef(ref) {
    this.container = ref;
  }

  setTransitionContainerRef(ref) {
    this.transitionContainer = ref;
  }

  maybeTransitionNextMonth(newFocusedDate) {
    const { numberOfMonths } = this.props;
    const { currentMonth, focusedDate } = this.state;

    const newFocusedDateMonth = newFocusedDate.month();
    const focusedDateMonth = focusedDate.month();
    const isNewFocusedDateVisible = isDayVisible(newFocusedDate, currentMonth, numberOfMonths);
    if (newFocusedDateMonth !== focusedDateMonth && !isNewFocusedDateVisible) {
      this.onNextMonthClick(newFocusedDate);
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
      this.onPrevMonthClick(newFocusedDate);
      return true;
    }

    return false;
  }

  multiplyScrollableMonths(e) {
    const { onMultiplyScrollableMonths } = this.props;
    if (e) e.preventDefault();

    if (onMultiplyScrollableMonths) onMultiplyScrollableMonths(e);

    this.setState({
      scrollableMonthMultiple: this.state.scrollableMonthMultiple + 1,
    });
  }

  isHorizontal() {
    return this.props.orientation === HORIZONTAL_ORIENTATION;
  }

  isVertical() {
    return this.props.orientation === VERTICAL_ORIENTATION ||
      this.props.orientation === VERTICAL_SCROLLABLE;
  }

  updateStateAfterMonthTransition() {
    const {
      onPrevMonthClick,
      onNextMonthClick,
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
    if (monthTransition === PREV_TRANSITION) {
      if (onPrevMonthClick) onPrevMonthClick();
      newMonth.subtract(1, 'month');
    } else if (monthTransition === NEXT_TRANSITION) {
      if (onNextMonthClick) onNextMonthClick();
      newMonth.add(1, 'month');
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
      translationValue: (this.props.isRTL && this.isHorizontal()) ? -calendarMonthWidth : 0,
      nextFocusedDate: null,
      focusedDate: newFocusedDate,
    }, () => {
      // we don't want to focus on the relevant calendar day after a month transition
      // if the user is navigating around using a mouse
      if (withMouseInteractions) {
        const activeElement = getActiveElement();
        if (activeElement && activeElement !== document.body) {
          activeElement.blur();
        }
      }
    });
  }

  adjustDayPickerHeight(newMonthHeight) {
    const monthHeight = newMonthHeight + MONTH_PADDING;
    if (monthHeight !== this.calendarMonthGridHeight) {
      this.calendarMonthGridHeight = monthHeight;
      this.transitionContainer.style.height = `${monthHeight}px`;
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

  renderNavigation() {
    const {
      navPrev,
      navNext,
      orientation,
      phrases,
      isRTL,
    } = this.props;

    let onNextMonthClick;
    if (orientation === VERTICAL_SCROLLABLE) {
      onNextMonthClick = this.multiplyScrollableMonths;
    } else {
      onNextMonthClick = (e) => { this.onNextMonthClick(null, e); };
    }

    return (
      <DayPickerNavigation
        onPrevMonthClick={(e) => { this.onPrevMonthClick(null, e); }}
        onNextMonthClick={onNextMonthClick}
        navPrev={navPrev}
        navNext={navNext}
        orientation={orientation}
        phrases={phrases}
        isRTL={isRTL}
      />
    );
  }

  renderWeekHeader(index) {
    const {
      daySize,
      orientation,
      weekDayFormat,
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

    let { firstDayOfWeek } = this.props;
    if (firstDayOfWeek == null) {
      firstDayOfWeek = moment.localeData().firstDayOfWeek();
    }

    const header = [];
    for (let i = 0; i < 7; i += 1) {
      header.push((
        <li key={i} {...css(styles.DayPicker_weekHeader_li, { width: daySize })}>
          <small>{moment().day((i + firstDayOfWeek) % 7).format(weekDayFormat)}</small>
        </li>
      ));
    }

    return (
      <div
        {...css(
          styles.DayPicker_weekHeader,
          this.isVertical() && styles.DayPicker_weekHeader__vertical,
          verticalScrollable && styles.DayPicker_weekHeader__verticalScrollable,
          weekHeaderStyle,
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
      renderMonth,
      renderDay,
      renderCalendarInfo,
      hideKeyboardShortcutsPanel,
      onOutsideClick,
      monthFormat,
      daySize,
      isFocused,
      isRTL,
      styles,
      phrases,
      verticalHeight,
    } = this.props;

    const numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
    const weekHeaders = [];
    for (let i = 0; i < numOfWeekHeaders; i += 1) {
      weekHeaders.push(this.renderWeekHeader(i));
    }

    const verticalScrollable = this.props.orientation === VERTICAL_SCROLLABLE;
    const firstVisibleMonthIndex = this.getFirstVisibleIndex();
    const horizontalWidth = (calendarMonthWidth * numberOfMonths) + (2 * DAY_PICKER_PADDING);

    const dayPickerStyle = {
      width: this.isHorizontal() && horizontalWidth,

      // These values are to center the datepicker (approximately) on the page
      marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2,
      marginTop: this.isHorizontal() && withPortal && -calendarMonthWidth / 2,
    };

    let height;
    if (this.isHorizontal()) {
      height = this.calendarMonthGridHeight;
    } else if (this.isVertical() && !verticalScrollable && !withPortal) {
      // If the user doesn't set a desired height,
      // we default back to this kind of made-up value that generally looks good
      height = verticalHeight || 1.75 * calendarMonthWidth;
    }

    const transitionContainerStyle = {
      width: this.isHorizontal() && horizontalWidth,
      height,
    };

    const isCalendarMonthGridAnimating = monthTransition !== null;
    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${translationValue}px)`;

    const shouldFocusDate = !isCalendarMonthGridAnimating && isFocused;

    let keyboardShortcutButtonLocation = BOTTOM_RIGHT;
    if (this.isVertical()) {
      keyboardShortcutButtonLocation = withPortal ? TOP_LEFT : TOP_RIGHT;
    }

    const isHorizontalAndAnimating = this.isHorizontal() && isCalendarMonthGridAnimating;

    return (
      <div
        role="application"
        aria-label={phrases.calendarLabel}
        {...css(
          styles.DayPicker,
          this.isHorizontal() && styles.DayPicker__horizontal,
          this.isVertical() && styles.DayPicker__vertical,
          verticalScrollable && styles.DayPicker__verticalScrollable,
          this.isHorizontal() && withPortal && styles.DayPicker_portal__horizontal,
          this.isVertical() && withPortal && styles.DayPicker_portal__vertical,
          dayPickerStyle,
          !hasSetHeight && styles.DayPicker__hidden,
        )}
      >
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <div
            {...css(
              styles.DayPicker_weekHeaders,
              this.isHorizontal() && styles.DayPicker_weekHeaders__horizontal,
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
            onKeyDown={throttle(this.onKeyDown, 300)}
            onMouseUp={() => { this.setState({ withMouseInteractions: true }); }}
            role="region"
            tabIndex={-1}
          >
            {!verticalScrollable && this.renderNavigation()}

            <div
              {...css(
                styles.DayPicker_transitionContainer,
                isHorizontalAndAnimating && styles.DayPicker_transitionContainer__horizontal,
                this.isVertical() && styles.DayPicker_transitionContainer__vertical,
                verticalScrollable && styles.DayPicker_transitionContainer__verticalScrollable,
                transitionContainerStyle,

              )}
              ref={this.setTransitionContainerRef}
            >
              <CalendarMonthGrid
                setCalendarMonthHeights={this.setCalendarMonthHeights}
                transformValue={transformValue}
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
                renderMonth={renderMonth}
                renderDay={renderDay}
                onMonthTransitionEnd={this.updateStateAfterMonthTransition}
                monthFormat={monthFormat}
                daySize={daySize}
                firstDayOfWeek={firstDayOfWeek}
                isFocused={shouldFocusDate}
                focusedDate={focusedDate}
                phrases={phrases}
                isRTL={isRTL}
              />
              {verticalScrollable && this.renderNavigation()}
            </div>

            {!isTouch && !hideKeyboardShortcutsPanel &&
              <DayPickerKeyboardShortcuts
                block={this.isVertical() && !withPortal}
                buttonLocation={keyboardShortcutButtonLocation}
                showKeyboardShortcutsPanel={showKeyboardShortcuts}
                openKeyboardShortcutsPanel={this.openKeyboardShortcutsPanel}
                closeKeyboardShortcutsPanel={this.closeKeyboardShortcutsPanel}
                phrases={phrases}
              />
            }
          </div>

          {renderCalendarInfo && renderCalendarInfo()}
        </OutsideClickHandler>
      </div>
    );
  }
}

DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;

export { DayPicker as PureDayPicker };
export default withStyles(({ reactDates: { color, zIndex } }) => ({
  DayPicker: {
    background: color.background,
    position: 'relative',
    textAlign: 'left',
  },

  DayPicker__horizontal: {
    background: color.background,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07)',
    borderRadius: 3,
  },

  DayPicker__verticalScrollable: {
    height: '100%',
  },

  DayPicker__hidden: {
    visibility: 'hidden',
  },

  DayPicker_portal__horizontal: {
    boxShadow: 'none',
    position: 'absolute',
    left: '50%',
    top: '50%',
  },

  DayPicker_portal__vertical: {
    position: 'initial',
  },

  DayPicker_focusRegion: {
    outline: 'none',
  },

  DayPicker_weekHeaders: {
    position: 'relative',
  },

  DayPicker_weekHeaders__horizontal: {
    marginLeft: 9,
  },

  DayPicker_weekHeader: {
    color: color.placeholderText,
    position: 'absolute',
    top: 62,
    zIndex: zIndex + 2,
    padding: '0 13px',
    textAlign: 'left',
  },

  DayPicker_weekHeader__vertical: {
    left: '50%',
  },

  DayPicker_weekHeader__verticalScrollable: {
    top: 0,
    display: 'table-row',
    borderBottom: `1px solid ${color.core.border}`,
    background: color.background,
    marginLeft: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
  },

  DayPicker_weekHeader_ul: {
    listStyle: 'none',
    margin: '1px 0',
    paddingLeft: 0,
    paddingRight: 0,
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
    right: 0,
    left: 0,
    overflowY: 'scroll',
  },
}))(DayPicker);
