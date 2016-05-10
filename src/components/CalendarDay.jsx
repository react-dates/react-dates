import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

export const TOUCHSTART_TIMEOUT = 200;

const propTypes = {
  day: momentPropTypes.momentObj,
  modifiers: PropTypes.arrayOf(PropTypes.string),
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
  modifiers: [],
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

  handleDayClick(day, modifiers, e) {
    this.props.onDayClick(day, modifiers, e);
  }

  handleDayMouseDown(day, modifiers, e) {
    this.props.onDayMouseDown(day, modifiers, e);
  }

  handleDayMouseUp(day, modifiers, e) {
    this.props.onDayMouseUp(day, modifiers, e);
  }

  handleDayMouseEnter(day, modifiers, e) {
    this.props.onDayMouseEnter(day, modifiers, e);
  }

  handleDayMouseLeave(day, modifiers, e) {
    this.props.onDayMouseLeave(day, modifiers, e);
  }

  handleDayTouchStart(day, modifiers, e) {
    this.hasActiveTouchStart = true;
    setTimeout(() => {
      this.hasActiveTouchStart = false;
    }, TOUCHSTART_TIMEOUT);

    this.props.onDayTouchStart(day, modifiers, e);
  }

  handleDayTouchEnd(day, modifiers, e) {
    if (this.hasActiveTouchStart) {
      this.hasActiveTouchStart = false;
      this.handleDayTouchTap(day, modifiers, e);
    }

    this.props.onDayTouchEnd(day, modifiers, e);
  }

  handleDayTouchTap(day, modifiers, e) {
    this.props.onDayTouchTap(day, modifiers, e);
  }

  render() {
    const { day, modifiers } = this.props;

    return (
      <div
        className="CalendarDay"
        onMouseEnter={(e) => this.handleDayMouseEnter(day, modifiers, e)}
        onMouseLeave={(e) => this.handleDayMouseLeave(day, modifiers, e)}
        onMouseDown={(e) => this.handleDayMouseDown(day, modifiers, e)}
        onMouseUp={(e) => this.handleDayMouseUp(day, modifiers, e)}
        onClick={(e) => this.handleDayClick(day, modifiers, e)}
        onTouchStart={(e) => this.handleDayTouchStart(day, modifiers, e)}
        onTouchEnd={(e) => this.handleDayTouchEnd(day, modifiers, e)}
      >
        <span className="CalendarDay__day">{day.format('D')}</span>
      </div>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;
