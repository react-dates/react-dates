import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { css, withStyles } from 'react-with-styles';
import moment from 'moment';

import CalendarDay from './CalendarDay';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import getTransformStyles from '../utils/getTransformStyles';

import OrientationShape from '../shapes/OrientationShape';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

const propTypes = {
  month: momentPropTypes.momentObj,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: OrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseDown: PropTypes.func,
  onDayMouseUp: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onDayTouchStart: PropTypes.func,
  onDayTouchEnd: PropTypes.func,
  onDayTouchTap: PropTypes.func,
  styles: PropTypes.object.isRequired,

  // i18n
  monthFormat: PropTypes.string,

  dayHeight: PropTypes.number,
  translationValue: PropTypes.number,
};

const defaultProps = {
  month: moment(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick() {},
  onDayMouseDown() {},
  onDayMouseUp() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onDayTouchStart() {},
  onDayTouchEnd() {},
  onDayTouchTap() {},

  // i18n
  monthFormat: 'MMMM YYYY', // english locale

  dayHeight: 0,
  translationValue: 0,
};

export function getModifiersForDay(modifiers, day) {
  return day ? Object.keys(modifiers).filter(key => modifiers[key](day)) : [];
}

function CalendarMonth(props) {
  const {
    month,
    monthFormat,
    orientation,
    isVisible,
    enableOutsideDays,
    modifiers,
    onDayClick,
    onDayMouseDown,
    onDayMouseUp,
    onDayMouseEnter,
    onDayMouseLeave,
    onDayTouchStart,
    onDayTouchEnd,
    onDayTouchTap,
    styles,
    dayHeight,
    translationValue,
  } = props;
  const monthTitle = month.format(monthFormat);

  return (
    <div
      {...css(
        styles.component,
        isVisible && styles.component_visible,
        orientation === HORIZONTAL_ORIENTATION && styles.component_horizontal,
        orientation === VERTICAL_ORIENTATION && styles.component_vertical,
        // The first CalendarMonth is always positioned absolute at top: 0 or left: 0
        // so we need to transform it to the appropriate location before the animation.
        // This behavior is because we would otherwise need a double-render in order to
        // adjust the container position once we had the height the first calendar
        // (ie first draw all the calendar, then in a second render, use the first calendar's
        // height to position the container). Variable calendar heights, amirite? <3 Maja
        translationValue && styles.component_absolute,
        // translation should be contingent on vertical v. horizontal
        getTransformStyles(`translateX(${translationValue}px)`),
      )}
    >
      <table {...css(styles.table)}>
        <caption {...css(styles.caption)}>
          <strong>{monthTitle}</strong>
        </caption>

        <tbody>
          {getCalendarMonthWeeks(month, enableOutsideDays).map((week, i) =>
            <tr key={i}>
              {week.map((day, j) => {
                const modifiersForDay = getModifiersForDay(modifiers, day);

                const isOutsideDay = !day || day.month() !== month.month();
                const dayStyles = css(
                  styles.day,
                  isOutsideDay && styles.day_outside,
                  modifiersForDay.map(mod => styles[`day_${mod}`]),
                  {
                    height: dayHeight,
                    width: dayHeight + 1,
                  }
                );

                return (
                  <td {...dayStyles} key={j}>
                    {day &&
                      <CalendarDay
                        day={day}
                        modifiers={modifiersForDay}
                        onDayMouseEnter={onDayMouseEnter}
                        onDayMouseLeave={onDayMouseLeave}
                        onDayMouseDown={onDayMouseDown}
                        onDayMouseUp={onDayMouseUp}
                        onDayClick={onDayClick}
                        onDayTouchStart={onDayTouchStart}
                        onDayTouchEnd={onDayTouchEnd}
                        onDayTouchTap={onDayTouchTap}
                      />
                    }
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

export default withStyles(({ reactDates }) => ({
  component: {
    textAlign: 'center',
    padding: '0 13px',
    verticalAlign: 'top',
    position: 'absolute',
    zIndex: -1,
    opacity: 0,
  },

  component_absolute: {
    position: 'absolute',
  },

  component_visible: {
    position: 'relative',
    zIndex: 0,
    opacity: 1,
  },

  component_horizontal: {
    display: 'inline-block',
    minHeight: '100%',
  },

  component_vertical: {
    display: 'block',
  },

  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },

  caption: {
    color: reactDates.color.caption,
    marginTop: 7,
    fontSize: 18,
    padding: '15px 0 35px',
    textAlign: 'center',
    marginBottom: 2,
  },

  day: {
    border: `1px solid ${reactDates.color.border_day}`,
    padding: 0,
    boxSizing: 'border-box',
    color: reactDates.color.text_day,
    cursor: 'pointer',

    ':active': {
      background: reactDates.color.background_day_active,
    },
  },

  day_outside: {
    border: 0,
    cursor: 'default',

    ':active': {
      background: reactDates.color.white,
    },
  },

  day_hovered: {
    background: reactDates.color.border_day,
    border: `1px double ${reactDates.color.border_day_hovered}`,
    color: 'inherit',
  },

  'day_blocked-minimum-nights': {
//   color: $react-dates-color-gray-lighter;
//   background: $react-dates-color-white;
//   border: 1px solid lighten($react-dates-color-border-light, 3);
//   cursor: default;

//   &:active {
//     background: $react-dates-color-white;
//   }
  },

  'day_selected-span': {
//   background: $react-dates-color-primary-shade-2;
//   border: 1px double $react-dates-color-primary-shade-1;
//   color: $react-dates-color-white;

//   &.CalendarMonth__day--hovered,
//   &:active {
//     background: $react-dates-color-primary-shade-1;
//     border: 1px double $react-dates-color-primary;
//   }

//   &.CalendarMonth__day--last-in-range {
//     border-right: $react-dates-color-primary;
//   }
  },

  'day_hovered-span': {
    background: reactDates.color.day_hoveredspan_background,
    border: `1px solid ${reactDates.color.day_hoveredspan_border}`,
    color: reactDates.color.day_hoveredspan_color,
  },

  day_selected: {
    background: reactDates.color.day_selected_background,
    border: `1px solid ${reactDates.color.day_selected_border}`,
    color: reactDates.color.day_selected_color,

    ':active': {
      background: reactDates.color.day_selected_background,
    },
  },

  'day_blocked-calendar': {
    background: reactDates.color.day_blocked_calendar_background,
    border: `1px solid ${reactDates.color.day_blocked_calendar_border}`,
    color: reactDates.color.day_blocked_calendar_color,
    cursor: 'default',

    ':active': {
      background: reactDates.color.day_blocked_calendar_background,
    },
  },

  'day_blocked-out-of-range': {
    color: reactDates.color.day_blocked_outsiderange_color,
    background: reactDates.color.white,
    border: `1px solid ${reactDates.color.day_blocked_outsiderange_border}`,
    cursor: 'default',

    ':active': {
      background: reactDates.color.white,
    },
  },

}))(CalendarMonth);
