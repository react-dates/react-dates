import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import openDirectionShape from '../shapes/OpenDirectionShape';

import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';

import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import CloseButton from './CloseButton';
import CalendarIcon from './CalendarIcon';

import {
  START_DATE,
  END_DATE,
  ICON_BEFORE_POSITION,
  ICON_AFTER_POSITION,
  OPEN_DOWN,
} from '../constants';

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
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  startDate: PropTypes.string,
  endDate: PropTypes.string,

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
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

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
  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  startDate: '',
  endDate: '',

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
  noBorder: false,
  block: false,
  small: false,
  verticalSpacing: undefined,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false,
};

function DateRangePickerInput({
  startDate,
  startDateId,
  startDatePlaceholderText,
  screenReaderMessage,
  isStartDateFocused,
  onStartDateChange,
  onStartDateFocus,
  onStartDateShiftTab,
  endDate,
  endDateId,
  endDatePlaceholderText,
  isEndDateFocused,
  onEndDateChange,
  onEndDateFocus,
  onEndDateTab,
  onKeyDownArrowDown,
  onKeyDownQuestionMark,
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
  noBorder,
  block,
  verticalSpacing,
  small,
  styles,
}) {
  const calendarIcon = customInputIcon || (
    <CalendarIcon {...css(styles.DateRangePickerInput_calendarIcon_svg)} />
  );
  const arrowIcon = customArrowIcon || (isRTL
    ? (
      <LeftArrow
        {...css(
          styles.DateRangePickerInput_arrow_svg,
          small && styles.DateRangePickerInput_arrow_svg__small,
        )}
      />
    ) : (
      <RightArrow
        {...css(
          styles.DateRangePickerInput_arrow_svg,
          small && styles.DateRangePickerInput_arrow_svg__small,
        )}
      />
    )
  );
  const closeIcon = customCloseIcon || (
    <CloseButton
      {...css(
        styles.DateRangePickerInput_clearDates_svg,
        small && styles.DateRangePickerInput_clearDates_svg__small,
      )}
    />
  );
  const screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
  const inputIcon = (showDefaultInputIcon || customInputIcon !== null) && (
    <button
      {...css(styles.DateRangePickerInput_calendarIcon)}
      type="button"
      disabled={disabled}
      aria-label={phrases.focusStartDate}
      onClick={onKeyDownArrowDown}
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
        !noBorder && styles.DateRangePickerInput__withBorder,
        block && styles.DateRangePickerInput__block,
        showClearDates && styles.DateRangePickerInput__showClearDates,
      )}
    >
      {inputIconPosition === ICON_BEFORE_POSITION && inputIcon}

      <DateInput
        id={startDateId}
        placeholder={startDatePlaceholderText}
        displayValue={startDate}
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
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        verticalSpacing={verticalSpacing}
        small={small}
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
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        verticalSpacing={verticalSpacing}
        small={small}
      />

      {showClearDates && (
        <button
          type="button"
          aria-label={phrases.clearDates}
          {...css(
            styles.DateRangePickerInput_clearDates,
            small && styles.DateRangePickerInput_clearDates__small,
            !customCloseIcon && styles.DateRangePickerInput_clearDates_default,
            !(startDate || endDate) && styles.DateRangePickerInput_clearDates__hide,
          )}
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

export default withStyles(({ reactDates: { color, sizing } }) => ({
  DateRangePickerInput: {
    backgroundColor: color.background,
    display: 'inline-block',
  },

  DateRangePickerInput__disabled: {
    background: color.disabled,
  },

  DateRangePickerInput__withBorder: {
    border: `1px solid ${color.core.grayLighter}`,
  },

  DateRangePickerInput__rtl: {
    direction: 'rtl',
  },

  DateRangePickerInput__block: {
    display: 'block',
  },

  DateRangePickerInput__showClearDates: {
    paddingRight: 30,
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

  DateRangePickerInput_arrow_svg__small: {
    height: sizing.arrowWidth_small,
    width: sizing.arrowWidth_small,
  },

  DateRangePickerInput_clearDates: {
    background: 'none',
    border: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',

    cursor: 'pointer',
    padding: 10,
    margin: '0 10px 0 5px',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },

  DateRangePickerInput_clearDates__small: {
    padding: 6,
  },

  DateRangePickerInput_clearDates_default: {
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

  DateRangePickerInput_clearDates_svg__small: {
    height: 9,
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
