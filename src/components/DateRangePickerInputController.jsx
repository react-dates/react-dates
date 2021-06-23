import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import startOfDay from 'date-fns/startOfDay';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';
import openDirectionShape from '../shapes/OpenDirectionShape';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateRangePickerInput from './DateRangePickerInput';

import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';

import toLocalizedDateString from '../utils/toLocalizedDateString';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isBeforeDay from '../utils/isBeforeDay';

import {
  START_DATE,
  END_DATE,
  ICON_BEFORE_POSITION,
  OPEN_DOWN,
} from '../constants';

const propTypes = forbidExtraProps({
  children: PropTypes.node,

  startDate: PropTypes.object,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  isStartDateFocused: PropTypes.bool,
  startDateAriaLabel: PropTypes.string,

  endDate: PropTypes.object,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  isEndDateFocused: PropTypes.bool,
  endDateAriaLabel: PropTypes.string,

  screenReaderMessage: PropTypes.string,
  showClearDates: PropTypes.bool,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  disabled: DisabledShape,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  minimumNights: nonNegativeInteger,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,
  onDatesChange: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,

  // accessibility
  isFocused: PropTypes.bool,

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),
  locale: PropTypes.string,

  isRTL: PropTypes.bool,
});

const defaultProps = {
  children: null,

  startDate: null,
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateFocused: false,
  startDateAriaLabel: undefined,

  endDate: null,
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateFocused: false,
  endDateAriaLabel: undefined,

  screenReaderMessage: '',
  showClearDates: false,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  minimumNights: 1,
  isOutsideRange: (day) => !isInclusivelyAfterDay(day, addHours(startOfDay(new Date()), 12)),
  isDayBlocked: () => false,
  displayFormat: () => 'P',

  onFocusChange() {},
  onClose() {},
  onDatesChange() {},
  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,
  locale: null,

  isRTL: false,
};

export default class DateRangePickerInputController extends React.PureComponent {
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
    const {
      onFocusChange,
      onClose,
      startDate,
      endDate,
    } = this.props;

    onFocusChange(null);
    onClose({ startDate, endDate });
  }

  onEndDateChange(endDateString) {
    const {
      startDate,
      isOutsideRange,
      isDayBlocked,
      minimumNights,
      keepOpenOnDateSelect,
      onDatesChange,
      displayFormat,
    } = this.props;

    let endDate;
    if (typeof displayFormat === 'string' && displayFormat !== 'P') {
      endDate = addHours(startOfDay(parse(endDateString, displayFormat, new Date())), 12);
    } else {
      endDate = addHours(startOfDay(parseISO(endDateString)), 12);
    }
    if (!isValid(endDate)) {
      endDate = null;
    }

    const isEndDateValid = endDate
      && !isOutsideRange(endDate) && !isDayBlocked(endDate)
      && !(startDate && isBeforeDay(endDate, addDays(startDate, minimumNights)));

    if (isEndDateValid) {
      onDatesChange({
        startDate,
        endDate,
      });
      if (!keepOpenOnDateSelect) this.onClearFocus();
    } else {
      onDatesChange({
        startDate,
        endDate: null,
      });
    }
  }

  onEndDateFocus() {
    const {
      startDate,
      onFocusChange,
      withFullScreenPortal,
      disabled,
    } = this.props;

    if (!startDate && withFullScreenPortal && (!disabled || disabled === END_DATE)) {
      // When the datepicker is full screen, we never want to focus the end date first
      // because there's no indication that that is the case once the datepicker is open and it
      // might confuse the user
      onFocusChange(START_DATE);
    } else if (!disabled || disabled === START_DATE) {
      onFocusChange(END_DATE);
    }
  }

  onStartDateChange(startDateString) {
    let { endDate } = this.props;
    const {
      isOutsideRange,
      isDayBlocked,
      minimumNights,
      onDatesChange,
      onFocusChange,
      disabled,
      displayFormat,
    } = this.props;

    let startDate;
    if (typeof displayFormat === 'string' && displayFormat !== 'P') {
      startDate = addHours(startOfDay(parse(startDateString, displayFormat, new Date())), 12);
    } else {
      startDate = addHours(startOfDay(parseISO(startDateString)), 12);
    }

    if (!isValid(startDate)) {
      startDate = null;
    }

    const isEndDateBeforeStartDate = isBeforeDay(endDate, addDays(startDate, minimumNights));

    const isStartDateValid = startDate
      && !isOutsideRange(startDate) && !isDayBlocked(startDate)
      && !(disabled === END_DATE && isEndDateBeforeStartDate);

    if (isStartDateValid) {
      if (isEndDateBeforeStartDate) {
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
    const { disabled, onFocusChange } = this.props;

    if (!disabled || disabled === END_DATE) {
      onFocusChange(START_DATE);
    }
  }

  getDisplayFormat() {
    const { displayFormat } = this.props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  getDateString(date) {
    const displayFormat = this.getDisplayFormat();
    const { locale } = this.props;
    if (date && displayFormat) {
      toLocalizedDateString(date, displayFormat, locale);
    }
    return toLocalizedDateString(date, null, locale);
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
      children,
      startDate,
      startDateId,
      startDatePlaceholderText,
      isStartDateFocused,
      startDateAriaLabel,
      endDate,
      endDateId,
      endDatePlaceholderText,
      endDateAriaLabel,
      isEndDateFocused,
      screenReaderMessage,
      showClearDates,
      showCaret,
      showDefaultInputIcon,
      inputIconPosition,
      customInputIcon,
      customArrowIcon,
      customCloseIcon,
      disabled,
      required,
      readOnly,
      openDirection,
      isFocused,
      phrases,
      onKeyDownArrowDown,
      onKeyDownQuestionMark,
      isRTL,
      noBorder,
      block,
      small,
      regular,
      verticalSpacing,
    } = this.props;

    const startDateString = this.getDateString(startDate);
    const endDateString = this.getDateString(endDate);

    return (
      <DateRangePickerInput
        startDate={startDateString}
        startDateId={startDateId}
        startDatePlaceholderText={startDatePlaceholderText}
        isStartDateFocused={isStartDateFocused}
        startDateAriaLabel={startDateAriaLabel}
        endDate={endDateString}
        endDateId={endDateId}
        endDatePlaceholderText={endDatePlaceholderText}
        isEndDateFocused={isEndDateFocused}
        endDateAriaLabel={endDateAriaLabel}
        isFocused={isFocused}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        openDirection={openDirection}
        showCaret={showCaret}
        showDefaultInputIcon={showDefaultInputIcon}
        inputIconPosition={inputIconPosition}
        customInputIcon={customInputIcon}
        customArrowIcon={customArrowIcon}
        customCloseIcon={customCloseIcon}
        phrases={phrases}
        onStartDateChange={this.onStartDateChange}
        onStartDateFocus={this.onStartDateFocus}
        onStartDateShiftTab={this.onClearFocus}
        onEndDateChange={this.onEndDateChange}
        onEndDateFocus={this.onEndDateFocus}
        showClearDates={showClearDates}
        onClearDates={this.clearDates}
        screenReaderMessage={screenReaderMessage}
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        isRTL={isRTL}
        noBorder={noBorder}
        block={block}
        small={small}
        regular={regular}
        verticalSpacing={verticalSpacing}
      >
        {children}
      </DateRangePickerInput>
    );
  }
}

DateRangePickerInputController.propTypes = propTypes;
DateRangePickerInputController.defaultProps = defaultProps;
