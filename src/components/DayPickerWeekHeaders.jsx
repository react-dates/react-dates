import React, { PropTypes } from 'react';
import { css, withStyles } from 'react-with-styles';
import moment from 'moment';

import { HORIZONTAL_ORIENTATION } from '../../constants';

import OrientationShape from '../shapes/OrientationShape';

const propTypes = {
  orientation: OrientationShape,
  numberOfMonths: PropTypes.number,
  calendarMonthWidth: PropTypes.number,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  orientation: HORIZONTAL_ORIENTATION,
  numberOfMonths: 1,
  calendarMonthWidth: 0,
};

function DayPickerWeekHeaders({ orientation, numberOfMonths, calendarMonthWidth, styles }) {
  const isHorizontal = orientation === HORIZONTAL_ORIENTATION;
  const isVertical = !isHorizontal;

  const numOfWeekHeaders = isHorizontal ? numberOfMonths : 1;
  const weekHeaders = [];
  for (let i = 0; i < numOfWeekHeaders; i++) {
    const header = [];
    for (let j = 0; j < 7; j++) {
      header.push(
        <li key={`weekday-${j}`} {...css(styles.week_li)}>
          <small>{moment().weekday(j).format('dd')}</small>
        </li>
      );
    }

    weekHeaders.push((
      <div
        key={`week-${i}`}
        {...css(
          styles.week,
          isHorizontal && styles.week_horizontal,
          isVertical && styles.week_vertical,
          isHorizontal && {
            width: calendarMonthWidth + 9,
            left: i * calendarMonthWidth,
          },
          isVertical && {
            marginLeft: -calendarMonthWidth / 2,
            width: calendarMonthWidth,
          }
        )}
      >
        <ul {...css(styles.week_ul)}>
          {header}
        </ul>
      </div>
    ));
  }

  return (
    <div {...css(styles.component, isHorizontal && styles.component_horizontal)}>
      {weekHeaders}
    </div>
  );
}

DayPickerWeekHeaders.propTypes = propTypes;
DayPickerWeekHeaders.defaultProps = defaultProps;

export default withStyles(({ reactDates }) => ({
  component: {
    position: 'relative',
  },

  week: {
    color: reactDates.color.week_header_color,
    position: 'absolute',
    top: 62,
    zIndex: 2,
    textAlign: 'left',
  },

  week_horizontal: {
    padding: '0 13px 0 22px',
  },

  week_vertical: {
    padding: '0 13px',
    left: '50%',
  },

  week_ul: {
    listStyle: 'none',
    margin: '1px 0',
    paddingLeft: 0,
  },

  week_li: {
    display: 'inline-block',
    width: 39,
    textAlign: 'center',
  },
}))(DayPickerWeekHeaders);
