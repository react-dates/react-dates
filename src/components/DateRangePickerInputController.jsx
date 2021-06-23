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

  enddate: PropTypes.object,
  enddateId: PropTypes.string,
  enddatePlaceholderText: PropTypes.string,
  isEnddateFocused: PropTypes.bool,
  enddateAriaLabel: PropTypes.string,

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

  enddate: null,
  enddateId: END_DATE,
  enddatePlaceholderText: 'End Date',
  isEnddateFocused: false,
  enddateAriaLabel: undefined,

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
    this.onEnddateChange = this.onEnddateChange.bind(this);
    this.onEnddateFocus = this.onEnddateFocus.bind(this);
    this.clearDates = this.clearDates.bind(this);
  }

  onClearFocus() {
    const {
      onFocusChange,
      onClose,
      startDate,
      enddate,
    } = this.props;

    onFocusChange(null);
    onClose({ startDate, enddate });
  }

  onEnddateChange(enddateString) {
    const {
      startDate,
      isOutsideRange,
      isDayBlocked,
      minimumNights,
      keepOpenOnDateSelect,
      onDatesChange,
      displayFormat,
    } = this.props;

    let enddate;
    if (typeof displayFormat === 'string' && displayFormat !== 'P') {
      enddate = addHours(startOfDay(parse(enddateString, displayFormat, new Date())), 12);
    } else {
      enddate = addHours(startOfDay(parseISO(enddateString)), 12);
    }
    if (!isValid(enddate)) {
      enddate = null;
    }

    const isEnddateValid = enddate
      && !isOutsideRange(enddate) && !isDayBlocked(enddate)
      && !(startDate && isBeforeDay(enddate, addDays(startDate, minimumNights)));

    if (isEnddateValid) {
      onDatesChange({
        startDate,
        enddate,
      });
      if (!keepOpenOnDateSelect) this.onClearFocus();
    } else {
      onDatesChange({
        startDate,
        enddate: null,
      });
    }
  }

  onEnddateFocus() {
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
    let { enddate } = this.props;
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

    const isEnddateBeforeStartDate = isBeforeDay(enddate, addDays(startDate, minimumNights));

    const isStartDateValid = startDate
      && !isOutsideRange(startDate) && !isDayBlocked(startDate)
      && !(disabled === END_DATE && isEnddateBeforeStartDate);

    if (isStartDateValid) {
      if (isEnddateBeforeStartDate) {
        enddate = null;
      }

      onDatesChange({ startDate, enddate });
      onFocusChange(END_DATE);
    } else {
      onDatesChange({
        startDate: null,
        enddate,
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
    onDatesChange({ startDate: null, enddate: null });
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
      enddate,
      enddateId,
      enddatePlaceholderText,
      enddateAriaLabel,
      isEnddateFocused,
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
    const enddateString = this.getDateString(enddate);

    return (
      <DateRangePickerInput
        startDate={startDateString}
        startDateId={startDateId}
        startDatePlaceholderText={startDatePlaceholderText}
        isStartDateFocused={isStartDateFocused}
        startDateAriaLabel={startDateAriaLabel}
        enddate={enddateString}
        enddateId={enddateId}
        enddatePlaceholderText={enddatePlaceholderText}
        isEnddateFocused={isEnddateFocused}
        enddateAriaLabel={enddateAriaLabel}
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
        onEnddateChange={this.onEnddateChange}
        onEnddateFocus={this.onEnddateFocus}
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
