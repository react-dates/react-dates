/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';

import { CalendarMonthPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarYearMonth from './CalendarYearMonth';

import getCalendarYearMonths from '../utils/getCalendarYearMonths';
import isSameMonth from '../utils/isSameMonth';
import toISODateString from '../utils/toISODateString';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  MONTH_WIDTH_SIZE,
  MONTH_HEIGHT_SIZE,
} from '../../constants';

const propTypes = forbidExtraProps({
  year: momentPropTypes.momentObj,
  isVisible: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: ScrollableOrientationShape,
  monthWidthSize: nonNegativeInteger,
  monthHeightSize: nonNegativeInteger,
  onMonthClick: PropTypes.func,
  onMonthMouseEnter: PropTypes.func,
  onMonthMouseLeave: PropTypes.func,
  renderYear: PropTypes.func,
  renderMonth: PropTypes.func,

  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day

  // i18n
  yearFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarMonthPhrases)),
});

const defaultProps = {
  year: moment(),
  isVisible: true,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  monthWidthSize: MONTH_WIDTH_SIZE,
  monthHeightSize: MONTH_HEIGHT_SIZE,
  onMonthClick() {},
  onMonthMouseEnter() {},
  onMonthMouseLeave() {},
  renderYear: null,
  renderMonth: null,

  focusedDate: null,
  isFocused: false,

  // i18n
  yearFormat: 'YYYY', // english locale
  phrases: CalendarMonthPhrases,
};

export default class CalendarYear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      months: getCalendarYearMonths(props.year),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { year } = nextProps;
    if (!year.isSame(this.props.month)) {
      this.setState({
        weeks: getCalendarYearMonths(year),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      year,
      yearFormat,
      orientation,
      isVisible,
      modifiers,
      onMonthClick,
      onMonthMouseEnter,
      onMonthMouseLeave,
      renderYear,
      renderMonth,
      monthWidthSize,
      monthHeightSize,
      focusedDate,
      isFocused,
      phrases,
    } = this.props;

    const { months } = this.state;
    const yearTitle = renderYear ? renderYear(year) : year.format(yearFormat);

    const calendarMonthClasses = cx('CalendarYear', {
      'CalendarYear--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'CalendarYear--vertical': orientation === VERTICAL_ORIENTATION,
      'CalendarYear--vertical-scrollable': orientation === VERTICAL_SCROLLABLE,
    });

    return (
      <div className={calendarMonthClasses} data-visible={isVisible}>
        <table>
          <caption className="CalendarYear__caption js-CalendarYear__caption">
            <strong>{yearTitle}</strong>
          </caption>

          <tbody className="js-CalendarYear__grid">
            {months.map((monthBlock, i) => (
              <tr key={i}>
                {monthBlock.map((month, index) => (
                  <CalendarYearMonth
                    month={month}
                    monthWidthSize={monthWidthSize}
                    monthHeightSize={monthHeightSize}
                    tabIndex={isVisible && isSameMonth(month, focusedDate) ? 0 : -1}
                    isFocused={isFocused}
                    key={index}
                    onMonthMouseEnter={onMonthMouseEnter}
                    onMonthMouseLeave={onMonthMouseLeave}
                    onMonthClick={onMonthClick}
                    renderMonth={renderMonth}
                    phrases={phrases}
                    modifiers={modifiers[toISODateString(month)]}
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

CalendarYear.propTypes = propTypes;
CalendarYear.defaultProps = defaultProps;
