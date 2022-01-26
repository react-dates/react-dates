import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';
import { addEventListener } from 'consolidated-events';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';

import CalendarMonth from './CalendarMonth';

import isTransitionEndSupportedUtil from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import toISOMonthString from '../utils/toISOMonthString';
import isPrevMonth from '../utils/isPrevMonth';
import isNextMonth from '../utils/isNextMonth';

import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../constants';
import usePrevious from '../utils/usePrevious';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  enableOutsideDays: PropTypes.bool,
  firstVisibleMonthIndex: PropTypes.number,
  horizontalMonthPadding: nonNegativeInteger,
  initialMonth: momentPropTypes.momentObj,
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
  focusedDate: momentPropTypes.momentObj, // indicates focusable day
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
});

const defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  horizontalMonthPadding: 13,
  initialMonth: moment(),
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
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
};

function getMonths(initialMonth, numberOfMonths, withoutTransitionMonths) {
  let month = initialMonth.clone();
  if (!withoutTransitionMonths) month = month.subtract(1, 'month');

  const months = [];
  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = month.clone().add(1, 'month');
  }

  return months;
}

const CalendarMonthGrid = memo((props) => {
  let locale = moment.locale();
  const isTransitionEndSupported = isTransitionEndSupportedUtil();
  const containerRef = useRef(null);
  const { 
    initialMonth, 
    numberOfMonths, 
    orientation, 
    isAnimating,
    transitionDuration,
    onMonthTransitionEnd, 
    enableOutsideDays,
    firstVisibleMonthIndex,
    horizontalMonthPadding,
    modifiers,
    monthFormat,
    translationValue,
    daySize,
    onDayMouseEnter,
    onDayMouseLeave,
    onDayClick,
    renderMonthText,
    renderCalendarDay,
    renderDayContents,
    renderMonthElement,
    firstDayOfWeek,
    focusedDate,
    isFocused,
    isRTL,
    css,
    styles,
    phrases,
    dayAriaLabelFormat,
    verticalBorderSpacing,
    setMonthTitleHeight,
  } = props;

  const handleTransitionEnd = () => {
    onMonthTransitionEnd();
  }

  const handleMonthSelect = (currentMonth, newMonthVal) => {
    const { onMonthChange } = props;
    const newMonth = currentMonth.clone();
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    let initialMonthSubtraction = months.indexOf(currentMonth);
    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }
    newMonth.set('month', newMonthVal).subtract(initialMonthSubtraction, 'months');
    onMonthChange(newMonth);
  }

  const handleYearSelect = (currentMonth, newYearVal) => {
    const { onYearChange } = props;
    const newMonth = currentMonth.clone();
    const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    let initialMonthSubtraction = months.indexOf(currentMonth);
    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }
    newMonth.set('year', newYearVal).subtract(initialMonthSubtraction, 'months');
    onYearChange(newMonth);
  }

  const {
    initialMonth: prevInitialMonth,
    numberOfMonths: prevNumberOfMonths,
  } = usePrevious(props, props);

  const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
  const [months, setMonths] = useState(getMonths(initialMonth, numberOfMonths, withoutTransitionMonths))

  useEffect(() => {
    const removeEventListener = addEventListener(
      containerRef.current,
      'transitionend',
      handleTransitionEnd,
    );
    return () => {
      if (removeEventListener) removeEventListener();
    }
  }, []);

  useEffect(() => {    
    const hasMonthChanged = !prevInitialMonth.isSame(initialMonth, 'month');
    const hasNumberOfMonthsChanged = prevNumberOfMonths !== numberOfMonths;
    let newMonths = months;

    if (hasMonthChanged || hasNumberOfMonthsChanged) {
      if (hasMonthChanged && !hasNumberOfMonthsChanged) {
        if (isNextMonth(prevInitialMonth, initialMonth)) {
          newMonths = months.slice(1);
          newMonths.push(months[months.length - 1].clone().add(1, 'month'));
        } else if (isPrevMonth(prevInitialMonth, initialMonth)) {
          newMonths = months.slice(0, months.length - 1);
          newMonths.unshift(months[0].clone().subtract(1, 'month'));
        } else {
          const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
          newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
        }
      }

      if (hasNumberOfMonthsChanged) {
        const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
        newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
      }

      const momentLocale = moment.locale();
      if (locale !== momentLocale) {
        locale = momentLocale;
        newMonths = newMonths.map((m) => m.locale(locale));
      }

      setMonths(newMonths);
    }
  }, [initialMonth, numberOfMonths, orientation])

  useEffect(() => {
    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete. Similarly, if transitionDuration
    // is set to 0, also immediately invoke the onMonthTransitionEnd callback
    if ((!isTransitionEndSupported || !transitionDuration) && isAnimating) {
      onMonthTransitionEnd();
    }
  }, [isAnimating, transitionDuration, onMonthTransitionEnd]);

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
          transition: `transform ${transitionDuration}ms ease-in-out 0.1s`,
        },
        {
          ...getTransformStyles(transformValue),
          width,
        },
      )}
      ref={containerRef}
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
              onMonthSelect={handleMonthSelect}
              onYearSelect={handleYearSelect}
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
            />
          </div>
        );
      })}
    </div>
  );
});

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
