import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { css, withStyles } from 'react-with-styles';
import moment from 'moment';

import CalendarMonth from './CalendarMonth';

import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';

import OrientationShape from '../shapes/OrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  PREV_TRANSITION,
  NEXT_TRANSITION,
} from '../../constants';

const propTypes = {
  enableOutsideDays: PropTypes.bool,
  firstVisibleMonthIndex: PropTypes.number,
  initialMonth: momentPropTypes.momentObj,
  monthTransition: PropTypes.oneOf([PREV_TRANSITION, NEXT_TRANSITION]),
  numberOfMonths: PropTypes.number,
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
  onMonthTransitionEnd: PropTypes.func,
  transformValue: PropTypes.string,

  // i18n
  monthFormat: PropTypes.string,

  dayHeight: PropTypes.number,
  monthHorizontalPadding: PropTypes.number,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  initialMonth: moment(),
  monthTransition: null,
  numberOfMonths: 1,
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
  onMonthTransitionEnd() {},
  transform: 'none',

  // i18n
  monthFormat: 'MMMM YYYY', // english locale

  dayHeight: 0,
  monthHorizontalPadding: 13,
};

class CalendarMonthGrid extends React.Component {
  constructor(props) {
    super(props);

    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.containerRef.addEventListener('transitionend', this.onTransitionEnd);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    const { monthTransition, onMonthTransitionEnd } = this.props;

    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete
    if (!this.isTransitionEndSupported && monthTransition) {
      onMonthTransitionEnd();
    }
  }

  componentWillUnmount() {
    this.containerRef.removeEventListener('transitionend', this.onTransitionEnd);
  }

  onTransitionEnd() {
    this.props.onMonthTransitionEnd();
  }

  render() {
    const {
      enableOutsideDays,
      firstVisibleMonthIndex,
      initialMonth,
      monthTransition,
      modifiers,
      numberOfMonths,
      monthFormat,
      orientation,
      transformValue,
      onDayMouseEnter,
      onDayMouseLeave,
      onDayMouseDown,
      onDayMouseUp,
      onDayClick,
      onDayTouchStart,
      onDayTouchEnd,
      onDayTouchTap,
      onMonthTransitionEnd,
      dayHeight,
      monthHorizontalPadding,
      styles,
    } = this.props;

    let month = initialMonth.clone().subtract(1, 'month');

    const months = [];
    for (let i = 0; i < numberOfMonths + 2; i++) {
      const isVisible =
        (i >= firstVisibleMonthIndex && i < firstVisibleMonthIndex + numberOfMonths) ||
        (monthTransition === PREV_TRANSITION && i < firstVisibleMonthIndex) ||
        (monthTransition === NEXT_TRANSITION && i >= firstVisibleMonthIndex + numberOfMonths);

      let translationValue = 0;
      if (i < firstVisibleMonthIndex && monthTransition === PREV_TRANSITION) {
        const monthWidthSansPadding = (7 * (dayHeight + 1)) + 1;
        translationValue = -(monthWidthSansPadding + (2 * monthHorizontalPadding));
      }

      months.push(
        <CalendarMonth
          ref={`calendarMonth_${i}`}
          key={month.format('MM-YY')}
          month={month}
          isVisible={isVisible}
          enableOutsideDays={enableOutsideDays}
          modifiers={modifiers}
          monthFormat={monthFormat}
          orientation={orientation}
          onDayMouseEnter={onDayMouseEnter}
          onDayMouseLeave={onDayMouseLeave}
          onDayMouseDown={onDayMouseDown}
          onDayMouseUp={onDayMouseUp}
          onDayClick={onDayClick}
          onDayTouchStart={onDayTouchStart}
          onDayTouchEnd={onDayTouchEnd}
          onDayTouchTap={onDayTouchTap}

          dayHeight={dayHeight}
          translationValue={translationValue}
        />
      );
      month = month.clone().add(1, 'month');
    }

    // let's turn this calculation into a util method
    const monthWidthSansPadding = (7 * (dayHeight + 1)) + 1;
    const calendarMonthWidth = monthWidthSansPadding + (2 * monthHorizontalPadding);

    const isHorizontal = orientation === HORIZONTAL_ORIENTATION;
    const isVertical = orientation === VERTICAL_ORIENTATION;

    return (
      <div
        ref={ref => { this.containerRef = ref; }}
        {...css(
          styles.container,
          isHorizontal && styles.container_horizontal,
          isVertical && styles.container_vertical,
          !!monthTransition && styles.container_animating,
          getTransformStyles(transformValue),
          {
            width: isHorizontal ? 4 * calendarMonthWidth : calendarMonthWidth,
          }
        )}
        onTransitionEnd={onMonthTransitionEnd}
      >
        {months}
      </div>
    );
  }
}

CalendarMonthGrid.propTypes = propTypes;
CalendarMonthGrid.defaultProps = defaultProps;

export default withStyles(({ reactDates }) => ({
  container: {
    background: reactDates.color.white,
    zIndex: 0,
  },

  container_horizontal: {
    position: 'absolute',
    left: 9,
  },

  container_vertical: {
    margin: '0 auto',
  },

  container_animating: {
    transition: 'transform 0.2s ease-in-out',
    zIndex: 1,
  },
}))(CalendarMonthGrid);
