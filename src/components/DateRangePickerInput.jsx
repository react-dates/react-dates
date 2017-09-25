import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

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

export default class DateRangePickerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearDatesHovered: false,
    };

    this.onClearDatesMouseEnter = this.onClearDatesMouseEnter.bind(this);
    this.onClearDatesMouseLeave = this.onClearDatesMouseLeave.bind(this);
  }

  onClearDatesMouseEnter() {
    this.setState({
      isClearDatesHovered: true,
    });
  }

  onClearDatesMouseLeave() {
    this.setState({
      isClearDatesHovered: false,
    });
  }

  render() {
    const { isClearDatesHovered } = this.state;
    const {
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
      openDirection,
      showCaret,
      showDefaultInputIcon,
      inputIconPosition,
      customInputIcon,
      customArrowIcon,
      customCloseIcon,
      isFocused,
      phrases,
      isRTL,
    } = this.props;

    const calendarIcon = customInputIcon || (<CalendarIcon />);
    const arrowIcon = customArrowIcon || (isRTL ? <LeftArrow /> : <RightArrow />);
    const closeIcon = customCloseIcon || (<CloseButton />);
    const screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
    const inputIcon = (showDefaultInputIcon || customInputIcon !== null) && (
      <button
        type="button"
        className="DateRangePickerInput__calendar-icon"
        disabled={disabled}
        aria-label={phrases.focusStartDate}
        onClick={onArrowDown}
      >
        {calendarIcon}
      </button>
    );

    return (
      <div
        className={cx('DateRangePickerInput', {
          'DateRangePickerInput--disabled': disabled,
          'DateRangePickerInput--rtl': isRTL,
        })}
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
          openDirection={openDirection}
          showCaret={showCaret}

          onChange={onStartDateChange}
          onFocus={onStartDateFocus}
          onKeyDownShiftTab={onStartDateShiftTab}
          onKeyDownArrowDown={onArrowDown}
          onKeyDownQuestionMark={onQuestionMark}
        />

        <div
          className="DateRangePickerInput__arrow"
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
          openDirection={openDirection}
          showCaret={showCaret}

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
            className={cx('DateRangePickerInput__clear-dates', {
              'DateRangePickerInput__clear-dates--hide': !(startDate || endDate),
              'DateRangePickerInput__clear-dates--hover': isClearDatesHovered,
            })}
            disabled={disabled}
            onMouseEnter={this.onClearDatesMouseEnter}
            onMouseLeave={this.onClearDatesMouseLeave}
            onClick={onClearDates}
          >
            <div className="DateRangePickerInput__close-icon">
              {closeIcon}
            </div>
          </button>
        )}

        {inputIconPosition === ICON_AFTER_POSITION && inputIcon}

      </div>
    );
  }
}

DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;
