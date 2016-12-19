import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

export const TOUCHSTART_TIMEOUT = 200;

const propTypes = {
  day: momentPropTypes.momentObj,
  onDayClick: PropTypes.func,
  onDayMouseDown: PropTypes.func,
  onDayMouseUp: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onDayTouchStart: PropTypes.func,
  onDayTouchEnd: PropTypes.func,
  onDayTouchTap: PropTypes.func,
};

const defaultProps = {
  day: moment(),
  onDayClick() {},
  onDayMouseDown() {},
  onDayMouseUp() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onDayTouchStart() {},
  onDayTouchEnd() {},
  onDayTouchTap() {},
};

export default class CalendarDay extends React.Component {
  constructor(props) {
    super(props);
    this.hasActiveTouchStart = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onDayClick(day, e) {
    this.props.onDayClick(day, e);
  }

  onDayMouseDown(day, e) {
    this.props.onDayMouseDown(day, e);
  }

  onDayMouseUp(day, e) {
    this.props.onDayMouseUp(day, e);
  }

  onDayMouseEnter(day, e) {
    this.props.onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    this.props.onDayMouseLeave(day, e);
  }

  onDayTouchStart(day, e) {
    this.hasActiveTouchStart = true;
    setTimeout(() => {
      this.hasActiveTouchStart = false;
    }, TOUCHSTART_TIMEOUT);

    this.props.onDayTouchStart(day, e);
  }

  onDayTouchEnd(day, e) {
    if (this.hasActiveTouchStart) {
      this.hasActiveTouchStart = false;
      this.onDayTouchTap(day, e);
    }

    this.props.onDayTouchEnd(day, e);
  }

  onDayTouchTap(day, e) {
    this.props.onDayTouchTap(day, e);
  }

  render() {
    const { day } = this.props;

    return (
      <div
        className="CalendarDay"
        onMouseEnter={e => this.onDayMouseEnter(day, e)}
        onMouseLeave={e => this.onDayMouseLeave(day, e)}
        onMouseDown={e => this.onDayMouseDown(day, e)}
        onMouseUp={e => this.onDayMouseUp(day, e)}
        onClick={e => this.onDayClick(day, e)}
        onTouchStart={e => this.onDayTouchStart(day, e)}
        onTouchEnd={e => this.onDayTouchEnd(day, e)}
      >
        <span className="CalendarDay__day">{day.format('D')}</span>
      </div>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;
