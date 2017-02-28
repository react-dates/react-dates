import React, { PropTypes } from 'react';
import moment from 'moment';

import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps } from 'airbnb-prop-types';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateRangePickerInput from './DateRangePickerInput';

import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';
import toISODateString from '../utils/toISODateString';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isInclusivelyBeforeDay from '../utils/isInclusivelyBeforeDay';

import { START_DATE, END_DATE } from '../../constants';

const propTypes = forbidExtraProps({
  startDate: momentPropTypes.momentObj,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  isStartDateSelected: PropTypes.bool, // stylizes the input to indicate that it will be filled

  endDate: momentPropTypes.momentObj,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  isEndDateSelected: PropTypes.bool, // stylizes the input to indicate that it will be filled

  screenReaderMessage: PropTypes.string,
  showClearDates: PropTypes.bool,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,

  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  onSelectedInputChange: PropTypes.func,
  onDatesChange: PropTypes.func,
  onArrowDown: PropTypes.func,
  onQuestionMark: PropTypes.func,

  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,

  // accessibility
  isFocused: PropTypes.bool, // handles actual DOM focus

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),
});

const defaultProps = {
  startDate: null,
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateSelected: false,

  endDate: null,
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateSelected: false,

  screenReaderMessage: '',
  showClearDates: false,
  showCaret: false,
  showDefaultInputIcon: false,
  disabled: false,
  required: false,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  displayFormat: () => moment.localeData().longDateFormat('L'),

  onSelectedInputChange() {},
  onDatesChange() {},
  onArrowDown() {},
  onQuestionMark() {},

  customInputIcon: null,
  customArrowIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,
};

export default class DateRangePickerInputController extends React.Component {
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
    this.props.onSelectedInputChange(null);
  }

  onEndDateChange(endDateString) {
    const {
      startDate,
      isOutsideRange,
      keepOpenOnDateSelect,
      onDatesChange,
      onSelectedInputChange,
    } = this.props;

    const endDate = toMomentObject(endDateString, this.getDisplayFormat());

    const isEndDateValid = endDate && !isOutsideRange(endDate) &&
      !isInclusivelyBeforeDay(endDate, startDate);
    if (isEndDateValid) {
      onDatesChange({ startDate, endDate });
      if (!keepOpenOnDateSelect) onSelectedInputChange(null);
    } else {
      onDatesChange({
        startDate,
        endDate: null,
      });
    }
  }

  onEndDateFocus() {
    const { startDate, onSelectedInputChange, withFullScreenPortal, disabled } = this.props;

    if (!startDate && withFullScreenPortal && !disabled) {
      // When the datepicker is full screen, we never want to focus the end date first
      // because there's no indication that that is the case once the datepicker is open and it
      // might confuse the user
      onSelectedInputChange(START_DATE);
    } else if (!disabled) {
      onSelectedInputChange(END_DATE);
    }
  }

  onStartDateChange(startDateString) {
    const startDate = toMomentObject(startDateString, this.getDisplayFormat());

    let { endDate } = this.props;
    const { isOutsideRange, onDatesChange, onSelectedInputChange } = this.props;
    const isStartDateValid = startDate && !isOutsideRange(startDate);
    if (isStartDateValid) {
      if (isInclusivelyBeforeDay(endDate, startDate)) {
        endDate = null;
      }

      onDatesChange({ startDate, endDate });
      onSelectedInputChange(END_DATE);
    } else {
      onDatesChange({
        startDate: null,
        endDate,
      });
    }
  }

  onStartDateFocus() {
    if (!this.props.disabled) {
      this.props.onSelectedInputChange(START_DATE);
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
    const { onDatesChange, reopenPickerOnClearDates, onSelectedInputChange } = this.props;
    onDatesChange({ startDate: null, endDate: null });
    if (reopenPickerOnClearDates) {
      onSelectedInputChange(START_DATE);
    }
  }

  render() {
    const {
      startDate,
      startDateId,
      startDatePlaceholderText,
      isStartDateSelected,
      endDate,
      endDateId,
      endDatePlaceholderText,
      isEndDateSelected,
      screenReaderMessage,
      showClearDates,
      showCaret,
      showDefaultInputIcon,
      customInputIcon,
      customArrowIcon,
      disabled,
      required,
      phrases,
      onArrowDown,
      onQuestionMark,
      isFocused,
    } = this.props;

    const startDateString = this.getDateString(startDate);
    const startDateValue = toISODateString(startDate);
    const endDateString = this.getDateString(endDate);
    const endDateValue = toISODateString(endDate);

    return (
      <DateRangePickerInput
        startDate={startDateString}
        startDateValue={startDateValue}
        startDateId={startDateId}
        startDatePlaceholderText={startDatePlaceholderText}
        isStartDateSelected={isStartDateSelected}
        endDate={endDateString}
        endDateValue={endDateValue}
        endDateId={endDateId}
        endDatePlaceholderText={endDatePlaceholderText}
        isEndDateSelected={isEndDateSelected}
        disabled={disabled}
        required={required}
        showCaret={showCaret}
        showDefaultInputIcon={showDefaultInputIcon}
        customInputIcon={customInputIcon}
        customArrowIcon={customArrowIcon}
        phrases={phrases}
        onStartDateChange={this.onStartDateChange}
        onStartDateFocus={this.onStartDateFocus}
        onStartDateShiftTab={this.onClearFocus}
        onEndDateChange={this.onEndDateChange}
        onEndDateFocus={this.onEndDateFocus}
        onEndDateTab={this.onClearFocus}
        showClearDates={showClearDates}
        onClearDates={this.clearDates}
        screenReaderMessage={screenReaderMessage}
        onArrowDown={onArrowDown}
        onQuestionMark={onQuestionMark}
        isFocused={isFocused}
      />
    );
  }
}

DateRangePickerInputController.propTypes = propTypes;
DateRangePickerInputController.defaultProps = defaultProps;
