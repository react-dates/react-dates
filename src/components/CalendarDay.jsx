import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';
import raf from 'raf';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getCalendarDaySettings from '../utils/getCalendarDaySettings';
import ModifiersShape from '../shapes/ModifiersShape';

import { DAY_SIZE } from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: ModifiersShape,
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,

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
  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',

  // internationalization
  phrases: CalendarDayPhrases,
};

class CalendarDay extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.setButtonRef = this.setButtonRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isFocused, tabIndex } = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        raf(() => {
          if (this.buttonRef) {
            this.buttonRef.focus();
          }
        });
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

  onKeyDown(day, e) {
    const { onDayClick } = this.props;

    const { key } = e;
    if (key === 'Enter' || key === ' ') {
      onDayClick(day, e);
    }
  }

  setButtonRef(ref) {
    this.buttonRef = ref;
  }

  render() {
    const {
      day,
      ariaLabelFormat,
      daySize,
      isOutsideDay,
      modifiers,
      renderDayContents,
      tabIndex,
      css,
      styles,
      phrases,
    } = this.props;

    if (!day) return <td />;

    const {
      daySizeStyles,
      useDefaultCursor,
      selected,
      hoveredSpan,
      isOutsideRange,
      ariaLabel,
    } = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases);

    return (
      <td
        {...css(
          styles.CalendarDay,
          useDefaultCursor && styles.CalendarDay__defaultCursor,
          styles.CalendarDay__default,
          isOutsideDay && styles.CalendarDay__outside,
          modifiers.has('today') && styles.CalendarDay__today,
          modifiers.has('first-day-of-week') && styles.CalendarDay__firstDayOfWeek,
          modifiers.has('last-day-of-week') && styles.CalendarDay__lastDayOfWeek,
          modifiers.has('hovered-offset') && styles.CalendarDay__hovered_offset,
          modifiers.has('hovered-start-first-possible-end') && styles.CalendarDay__hovered_start_first_possible_end,
          modifiers.has('hovered-start-blocked-minimum-nights') && styles.CalendarDay__hovered_start_blocked_min_nights,
          modifiers.has('highlighted-calendar') && styles.CalendarDay__highlighted_calendar,
          modifiers.has('blocked-minimum-nights') && styles.CalendarDay__blocked_minimum_nights,
          modifiers.has('blocked-calendar') && styles.CalendarDay__blocked_calendar,
          hoveredSpan && styles.CalendarDay__hovered_span,
          modifiers.has('after-hovered-start') && styles.CalendarDay__after_hovered_start,
          modifiers.has('selected-span') && styles.CalendarDay__selected_span,
          modifiers.has('selected-start') && styles.CalendarDay__selected_start,
          modifiers.has('selected-end') && styles.CalendarDay__selected_end,
          selected && !modifiers.has('selected-span') && styles.CalendarDay__selected,
          modifiers.has('before-hovered-end') && styles.CalendarDay__before_hovered_end,
          modifiers.has('no-selected-start-before-selected-end') && styles.CalendarDay__no_selected_start_before_selected_end,
          modifiers.has('selected-start-in-hovered-span') && styles.CalendarDay__selected_start_in_hovered_span,
          modifiers.has('selected-end-in-hovered-span') && styles.CalendarDay__selected_end_in_hovered_span,
          modifiers.has('selected-start-no-selected-end') && styles.CalendarDay__selected_start_no_selected_end,
          modifiers.has('selected-end-no-selected-start') && styles.CalendarDay__selected_end_no_selected_start,
          isOutsideRange && styles.CalendarDay__blocked_out_of_range,
          daySizeStyles,
        )}
        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
        ref={this.setButtonRef}
        aria-disabled={modifiers.has('blocked')}
        {...(modifiers.has('today') ? { 'aria-current': 'date' } : {})}
        aria-label={ariaLabel}
        onMouseEnter={(e) => { this.onDayMouseEnter(day, e); }}
        onMouseLeave={(e) => { this.onDayMouseLeave(day, e); }}
        onMouseUp={(e) => { e.currentTarget.blur(); }}
        onClick={(e) => { this.onDayClick(day, e); }}
        onKeyDown={(e) => { this.onKeyDown(day, e); }}
        tabIndex={tabIndex}
      >
        {renderDayContents ? renderDayContents(day, modifiers) : day.format('D')}
      </td>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;

export { CalendarDay as PureCalendarDay };
export default withStyles(({ reactDates: { color, font } }) => ({
  CalendarDay: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: font.size,
    textAlign: 'center',

    ':active': {
      outline: 0,
    },
  },

  CalendarDay__defaultCursor: {
    cursor: 'default',
  },

  CalendarDay__default: {
    border: `1px solid ${color.core.borderLight}`,
    color: color.text,
    background: color.background,

    ':hover': {
      background: color.core.borderLight,
      border: `1px solid ${color.core.borderLight}`,
      color: 'inherit',
    },
  },

  CalendarDay__hovered_offset: {
    background: color.core.borderBright,
    border: `1px double ${color.core.borderLight}`,
    color: 'inherit',
  },

  CalendarDay__outside: {
    border: 0,
    background: color.outside.backgroundColor,
    color: color.outside.color,

    ':hover': {
      border: 0,
    },
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
    border: `1px double ${color.selectedSpan.borderColor}`,
    color: color.selectedSpan.color,

    ':hover': {
      background: color.selectedSpan.backgroundColor_hover,
      border: `1px double ${color.selectedSpan.borderColor}`,
      color: color.selectedSpan.color_active,
    },

    ':active': {
      background: color.selectedSpan.backgroundColor_active,
      border: `1px double ${color.selectedSpan.borderColor}`,
      color: color.selectedSpan.color_active,
    },
  },

  CalendarDay__selected: {
    background: color.selected.backgroundColor,
    border: `1px double ${color.selected.borderColor}`,
    color: color.selected.color,

    ':hover': {
      background: color.selected.backgroundColor_hover,
      border: `1px double ${color.selected.borderColor}`,
      color: color.selected.color_active,
    },

    ':active': {
      background: color.selected.backgroundColor_active,
      border: `1px double ${color.selected.borderColor}`,
      color: color.selected.color_active,
    },
  },

  CalendarDay__hovered_span: {
    background: color.hoveredSpan.backgroundColor,
    border: `1px double ${color.hoveredSpan.borderColor}`,
    color: color.hoveredSpan.color,

    ':hover': {
      background: color.hoveredSpan.backgroundColor_hover,
      border: `1px double ${color.hoveredSpan.borderColor}`,
      color: color.hoveredSpan.color_active,
    },

    ':active': {
      background: color.hoveredSpan.backgroundColor_active,
      border: `1px double ${color.hoveredSpan.borderColor}`,
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

  CalendarDay__hovered_start_first_possible_end: {
    background: color.core.borderLighter,
    border: `1px double ${color.core.borderLighter}`,
  },

  CalendarDay__hovered_start_blocked_min_nights: {
    background: color.core.borderLighter,
    border: `1px double ${color.core.borderLight}`,
  },

  CalendarDay__selected_start: {},
  CalendarDay__selected_end: {},
  CalendarDay__today: {},
  CalendarDay__firstDayOfWeek: {},
  CalendarDay__lastDayOfWeek: {},
  CalendarDay__after_hovered_start: {},
  CalendarDay__before_hovered_end: {},
  CalendarDay__no_selected_start_before_selected_end: {},
  CalendarDay__selected_start_in_hovered_span: {},
  CalendarDay__selected_end_in_hovered_span: {},
  CalendarDay__selected_start_no_selected_end: {},
  CalendarDay__selected_end_no_selected_start: {},
}), { pureComponent: typeof React.PureComponent !== 'undefined' })(CalendarDay);
