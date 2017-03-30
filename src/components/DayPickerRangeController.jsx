import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';
import moment from 'moment';

import { DayPickerPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import isTouchDevice from '../utils/isTouchDevice';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isSameDayOriginal from '../utils/isSameDay';

import FocusedInputShape from '../shapes/FocusedInputShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

function isSameDay(a, b) {
  const start = window.performance.now();
  const returnValue = isSameDayOriginal(a, b);
  window.jperf.totalIsSameDay.ms += window.performance.now() - start;
  window.jperf.totalIsSameDay.callCount++;
  return returnValue;
}

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
} from '../../constants';

import DayPicker from './DayPicker';

const propTypes = forbidExtraProps({
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func,

  selectedInput: FocusedInputShape,
  onSelectedInputChange: PropTypes.func,

  keepOpenOnDateSelect: PropTypes.bool,
  minimumNights: PropTypes.number,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // DayPicker props
  enableOutsideDays: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  orientation: ScrollableOrientationShape,
  withPortal: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,

  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  renderDay: PropTypes.func,

  // accessibility
  onBlur: PropTypes.func,
  isFocused: PropTypes.bool,
  showKeyboardShortcuts: PropTypes.bool,

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerPhrases)),
});

const defaultProps = {
  startDate: undefined, // TODO: use null
  endDate: undefined, // TODO: use null
  onDatesChange() {},

  selectedInput: null,
  onSelectedInputChange() {},

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

  initialVisibleMonth: () => moment(),

  navPrev: null,
  navNext: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onOutsideClick() {},

  renderDay: null,

  // accessibility
  onBlur() {},
  isFocused: false,
  showKeyboardShortcuts: false,

  // i18n
  monthFormat: 'MMMM YYYY',
  phrases: DayPickerPhrases,
};

export default class DayPickerRangeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverDate: null,
    };

    window.jperf = {
      totalIsSameDay: {
        callCount: 0,
        ms: 0,
      },
    };

    setTimeout(() => {
      try {
        document.querySelector('button[aria-label="Available. Friday. March 10, 2017"]').click();
        document.querySelector('button[aria-label="Available. Wednesday. April 12, 2017"]').click();

        // document.querySelector('button[aria-label="Available. Thursday. March 9, 2017"]').click();
        // document.querySelector('button[aria-label="Available. Thursday. April 13, 2017"]').click();

        // console.log(JSON.stringify(window.jperf, undefined, 2));
        for (var key in window.jperf) {
          window.jperf[key].ms = Math.round(window.jperf[key].ms);
        }
        console.table(window.jperf);
      } catch(e) {
      }
    }, 2000);

    this.isTouchDevice = isTouchDevice();
    this.today = moment();

    this.onDayClick = this.onDayClick.bind(this);
    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);
  }

  componentWillUpdate() {
    this.today = moment();
  }

  onDayClick(day, e) {
    const { keepOpenOnDateSelect, minimumNights, onBlur } = this.props;
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;

    const { selectedInput } = this.props;
    let { startDate, endDate } = this.props;

    if (selectedInput === START_DATE) {
      this.props.onSelectedInputChange(END_DATE);

      startDate = day;

      if (isInclusivelyAfterDay(day, endDate)) {
        endDate = null;
      }
    } else if (selectedInput === END_DATE) {
      const firstAllowedEndDate = startDate && startDate.clone().add(minimumNights, 'days');

      if (!startDate) {
        endDate = day;
        this.props.onSelectedInputChange(START_DATE);
      } else if (isInclusivelyAfterDay(day, firstAllowedEndDate)) {
        endDate = day;
        if (!keepOpenOnDateSelect) this.props.onSelectedInputChange(null);
      } else {
        startDate = day;
        endDate = null;
      }
    }

    this.props.onDatesChange({ startDate, endDate });
    onBlur();
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

  getFirstFocusableDay(newMonth) {
    const { startDate, endDate, selectedInput, minimumNights, numberOfMonths } = this.props;

    let focusedDate = newMonth.clone().startOf('month');
    if (selectedInput === START_DATE && startDate) {
      focusedDate = startDate.clone();
    } else if (selectedInput === END_DATE && !endDate && startDate) {
      focusedDate = startDate.clone().add(minimumNights, 'days');
    } else if (selectedInput === END_DATE && endDate) {
      focusedDate = endDate.clone();
    }

    if (this.isBlocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!currentDay.isAfter(lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter(day => !this.isBlocked(day) && day.isAfter(focusedDate));
      if (viableDays.length > 0) focusedDate = viableDays[0];
    }

    return focusedDate;
  }

  doesNotMeetMinimumNights(day) {
    const { startDate, isOutsideRange, selectedInput, minimumNights } = this.props;
    if (selectedInput !== END_DATE) return false;

    if (startDate) {
      const dayDiff = day.diff(startDate.clone().startOf('day').hour(12), 'days');
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

  isToday(day) {
    return isSameDay(day, this.today);
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
      selectedInput,
      renderDay,
      onBlur,
      isFocused,
      showKeyboardShortcuts,
      phrases,
    } = this.props;

    const modifiers = {
      today: day => this.isToday(day),
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

    const { jperf: perf } = window;
    Object.keys(modifiers).forEach(mod => {
      if (!perf.hasOwnProperty(mod)) {
        perf[mod] = {
          ms: 0,
          callCount: 0,
        };
      }
      const originalMod = modifiers[mod];
      modifiers[mod] = (v1, v2, v3, v4, v5) => {
        const start = window.performance.now();
        const returnVal = originalMod(v1, v2, v3, v4, v5);
        const end = window.performance.now()
        // perf[mod].ms += Math.round(end - start);
        perf[mod].ms += end - start;
        perf[mod].callCount += 1;
        return returnVal;
      };
    });

    return (
      <DayPicker
        ref={(ref) => { this.dayPicker = ref; }}
        orientation={orientation}
        enableOutsideDays={enableOutsideDays}
        modifiers={modifiers}
        numberOfMonths={numberOfMonths}
        onDayClick={this.onDayClick}
        onDayMouseEnter={this.onDayMouseEnter}
        onDayMouseLeave={this.onDayMouseLeave}
        onPrevMonthClick={onPrevMonthClick}
        onNextMonthClick={onNextMonthClick}
        monthFormat={monthFormat}
        withPortal={withPortal}
        hidden={!selectedInput}
        initialVisibleMonth={initialVisibleMonth}
        onOutsideClick={onOutsideClick}
        navPrev={navPrev}
        navNext={navNext}
        renderDay={renderDay}
        isFocused={isFocused}
        getFirstFocusableDay={this.getFirstFocusableDay}
        onBlur={onBlur}
        showKeyboardShortcuts={showKeyboardShortcuts}
        phrases={phrases}
      />
    );
  }
}

DayPickerRangeController.propTypes = propTypes;
DayPickerRangeController.defaultProps = defaultProps;
