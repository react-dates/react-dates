import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { css, withStyles } from 'react-with-styles';

import withStylesPropTypes from '../shapes/withStylesPropTypes';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import openDirectionShape from '../shapes/OpenDirectionShape';

import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';

import RightArrow from '../svg/arrow-right.svg';
import LeftArrow from '../svg/arrow-left.svg';
import CloseButton from '../svg/close.svg';
import CalendarIcon from '../svg/calendar.svg';

import {
  START_DATE,
  END_DATE,
  ICON_BEFORE_POSITION,
  ICON_AFTER_POSITION,
  OPEN_DOWN,
} from '../../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  screenReaderMessage: PropTypes.string,

  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,

  onStartDateFocus: PropTypes.func,
  onEndDateFocus: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onStartDateShiftTab: PropTypes.func,
  onEndDateTab: PropTypes.func,
  onClearDates: PropTypes.func,
  onArrowDown: PropTypes.func,
  onQuestionMark: PropTypes.func,

  startDate: PropTypes.string,
  startDateValue: PropTypes.string,
  endDate: PropTypes.string,
  endDateValue: PropTypes.string,

  isStartDateFocused: PropTypes.bool,
  isEndDateFocused: PropTypes.bool,
  showClearDates: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,

  // accessibility
  isFocused: PropTypes.bool, // describes actual DOM focus

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  screenReaderMessage: '',
  onStartDateFocus() {},
  onEndDateFocus() {},
  onStartDateChange() {},
  onEndDateChange() {},
  onStartDateShiftTab() {},
  onEndDateTab() {},
  onClearDates() {},
  onArrowDown() {},
  onQuestionMark() {},

  startDate: '',
  startDateValue: '',
  endDate: '',
  endDateValue: '',

  isStartDateFocused: false,
  isEndDateFocused: false,
  showClearDates: false,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false,
};

function DateRangePickerInput({
  startDate,
  startDateValue,
  startDateId,
  startDatePlaceholderText,
  screenReaderMessage,
  isStartDateFocused,
  onStartDateChange,
  onStartDateFocus,
  onStartDateShiftTab,
  endDate,
  endDateValue,
  endDateId,
  endDatePlaceholderText,
  isEndDateFocused,
  onEndDateChange,
  onEndDateFocus,
  onEndDateTab,
  onArrowDown,
  onQuestionMark,
  onClearDates,
  showClearDates,
  disabled,
  required,
  readOnly,
  showCaret,
  openDirection,
  showDefaultInputIcon,
  inputIconPosition,
  customInputIcon,
  customArrowIcon,
  customCloseIcon,
  isFocused,
  phrases,
  isRTL,
  styles,
}) {
  const calendarIcon =
    customInputIcon || (<CalendarIcon {...css(styles.DateRangePickerInput_calendarIcon_svg)} />);
  const arrowIcon =
    customArrowIcon ||
    (isRTL ?
      <LeftArrow {...css(styles.DateRangePickerInput_arrow_svg)} /> :
      <RightArrow {...css(styles.DateRangePickerInput_arrow_svg)} />
    );
  const closeIcon =
    customCloseIcon || (<CloseButton {...css(styles.DateRangePickerInput_clearDates_svg)} />);
  const screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
  const inputIcon = (showDefaultInputIcon || customInputIcon !== null) && (
    <button
      {...css(styles.DateRangePickerInput_calendarIcon)}
      type="button"
      disabled={disabled}
      aria-label={phrases.focusStartDate}
      onClick={onArrowDown}
    >
      {calendarIcon}
    </button>
  );

  return (
    <div
      {...css(
        styles.DateRangePickerInput,
        disabled && styles.DateRangePickerInput__disabled,
        isRTL && styles.DateRangePickerInput__rtl,
      )}
    >
      {inputIconPosition === ICON_BEFORE_POSITION && inputIcon}

      <DateInput
        id={startDateId}
        placeholder={startDatePlaceholderText}
        displayValue={startDate}
        inputValue={startDateValue}
        screenReaderMessage={screenReaderText}
        focused={isStartDateFocused}
        isFocused={isFocused}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        showCaret={showCaret}
        openDirection={openDirection}
        onChange={onStartDateChange}
        onFocus={onStartDateFocus}
        onKeyDownShiftTab={onStartDateShiftTab}
        onKeyDownArrowDown={onArrowDown}
        onKeyDownQuestionMark={onQuestionMark}
      />

      <div
        {...css(styles.DateRangePickerInput_arrow)}
        aria-hidden="true"
        role="presentation"
      >
        {arrowIcon}
      </div>

      <DateInput
        id={endDateId}
        placeholder={endDatePlaceholderText}
        displayValue={endDate}
        inputValue={endDateValue}
        screenReaderMessage={screenReaderText}
        focused={isEndDateFocused}
        isFocused={isFocused}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        showCaret={showCaret}
        openDirection={openDirection}
        onChange={onEndDateChange}
        onFocus={onEndDateFocus}
        onKeyDownTab={onEndDateTab}
        onKeyDownArrowDown={onArrowDown}
        onKeyDownQuestionMark={onQuestionMark}
      />

      {showClearDates && (
        <button
          type="button"
          aria-label={phrases.clearDates}
          {...css(
            styles.DateRangePickerInput_clearDates,
            !(startDate || endDate) && styles.DateRangePickerInput_clearDates__hide,
          )}
          onMouseEnter={this.onClearDatesMouseEnter}
          onMouseLeave={this.onClearDatesMouseLeave}
          onClick={onClearDates}
          disabled={disabled}
        >
          {closeIcon}
        </button>
      )}

      {inputIconPosition === ICON_AFTER_POSITION && inputIcon}

    </div>
  );
}

DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;

export default withStyles(({ color, sizing }) => ({
  DateRangePickerInput: {
    backgroundColor: color.background,
    border: `1px solid ${color.core.grayLighter}`,
    display: 'inline-block',
  },

  DateRangePickerInput__disabled: {
    background: color.disabled,
  },

  DateRangePickerInput__rtl: {
    direction: 'rtl',
  },

  DateRangePickerInput_arrow: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },

  DateRangePickerInput_arrow_svg: {
    verticalAlign: 'middle',
    fill: color.text,
    height: sizing.arrowWidth,
    width: sizing.arrowWidth,
  },

  DateRangePickerInput_clearDates: {
    background: 'none',
    border: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',

    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: 10,
    margin: '0 10px 0 5px',

    ':focus': {
      background: color.core.border,
      borderRadius: '50%',
    },

    ':hover': {
      background: color.core.border,
      borderRadius: '50%',
    },
  },

  DateRangePickerInput_clearDates__hide: {
    visibility: 'hidden',
  },

  DateRangePickerInput_clearDates_svg: {
    fill: color.core.grayLight,
    height: 12,
    width: 15,
    verticalAlign: 'middle',
  },

  DateRangePickerInput_calendarIcon: {
    background: 'none',
    border: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',

    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: 10,
    margin: '0 5px 0 10px',
  },

  DateRangePickerInput_calendarIcon_svg: {
    fill: color.core.grayLight,
    height: 15,
    width: 14,
    verticalAlign: 'middle',
  },
}))(DateRangePickerInput);
