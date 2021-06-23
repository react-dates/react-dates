import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import { addEventListener } from 'consolidated-events';

import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';
import addHours from 'date-fns/addHours';
import startOfDay from 'date-fns/startOfDay';
import setYear from 'date-fns/setYear';
import setMonth from 'date-fns/setMonth';
import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';

import CalendarMonth from './CalendarMonth';

import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import toISOMonthString from '../utils/toISOMonthString';
import isPrevMonth from '../utils/isPrevMonth';
import isNextMonth from '../utils/isNextMonth';
import isSameMonthAndYear from '../utils/isSameMonthAndYear';

import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  enableOutsideDays: PropTypes.bool,
  firstVisibleMonthIndex: PropTypes.number,
  horizontalMonthPadding: nonNegativeInteger,
  initialMonth: PropTypes.object,
  isAnimating: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  modifiers: PropTypes.objectOf(PropTypes.objectOf(ModifiersShape)),
  orientation: ScrollableOrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthTransitionEnd: PropTypes.func,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  translationValue: PropTypes.number,
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  daySize: nonNegativeInteger,
  focusedDate: PropTypes.object, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day
  firstDayOfWeek: DayOfWeekShape,
  setMonthTitleHeight: PropTypes.func,
  isRTL: PropTypes.bool,
  transitionDuration: nonNegativeInteger,
  verticalBorderSpacing: nonNegativeInteger,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string,
  locale: PropTypes.string,
});

const defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  horizontalMonthPadding: 13,
  initialMonth: addHours(startOfDay(new Date()), 12),
  isAnimating: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onMonthChange() {},
  onYearChange() {},
  onMonthTransitionEnd() {},
  renderMonthText: null,
  renderCalendarDay: undefined,
  renderDayContents: null,
  translationValue: null,
  renderMonthElement: null,
  daySize: DAY_SIZE,
  focusedDate: null,
  isFocused: false,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,
  isRTL: false,
  transitionDuration: 200,
  verticalBorderSpacing: undefined,

  // i18n
  monthFormat: 'MMMM yyyy', // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  locale: null,
};

function getMonths(initialMonth, numberOfMonths, withoutTransitionMonths) {
  let month = new Date(initialMonth);
  if (!withoutTransitionMonths) month = subMonths(month, 1);

  const months = [];
  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = addMonths(month, 1);
  }

  return months;
}

