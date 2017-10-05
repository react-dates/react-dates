import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import ReactDOM from 'react-dom';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';
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

import getTransformStyles from '../utils/getTransformStyles';
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
} from '../../constants';

const MONTH_PADDING = 23;
const DAY_PICKER_PADDING = 9;
const PREV_TRANSITION = 'prev';
const NEXT_TRANSITION = 'next';

const propTypes = forbidExtraProps({
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

function applyTransformStyles(el, transform, opacity = '') {
  const transformStyles = getTransformStyles(transform);
  transformStyles.opacity = opacity;

  Object.keys(transformStyles).forEach((styleKey) => {
    // eslint-disable-next-line no-param-reassign
    el.style[styleKey] = transformStyles[styleKey];
  });
}

export function calculateDimension(el, axis, borderBox = false, withMargin = false) {
  if (!el) {
    return 0;
  }

  const axisStart = axis === 'width' ? 'Left' : 'Top';
  const axisEnd = axis === 'width' ? 'Right' : 'Bottom';

  // Only read styles if we need to
  const style = (!borderBox || withMargin) ? window.getComputedStyle(el) : null;

  // Offset includes border and padding
  const { offsetWidth, offsetHeight } = el;
  let size = axis === 'width' ? offsetWidth : offsetHeight;

  // Get the inner size
  if (!borderBox) {
    size -= (
      parseFloat(style[`padding${axisStart}`]) +
      parseFloat(style[`padding${axisEnd}`]) +
      parseFloat(style[`border${axisStart}Width`]) +
      parseFloat(style[`border${axisEnd}Width`])
    );
  }

  // Apply margin
  if (withMargin) {
    size += (parseFloat(style[`margin${axisStart}`]) + parseFloat(style[`margin${axisEnd}`]));
  }

  return size;
}

function getMonthHeight(el) {
  const caption = el.querySelector('.js-CalendarMonth__caption');
  const grid = el.querySelector('.js-CalendarMonth__grid');

  // Need to separate out table children for FF
  // Add an additional +1 for the border
  return (
    calculateDimension(caption, 'height', true, true) + calculateDimension(grid, 'height') + 1
  );
}

export default class DayPicker extends React.Component {
  constructor(props) {
    super(props);

    const currentMonth = props.hidden ? moment() : props.initialVisibleMonth();

    let focusedDate = currentMonth.clone().startOf('month');
    if (props.getFirstFocusableDay) {
      focusedDate = props.getFirstFocusableDay(currentMonth);
    }

    const translationValue =
      props.isRTL && this.isHorizontal() ? -getCalendarMonthWidth(props.daySize) : 0;

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
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.setCalendarMonthGridRef = this.setCalendarMonthGridRef.bind(this);
    this.multiplyScrollableMonths = this.multiplyScrollableMonths.bind(this);
    this.updateStateAfterMonthTransition = this.updateStateAfterMonthTransition.bind(this);

    this.openKeyboardShortcutsPanel = this.openKeyboardShortcutsPanel.bind(this);
    this.closeKeyboardShortcutsPanel = this.closeKeyboardShortcutsPanel.bind(this);

    this.setContainerRef = this.setContainerRef.bind(this);
    this.setTransitionContainerRef = this.setTransitionContainerRef.bind(this);
  }

  componentDidMount() {
    this.setState({ isTouchDevice: isTouchDevice() });

    if (this.isHorizontal()) {
      this.adjustDayPickerHeight();
      this.initializeDayPickerWidth();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { hidden, isFocused, showKeyboardShortcuts, onBlur } = nextProps;
    const { currentMonth } = this.state;

    if (!hidden) {
      if (!this.hasSetInitialVisibleMonth) {
        this.hasSetInitialVisibleMonth = true;
        this.setState({
          currentMonth: nextProps.initialVisibleMonth(),
        });
      }

      if (!this.dayPickerWidth && this.isHorizontal()) {
        this.initializeDayPickerWidth();
        this.adjustDayPickerHeight();
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

        let onKeyboardShortcutsPanelClose = this.state.onKeyboardShortcutsPanelClose;
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

  componentDidUpdate(prevProps, prevState) {
    const { numberOfMonths } = this.props;
    const { monthTransition, currentMonth, focusedDate } = this.state;
    if (
      monthTransition ||
      !currentMonth.isSame(prevState.currentMonth) ||
      numberOfMonths !== prevProps.numberOfMonths
    ) {
      if (this.isHorizontal()) {
        this.adjustDayPickerHeight();
      }
    }

    if (
      (!prevProps.isFocused && this.props.isFocused && !focusedDate) ||
      (!prevProps.showKeyboardShortcuts && this.props.showKeyboardShortcuts)
    ) {
      this.container.focus();
    }
  }

  onKeyDown(e) {
    e.stopPropagation();

    this.setState({ withMouseInteractions: false });

    const { onBlur } = this.props;
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
        newFocusedDate.subtract(1, 'day');
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
        newFocusedDate.add(1, 'day');
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
    const { isRTL } = this.props;

    if (e) e.preventDefault();

    let translationValue =
      this.isVertical() ? this.getMonthHeightByIndex(0) : this.dayPickerWidth;

    if (isRTL && this.isHorizontal()) {
      translationValue = -2 * this.dayPickerWidth;
    }

    // The first CalendarMonth is always positioned absolute at top: 0 or left: 0
    // so we need to transform it to the appropriate location before the animation.
    // This behavior is because we would otherwise need a double-render in order to
    // adjust the container position once we had the height the first calendar
    // (ie first draw all the calendar, then in a second render, use the first calendar's
    // height to position the container). Variable calendar heights, amirite? <3 Maja
    this.translateFirstDayPickerForAnimation(translationValue);

    this.setState({
      monthTransition: PREV_TRANSITION,
      translationValue,
      focusedDate: null,
      nextFocusedDate,
    });
  }

  onNextMonthClick(nextFocusedDate, e) {
    const { isRTL } = this.props;

    if (e) e.preventDefault();

    let translationValue =
      this.isVertical() ? -this.getMonthHeightByIndex(1) : -this.dayPickerWidth;

    if (isRTL && this.isHorizontal()) {
      translationValue = 0;
    }

    this.setState({
      monthTransition: NEXT_TRANSITION,
      translationValue,
      focusedDate: null,
      nextFocusedDate,
    });
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

  getMonthHeightByIndex(i) {
    return getMonthHeight(this.transitionContainer.querySelectorAll('.CalendarMonth')[i]);
  }

  setCalendarMonthGridRef(ref) {
    this.calendarMonthGrid = ref;
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

  initializeDayPickerWidth() {
    if (this.calendarMonthGrid) {
      // eslint-disable-next-line react/no-find-dom-node
      const calendarMonthGridDOMNode = ReactDOM.findDOMNode(this.calendarMonthGrid);
      if (calendarMonthGridDOMNode) {
        this.dayPickerWidth = calculateDimension(
          calendarMonthGridDOMNode.querySelector('.CalendarMonth'),
          'width',
          true,
        );
      }
    }
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

    if (this.calendarMonthGrid) {
      // eslint-disable-next-line react/no-find-dom-node
      const calendarMonthGridDOMNode = ReactDOM.findDOMNode(this.calendarMonthGrid);
      if (calendarMonthGridDOMNode) {
        // clear the previous transforms
        applyTransformStyles(
          calendarMonthGridDOMNode.querySelector('.CalendarMonth'),
          'none',
        );
      }
    }

    this.setState({
      currentMonth: newMonth,
      monthTransition: null,
      translationValue: (this.props.isRTL && this.isHorizontal()) ? -this.dayPickerWidth : 0,
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

  adjustDayPickerHeight() {
    const heights = [];

    Array.prototype.forEach.call(this.transitionContainer.querySelectorAll('.CalendarMonth'),
      (el) => {
        if (el.getAttribute('data-visible') === 'true') {
          heights.push(getMonthHeight(el));
        }
      },
    );

    const newMonthHeight = Math.max(...heights) + MONTH_PADDING;

    if (newMonthHeight !== calculateDimension(this.transitionContainer, 'height')) {
      this.monthHeight = newMonthHeight;
      this.transitionContainer.style.height = `${newMonthHeight}px`;
    }
  }

  translateFirstDayPickerForAnimation(translationValue) {
    const { isRTL } = this.props;

    let convertedTranslationValue = -translationValue;
    if (isRTL && this.isHorizontal()) {
      const positiveTranslationValue = Math.abs(translationValue + this.dayPickerWidth);
      convertedTranslationValue = positiveTranslationValue;
    }
    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${convertedTranslationValue}px)`;

    applyTransformStyles(
      this.transitionContainer.querySelector('.CalendarMonth'),
      transformValue,
      1,
    );
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
    const { daySize, orientation, weekDayFormat } = this.props;
    const { calendarMonthWidth } = this.state;
    const verticalScrollable = orientation === VERTICAL_SCROLLABLE;
    const horizontalStyle = {
      left: index * calendarMonthWidth,
    };
    const verticalStyle = {
      marginLeft: -calendarMonthWidth / 2,
    };

    let style = {}; // no styles applied to the vertical-scrollable orientation
    if (this.isHorizontal()) {
      style = horizontalStyle;
    } else if (this.isVertical() && !verticalScrollable) {
      style = verticalStyle;
    }

    let { firstDayOfWeek } = this.props;
    if (firstDayOfWeek == null) {
      firstDayOfWeek = moment.localeData().firstDayOfWeek();
    }

    const header = [];
    for (let i = 0; i < 7; i += 1) {
      header.push(
        <li key={i} style={{ width: daySize }}>
          <small>{moment().day((i + firstDayOfWeek) % 7).format(weekDayFormat)}</small>
        </li>,
      );
    }

    return (
      <div
        className="DayPicker__week-header"
        key={`week-${index}`}
        style={style}
      >
        <ul>
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
      phrases,
    } = this.props;

    const numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
    const weekHeaders = [];
    for (let i = 0; i < numOfWeekHeaders; i += 1) {
      weekHeaders.push(this.renderWeekHeader(i));
    }

    let firstVisibleMonthIndex = 1;
    if (monthTransition === PREV_TRANSITION) {
      firstVisibleMonthIndex -= 1;
    } else if (monthTransition === NEXT_TRANSITION) {
      firstVisibleMonthIndex += 1;
    }

    const verticalScrollable = this.props.orientation === VERTICAL_SCROLLABLE;
    if (verticalScrollable) firstVisibleMonthIndex = 0;

    const dayPickerClassNames = cx('DayPicker', {
      'DayPicker--horizontal': this.isHorizontal(),
      'DayPicker--vertical': this.isVertical(),
      'DayPicker--vertical-scrollable': verticalScrollable,
      'DayPicker--portal': withPortal,
    });

    const transitionContainerClasses = cx('transition-container', {
      'transition-container--horizontal': this.isHorizontal(),
      'transition-container--vertical': this.isVertical(),
    });

    const horizontalWidth = (calendarMonthWidth * numberOfMonths) + (2 * DAY_PICKER_PADDING);

    // this is a kind of made-up value that generally looks good. we'll
    // probably want to let the user set this explicitly.
    const verticalHeight = 1.75 * calendarMonthWidth;

    const dayPickerStyle = {
      width: this.isHorizontal() && horizontalWidth,

      // These values are to center the datepicker (approximately) on the page
      marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2,
      marginTop: this.isHorizontal() && withPortal && -calendarMonthWidth / 2,
    };

    const transitionContainerStyle = {
      width: this.isHorizontal() && horizontalWidth,
      height: this.isVertical() && !verticalScrollable && !withPortal && verticalHeight,
    };

    const isCalendarMonthGridAnimating = monthTransition !== null;
    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${translationValue}px)`;

    const shouldFocusDate = !isCalendarMonthGridAnimating && isFocused;

    let keyboardShortcutButtonLocation = BOTTOM_RIGHT;
    if (this.isVertical()) {
      keyboardShortcutButtonLocation = withPortal ? TOP_LEFT : TOP_RIGHT;
    }

    return (
      <div
        className={dayPickerClassNames}
        style={dayPickerStyle}
        role="application"
        aria-label={phrases.calendarLabel}
      >
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <div
            className="DayPicker__week-headers"
            aria-hidden="true"
            role="presentation"
          >
            {weekHeaders}
          </div>

          <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
            className="DayPicker__focus-region"
            ref={this.setContainerRef}
            onClick={(e) => { e.stopPropagation(); }}
            onKeyDown={throttle(this.onKeyDown, 300)}
            onMouseUp={() => { this.setState({ withMouseInteractions: true }); }}
            role="region"
            tabIndex={-1}
          >
            {!verticalScrollable && this.renderNavigation()}

            <div
              className={transitionContainerClasses}
              ref={this.setTransitionContainerRef}
              style={transitionContainerStyle}
            >
              <CalendarMonthGrid
                ref={this.setCalendarMonthGridRef}
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
