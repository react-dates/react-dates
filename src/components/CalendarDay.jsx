import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getPhrase from '../utils/getPhrase';

import { BLOCKED_MODIFIER, DAY_SIZE } from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.instanceOf(Set),
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
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDay: null,

  // internationalization
  phrases: CalendarDayPhrases,
};

class CalendarDay extends React.Component {
  constructor(...args) {
    super(...args);

    this.setButtonRef = this.setButtonRef.bind(this);
  }

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

  setButtonRef(ref) {
    this.buttonRef = ref;
  }

  render() {
    const {
      day,
      daySize,
      isOutsideDay,
      modifiers,
      renderDay,
      tabIndex,
      styles,
      phrases: {
        chooseAvailableDate,
        dateIsUnavailable,
      },
    } = this.props;

    if (!day) return <td />;

    const formattedDate = { date: `${day.format('dddd')}, ${day.format('LL')}` };

    const ariaLabel = modifiers.has(BLOCKED_MODIFIER)
      ? getPhrase(dateIsUnavailable, formattedDate)
      : getPhrase(chooseAvailableDate, formattedDate);

    const daySizeStyles = {
      width: daySize,
      height: daySize - 1,
    };

    const useDefaultCursor = (
      modifiers.has('blocked-minimum-nights')
      || modifiers.has('blocked-calendar')
      || modifiers.has('blocked-out-of-range')
    );

    const selected = (
      modifiers.has('selected')
      || modifiers.has('selected-start')
      || modifiers.has('selected-end')
    );

    const hoveredSpan = !selected && (
      modifiers.has('hovered-span')
      || modifiers.has('after-hovered-start')
    );

    const isOutsideRange = modifiers.has('blocked-out-of-range');

    return (
      <td
        {...css(
          styles.CalendarDay_container,
          isOutsideDay && styles.CalendarDay__outside,
          modifiers.has('highlighted-calendar') && styles.CalendarDay__highlighted_calendar,
          modifiers.has('blocked-minimum-nights') && styles.CalendarDay__blocked_minimum_nights,
          modifiers.has('blocked-calendar') && styles.CalendarDay__blocked_calendar,
          hoveredSpan && styles.CalendarDay__hovered_span,
          modifiers.has('selected-span') && styles.CalendarDay__selected_span,
          modifiers.has('last-in-range') && styles.CalendarDay__last_in_range,
          modifiers.has('selected-start') && styles.CalendarDay__selected_start,
          modifiers.has('selected-end') && styles.CalendarDay__selected_end,
          selected && styles.CalendarDay__selected,
          isOutsideRange && styles.CalendarDay__blocked_out_of_range,
          daySizeStyles,
        )}
      >
        <button
          {...css(
            styles.CalendarDay_button,
            useDefaultCursor && styles.CalendarDay_button__default,
          )}
          type="button"
          ref={this.setButtonRef}
          aria-label={ariaLabel}
          onMouseEnter={(e) => { this.onDayMouseEnter(day, e); }}
          onMouseLeave={(e) => { this.onDayMouseLeave(day, e); }}
          onMouseUp={(e) => { e.currentTarget.blur(); }}
          onClick={(e) => { this.onDayClick(day, e); }}
          tabIndex={tabIndex}
        >
          {renderDay ? renderDay(day, modifiers) : day.format('D')}
        </button>
      </td>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;

export { CalendarDay as PureCalendarDay };
export default withStyles(({ reactDates: { color } }) => ({
  CalendarDay_container: {
    border: `1px solid ${color.core.borderLight}`,
    padding: 0,
    boxSizing: 'border-box',
    color: color.text,
    background: '#fff',

    ':hover': {
      background: color.core.borderLight,
      border: `1px double ${color.core.borderLight}`,
      color: 'inherit',
    },
  },

  CalendarDay_button: {
    position: 'relative',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    background: 'none',
    border: 0,
    margin: 0,
    padding: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    boxSizing: 'border-box',
    cursor: 'pointer',

    ':active': {
      outline: 0,
    },
  },

  CalendarDay_button__default: {
    cursor: 'default',
  },

  CalendarDay__outside: {
    border: 0,

    background: color.outside.backgroundColor,
    color: color.outside.color,
  },

  CalendarDay__blocked_minimum_nights: {
    background: color.minimumNights.backgroundColor,
    border: `1px solid ${color.minimumNights.borderColor}`,
    color: color.minimumNights.color,

    ':hover': {
      background: color.minimumNights.backgroundColor_hover,
      color: color.minimumNights.color_active,
    },

    ':active': {
      background: color.minimumNights.backgroundColor_active,
      color: color.minimumNights.color_active,
    },
  },

  CalendarDay__highlighted_calendar: {
    background: color.highlighted.backgroundColor,
    color: color.highlighted.color,

    ':hover': {
      background: color.highlighted.backgroundColor_hover,
      color: color.highlighted.color_active,
    },

    ':active': {
      background: color.highlighted.backgroundColor_active,
      color: color.highlighted.color_active,
    },
  },

  CalendarDay__selected_span: {
    background: color.selectedSpan.backgroundColor,
    border: `1px solid ${color.selectedSpan.borderColor}`,
    color: color.selectedSpan.color,

    ':hover': {
      background: color.selectedSpan.backgroundColor_hover,
      border: `1px solid ${color.selectedSpan.borderColor}`,
      color: color.selectedSpan.color_active,
    },

    ':active': {
      background: color.selectedSpan.backgroundColor_active,
      border: `1px solid ${color.selectedSpan.borderColor}`,
      color: color.selectedSpan.color_active,
    },
  },

  CalendarDay__last_in_range: {
    borderRight: color.core.primary,
  },

  CalendarDay__selected: {
    background: color.selected.backgroundColor,
    border: `1px solid ${color.selected.borderColor}`,
    color: color.selected.color,

    ':hover': {
      background: color.selected.backgroundColor_hover,
      border: `1px solid ${color.selected.borderColor}`,
      color: color.selected.color_active,
    },

    ':active': {
      background: color.selected.backgroundColor_active,
      border: `1px solid ${color.selected.borderColor}`,
      color: color.selected.color_active,
    },
  },

  CalendarDay__hovered_span: {
    background: color.hoveredSpan.backgroundColor,
    border: `1px solid ${color.hoveredSpan.borderColor}`,
    color: color.hoveredSpan.color,

    ':hover': {
      background: color.hoveredSpan.backgroundColor_hover,
      border: `1px solid ${color.hoveredSpan.borderColor}`,
      color: color.hoveredSpan.color_active,
    },

    ':active': {
      background: color.hoveredSpan.backgroundColor_active,
      border: `1px solid ${color.hoveredSpan.borderColor}`,
      color: color.hoveredSpan.color_active,
    },
  },

  CalendarDay__blocked_calendar: {
    background: color.blocked_calendar.backgroundColor,
    border: `1px solid ${color.blocked_calendar.borderColor}`,
    color: color.blocked_calendar.color,

    ':hover': {
      background: color.blocked_calendar.backgroundColor_hover,
      border: `1px solid ${color.blocked_calendar.borderColor}`,
      color: color.blocked_calendar.color_active,
    },

    ':active': {
      background: color.blocked_calendar.backgroundColor_active,
      border: `1px solid ${color.blocked_calendar.borderColor}`,
      color: color.blocked_calendar.color_active,
    },
  },

  CalendarDay__blocked_out_of_range: {
    background: color.blocked_out_of_range.backgroundColor,
    border: `1px solid ${color.blocked_out_of_range.borderColor}`,
    color: color.blocked_out_of_range.color,

    ':hover': {
      background: color.blocked_out_of_range.backgroundColor_hover,
      border: `1px solid ${color.blocked_out_of_range.borderColor}`,
      color: color.blocked_out_of_range.color_active,
    },

    ':active': {
      background: color.blocked_out_of_range.backgroundColor_active,
      border: `1px solid ${color.blocked_out_of_range.borderColor}`,
      color: color.blocked_out_of_range.color_active,
    },
  },

  CalendarDay__selected_start: {},
  CalendarDay__selected_end: {},

}))(CalendarDay);
