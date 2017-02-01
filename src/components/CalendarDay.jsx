import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

const propTypes = {
  day: momentPropTypes.momentObj,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDetails: PropTypes.func,
};

const defaultProps = {
  day: moment(),
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDetails: null,
};

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
    const { day, renderDetails } = this.props;

    return (
      <div
        className="CalendarDay"
        onMouseEnter={e => this.onDayMouseEnter(day, e)}
        onMouseLeave={e => this.onDayMouseLeave(day, e)}
        onClick={e => this.onDayClick(day, e)}
      >
        <span className="CalendarDay__day">{day.format('D')}</span>
        {renderDetails && (
          <span className="CalendarDay__details">{renderDetails(day)}</span>
        )}
      </div>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;
