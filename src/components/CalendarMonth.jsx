/* eslint react/no-array-index-key: 0 */

import React, { PropTypes } from 'react';
import omit from 'lodash.omit';
import shallowequal from 'shallowequal';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import cx from 'classnames';

import CalendarDay from './CalendarDay';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import doDateRangesOverlap from '../utils/doDateRangesOverlap';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

const propTypes = {
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  hoverDate: momentPropTypes.momentObj,

  month: momentPropTypes.momentObj,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: ScrollableOrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
};

const defaultProps = {
  startDate: undefined,
  endDate: undefined,
  hoverDate: undefined,

  month: moment(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
};

export default class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: getCalendarMonthWeeks(props.month, props.enableOutsideDays),
    };

    this.isMonthAffected = this.isMonthAffected.bind(this);
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
    // startDate, endDate, and hoverDate are already accounted for in the range
    // overlap check above. modifiers is currently redefined with every render
    // and would always trigger an update.
    const propsToSkip = ['modifiers', 'startDate', 'endDate', 'hoverDate'];

    return this.isMonthAffected(nextProps) ||
      !shallowequal(this.state, nextState) ||
      !shallowequal(omit(this.props, propsToSkip), omit(nextProps, propsToSkip));
  }

  isMonthAffected(nextProps) {
    const {
      month,
      startDate,
      endDate,
      hoverDate,
    } = this.props;

    // Each CalendarMonth component should stay linked to the same month, but
    // if this ever changes, we need to rerender.
    if (!month.isSame(nextProps.month, 'month')) {
      return true;
    }

    // Find all the dates that could affect this month's render
    const allModifiedDays = [
      startDate,
      endDate,
      hoverDate,
      nextProps.startDate,
      nextProps.endDate,
      nextProps.hoverDate,
    ].filter(date => !!date);

    // Check if these dates overlap with month
    if (allModifiedDays.length > 0) {
      return doDateRangesOverlap(
        moment.min(...allModifiedDays),
        moment.max(...allModifiedDays),
        month.clone().startOf('month'),
        month.clone().endOf('month'),
      );
    }

    return false;
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
    } = this.props;

    const { weeks } = this.state;
    const monthTitle = month.format(monthFormat);

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
                    isOutsideDay={!day || day.month() !== month.month()}
                    modifiers={modifiers}
                    key={dayOfWeek}
                    onDayMouseEnter={onDayMouseEnter}
                    onDayMouseLeave={onDayMouseLeave}
                    onDayClick={onDayClick}
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
