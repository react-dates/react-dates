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

function getStyles(stylesObj, isHovered) {
  if (!stylesObj) return null;

  const { hover } = stylesObj;
  if (isHovered && hover) {
    return hover;
  }

  return stylesObj;
}

const DayStyleShape = PropTypes.shape({
  background: PropTypes.string,
  border: PropTypes.string,
  color: PropTypes.string,

  hover: PropTypes.shape({
    background: PropTypes.string,
    border: PropTypes.string,
    color: PropTypes.string,
  }),
});

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
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,

  // style overrides
  defaultStyles: DayStyleShape,
  outsideStyles: DayStyleShape,
  todayStyles: DayStyleShape,
  highlightedCalendarStyles: DayStyleShape,
  blockedMinNightsStyles: DayStyleShape,
  blockedCalendarStyles: DayStyleShape,
  blockedOutOfRangeStyles: DayStyleShape,
  hoveredSpanStyles: DayStyleShape,
  selectedSpanStyles: DayStyleShape,
  lastInRangeStyles: DayStyleShape,
  selectedStartStyles: DayStyleShape,
  selectedEndStyles: DayStyleShape,
  selectedStyles: DayStyleShape,
  afterHoveredStartStyles: DayStyleShape,

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

class CustomizableCalendarDay extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isHovered: false,
    };

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
    this.setState({ isHovered: true });
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
    this.setState({ isHovered: false });
    onDayMouseLeave(day, e);
  }

  onKeyDown(day, e) {
    const {
      onDayClick,
    } = this.props;

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
      tabIndex,
      renderDayContents,
      styles,
      phrases: {
        chooseAvailableDate,
        dateIsUnavailable,
      },

      defaultStyles: defaultStylesWithHover,
      outsideStyles: outsideStylesWithHover,
      todayStyles: todayStylesWithHover,
      highlightedCalendarStyles: highlightedCalendarStylesWithHover,
      blockedMinNightsStyles: blockedMinNightsStylesWithHover,
      blockedCalendarStyles: blockedCalendarStylesWithHover,
      blockedOutOfRangeStyles: blockedOutOfRangeStylesWithHover,
      hoveredSpanStyles: hoveredSpanStylesWithHover,
      selectedSpanStyles: selectedSpanStylesWithHover,
      lastInRangeStyles: lastInRangeStylesWithHover,
      selectedStartStyles: selectedStartStylesWithHover,
      selectedEndStyles: selectedEndStylesWithHover,
      selectedStyles: selectedStylesWithHover,
      afterHoveredStartStyles: afterHoveredStartStylesWithHover,
    } = this.props;

    const { isHovered } = this.state;

    if (!day) return <td />;

    const formattedDate = { date: day.format(ariaLabelFormat) };

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

    const defaultStyles = getStyles(defaultStylesWithHover, isHovered);
    const outsideStyles = getStyles(outsideStylesWithHover, isHovered);
    const todayStyles = getStyles(todayStylesWithHover, isHovered);
    const highlightedCalendarStyles = getStyles(highlightedCalendarStylesWithHover, isHovered);
    const blockedMinNightsStyles = getStyles(blockedMinNightsStylesWithHover, isHovered);
    const blockedCalendarStyles = getStyles(blockedCalendarStylesWithHover, isHovered);
    const blockedOutOfRangeStyles = getStyles(blockedOutOfRangeStylesWithHover, isHovered);
    const hoveredSpanStyles = getStyles(hoveredSpanStylesWithHover, isHovered);
    const selectedSpanStyles = getStyles(selectedSpanStylesWithHover, isHovered);
    const lastInRangeStyles = getStyles(lastInRangeStylesWithHover, isHovered);
    const selectedStartStyles = getStyles(selectedStartStylesWithHover, isHovered);
    const selectedEndStyles = getStyles(selectedEndStylesWithHover, isHovered);
    const selectedStyles = getStyles(selectedStylesWithHover, isHovered);
    const afterHoveredStartStyles = getStyles(afterHoveredStartStylesWithHover, isHovered);

    const hasCustomSelectedStyles =
      defaultStyles ||
      (selected && selectedStyles) ||
      (modifiers.has('selected-start') && selectedStartStyles) ||
      (modifiers.has('selected-end') && selectedEndStyles);
    const hasCustomHoveredStyles =
      (modifiers.has('hovered-span') && hoveredSpanStyles) ||
      (modifiers.has('after-hovered-start') && afterHoveredStartStyles);
    const hasCustomStyles =
      (isOutsideDay && outsideStyles) ||
      (modifiers.has('today') && todayStyles) ||
      (modifiers.has('highlighted-calendar') && highlightedCalendarStyles) ||
      (modifiers.has('blocked-minimum-nights') && blockedMinNightsStyles) ||
      (modifiers.has('blocked-calendar') && blockedCalendarStyles) ||
      (modifiers.has('last-in-range') && lastInRangeStyles) ||
      (modifiers.has('selected-span') && selectedSpanStyles) ||
      (isOutsideRange && blockedOutOfRangeStyles) ||
      hasCustomSelectedStyles ||
      hasCustomHoveredStyles;

    return (
      <td
        {...css(
          styles.CalendarDay,
          useDefaultCursor && styles.CalendarDay__defaultCursor,
          daySizeStyles,
          ...hasCustomStyles && [
            defaultStyles,
            isOutsideDay && outsideStyles,
            modifiers.has('today') && todayStyles,
            modifiers.has('highlighted-calendar') && highlightedCalendarStyles,
            modifiers.has('blocked-minimum-nights') && blockedMinNightsStyles,
            modifiers.has('blocked-calendar') && blockedCalendarStyles,
            hoveredSpan && hoveredSpanStyles,
            modifiers.has('after-hovered-start') && afterHoveredStartStyles,
            modifiers.has('selected-span') && selectedSpanStyles,
            modifiers.has('last-in-range') && lastInRangeStyles,
            modifiers.has('selected-start') && selectedStartStyles,
            modifiers.has('selected-end') && selectedEndStyles,
            selected && selectedStyles,
            isOutsideRange && blockedOutOfRangeStyles,
          ],

          ...!hasCustomStyles && [
            styles.CalendarDay__default,
            isOutsideDay && styles.CalendarDay__outside,
            modifiers.has('today') && styles.CalendarDay__today,
            modifiers.has('highlighted-calendar') && styles.CalendarDay__highlighted_calendar,
            modifiers.has('blocked-minimum-nights') && styles.CalendarDay__blocked_minimum_nights,
            modifiers.has('blocked-calendar') && styles.CalendarDay__blocked_calendar,
            hoveredSpan && styles.CalendarDay__hovered_span,
            modifiers.has('selected-span') && styles.CalendarDay__selected_span,
            modifiers.has('last-in-range') && styles.CalendarDay__last_in_range,
            modifiers.has('selected-start') && styles.CalendarDay__selected_start,
            modifiers.has('selected-end') && styles.CalendarDay__selected_end,
            isOutsideRange && (blockedOutOfRangeStyles || styles.CalendarDay__blocked_out_of_range),
          ],
        )}
        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
        ref={this.setButtonRef}
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

CustomizableCalendarDay.propTypes = propTypes;
CustomizableCalendarDay.defaultProps = defaultProps;

export { CustomizableCalendarDay as PureCustomizableCalendarDay };
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
      border: `1px double ${color.core.borderLight}`,
      color: 'inherit',
    },
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
  CalendarDay__today: {},
}))(CustomizableCalendarDay);
