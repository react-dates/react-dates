/* eslint react/no-array-index-key: 0 */

import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';

import calculateDimension from '../utils/calculateDimension';
import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import usePrevious from '../utils/usePrevious';
import toISODateString from '../utils/toISODateString';

import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  month: momentPropTypes.momentObj,
  horizontalMonthPadding: nonNegativeInteger,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.objectOf(ModifiersShape),
  orientation: ScrollableOrientationShape,
  daySize: nonNegativeInteger,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthSelect: PropTypes.func,
  onYearSelect: PropTypes.func,
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  firstDayOfWeek: DayOfWeekShape,
  setMonthTitleHeight: PropTypes.func,
  verticalBorderSpacing: nonNegativeInteger,

  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string,
});

const defaultProps = {
  month: moment(),
  horizontalMonthPadding: 13,
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: DAY_SIZE,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onMonthSelect() {},
  onYearSelect() {},
  renderMonthText: null,
  renderCalendarDay: (props) => (<CalendarDay {...props} />),
  renderDayContents: null,
  renderMonthElement: null,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,

  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined,
};

const CalendarMonth = memo((props) => {
  const { 
    month, 
    enableOutsideDays, 
    firstDayOfWeek, 
    dayAriaLabelFormat,
    daySize,
    focusedDate,
    horizontalMonthPadding,
    isFocused,
    isVisible,
    modifiers,
    monthFormat,
    onDayClick,
    onDayMouseEnter,
    onDayMouseLeave,
    onMonthSelect,
    onYearSelect,
    orientation,
    phrases,
    renderCalendarDay,
    renderDayContents,
    renderMonthElement,
    renderMonthText,
    css,
    styles,
    verticalBorderSpacing,
  } = props;
  const captionRef = useRef(null);

  let setMonthTitleHeightTimeout;

  const setMonthTitleHeight = () => {
    const { setMonthTitleHeight: setMonthTitleHeightProp } = props;
    if (setMonthTitleHeight) {
      const captionHeight = calculateDimension(captionRef.current, 'height', true, true);
      setMonthTitleHeightProp(captionHeight);
    }
  }

  const queueSetMonthTitleHeight = () => {
    setMonthTitleHeightTimeout = window.setTimeout(setMonthTitleHeight, 0);
  }

  const [weeks, setWeeks] = useState(getCalendarMonthWeeks(
    month,
    enableOutsideDays,
    firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : firstDayOfWeek,
  ))
    
  const { 
    month: prevMonth, 
    enableOutsideDays: prevEnableOutsideDays, 
    firstDayOfWeek: prevFirstDayOfWeek, 
    setMonthTitleHeight: prevSetMonthTitleHeight 
  } = usePrevious(props, props) || {};
  useEffect(() => {
    queueSetMonthTitleHeight();
    return () => {
      if (setMonthTitleHeightTimeout) {
        clearInterval(setMonthTitleHeightTimeout)
      }
    }
  }, [])

  useEffect(() => {
    if (
      !month.isSame(prevMonth)
      || enableOutsideDays !== prevEnableOutsideDays
      || firstDayOfWeek !== prevFirstDayOfWeek
    ) {
      setWeeks(getCalendarMonthWeeks(
        month,
        enableOutsideDays,
        firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : firstDayOfWeek,
      ));
    }
  }, [month, enableOutsideDays, firstDayOfWeek])

  useEffect(() => {
    if (prevSetMonthTitleHeight === null && setMonthTitleHeight !== null) {
      queueSetMonthTitleHeight();
    }
  }, [setMonthTitleHeight]);

  const monthTitle = renderMonthText ? renderMonthText(month) : month.format(monthFormat);

  const verticalScrollable = orientation === VERTICAL_SCROLLABLE;

  return (
    <div
      {...css(
        styles.CalendarMonth,
        { padding: `0 ${horizontalMonthPadding}px` },
      )}
      data-visible={isVisible}
    >
      <div
        ref={captionRef}
        {...css(
          styles.CalendarMonth_caption,
          verticalScrollable && styles.CalendarMonth_caption__verticalScrollable,
        )}
      >
        {renderMonthElement ? (
          renderMonthElement({
            month,
            onMonthSelect,
            onYearSelect,
            isVisible,
          })
        ) : (
          <strong>
            {monthTitle}
          </strong>
        )}
      </div>

      <table
        {...css(
          !verticalBorderSpacing && styles.CalendarMonth_table,
          verticalBorderSpacing && styles.CalendarMonth_verticalSpacing,
          verticalBorderSpacing && { borderSpacing: `0px ${verticalBorderSpacing}px` },
        )}
        role="presentation"
      >
        <tbody>
          {weeks.map((week, i) => (
            <CalendarWeek key={i}>
              {week.map((day, dayOfWeek) => renderCalendarDay({
                key: dayOfWeek,
                day,
                daySize,
                isOutsideDay: !day || day.month() !== month.month(),
                tabIndex: isVisible && isSameDay(day, focusedDate) ? 0 : -1,
                isFocused,
                onDayMouseEnter,
                onDayMouseLeave,
                onDayClick,
                renderDayContents,
                phrases,
                modifiers: modifiers[toISODateString(day)],
                ariaLabelFormat: dayAriaLabelFormat,
              }))}
            </CalendarWeek>
          ))}
        </tbody>
      </table>
    </div>
  );
});

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color, font, spacing } }) => ({
  CalendarMonth: {
    background: color.background,
    textAlign: 'center',
    verticalAlign: 'top',
    userSelect: 'none',
  },

  CalendarMonth_table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },

  CalendarMonth_verticalSpacing: {
    borderCollapse: 'separate',
  },

  CalendarMonth_caption: {
    color: color.text,
    fontSize: font.captionSize,
    textAlign: 'center',
    paddingTop: spacing.captionPaddingTop,
    paddingBottom: spacing.captionPaddingBottom,
    captionSide: 'initial',
  },

  CalendarMonth_caption__verticalScrollable: {
    paddingTop: 12,
    paddingBottom: 7,
  },
}), { pureComponent: typeof React.PureComponent !== 'undefined' })(CalendarMonth);
