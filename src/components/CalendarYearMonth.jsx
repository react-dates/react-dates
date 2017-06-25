import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';

import { CalendarMonthPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getPhrase from '../utils/getPhrase';

import { BLOCKED_MODIFIER, MONTH_WIDTH_SIZE, MONTH_HEIGHT_SIZE } from '../../constants';

const propTypes = forbidExtraProps({
  month: momentPropTypes.momentObj,
  monthWidthSize: nonNegativeInteger,
  monthHeightSize: nonNegativeInteger,
  modifiers: PropTypes.instanceOf(Set),
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onMonthClick: PropTypes.func,
  onMonthMouseEnter: PropTypes.func,
  onMonthMouseLeave: PropTypes.func,
  renderMonth: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarMonthPhrases)),
});

const defaultProps = {
  month: moment(),
  monthWidthSize: MONTH_WIDTH_SIZE,
  monthHeightSize: MONTH_HEIGHT_SIZE,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onMonthClick() {},
  onMonthMouseEnter() {},
  onMonthMouseLeave() {},
  renderMonth: null,

  // internationalization
  phrases: CalendarMonthPhrases,
};

export default class CalendarYearMonth extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    const { isFocused, tabIndex } = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        this.buttonRef.focus();
      }
    }
  }

  onMonthClick(day, e) {
    const { onMonthClick } = this.props;
    onMonthClick(day, e);
  }

  onMonthMouseEnter(day, e) {
    const { onMonthMouseEnter } = this.props;
    onMonthMouseEnter(day, e);
  }

  onMonthMouseLeave(day, e) {
    const { onMonthMouseLeave } = this.props;
    onMonthMouseLeave(day, e);
  }

  render() {
    const {
      month,
      monthWidthSize,
      monthHeightSize,
      modifiers,
      renderMonth,
      tabIndex,
      phrases: {
        chooseAvailableDate,
        dateIsUnavailable,
      },
    } = this.props;

    if (!month) return <td />;

    const className = cx('CalendarYearMonth', Array.from(modifiers, mod => `CalendarYearMonth--${mod}`));

    const formattedDate = month.format('MMMM');

    let ariaLabel = getPhrase(chooseAvailableDate, {
      date: formattedDate,
    });

    if (BLOCKED_MODIFIER in modifiers && modifiers[BLOCKED_MODIFIER](month)) {
      ariaLabel = getPhrase(dateIsUnavailable, { date: formattedDate });
    }

    const monthSizeStyles = {
      width: monthWidthSize,
      height: monthHeightSize - 1,
    };

    return (
      <td className={className} style={monthSizeStyles}>
        <button
          type="button"
          ref={(ref) => { this.buttonRef = ref; }}
          className="CalendarYearMonth__button"
          aria-label={ariaLabel}
          onMouseEnter={(e) => { this.onMonthMouseEnter(month, e); }}
          onMouseLeave={(e) => { this.onMonthMouseLeave(month, e); }}
          onMouseUp={(e) => { e.currentTarget.blur(); }}
          onClick={(e) => { this.onMonthClick(month, e); }}
          tabIndex={tabIndex}
        >
          {renderMonth ? renderMonth(month) : month.format('MMMM')}
        </button>
      </td>
    );
  }
}

CalendarYearMonth.propTypes = propTypes;
CalendarYearMonth.defaultProps = defaultProps;
