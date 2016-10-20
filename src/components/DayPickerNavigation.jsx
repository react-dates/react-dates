import React, { PropTypes } from 'react';
import { css, withStyles } from 'react-with-styles';

import { HORIZONTAL_ORIENTATION } from '../../constants';

import OrientationShape from '../shapes/OrientationShape';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';


const propTypes = {
  orientation: OrientationShape,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  orientation: HORIZONTAL_ORIENTATION,
  onPrevMonthClick() {},
  onNextMonthClick() {},
};

function DayPickerNavigation({ orientation, onPrevMonthClick, onNextMonthClick, styles }) {
  const isHorizontal = orientation === HORIZONTAL_ORIENTATION;
  const isVertical = !isHorizontal;

  return (
    <div
      {...css(
        isHorizontal && styles.container_horizontal,
        isVertical && styles.container_vertical
      )}
    >
      <span
        {...css(
          styles.nav,
          isHorizontal && styles.nav_horizontal,
          isHorizontal && styles.nav_prev_horizontal,
          isVertical && styles.nav_vertical
        )}
        onClick={onPrevMonthClick}
      >
        {isVertical && <ChevronUp {...css(styles.svg_vertical)} />}
        {isHorizontal && <LeftArrow {...css(styles.svg_horizontal)} />}
      </span>

      <span
        {...css(
          styles.nav,
          isHorizontal && styles.nav_horizontal,
          isHorizontal && styles.nav_next_horizontal,
          isVertical && styles.nav_vertical,
          isVertical && styles.nav_next_vertical
        )}
        onClick={onNextMonthClick}
      >
        {isVertical && <ChevronDown {...css(styles.svg_vertical)} />}
        {isHorizontal && <RightArrow {...css(styles.svg_horizontal)} />}
      </span>
    </div>
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;

export default withStyles(({ reactDates }) => ({
  container_horizontal: {
    position: 'relative',
  },

  container_vertical: {
    background: reactDates.color.nav_background,
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 52,
    width: '100%',
    zIndex: 2,
  },

  nav: {
    background: reactDates.color.nav_background,
    border: `1px solid ${reactDates.color.nav_border}`,
    cursor: 'pointer',
    lineHeight: 0.78,
    userSelect: 'none',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',

    ':focus': {
      border: `1px solid ${reactDates.color.nav_border_focus}`,
    },

    ':hover': {
      border: `1px solid ${reactDates.color.nav_border_focus}`,
    },

    ':active': {
      background: reactDates.color.nav_background_active,
    },
  },

  nav_horizontal: {
    borderRadius: 3,
    padding: '6px 9px',
    top: 18,
    zIndex: 2,
    position: 'absolute',
  },

  nav_vertical: {
    textAlign: 'center',
    fontSize: '2.5em',
    padding: 5,
    display: 'inline-block',
    position: 'relative',
    height: '100%',
    width: '50%',
  },

  nav_prev_horizontal: {
    left: 22,
  },

  nav_next_horizontal: {
    right: 22,
  },

  nav_next_vertical: {
    borderLeft: 0,
  },

  svg_horizontal: {
    height: 19,
    width: 19,
    fill: reactDates.color.nav_horizontal_color,
  },

  svg_vertical: {
    height: 42,
    width: 42,
    fill: reactDates.color.nav_vertical_color,
  },
}))(DayPickerNavigation);
