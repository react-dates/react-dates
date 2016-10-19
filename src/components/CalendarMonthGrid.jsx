import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import cx from 'classnames';

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
};

export default class CalendarMonthGrid extends React.Component {
  constructor(props) {
    super(props);

    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.container = ReactDOM.findDOMNode(this.containerRef);
    this.container.addEventListener('transitionend', this.onTransitionEnd);
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
    this.container.removeEventListener('transitionend', this.onTransitionEnd);
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
        translationValue = -(monthWidthSansPadding + 26);
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

    const className = cx('CalendarMonthGrid', {
      'CalendarMonthGrid--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'CalendarMonthGrid--vertical': orientation === VERTICAL_ORIENTATION,
      'CalendarMonthGrid--animating': !!monthTransition,
    });

    return (
      <div
        ref={ref => { this.containerRef = ref; }}
        className={className}
        style={getTransformStyles(transformValue)}
        onTransitionEnd={onMonthTransitionEnd}
      >
        {months}
      </div>
    );
  }
}

CalendarMonthGrid.propTypes = propTypes;
CalendarMonthGrid.defaultProps = defaultProps;
