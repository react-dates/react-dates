import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { css, withStyles } from 'react-with-styles';
import moment from 'moment';

import OutsideClickHandler from './OutsideClickHandler';
import DayPickerNavigation from './DayPickerNavigation';
import DayPickerWeekHeaders from './DayPickerWeekHeaders';
import CalendarMonthGrid from './CalendarMonthGrid';

import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';

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

  styles: PropTypes.object.isRequired,

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

class DayPicker extends React.Component {
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
      styles,
    } = this.props;

    const {
      currentMonth,
      monthTransition,
      translationValue,
      transitionContainerHeight,
    } = this.state;

    const horizontalWidth = (this.calendarMonthWidth * numberOfMonths) + (2 * DAY_PICKER_PADDING);

    // this is a kind of made-up value that generally looks good. we'll
    // probably want to let the user set this explicitly.
    const verticalHeight = 1.75 * this.calendarMonthWidth;

    const transformType = this.isVertical() ? 'translateY' : 'translateX';
    const transformValue = `${transformType}(${translationValue}px)`;

    return (
      <div
        {...css(
          {
            width: this.isHorizontal() && horizontalWidth,

            // These values are to center the datepicker (approximately) on the page
            marginLeft: this.isHorizontal() && withPortal && -horizontalWidth / 2,
            marginTop: this.isHorizontal() && withPortal && -this.calendarMonthWidth / 2,
          }
        )}
      >
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <DayPickerNavigation
            orientation={orientation}
            onPrevMonthClick={this.handlePrevMonthClick}
            onNextMonthClick={this.handleNextMonthClick}
          />

          <DayPickerWeekHeaders
            orientation={orientation}
            numberOfMonths={numberOfMonths}
            calendarMonthWidth={this.calendarMonthWidth}
          />

          <div
            {...css(
              styles.calendarMonthGridContainer,
              this.isHorizontal() && styles.calendarMonthGridContainer_horizontal,
              this.isVertical() && styles.calendarMonthGridContainer_vertical,
              {
                width: this.isHorizontal() && horizontalWidth,
                height: this.isHorizontal() ? transitionContainerHeight : verticalHeight,
              }
            )}
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
              monthHorizontalPadding={MONTH_HORIZONTAL_PADDING}
            />
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

DayPicker.propTypes = propTypes;
DayPicker.defaultProps = defaultProps;

export default withStyles(({ reactDates }) => ({
  calendarMonthGridContainer: {
    background: reactDates.color.white,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.07)',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 3,
  },

  calendarMonthGridContainer_horizontal: {
    transition: 'height 0.2s ease-in-out',
  },

  calendarMonthGridContainer_vertical: {
    width: '100%',
  },

//   .DayPicker--horizontal.DayPicker--portal {
//     box-shadow: none;
//     position: absolute;
//     left: 50%;
//     top: 50%;
//   }

// .DayPicker--vertical.DayPicker--portal {
//   position: initial;
// }
}))(DayPicker);
