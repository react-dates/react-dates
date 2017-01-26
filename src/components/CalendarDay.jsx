import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import { BLOCKED_MODIFIER, DAY_SIZE } from '../../constants';

const propTypes = forbidExtraProps({
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.object,
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDay: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
});

const defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: {},
  isFocused: false,
  tabIndex: -1,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDay: null,

  // internationalization
  phrases: CalendarDayPhrases,
};

export function getModifiersForDay(modifiers, day) {
  return day ? Object.keys(modifiers).filter(key => modifiers[key](day)) : [];
}

export default class CalendarDay extends React.Component {
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
      daySize,
      isOutsideDay,
      modifiers,
      renderDay,
      tabIndex,
      phrases: { unavailable, available },
    } = this.props;

    if (!day) return <td />;

    const modifiersForDay = getModifiersForDay(modifiers, day);

    const className = cx('CalendarDay', {
      'CalendarDay--outside': isOutsideDay,
    }, modifiersForDay.map(mod => `CalendarDay--${mod}`));


    let availabilityText = '';
    if (BLOCKED_MODIFIER in modifiers) {
      availabilityText = modifiers[BLOCKED_MODIFIER](day) ? unavailable : available;
    }

    const ariaLabel = `${availabilityText} ${day.format('dddd')}. ${day.format('LL')}`;
    const daySizeStyles = {
      width: daySize,
      height: daySize - 1,
    };

    return (
      <td className={className}>
        <button
          type="button"
          ref={(ref) => { this.buttonRef = ref; }}
          className="CalendarDay__button"
          aria-label={ariaLabel}
          style={daySizeStyles}
          onMouseEnter={(e) => { this.onDayMouseEnter(day, e); }}
          onMouseLeave={(e) => { this.onDayMouseLeave(day, e); }}
          onMouseUp={(e) => { e.currentTarget.blur(); }}
          onClick={(e) => { this.onDayClick(day, e); }}
          tabIndex={tabIndex}
        >
          {renderDay ? renderDay(day) : day.format('D')}
        </button>
      </td>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;
