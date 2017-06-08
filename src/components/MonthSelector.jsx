import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

const propTypes = forbidExtraProps({
  month: momentPropTypes.momentObj,
  onMonthSelect: PropTypes.func,
  onYearSelect: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
});

const defaultProps = {
  month: moment(),
  onMonthSelect() {},
  onYearSelect() {},

  // internationalization
  phrases: CalendarDayPhrases,
};

export default class MonthSelector extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      month,
      onMonthSelect,
      onYearSelect,
    } = this.props;

    const className = cx('MonthSelector');
    const selectableYears = [];
    const currentYear = month.get('year');
    for (let i = 50; i >= 1; i -= 1) {
      selectableYears.push(currentYear - i);
    }
    selectableYears.push(currentYear);
    for (let i = 1; i <= 5; i += 1) {
      selectableYears.push(currentYear + i);
    }

    return (
      <div className={className}>
        <select onChange={e => onMonthSelect(month, e.target.value)} value={month.get('month')} className="MonthSelector__month_select">
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
        <select onChange={e => onYearSelect(month, e.target.value)} value={month.get('year')} className="MonthSelector__year_select">
          {selectableYears.map(year => (
            <option value={year} key={year}>{year}</option>
          ))}
        </select>
      </div>
    );
  }
}

MonthSelector.propTypes = propTypes;
MonthSelector.defaultProps = defaultProps;
