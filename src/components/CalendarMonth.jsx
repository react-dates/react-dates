/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarDay from './CalendarDay';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import toISODateString from '../utils/toISODateString';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  month: momentPropTypes.momentObj,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: ScrollableOrientationShape,
  daySize: nonNegativeInteger,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderMonth: PropTypes.func,
  renderDay: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,

  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
});

const defaultProps = {
  month: moment(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: DAY_SIZE,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderMonth: null,
  renderDay: null,
  firstDayOfWeek: null,

  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
};

class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: getCalendarMonthWeeks(
        props.month,
        props.enableOutsideDays,
        props.firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : props.firstDayOfWeek,
      ),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { month, enableOutsideDays, firstDayOfWeek } = nextProps;
    if (!month.isSame(this.props.month)
        || enableOutsideDays !== this.props.enableOutsideDays
        || firstDayOfWeek !== this.props.firstDayOfWeek) {
      this.setState({
        weeks: getCalendarMonthWeeks(
          month,
          enableOutsideDays,
          firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : firstDayOfWeek,
        ),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      month,
      monthFormat,
      orientation,
      isVisible,
      modifiers,
      onDayClick,
      onDayMouseEnter,
      onDayMouseLeave,
      renderMonth,
      renderDay,
      daySize,
      focusedDate,
      isFocused,
      styles,
      phrases,
    } = this.props;

    const { weeks } = this.state;
    const monthTitle = renderMonth ? renderMonth(month) : month.format(monthFormat);

    const verticalScrollable = orientation === VERTICAL_SCROLLABLE;

    return (
      <div
        {...css(
          styles.CalendarMonth,
          orientation === HORIZONTAL_ORIENTATION && styles.CalendarMonth__horizontal,
          orientation === VERTICAL_ORIENTATION && styles.CalendarMonth__vertical,
          verticalScrollable && styles.CalendarMonth__vertical_scrollable,
        )}
        data-visible={isVisible}
      >
        <table {...css(styles.CalendarMonth_table)} role="presentation">
          <div
            id="CalendarMonth__caption"
            className="js-CalendarMonth__caption"
            {...css(
              styles.CalendarMonth_caption,
              verticalScrollable && styles.CalendarMonth_caption__vertical_scrollable,
            )}
          >
            <strong>{monthTitle}</strong>
          </div>

          <tbody className="js-CalendarMonth__grid">
            {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((day, dayOfWeek) => (
                  <CalendarDay
                    day={day}
                    daySize={daySize}
                    isOutsideDay={!day || day.month() !== month.month()}
                    tabIndex={isVisible && isSameDay(day, focusedDate) ? 0 : -1}
                    isFocused={isFocused}
                    key={dayOfWeek}
                    onDayMouseEnter={onDayMouseEnter}
                    onDayMouseLeave={onDayMouseLeave}
                    onDayClick={onDayClick}
                    renderDay={renderDay}
                    phrases={phrases}
                    modifiers={modifiers[toISODateString(day)]}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

export default withStyles(({ color }) => ({
  CalendarMonth: {
    background: color.background,
    textAlign: 'center',
    padding: '0 13px',
    verticalAlign: 'top',
    userSelect: 'none',
  },

  CalendarMonth_table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    caption: {
      captionSide: 'initial',
    },
  },

// .CalendarMonth--horizontal,
// .CalendarMonth--vertical {
//   &:first-of-type {
//     position: absolute;
//     z-index: $react-dates-z-index - 1;
//     opacity: 0;
//     pointer-events: none;
//   }
// }

  CalendarMonth__horizontal: {
    display: 'inline-block',
    minHeight: '100%',
  },

  CalendarMonth__vertical: {
    display: 'block',
  },

  CalendarMonth_caption: {
    color: color.textColor,
    marginTop: 7,
    fontSize: 18,
    textAlign: 'center',
    padding: '15px 0 35px',
    // necessary to not hide borders in FF
    marginBottom: 2,
    captionSide: 'initial',
  },

  CalendarMonth_caption__vertical_scrollable: {
    padding: '5px 0',
  },
}))(CalendarMonth);

