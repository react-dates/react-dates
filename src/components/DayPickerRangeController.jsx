import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import includes from 'array-includes';

import isTouchDevice from '../utils/isTouchDevice';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isSameDay from '../utils/isSameDay';

import FocusedInputShape from '../shapes/FocusedInputShape';
import OrientationShape from '../shapes/OrientationShape';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
} from '../../constants';

import DayPicker from './DayPicker';

const propTypes = {
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func,

  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: OrientationShape,
  withPortal: PropTypes.bool,
  hidden: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

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
  onDatesChange() {},

  focusedInput: null,
  onFocusChange() {},

  keepOpenOnDateSelect: false,
  minimumNights: 1,
  isOutsideRange() {},
  isDayBlocked() {},
  isDayHighlighted() {},

  // DayPicker props
  enableOutsideDays: false,
  numberOfMonths: 1,
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  hidden: false,

  initialVisibleMonth: () => moment(),

  navPrev: null,
  navNext: null,

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

export default class DayPickerRangeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverDate: null,
    };

    this.isTouchDevice = isTouchDevice();

    this.onDayClick = this.onDayClick.bind(this);
    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
  }

  onDayClick(day, modifiers, e) {
    const { keepOpenOnDateSelect, minimumNights } = this.props;
    if (e) e.preventDefault();
    if (includes(modifiers, 'blocked')) return;

    const { focusedInput } = this.props;
    let { startDate, endDate } = this.props;

    if (focusedInput === START_DATE) {
      this.props.onFocusChange(END_DATE);

      startDate = day;

      if (isInclusivelyAfterDay(day, endDate)) {
        endDate = null;
      }
    } else if (focusedInput === END_DATE) {
      const firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

      if (!startDate) {
        endDate = day;
        this.props.onFocusChange(START_DATE);
      } else if (isInclusivelyAfterDay(day, firstAllowedEndDate)) {
        endDate = day;
        if (!keepOpenOnDateSelect) this.props.onFocusChange(null);
      } else {
        startDate = day;
        endDate = null;
      }
    }

    this.props.onDatesChange({ startDate, endDate });
  }

  onDayMouseEnter(day) {
    if (this.isTouchDevice) return;

    this.setState({
      hoverDate: day,
    });
  }

  onDayMouseLeave() {
    if (this.isTouchDevice) return;

    this.setState({
      hoverDate: null,
    });
  }

  doesNotMeetMinimumNights(day) {
    const { startDate, isOutsideRange, focusedInput, minimumNights } = this.props;
    if (focusedInput !== END_DATE) return false;

    if (startDate) {
      const dayDiff = day.diff(startDate, 'days');
      return dayDiff < minimumNights && dayDiff >= 0;
    }
    return isOutsideRange(moment(day).subtract(minimumNights, 'days'));
  }

  isDayAfterHoveredStartDate(day) {
    const { startDate, endDate, minimumNights } = this.props;
    const { hoverDate } = this.state;
    return !!startDate && !endDate && !this.isBlocked(day) && isNextDay(hoverDate, day) &&
      minimumNights > 0 && isSameDay(hoverDate, startDate);
  }

  isEndDate(day) {
    return isSameDay(day, this.props.endDate);
  }

  isHovered(day) {
    return isSameDay(day, this.state.hoverDate);
  }

  isInHoveredSpan(day) {
    const { startDate, endDate } = this.props;
    const { hoverDate } = this.state;

    const isForwardRange = !!startDate && !endDate &&
      (day.isBetween(startDate, hoverDate) ||
       isSameDay(hoverDate, day));
    const isBackwardRange = !!endDate && !startDate &&
      (day.isBetween(hoverDate, endDate) ||
       isSameDay(hoverDate, day));

    const isValidDayHovered = hoverDate && !this.isBlocked(hoverDate);

    return (isForwardRange || isBackwardRange) && isValidDayHovered;
  }

  isInSelectedSpan(day) {
    const { startDate, endDate } = this.props;
    return day.isBetween(startDate, endDate);
  }

  isLastInRange(day) {
    return this.isInSelectedSpan(day) && isNextDay(day, this.props.endDate);
  }

  isStartDate(day) {
    return isSameDay(day, this.props.startDate);
  }

  isBlocked(day) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day) || this.doesNotMeetMinimumNights(day);
  }

  render() {
    const {
      isDayBlocked,
      isDayHighlighted,
      isOutsideRange,
      numberOfMonths,
      orientation,
      monthFormat,
      navPrev,
      navNext,
      onOutsideClick,
      onPrevMonthClick,
      onNextMonthClick,
      withPortal,
      enableOutsideDays,
      initialVisibleMonth,
      focusedInput,
    } = this.props;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => isDayBlocked(day),
      'blocked-out-of-range': day => isOutsideRange(day),
      'blocked-minimum-nights': day => this.doesNotMeetMinimumNights(day),
      'highlighted-calendar': day => isDayHighlighted(day),
      valid: day => !this.isBlocked(day),
      // before anything has been set or after both are set
      hovered: day => this.isHovered(day),

      // while start date has been set, but end date has not been
      'hovered-span': day => this.isInHoveredSpan(day),
      'after-hovered-start': day => this.isDayAfterHoveredStartDate(day),
      'last-in-range': day => this.isLastInRange(day),

      // once a start date and end date have been set
      'selected-start': day => this.isStartDate(day),
      'selected-end': day => this.isEndDate(day),
      'selected-span': day => this.isInSelectedSpan(day),
    };

    return (
      <DayPicker
        ref={ref => { this.dayPicker = ref; }}
        orientation={orientation}
        enableOutsideDays={enableOutsideDays}
        modifiers={modifiers}
        numberOfMonths={numberOfMonths}
        onDayMouseEnter={this.onDayMouseEnter}
        onDayMouseLeave={this.onDayMouseLeave}
        onDayMouseDown={this.onDayClick}
        onDayTouchTap={this.onDayClick}
        onPrevMonthClick={onPrevMonthClick}
        onNextMonthClick={onNextMonthClick}
        monthFormat={monthFormat}
        withPortal={withPortal}
        hidden={!focusedInput}
        initialVisibleMonth={initialVisibleMonth}
        onOutsideClick={onOutsideClick}
        navPrev={navPrev}
        navNext={navNext}
      />
    );
  }
}

DayPickerRangeController.propTypes = propTypes;
DayPickerRangeController.defaultProps = defaultProps;
