/* eslint react/no-array-index-key: 0 */

import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import cx from 'classnames';

import CalendarDay from './CalendarDay';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';

import OrientationShape from '../shapes/OrientationShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

const propTypes = {
  month: momentPropTypes.momentObj,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: OrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseDown: PropTypes.func,
  onDayMouseUp: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onDayTouchStart: PropTypes.func,
  onDayTouchEnd: PropTypes.func,
  onDayTouchTap: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
};

const defaultProps = {
  month: moment(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick() {},
  onDayMouseDown() {},
  onDayMouseUp() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onDayTouchStart() {},
  onDayTouchEnd() {},
  onDayTouchTap() {},

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
};

export function getModifiersForDay(modifiers, day) {
  return day ? Object.keys(modifiers).filter(key => modifiers[key](day)) : [];
}

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
      onDayMouseDown,
      onDayMouseUp,
      onDayMouseEnter,
      onDayMouseLeave,
      onDayTouchStart,
      onDayTouchEnd,
      onDayTouchTap,
    } = this.props;

    const { weeks } = this.state;
    const monthTitle = month.format(monthFormat);

    const calendarMonthClasses = cx('CalendarMonth', {
      'CalendarMonth--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'CalendarMonth--vertical': orientation === VERTICAL_ORIENTATION,
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
                {week.map((day, j) => {
                  const modifiersForDay = getModifiersForDay(modifiers, day);
                  const className = cx('CalendarMonth__day', {
                    'CalendarMonth__day--outside': !day || day.month() !== month.month(),
                  }, modifiersForDay.map(mod => `CalendarMonth__day--${mod}`));

                  return (
                    <td className={className} key={j}>
                      {day &&
                        <CalendarDay
                          day={day}
                          onDayMouseEnter={onDayMouseEnter}
                          onDayMouseLeave={onDayMouseLeave}
                          onDayMouseDown={onDayMouseDown}
                          onDayMouseUp={onDayMouseUp}
                          onDayClick={onDayClick}
                          onDayTouchStart={onDayTouchStart}
                          onDayTouchEnd={onDayTouchEnd}
                          onDayTouchTap={onDayTouchTap}
                        />
                      }
                    </td>
                  );
                })}
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
