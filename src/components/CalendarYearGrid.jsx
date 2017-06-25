import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import moment from 'moment';
import cx from 'classnames';
import { addEventListener, removeEventListener } from 'consolidated-events';

import { CalendarMonthPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarYear from './CalendarYear';

import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarYearWidth from '../utils/getCalendarYearWidth';
import toISOYearString from '../utils/toISOYearString';
import isAfterMonth from '../utils/isAfterMonth';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  MONTH_WIDTH_SIZE,
  MONTH_HEIGHT_SIZE,
} from '../../constants';

const propTypes = forbidExtraProps({
  firstVisibleYearIndex: PropTypes.number,
  initialYear: momentPropTypes.momentObj,
  isAnimating: PropTypes.bool,
  numberOfYears: PropTypes.number,
  modifiers: PropTypes.object,
  orientation: ScrollableOrientationShape,
  onMonthClick: PropTypes.func,
  onMonthMouseEnter: PropTypes.func,
  onMonthMouseLeave: PropTypes.func,
  onYearTransitionEnd: PropTypes.func,
  renderYear: PropTypes.func,
  renderMonth: PropTypes.func,
  transformValue: PropTypes.string,
  monthWidthSize: nonNegativeInteger,
  monthHeightSize: nonNegativeInteger,
  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day

  // i18n
  yearFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarMonthPhrases)),
});

const defaultProps = {
  firstVisibleYearIndex: 0,
  initialYear: moment(),
  isAnimating: false,
  numberOfYears: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onMonthClick() {},
  onMonthMouseEnter() {},
  onMonthMouseLeave() {},
  onYearTransitionEnd() {},
  renderYear: null,
  renderMonth: null,
  transformValue: 'none',
  monthWidthSize: MONTH_WIDTH_SIZE,
  monthHeightSize: MONTH_HEIGHT_SIZE,
  focusedDate: null,
  isFocused: false,

  // i18n
  yearFormat: 'YYYY', // english locale
  phrases: CalendarMonthPhrases,
};

function getYears(initialYear, numberOfYears, withoutTransitionYears) {
  let year = initialYear.clone();
  if (!withoutTransitionYears) year = year.subtract(1, 'year');

  const years = [];
  for (let i = 0; i < (withoutTransitionYears ? numberOfYears : numberOfYears + 2); i += 1) {
    years.push(year);
    year = year.clone().add(1, 'year');
  }

  return years;
}

export default class CalendarYearGrid extends React.Component {
  constructor(props) {
    super(props);
    const withoutTransitionYears = props.orientation === VERTICAL_SCROLLABLE;
    this.state = {
      years: getYears(props.initialYear, props.numberOfYears, withoutTransitionYears),
    };

    this.isTransitionEndSupported = isTransitionEndSupported();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.eventHandle = addEventListener(
      this.container,
      'transitionend',
      this.onTransitionEnd,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { initialYear, numberOfYears, orientation } = nextProps;
    const { years } = this.state;

    const hasYearChanged = !this.props.initialYear.isSame(initialYear, 'year');
    const hasNumberOfYearsChanged = this.props.numberOfYears !== numberOfYears;
    let newYears = years;

    if (hasYearChanged && !hasNumberOfYearsChanged) {
      if (isAfterMonth(initialYear, this.props.initialYear)) {
        newYears = years.slice(1);
        newYears.push(years[years.length - 1].clone().add(1, 'year'));
      } else {
        newYears = years.slice(0, years.length - 1);
        newYears.unshift(years[0].clone().subtract(1, 'year'));
      }
    }

    if (hasNumberOfYearsChanged) {
      const withoutTransitionYears = orientation === VERTICAL_SCROLLABLE;
      newYears = getYears(initialYear, numberOfYears, withoutTransitionYears);
    }

    this.setState({
      years: newYears,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    const { isAnimating, onYearTransitionEnd } = this.props;

    // For IE9, immediately call onYearTransitionEnd instead of
    // waiting for the animation to complete
    if (!this.isTransitionEndSupported && isAnimating) {
      onYearTransitionEnd();
    }
  }

  componentWillUnmount() {
    removeEventListener(this.eventHandle);
  }

  onTransitionEnd() {
    this.props.onYearTransitionEnd();
  }

  render() {
    const {
      firstVisibleYearIndex,
      isAnimating,
      modifiers,
      numberOfYears,
      yearFormat,
      orientation,
      transformValue,
      monthWidthSize,
      monthHeightSize,
      onMonthMouseEnter,
      onMonthMouseLeave,
      onMonthClick,
      renderYear,
      renderMonth,
      onYearTransitionEnd,
      focusedDate,
      isFocused,
      phrases,
    } = this.props;

    const { years } = this.state;
    const isVertical = orientation === VERTICAL_ORIENTATION;
    const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
    const isHorizontal = orientation === HORIZONTAL_ORIENTATION;

    const className = cx('CalendarYearGrid', {
      'CalendarYearGrid--horizontal': isHorizontal,
      'CalendarYearGrid--vertical': isVertical,
      'CalendarYearGrid--vertical-scrollable': isVerticalScrollable,
      'CalendarYearGrid--animating': isAnimating,
    });

    const calendarYearWidth = getCalendarYearWidth(monthWidthSize);

    const width = isVertical || isVerticalScrollable ?
      calendarYearWidth :
      (numberOfYears + 2) * calendarYearWidth;

    const style = {
      ...getTransformStyles(transformValue),
      width,
    };

    return (
      <div
        ref={(ref) => { this.container = ref; }}
        className={className}
        style={style}
        onTransitionEnd={onYearTransitionEnd}
      >
        {years.map((year, i) => {
          const isVisible =
            (i >= firstVisibleYearIndex) && (i < firstVisibleYearIndex + numberOfYears);
          const yearString = toISOYearString(year);
          return (
            <CalendarYear
              key={year}
              year={year}
              isVisible={isVisible}
              modifiers={modifiers[yearString]}
              yearFormat={yearFormat}
              orientation={orientation}
              onMonthMouseEnter={onMonthMouseEnter}
              onMonthMouseLeave={onMonthMouseLeave}
              onMonthClick={onMonthClick}
              renderYear={renderYear}
              renderMonth={renderMonth}
              monthWidthSize={monthWidthSize}
              monthHeightSize={monthHeightSize}
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

CalendarYearGrid.propTypes = propTypes;
CalendarYearGrid.defaultProps = defaultProps;
