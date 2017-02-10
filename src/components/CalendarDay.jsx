import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import cx from 'classnames';

const propTypes = {
  day: momentPropTypes.momentObj,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.object,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDay: PropTypes.func,
};

const defaultProps = {
  day: moment(),
  isOutsideDay: false,
  modifiers: {},
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDay: null,
};

export function getModifiersForDay(modifiers, day) {
  return day ? Object.keys(modifiers).filter(key => modifiers[key](day)) : [];
}

export default class CalendarDay extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day, e) {
    const { onDayMouseEnter } = this.props;
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
    onDayMouseLeave(day, e);
  }

  render() {
    const {
      day,
      isOutsideDay,
      modifiers,
      renderDay,
    } = this.props;

    const className = cx('CalendarDay', {
      'CalendarDay--outside': !day || isOutsideDay,
    }, getModifiersForDay(modifiers, day).map(mod => `CalendarDay--${mod}`));

    return (day ?
      <td
        className={className}
        onMouseEnter={e => this.onDayMouseEnter(day, e)}
        onMouseLeave={e => this.onDayMouseLeave(day, e)}
        onClick={e => this.onDayClick(day, e)}
      >
        {renderDay ? renderDay(day) : day.format('D')}
      </td>
      :
      <td />
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;
