/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';

import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';

import calculateDimension from '../utils/calculateDimension';
import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import toISODateString from '../utils/toISODateString';

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
  month: momentPropTypes.momentObj,
  horizontalMonthPadding: nonNegativeInteger,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
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
  weekDayFormat: PropTypes.string,

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
  numberOfMonths: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: DAY_SIZE,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onMonthSelect() {},
  onYearSelect() {},
  renderMonthText: null,
  renderCalendarDay: props => (<CalendarDay {...props} />),
  renderDayContents: null,
  renderMonthElement: null,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,

  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  weekDayFormat: 'dd',
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined,
};

class CalendarMonth extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      weeks: getCalendarMonthWeeks(
        props.month,
        props.enableOutsideDays,
        props.firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : props.firstDayOfWeek,
      ),
    };

    this.setCaptionRef = this.setCaptionRef.bind(this);
    this.setMonthTitleHeight = this.setMonthTitleHeight.bind(this);
  }

  componentDidMount() {
    this.setMonthTitleHeightTimeout = setTimeout(this.setMonthTitleHeight, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { month, enableOutsideDays, firstDayOfWeek } = nextProps;
    const {
      month: prevMonth,
      enableOutsideDays: prevEnableOutsideDays,
      firstDayOfWeek: prevFirstDayOfWeek,
    } = this.props;
    if (
      !month.isSame(prevMonth)
      || enableOutsideDays !== prevEnableOutsideDays
      || firstDayOfWeek !== prevFirstDayOfWeek
    ) {
      this.setState({
        weeks: getCalendarMonthWeeks(
          month,
          enableOutsideDays,
          firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : firstDayOfWeek,
        ),
      });
    }
  }

  componentWillUnmount() {
    if (this.setMonthTitleHeightTimeout) {
      clearTimeout(this.setMonthTitleHeightTimeout);
    }
  }

  setMonthTitleHeight() {
    const { setMonthTitleHeight } = this.props;
    if (setMonthTitleHeight) {
      const captionHeight = calculateDimension(this.captionRef, 'height', true, true);
      setMonthTitleHeight(captionHeight);
    }
  }

  setCaptionRef(ref) {
    this.captionRef = ref;
  }

  isHorizontal() {
    const { orientation } = this.props;
    return orientation === HORIZONTAL_ORIENTATION;
  }

  isVertical() {
    const { orientation } = this.props;
    return orientation === VERTICAL_ORIENTATION || orientation === VERTICAL_SCROLLABLE;
  }

  renderWeekHeader(index) {
    const {
      daySize,
      orientation,
      weekDayFormat,
      styles,
      firstDayOfWeek,
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
    if (orientation === HORIZONTAL_ORIENTATION) {
      weekHeaderStyle = horizontalStyle;
    } else if (this.isVertical() && !verticalScrollable) {
      weekHeaderStyle = verticalStyle;
    }

    const header = [];
    for (let i = 0; i < 7; i += 1) {
      header.push((
        <li key={i} {...css(styles.CalendarMonth_weekHeader_li, { width: daySize })}>
          <small>{moment().day((i + firstDayOfWeek) % 7).format(weekDayFormat)}</small>
        </li>
      ));
    }

    return (
      <div
        {...css(
          styles.CalendarMonth_weekHeader,
          this.isVertical() && styles.CalendarMonth_weekHeader__vertical,
          verticalScrollable && styles.CalendarMonth_weekHeader__verticalScrollable,
          weekHeaderStyle,
        )}
        key={`week-${index}`}
      >
        <ul {...css(styles.CalendarMonth_weekHeader_ul)}>
          {header}
        </ul>
      </div>
    );
  }

  render() {
    const {
      dayAriaLabelFormat,
      daySize,
      focusedDate,
      horizontalMonthPadding,
      isFocused,
      isVisible,
      modifiers,
      month,
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
      styles,
      verticalBorderSpacing,
      numberOfMonths,
    } = this.props;

    const { weeks } = this.state;
    const monthTitle = renderMonthText ? renderMonthText(month) : month.format(monthFormat);

    const verticalScrollable = orientation === VERTICAL_SCROLLABLE;
    const isHorizontal = this.isHorizontal();

    const numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
    const weekHeaders = [];
    for (let i = 0; i < numOfWeekHeaders; i += 1) {
      weekHeaders.push(this.renderWeekHeader(i));
    }

    return (
      <div
        {...css(
          styles.CalendarMonth,
          { padding: `0 ${horizontalMonthPadding}px` },
        )}
        data-visible={isVisible}
      >
        <div
          ref={this.setCaptionRef}
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

        <div
          {...css(styles.CalendarMonth_weekHeaders,
            isHorizontal && styles.CalendarMonth_weekHeaders__horizontal)}
          aria-hidden="true"
          role="presentation"
        >
          {weekHeaders}
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
  }
}

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color, font, spacing, zIndex } }) => ({
  CalendarMonth: {
    background: color.background,
    textAlign: 'center',
    verticalAlign: 'top',
    userSelect: 'none',
  },

  CalendarMonth_weekHeaders: {
    position: 'relative',
  },

  CalendarMonth_weekHeader: {
    color: color.placeholderText,
    position: 'absolute',
    top: -24,
    zIndex: zIndex + 2,
    textAlign: noflip('left'),
  },

  CalendarMonth_weekHeader__verticalScrollable: {
    top: 0,
    display: 'table-row',
    borderBottom: `1px solid ${color.core.border}`,
    background: color.background,
    marginLeft: noflip(0),
    left: noflip(0),
    width: '100%',
    textAlign: 'center',
  },

  CalendarMonth_weekHeader_ul: {
    listStyle: 'none',
    margin: '1px 0',
    paddingLeft: noflip(0),
    paddingRight: noflip(0),
    fontSize: font.size,
  },

  CalendarMonth_weekHeader_li: {
    display: 'inline-block',
    textAlign: 'center',
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
