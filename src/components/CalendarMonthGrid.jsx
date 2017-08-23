import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';
import { addEventListener, removeEventListener } from 'consolidated-events';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarMonth from './CalendarMonth';

import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import toISOMonthString from '../utils/toISOMonthString';
import isAfterDay from '../utils/isAfterDay';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../../constants';

const propTypes = forbidExtraProps({
  enableOutsideDays: PropTypes.bool,
  firstVisibleMonthIndex: PropTypes.number,
  initialMonth: momentPropTypes.momentObj,
  isAnimating: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  modifiers: PropTypes.object,
  orientation: ScrollableOrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthTransitionEnd: PropTypes.func,
  renderMonth: PropTypes.func,
  renderDay: PropTypes.func,
  transformValue: PropTypes.string,
  daySize: nonNegativeInteger,
  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day
  firstDayOfWeek: DayOfWeekShape,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
});

const defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  initialMonth: moment(),
  isAnimating: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onMonthTransitionEnd() {},
  renderMonth: null,
  renderDay: null,
  transformValue: 'none',
  daySize: DAY_SIZE,
  focusedDate: null,
  isFocused: false,
  firstDayOfWeek: null,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
};

function getMonths(initialMonth, numberOfMonths, withoutTransitionMonths) {
  let month = initialMonth.clone();
  if (!withoutTransitionMonths) month = month.subtract(1, 'month');

  const months = [];
  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = month.clone().add(1, 'month');
  }

  return months;
}

export default class CalendarMonthGrid extends React.Component {
  constructor(props) {
    super(props);
    const withoutTransitionMonths = props.orientation === VERTICAL_SCROLLABLE;
    this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths),
    };

    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  componentDidMount() {
    this.eventHandle = addEventListener(
      this.container,
      'transitionend',
      this.onTransitionEnd,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { initialMonth, numberOfMonths, orientation } = nextProps;
    const { months } = this.state;

    const hasMonthChanged = !this.props.initialMonth.isSame(initialMonth, 'month');
    const hasNumberOfMonthsChanged = this.props.numberOfMonths !== numberOfMonths;
    let newMonths = months;

    if (hasMonthChanged && !hasNumberOfMonthsChanged) {
      if (isAfterDay(initialMonth, this.props.initialMonth)) {
        newMonths = months.slice(1);
        newMonths.push(months[months.length - 1].clone().add(1, 'month'));
      } else {
        newMonths = months.slice(0, months.length - 1);
        newMonths.unshift(months[0].clone().subtract(1, 'month'));
      }
    }

    if (hasNumberOfMonthsChanged) {
      const withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
      newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
    }

    this.setState({
      months: newMonths,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    const { isAnimating, onMonthTransitionEnd } = this.props;

    // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete
    if (!this.isTransitionEndSupported && isAnimating) {
      onMonthTransitionEnd();
    }
  }

  componentWillUnmount() {
    removeEventListener(this.eventHandle);
  }

  onTransitionEnd() {
    this.props.onMonthTransitionEnd();
  }

  setContainerRef(ref) {
    this.container = ref;
  }

  render() {
    const {
      enableOutsideDays,
      firstVisibleMonthIndex,
      isAnimating,
      modifiers,
      numberOfMonths,
      monthFormat,
      orientation,
      transformValue,
      daySize,
      onDayMouseEnter,
      onDayMouseLeave,
      onDayClick,
      renderMonth,
      renderDay,
      onMonthTransitionEnd,
      firstDayOfWeek,
      focusedDate,
      isFocused,
      phrases,
    } = this.props;

    const { months } = this.state;
    const isVertical = orientation === VERTICAL_ORIENTATION;
    const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
    const isHorizontal = orientation === HORIZONTAL_ORIENTATION;

    const className = cx('CalendarMonthGrid', {
      'CalendarMonthGrid--horizontal': isHorizontal,
      'CalendarMonthGrid--vertical': isVertical,
      'CalendarMonthGrid--vertical-scrollable': isVerticalScrollable,
      'CalendarMonthGrid--animating': isAnimating,
    });

    const calendarMonthWidth = getCalendarMonthWidth(daySize);

    const width = isVertical || isVerticalScrollable ?
      calendarMonthWidth :
      (numberOfMonths + 2) * calendarMonthWidth;

    const style = {
      ...getTransformStyles(transformValue),
      width,
    };

    return (
      <div
        ref={this.setContainerRef}
        className={className}
        style={style}
        onTransitionEnd={onMonthTransitionEnd}
      >
        {months.map((month, i) => {
          const isVisible =
            (i >= firstVisibleMonthIndex) && (i < firstVisibleMonthIndex + numberOfMonths);
          const monthString = toISOMonthString(month);
          return (
            <CalendarMonth
              key={monthString}
              month={month}
              isVisible={isVisible}
              enableOutsideDays={enableOutsideDays}
              modifiers={modifiers[monthString]}
              monthFormat={monthFormat}
              orientation={orientation}
              onDayMouseEnter={onDayMouseEnter}
              onDayMouseLeave={onDayMouseLeave}
              onDayClick={onDayClick}
              renderMonth={renderMonth}
              renderDay={renderDay}
              firstDayOfWeek={firstDayOfWeek}
              daySize={daySize}
              focusedDate={isVisible ? focusedDate : null}
              isFocused={isFocused}
              phrases={phrases}
            />
          );
        })}
      </div>
    );
  }
}

CalendarMonthGrid.propTypes = propTypes;
CalendarMonthGrid.defaultProps = defaultProps;
