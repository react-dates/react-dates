import React, { PropTypes } from 'react';
import moment from 'moment';

import momentPropTypes from 'react-moment-proptypes';

import DateRangePickerInput from './DateRangePickerInput';

import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isInclusivelyBeforeDay from '../utils/isInclusivelyBeforeDay';

import { START_DATE, END_DATE } from '../../constants';

const propTypes = {
  startDate: momentPropTypes.momentObj,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  isStartDateFocused: PropTypes.bool,

  endDate: momentPropTypes.momentObj,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  isEndDateFocused: PropTypes.bool,

  showClearDates: PropTypes.bool,
  showCaret: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,

  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  onFocusChange: PropTypes.func,
  onDatesChange: PropTypes.func,

  // i18n
  phrases: PropTypes.shape({
    clearDates: PropTypes.node,
  }),
};

const defaultProps = {
  startDate: null,
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateFocused: false,

  endDate: null,
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateFocused: false,

  showClearDates: false,
  showCaret: false,
  disabled: false,
  required: false,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  displayFormat: () => moment.localeData().longDateFormat('L'),

  onFocusChange() {},
  onDatesChange() {},

  // i18n
  phrases: {
    clearDates: 'Clear Dates',
  },
};

export default class DateRangePickerInputWithHandlers extends React.Component {
  constructor(props) {
    super(props);

    this.onClearFocus = this.onClearFocus.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStartDateFocus = this.onStartDateFocus.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onEndDateFocus = this.onEndDateFocus.bind(this);
    this.clearDates = this.clearDates.bind(this);
  }

  onClearFocus() {
    this.props.onFocusChange(null);
  }

  onEndDateChange(endDateString) {
    const {
      startDate,
      isOutsideRange,
      keepOpenOnDateSelect,
      onDatesChange,
      onFocusChange,
    } = this.props;

    const endDate = toMomentObject(endDateString, this.getDisplayFormat());

    const isEndDateValid = endDate && !isOutsideRange(endDate) &&
      !isInclusivelyBeforeDay(endDate, startDate);
    if (isEndDateValid) {
      onDatesChange({ startDate, endDate });
      if (!keepOpenOnDateSelect) onFocusChange(null);
    } else {
      onDatesChange({
        startDate,
        endDate: null,
      });
    }
  }

  onEndDateFocus() {
    const { startDate, onFocusChange, withFullScreenPortal, disabled } = this.props;

    if (!startDate && withFullScreenPortal && !disabled) {
      // When the datepicker is full screen, we never want to focus the end date first
      // because there's no indication that that is the case once the datepicker is open and it
      // might confuse the user
      onFocusChange(START_DATE);
    } else if (!disabled) {
      onFocusChange(END_DATE);
    }
  }

  onStartDateChange(startDateString) {
    const startDate = toMomentObject(startDateString, this.getDisplayFormat());

    let { endDate } = this.props;
    const { isOutsideRange, onDatesChange, onFocusChange } = this.props;
    const isStartDateValid = startDate && !isOutsideRange(startDate);
    if (isStartDateValid) {
      if (isInclusivelyBeforeDay(endDate, startDate)) {
        endDate = null;
      }

      onDatesChange({ startDate, endDate });
      onFocusChange(END_DATE);
    } else {
      onDatesChange({
        startDate: null,
        endDate,
      });
    }
  }

  onStartDateFocus() {
    if (!this.props.disabled) {
      this.props.onFocusChange(START_DATE);
    }
  }

  getDisplayFormat() {
    const { displayFormat } = this.props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  getDateString(date) {
    const displayFormat = this.getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date);
  }

  clearDates() {
    const { onDatesChange, reopenPickerOnClearDates, onFocusChange } = this.props;
    onDatesChange({ startDate: null, endDate: null });
    if (reopenPickerOnClearDates) {
      onFocusChange(START_DATE);
    }
  }

  render() {
    const {
      startDate,
      startDateId,
      startDatePlaceholderText,
      isStartDateFocused,
      endDate,
      endDateId,
      endDatePlaceholderText,
      isEndDateFocused,
      showClearDates,
      showCaret,
      disabled,
      required,
      phrases,
    } = this.props;

    const startDateString = this.getDateString(startDate);
    const endDateString = this.getDateString(endDate);

    return (
      <DateRangePickerInput
        startDate={startDateString}
        startDateId={startDateId}
        startDatePlaceholderText={startDatePlaceholderText}
        isStartDateFocused={isStartDateFocused}
        endDate={endDateString}
        endDateId={endDateId}
        endDatePlaceholderText={endDatePlaceholderText}
        isEndDateFocused={isEndDateFocused}
        disabled={disabled}
        required={required}
        showCaret={showCaret}
        phrases={phrases}
        onStartDateChange={this.onStartDateChange}
        onStartDateFocus={this.onStartDateFocus}
        onStartDateShiftTab={this.onClearFocus}
        onEndDateChange={this.onEndDateChange}
        onEndDateFocus={this.onEndDateFocus}
        onEndDateTab={this.onClearFocus}
        showClearDates={showClearDates}
        onClearDates={this.clearDates}
      />
    );
  }
}

DateRangePickerInputWithHandlers.propTypes = propTypes;
DateRangePickerInputWithHandlers.defaultProps = defaultProps;
