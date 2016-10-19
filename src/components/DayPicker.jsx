import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactDOM from 'react-dom';
import moment from 'moment';
import cx from 'classnames';

import OutsideClickHandler from './OutsideClickHandler';
import CalendarMonthGrid from './CalendarMonthGrid';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import getTransformStyles from '../utils/getTransformStyles';

import OrientationShape from '../shapes/OrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  PREV_TRANSITION,
  NEXT_TRANSITION,
} from '../../constants';

const DAY_PICKER_PADDING = 9;
const MONTH_PADDING = 23;

const DAY_HEIGHT = 38;
const MONTH_HORIZONTAL_PADDING = 13;

// broken up into padding/margin/size right now in the CSS
const CAPTION_HEIGHT = 7 + 15 + 21 + 35 + 2;

const propTypes = {
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  modifiers: PropTypes.object,
  orientation: OrientationShape,
  withPortal: PropTypes.bool,
  hidden: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  onDayClick: PropTypes.func,
  onDayMouseDown: PropTypes.func,
  onDayMouseUp: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onDayTouchStart: PropTypes.func,
  onDayTouchEnd: PropTypes.func,
  onDayTouchTap: PropTypes.func,
  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,

  // i18n
  monthFormat: PropTypes.string,
};

const defaultProps = {
  enableOutsideDays: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hidden: false,
  initialVisibleMonth: () => moment(),
  onDayClick() {},
  onDayMouseDown() {},
  onDayMouseUp() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onDayTouchStart() {},
  onDayTouchTap() {},
  onDayTouchEnd() {},
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onOutsideClick() {},

  // i18n
  monthFormat: 'MMMM YYYY',
};

