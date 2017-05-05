/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarDay from './CalendarDay';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import toISODateString from '../utils/toISODateString';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../../constants';

const propTypes = forbidExtraProps({
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

  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
};

export default class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: getCalendarMonthWeeks(props.month, props.enableOutsideDays),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { month, enableOutsideDays } = nextProps;
    if (!month.isSame(this.props.month)) {
      this.setState({
        weeks: getCalendarMonthWeeks(month, enableOutsideDays),
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
      phrases,
    } = this.props;

    const { weeks } = this.state;
    const monthTitle = renderMonth ? renderMonth(month) : month.format(monthFormat);

    const calendarMonthClasses = cx('CalendarMonth', {
      'CalendarMonth--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'CalendarMonth--vertical': orientation === VERTICAL_ORIENTATION,
      'CalendarMonth--vertical-scrollable': orientation === VERTICAL_SCROLLABLE,
    });

    return (
      <div className={calendarMonthClasses} data-visible={isVisible}>
        <table>
          <caption className="CalendarMonth__caption js-CalendarMonth__caption">
            <strong>{monthTitle}</strong>
          </caption>

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