/** @extends React.Component */
class CalendarMonthGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    const withoutTransitionMonths = props.orientation === VERTICAL_SCROLLABLE;
    this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths),
    };

    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);

    this.onMonthSelect = this.onMonthSelect.bind(this);
    this.onYearSelect = this.onYearSelect.bind(this);
  }

  componentDidMount() {
    this.removeEventListener = addEventListener(
      this.container,
      'transitionend',
      this.onTransitionEnd,
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { initialMonth, numberOfMonths, orientation } = nextProps;
    const { months } = this.state;

    const {
      initialMonth: prevInitialMonth,
      numberOfMonths: prevNumberOfMonths,
    } = this.props;
    const hasMonthChanged = !isSameMonthAndYear(prevInitialMonth, initialMonth);
    const hasNumberOfMonthsChanged = prevNumberOfMonths !== numberOfMonths;
    let newMonths = months;

    if (hasMonthChanged && !hasNumberOfMonthsChanged) {
      if (isNextMonth(prevInitialMonth, initialMonth)) {
        newMonths = months.slice(1);
        newMonths.push(addMonths(months[months.length - 1], 1));
      } else if (isPrevMonth(prevInitialMonth, initialMonth)) {
        newMonths = months.slice(0, months.length - 1);
        newMonths.unshift(subMonths(months[0], 1));
      } else {
        const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
        newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
      }
    }

    if (hasNumberOfMonthsChanged) {
      const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
      newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
    }

    this.setState({
      months: newMonths,
    });
  }

  componentDidUpdate() {
    const {
      isAnimating,
      transitionDuration,
      onMonthTransitionEnd,
    } = this.props;

    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete. Similarly, if transitionDuration
    // is set to 0, also immediately invoke the onMonthTransitionEnd callback
    if ((!this.isTransitionEndSupported || !transitionDuration) && isAnimating) {
      onMonthTransitionEnd();
    }
  }

  componentWillUnmount() {
    if (this.removeEventListener) this.removeEventListener();
  }

  onTransitionEnd() {
    const { onMonthTransitionEnd } = this.props;
    onMonthTransitionEnd();
  }

  onMonthSelect(currentMonth, newMonthVal) {
    let newMonth = new Date(currentMonth);
    const { onMonthChange, orientation } = this.props;
    const { months } = this.state;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    let initialMonthSubtraction = months.indexOf(currentMonth);
    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }
    newMonth = subMonths(setMonth(newMonth, newMonthVal), initialMonthSubtraction);
    onMonthChange(newMonth);
  }

  onYearSelect(currentMonth, newYearVal) {
    let newMonth = new Date(currentMonth);
    const { onYearChange, orientation } = this.props;
    const { months } = this.state;
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    let initialMonthSubtraction = months.indexOf(currentMonth);
    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }
    newMonth = subMonths(setYear(newMonth, newYearVal), initialMonthSubtraction);

    onYearChange(newMonth);
  }

  setContainerRef(ref) {
    this.container = ref;
  }

  render() {
    const {
      enableOutsideDays,
      firstVisibleMonthIndex,
      horizontalMonthPadding,
      isAnimating,
      modifiers,
      numberOfMonths,
      monthFormat,
      orientation,
      translationValue,
      daySize,
      onDayMouseEnter,
      onDayMouseLeave,
      onDayClick,
      renderMonthText,
      renderCalendarDay,
      renderDayContents,
      renderMonthElement,
      onMonthTransitionEnd,
      firstDayOfWeek,
      focusedDate,
      isFocused,
      isRTL,
      styles,
      phrases,
      dayAriaLabelFormat,
      transitionDuration,
      verticalBorderSpacing,
      setMonthTitleHeight,
      locale,
    } = this.props;

    const { months } = this.state;
    const isVertical = orientation === VERTICAL_ORIENTATION;
    const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
    const isHorizontal = orientation === HORIZONTAL_ORIENTATION;

    const calendarMonthWidth = getCalendarMonthWidth(
      daySize,
      horizontalMonthPadding,
    );

    const width = isVertical || isVerticalScrollable
      ? calendarMonthWidth
      : (numberOfMonths + 2) * calendarMonthWidth;

    const transformType = (isVertical || isVerticalScrollable) ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${translationValue}px)`;

    return (
      <div
        {...css(
          styles.CalendarMonthGrid,
          isHorizontal && styles.CalendarMonthGrid__horizontal,
          isVertical && styles.CalendarMonthGrid__vertical,
          isVerticalScrollable && styles.CalendarMonthGrid__vertical_scrollable,
          isAnimating && styles.CalendarMonthGrid__animating,
          isAnimating && transitionDuration && {
            transition: `transform ${transitionDuration}ms ease-in-out`,
          },
          {
            ...getTransformStyles(transformValue),
            width,
          },
        )}
        ref={this.setContainerRef}
        onTransitionEnd={onMonthTransitionEnd}
      >
        {months.map((month, i) => {
          const isVisible = (i >= firstVisibleMonthIndex)
            && (i < firstVisibleMonthIndex + numberOfMonths);
          const hideForAnimation = i === 0 && !isVisible;
          const showForAnimation = i === 0 && isAnimating && isVisible;
          const monthString = toISOMonthString(month);

          return (
            <div
              key={monthString}
              {...css(
                isHorizontal && styles.CalendarMonthGrid_month__horizontal,
                hideForAnimation && styles.CalendarMonthGrid_month__hideForAnimation,
                showForAnimation && !isVertical && !isRTL && {
                  position: 'absolute',
                  left: -calendarMonthWidth,
                },
                showForAnimation && !isVertical && isRTL && {
                  position: 'absolute',
                  right: 0,
                },
                showForAnimation && isVertical && {
                  position: 'absolute',
                  top: -translationValue,
                },
                !isVisible && !isAnimating && styles.CalendarMonthGrid_month__hidden,
              )}
            >
              <CalendarMonth
                month={month}
                isVisible={isVisible}
                enableOutsideDays={enableOutsideDays}
                modifiers={modifiers[monthString]}
                monthFormat={monthFormat}
                orientation={orientation}
                onDayMouseEnter={onDayMouseEnter}
                onDayMouseLeave={onDayMouseLeave}
                onDayClick={onDayClick}
                onMonthSelect={this.onMonthSelect}
                onYearSelect={this.onYearSelect}
                renderMonthText={renderMonthText}
                renderCalendarDay={renderCalendarDay}
                renderDayContents={renderDayContents}
                renderMonthElement={renderMonthElement}
                firstDayOfWeek={firstDayOfWeek}
                daySize={daySize}
                focusedDate={isVisible ? focusedDate : null}
                isFocused={isFocused}
                phrases={phrases}
                setMonthTitleHeight={setMonthTitleHeight}
                dayAriaLabelFormat={dayAriaLabelFormat}
                verticalBorderSpacing={verticalBorderSpacing}
                horizontalMonthPadding={horizontalMonthPadding}
                locale={locale}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

CalendarMonthGrid.propTypes = propTypes;
CalendarMonthGrid.defaultProps = defaultProps;

export default withStyles(({
  reactDates: {
    color,
    spacing,
    zIndex,
  },
}) => ({
  CalendarMonthGrid: {
    background: color.background,
    textAlign: noflip('left'),
    zIndex,
  },

  CalendarMonthGrid__animating: {
    zIndex: zIndex + 1,
  },

  CalendarMonthGrid__horizontal: {
    position: 'absolute',
    left: noflip(spacing.dayPickerHorizontalPadding),
  },

  CalendarMonthGrid__vertical: {
    margin: '0 auto',
  },

  CalendarMonthGrid__vertical_scrollable: {
    margin: '0 auto',
  },

  CalendarMonthGrid_month__horizontal: {
    display: 'inline-block',
    verticalAlign: 'top',
    minHeight: '100%',
  },

  CalendarMonthGrid_month__hideForAnimation: {
    position: 'absolute',
    zIndex: zIndex - 1,
    opacity: 0,
    pointerEvents: 'none',
  },

  CalendarMonthGrid_month__hidden: {
    visibility: 'hidden',
  },
}), { pureComponent: typeof React.PureComponent !== 'undefined' })(CalendarMonthGrid);