export default class DayPicker extends React.Component {
  constructor(props) {
    super(props);

    const currentMonth = props.hidden ? moment() : props.initialVisibleMonth();
    this.state = {
      currentMonth,
      monthTransition: null,
      translationValue: 0,
      transitionContainerHeight: this.getTransitionContainerHeight(currentMonth),
    };

    this.handlePrevMonthClick = this.handlePrevMonthClick.bind(this);
    this.handleNextMonthClick = this.handleNextMonthClick.bind(this);
    this.updateStateAfterMonthTransition = this.updateStateAfterMonthTransition.bind(this);

    this.hasSetInitialVisibleMonth = !props.hidden;

    const monthWidthSansPadding = (7 * (DAY_HEIGHT + 1)) + 1;
    this.calendarMonthWidth = monthWidthSansPadding + (2 * MONTH_HORIZONTAL_PADDING);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.hasSetInitialVisibleMonth && !nextProps.hidden) {
      this.hasSetInitialVisibleMonth = true;
      this.setState({
        currentMonth: nextProps.initialVisibleMonth(),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getMonthHeight(month) {
    const numOfWeeks = getCalendarMonthWeeks(month).length;
    return CAPTION_HEIGHT + (numOfWeeks * DAY_HEIGHT);
  }

  getTransitionContainerHeight(currentMonth) {
    if (this.isHorizontal()) {
      const { numberOfMonths } = this.props;

      let month = (currentMonth && currentMonth.clone()) || this.state.currentMonth.clone();

      const heights = [];
      for (let i = 0; i < numberOfMonths; i++) {
        month = month.add(i, 'months');
        heights.push(this.getMonthHeight(month));
      }

      return Math.max(...heights) + MONTH_PADDING;
    }

    return null;
  }

  isHorizontal() {
    return this.props.orientation === HORIZONTAL_ORIENTATION;
  }

  isVertical() {
    return this.props.orientation === VERTICAL_ORIENTATION;
  }

  updateStateAfterMonthTransition() {
    const { currentMonth, monthTransition } = this.state;

    let newMonth = currentMonth;
    if (monthTransition === PREV_TRANSITION) {
      newMonth = currentMonth.clone().subtract(1, 'month');
    } else if (monthTransition === NEXT_TRANSITION) {
      newMonth = currentMonth.clone().add(1, 'month');
    }

    this.setState({
      currentMonth: newMonth,
      monthTransition: null,
      translationValue: 0,
    });
  }

  handlePrevMonthClick(e) {
    const { currentMonth } = this.state;

    if (e) e.preventDefault();
    this.props.onPrevMonthClick(e);

    const prevMonth = currentMonth.clone().subtract(1, 'month');
    const translationValue =
      this.isVertical() ? this.getMonthHeight(currentMonth) : this.calendarMonthWidth;
    const transitionContainerHeight = this.getTransitionContainerHeight(prevMonth);

    this.setState({
      monthTransition: PREV_TRANSITION,
      translationValue,
      transitionContainerHeight,
    });
  }

  handleNextMonthClick(e) {
    if (e) e.preventDefault();
    this.props.onNextMonthClick(e);

    const nextMonth = this.state.currentMonth.clone().add(1, 'month');
    const translationValue =
      this.isVertical() ? -this.getMonthHeight(nextMonth) : -this.calendarMonthWidth;
    const transitionContainerHeight = this.getTransitionContainerHeight(nextMonth);

    this.setState({
      monthTransition: NEXT_TRANSITION,
      translationValue,
      transitionContainerHeight,
    });
  }

  renderNavigation() {
    const isVertical = this.isVertical();

    return (
      <div className="DayPicker__nav">
        <span
          className="DayPicker__nav--prev"
          onClick={this.handlePrevMonthClick}
        >
          {isVertical ? <ChevronUp /> : <LeftArrow />}
        </span>

        <span
          className="DayPicker__nav--next"
          onClick={this.handleNextMonthClick}
        >
          {isVertical ? <ChevronDown /> : <RightArrow />}
        </span>
      </div>
    );
  }

  renderWeekHeader(index) {
    const { numberOfMonths } = this.props;

    const widthPercentage = 100 / numberOfMonths;
    const horizontalStyle = {
      width: `${widthPercentage}%`,
      left: `${widthPercentage * index}%`,
    };

    const style = this.isHorizontal() ? horizontalStyle : {};

    const header = [];
    for (let i = 0; i < 7; i++) {
      header.push(
        <li key={i}>
          <small>{moment().weekday(i).format('dd')}</small>
        </li>
      );
    }

    return (
      <div
        className="DayPicker__week-header"
        key={`week-${index}`}
        style={style}
      >
        <ul>
          {header}
        </ul>
      </div>
    );
  }

  render() {
    const {
      enableOutsideDays,
      numberOfMonths,
      orientation,
      modifiers,
      withPortal,
      onDayClick,
      onDayMouseDown,
      onDayMouseUp,
      onDayTouchStart,
      onDayTouchEnd,
      onDayTouchTap,
      onDayMouseEnter,
      onDayMouseLeave,
      onOutsideClick,
      monthFormat,
    } = this.props;

    const {
      currentMonth,
      monthTransition,
      translationValue,
      transitionContainerHeight,
    } = this.state;

    const numOfWeekHeaders = this.isVertical() ? 1 : numberOfMonths;
    const weekHeaders = [];
    for (let i = 0; i < numOfWeekHeaders; i++) {
      weekHeaders.push(this.renderWeekHeader(i));
    }

    const dayPickerClassNames = cx('DayPicker', {
      'DayPicker--horizontal': this.isHorizontal(),
      'DayPicker--vertical': this.isVertical(),
      'DayPicker--portal': withPortal,
    });

    const transitionContainerClasses = cx('transition-container', {
      'transition-container--horizontal': this.isHorizontal(),
      'transition-container--vertical': this.isVertical(),
    });

    const horizontalWidth = (this.calendarMonthWidth * numberOfMonths) + (2 * DAY_PICKER_PADDING);

    // this is a kind of made-up value that generally looks good. we'll
    // probably want to let the user set this explicitly.
    const verticalHeight = 1.75 * this.calendarMonthWidth;

    const dayPickerStyle = {
      width: this.isHorizontal() && horizontalWidth,

      // These values are to center the datepicker (approximately) on the page
      marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2,
      marginTop: this.isHorizontal() && withPortal && -this.calendarMonthWidth / 2,
    };

    const transitionContainerStyle = {
      width: this.isHorizontal() && horizontalWidth,
      height: this.isHorizontal() && transitionContainerHeight,
    };

    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${translationValue}px)`;

    return (
      <div className={dayPickerClassNames} style={dayPickerStyle} >
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          {this.renderNavigation()}

          <div className="DayPicker__week-headers">
            {weekHeaders}
          </div>

          <div
            className={transitionContainerClasses}
            style={transitionContainerStyle}
          >
            <CalendarMonthGrid
              transformValue={transformValue}
              enableOutsideDays={enableOutsideDays}
              firstVisibleMonthIndex={1}
              initialMonth={currentMonth}
              monthTransition={monthTransition}
              modifiers={modifiers}
              orientation={orientation}
              withPortal={withPortal}
              numberOfMonths={numberOfMonths}
              onDayClick={onDayClick}
              onDayMouseDown={onDayMouseDown}
              onDayMouseUp={onDayMouseUp}
              onDayTouchStart={onDayTouchStart}
              onDayTouchEnd={onDayTouchEnd}
              onDayTouchTap={onDayTouchTap}
              onDayMouseEnter={onDayMouseEnter}
              onDayMouseLeave={onDayMouseLeave}
              onMonthTransitionEnd={this.updateStateAfterMonthTransition}
              monthFormat={monthFormat}

              dayHeight={DAY_HEIGHT}
            />
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;
