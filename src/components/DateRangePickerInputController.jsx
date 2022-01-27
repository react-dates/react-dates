import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import openDirectionShape from '../shapes/OpenDirectionShape';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateRangePickerInput from './DateRangePickerInput';

import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';

import toMomentObject from '../utils/toMomentObject';
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

  startDate: momentPropTypes.momentObj,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  isStartDateFocused: PropTypes.bool,
  startDateAriaLabel: PropTypes.string,
  startDateTitleText: PropTypes.string,

  endDate: momentPropTypes.momentObj,
  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  isEndDateFocused: PropTypes.bool,
  endDateAriaLabel: PropTypes.string,
  endDateTitleText: PropTypes.string,

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
  autoComplete: PropTypes.string,

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

  isRTL: PropTypes.bool,
});

const defaultProps = {
  children: null,

  startDate: null,
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateFocused: false,
  startDateAriaLabel: undefined,
  startDateTitleText: undefined,

  endDate: null,
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateFocused: false,
  endDateAriaLabel: undefined,
  endDateTitleText: undefined,

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
  autoComplete: 'off',

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  minimumNights: 1,
  isOutsideRange: (day) => !isInclusivelyAfterDay(day, moment()),
  isDayBlocked: () => false,
  displayFormat: () => moment.localeData().longDateFormat('L'),

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

  isRTL: false,
};

const DateRangePickerInputController = memo((props) => {
  const {
    startDate,
    children,
    startDateId,
    startDatePlaceholderText,
    isStartDateFocused,
    startDateAriaLabel,
    startDateTitleText,
    endDate,
    endDateId,
    endDatePlaceholderText,
    endDateAriaLabel,
    endDateTitleText,
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
    autoComplete,
  } = props;

  const getDisplayFormat = () => {
    const { displayFormat } = props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  };

  const getDateString = (date) => {
    const displayFormat = getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date);
  };

  const clearDates = () => {
    const { onDatesChange, reopenPickerOnClearDates, onFocusChange } = props;
    onDatesChange({ startDate: null, endDate: null });
    if (reopenPickerOnClearDates) {
      onFocusChange(START_DATE);
    }
  };

  const handleClearFocus = () => {
    const {
      onFocusChange,
      onClose,
      startDate,
      endDate,
    } = props;

    onFocusChange(null);
    onClose({ startDate, endDate });
  };

  const handleEndDateChange = (endDateString) => {
    const {
      startDate,
      isOutsideRange,
      isDayBlocked,
      minimumNights,
      keepOpenOnDateSelect,
      onDatesChange,
      onClose,
      onFocusChange,
    } = props;

    const endDate = toMomentObject(endDateString, getDisplayFormat());

    const isEndDateValid = endDate
      && !isOutsideRange(endDate) && !isDayBlocked(endDate)
      && !(startDate && isBeforeDay(endDate, startDate.clone().add(minimumNights, 'days')));
    if (isEndDateValid) {
      onDatesChange({ startDate, endDate });
      if (!keepOpenOnDateSelect) {
        onFocusChange(null);
        onClose({ startDate, endDate });
      }
    } else {
      onDatesChange({
        startDate,
        endDate: null,
      });
    }
  };

  const handleEndDateFocus = () => {
    const {
      startDate,
      onFocusChange,
      withFullScreenPortal,
      disabled,
    } = props;

    if (!startDate && withFullScreenPortal && (!disabled || disabled === END_DATE)) {
      // When the datepicker is full screen, we never want to focus the end date first
      // because there's no indication that that is the case once the datepicker is open and it
      // might confuse the user
      onFocusChange(START_DATE);
    } else if (!disabled || disabled === START_DATE) {
      onFocusChange(END_DATE);
    }
  };

  const handleStartDateChange = (startDateString) => {
    let { endDate } = props;
    const {
      isOutsideRange,
      isDayBlocked,
      minimumNights,
      onDatesChange,
      onFocusChange,
      disabled,
    } = props;

    const startDate = toMomentObject(startDateString, getDisplayFormat());
    const isEndDateBeforeStartDate = startDate
      && isBeforeDay(endDate, startDate.clone().add(minimumNights, 'days'));
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
  };

  const handleStartDateFocus = () => {
    const { disabled, onFocusChange } = props;

    if (!disabled || disabled === END_DATE) {
      onFocusChange(START_DATE);
    }
  };

  const startDateString = getDateString(startDate);
  const endDateString = getDateString(endDate);

  return (
    <DateRangePickerInput
      startDate={startDateString}
      startDateId={startDateId}
      startDatePlaceholderText={startDatePlaceholderText}
      isStartDateFocused={isStartDateFocused}
      startDateAriaLabel={startDateAriaLabel}
      startDateTitleText={startDateTitleText}
      endDate={endDateString}
      endDateId={endDateId}
      endDatePlaceholderText={endDatePlaceholderText}
      isEndDateFocused={isEndDateFocused}
      endDateAriaLabel={endDateAriaLabel}
      endDateTitleText={endDateTitleText}
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
      onStartDateChange={handleStartDateChange}
      onStartDateFocus={handleStartDateFocus}
      onStartDateShiftTab={handleClearFocus}
      onEndDateChange={handleEndDateChange}
      onEndDateFocus={handleEndDateFocus}
      showClearDates={showClearDates}
      onClearDates={clearDates}
      screenReaderMessage={screenReaderMessage}
      onKeyDownArrowDown={onKeyDownArrowDown}
      onKeyDownQuestionMark={onKeyDownQuestionMark}
      isRTL={isRTL}
      noBorder={noBorder}
      block={block}
      small={small}
      regular={regular}
      verticalSpacing={verticalSpacing}
      autoComplete={autoComplete}
    >
      {children}
    </DateRangePickerInput>
  );
});

DateRangePickerInputController.propTypes = propTypes;
DateRangePickerInputController.defaultProps = defaultProps;

export default DateRangePickerInputController;
