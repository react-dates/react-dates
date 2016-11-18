import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import cx from 'classnames';
import Portal from 'react-portal';
import includes from 'array-includes';

import isTouchDevice from '../utils/isTouchDevice';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isNextDay from '../utils/isNextDay';
import isSameDay from '../utils/isSameDay';

import DateRangePickerInputController from './DateRangePickerInputController';
import DayPicker from './DayPicker';

import CloseButton from '../svg/close.svg';

import DateRangePickerShape from '../shapes/DateRangePickerShape';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
} from '../../constants';

const propTypes = DateRangePickerShape;

const defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
  focusedInput: null,
  minimumNights: 1,
  isDayBlocked: () => false,
  disabledDays: [],
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  enableOutsideDays: false,
  numberOfMonths: 2,
  showClearDates: false,
  disabled: false,
  required: false,
  reopenPickerOnClearDates: false,
  keepOpenOnDateSelect: false,
  initialVisibleMonth: () => moment(),
  navPrev: null,
  navNext: null,

  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,

  onDatesChange() {},
  onFocusChange() {},
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // i18n
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: {
    closeDatePicker: 'Close',
    clearDates: 'Clear Dates',
  },
};

export default class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayPickerContainerStyles: {},
      hoverDate: null,
    };

    this.isTouchDevice = isTouchDevice();

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.responsivizePickerPosition);
    this.responsivizePickerPosition();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.responsivizePickerPosition);
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

  onOutsideClick() {
    const { focusedInput, onFocusChange } = this.props;
    if (!focusedInput) return;

    onFocusChange(null);
  }

  getDayPickerContainerClasses() {
    const {
      focusedInput,
      orientation,
      withPortal,
      withFullScreenPortal,
      anchorDirection,
    } = this.props;
    const { hoverDate } = this.state;
    const showDatepicker = focusedInput === START_DATE || focusedInput === END_DATE;

    const dayPickerClassName = cx('DateRangePicker__picker', {
      'DateRangePicker__picker--show': showDatepicker,
      'DateRangePicker__picker--invisible': !showDatepicker,
      'DateRangePicker__picker--direction-left': anchorDirection === ANCHOR_LEFT,
      'DateRangePicker__picker--direction-right': anchorDirection === ANCHOR_RIGHT,
      'DateRangePicker__picker--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'DateRangePicker__picker--vertical': orientation === VERTICAL_ORIENTATION,
      'DateRangePicker__picker--portal': withPortal || withFullScreenPortal,
      'DateRangePicker__picker--full-screen-portal': withFullScreenPortal,
      'DateRangePicker__picker--valid-date-hovered': hoverDate && !this.isBlocked(hoverDate),
    });

    return dayPickerClassName;
  }

  getDayPickerDOMNode() {
    return ReactDOM.findDOMNode(this.dayPicker);
  }

  responsivizePickerPosition() {
    const { anchorDirection, horizontalMargin } = this.props;
    const { dayPickerContainerStyles } = this.state;

    const isAnchoredLeft = anchorDirection === ANCHOR_LEFT;

    const containerRect = this.dayPickerContainer.getBoundingClientRect();
    const currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
    const containerEdge = isAnchoredLeft ? containerRect[ANCHOR_RIGHT] : containerRect[ANCHOR_LEFT];

    this.setState({
      dayPickerContainerStyles: getResponsiveContainerStyles(
        anchorDirection,
        currentOffset,
        containerEdge,
        horizontalMargin
      ),
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
    return !!startDate && !endDate && isNextDay(hoverDate, day) && minimumNights > 0 &&
      isSameDay(hoverDate, startDate);
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

    return isForwardRange || isBackwardRange;
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

  maybeRenderDayPickerWithPortal() {
    const { focusedInput, withPortal, withFullScreenPortal } = this.props;

    if (withPortal || withFullScreenPortal) {
      return (
        <Portal isOpened={focusedInput !== null}>
          {this.renderDayPicker()}
        </Portal>
      );
    }

    return this.renderDayPicker();
  }

  renderDayPicker() {
    const {
      isDayBlocked,
      isOutsideRange,
      numberOfMonths,
      orientation,
      monthFormat,
      navPrev,
      navNext,
      onPrevMonthClick,
      onNextMonthClick,
      withPortal,
      withFullScreenPortal,
      enableOutsideDays,
      initialVisibleMonth,
      focusedInput,
    } = this.props;
    const { dayPickerContainerStyles } = this.state;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => isDayBlocked(day),
      'blocked-out-of-range': day => isOutsideRange(day),
      'blocked-minimum-nights': day => this.doesNotMeetMinimumNights(day),
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

    const onOutsideClick = !withFullScreenPortal ? this.onOutsideClick : undefined;

    return (
      <div
        ref={ref => { this.dayPickerContainer = ref; }}
        className={this.getDayPickerContainerClasses()}
        style={dayPickerContainerStyles}
      >
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
          withPortal={withPortal || withFullScreenPortal}
          hidden={!focusedInput}
          initialVisibleMonth={initialVisibleMonth}
          onOutsideClick={onOutsideClick}
          navPrev={navPrev}
          navNext={navNext}
        />

        {withFullScreenPortal &&
          <button
            className="DateRangePicker__close"
            type="button"
            onClick={this.onOutsideClick}
          >
            <span className="screen-reader-only">
              {this.props.phrases.closeDatePicker}
            </span>
            <CloseButton />
          </button>
        }
      </div>
    );
  }

  render() {
    const {
      startDate,
      startDateId,
      startDatePlaceholderText,
      endDate,
      endDateId,
      endDatePlaceholderText,
      focusedInput,
      showClearDates,
      disabled,
      required,
      phrases,
      isOutsideRange,
      withPortal,
      withFullScreenPortal,
      displayFormat,
      reopenPickerOnClearDates,
      keepOpenOnDateSelect,
      onDatesChange,
      onFocusChange,
    } = this.props;

    return (
      <div className="DateRangePicker">
        <DateRangePickerInputController
          startDate={startDate}
          startDateId={startDateId}
          startDatePlaceholderText={startDatePlaceholderText}
          isStartDateFocused={focusedInput === START_DATE}
          endDate={endDate}
          endDateId={endDateId}
          endDatePlaceholderText={endDatePlaceholderText}
          isEndDateFocused={focusedInput === END_DATE}
          displayFormat={displayFormat}
          showClearDates={showClearDates}
          showCaret={!withPortal && !withFullScreenPortal}
          disabled={disabled}
          required={required}
          reopenPickerOnClearDates={reopenPickerOnClearDates}
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          isOutsideRange={isOutsideRange}
          withFullScreenPortal={withFullScreenPortal}
          onDatesChange={onDatesChange}
          onFocusChange={onFocusChange}
          phrases={phrases}
        />

        {this.maybeRenderDayPickerWithPortal()}
      </div>
    );
  }
}

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;
