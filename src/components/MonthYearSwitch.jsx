import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import moment from 'moment';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';

const propTypes = forbidExtraProps({
  date: momentPropTypes.momentObj,
  onSelectMonth: PropTypes.func,
  onSelectYear: PropTypes.func,
});

const defaultProps = {
  date: moment(),
  onSelectMonth() {},
  onSelectYear() {},
};

export default class MonthSelector extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      date,
      onSelectMonth,
      onSelectYear,
    } = this.props;

    const currentMonth = date.format('MMMM');
    const currentYear = date.format('YYYY');

    return (
      <div className="MonthYearSwitch">
        <div className="Month">
          <button onClick={() => onSelectMonth(date, date.get('month') - 1)}>
            <LeftArrow />
          </button>
          <button onClick={() => onSelectMonth(date, date.get('month') + 1)}>
            <RightArrow />
          </button>
          <span className="Month--title">{currentMonth}</span>
        </div>
        <div className="Year">
          <span className="Year--title">{currentYear}</span>
          <button onClick={() => onSelectYear(date, date.get('year') - 1)}>
            <LeftArrow />
          </button>
          <button onClick={() => onSelectYear(date, date.get('year') + 1)}>
            <RightArrow />
          </button>
        </div>
      </div>
    );
  }
}

MonthSelector.propTypes = propTypes;
MonthSelector.defaultProps = defaultProps;
