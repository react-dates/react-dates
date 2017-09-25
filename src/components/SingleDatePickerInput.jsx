import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { SingleDatePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';

import CloseButton from '../svg/close.svg';
import CalendarIcon from '../svg/calendar.svg';

import openDirectionShape from '../shapes/OpenDirectionShape';
import { ICON_BEFORE_POSITION, ICON_AFTER_POSITION, OPEN_DOWN } from '../../constants';

const propTypes = forbidExtraProps({
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  displayValue: PropTypes.string,
  inputValue: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  isFocused: PropTypes.bool, // describes actual DOM focus
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  showClearDate: PropTypes.bool,
  customCloseIcon: PropTypes.node,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  isRTL: PropTypes.bool,
  onChange: PropTypes.func,
  onClearDate: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerInputPhrases)),
});

const defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
  inputValue: '',
  screenReaderMessage: '',
  focused: false,
  isFocused: false,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  showCaret: false,
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customCloseIcon: null,
  customInputIcon: null,
  isRTL: false,

  onChange() {},
  onClearDate() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},
  onKeyDownArrowDown() {},

  // i18n
  phrases: SingleDatePickerInputPhrases,
};

export default class SingleDatePickerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearDateHovered: false,
    };

    this.onClearDateMouseEnter = this.onClearDateMouseEnter.bind(this);
    this.onClearDateMouseLeave = this.onClearDateMouseLeave.bind(this);
  }

  onClearDateMouseEnter() {
    this.setState({
      isClearDateHovered: true,
    });
  }

  onClearDateMouseLeave() {
    this.setState({
      isClearDateHovered: false,
    });
  }

  render() {
    const { isClearDateHovered } = this.state;
    const {
      id,
      placeholder,
      displayValue,
      inputValue,
      focused,
      isFocused,
      disabled,
      required,
      readOnly,
      openDirection,
      showCaret,
      showClearDate,
      showDefaultInputIcon,
      inputIconPosition,
      phrases,
      onClearDate,
      onChange,
      onFocus,
      onKeyDownShiftTab,
      onKeyDownTab,
      onKeyDownArrowDown,
      screenReaderMessage,
      customCloseIcon,
      customInputIcon,
      isRTL,
    } = this.props;

    const calendarIcon = customInputIcon || (<CalendarIcon />);
    const closeIcon = customCloseIcon || (<CloseButton />);
    const screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
    const inputIcon = (showDefaultInputIcon || customInputIcon !== null) && (
      <button
        type="button"
        className="SingleDatePickerInput__calendar-icon"
        disabled={disabled}
        aria-label={phrases.focusStartDate}
        onClick={onFocus}
      >
        {calendarIcon}
      </button>
    );

    return (
      <div
        className={cx('SingleDatePickerInput', {
          'SingleDatePickerInput--disabled': disabled,
          'SingleDatePickerInput--rtl': isRTL,
        })}
      >

        {inputIconPosition === ICON_BEFORE_POSITION && inputIcon}

        <DateInput
          id={id}
          placeholder={placeholder} // also used as label
          displayValue={displayValue}
          inputValue={inputValue}
          screenReaderMessage={screenReaderText}
          focused={focused}
          isFocused={isFocused}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          openDirection={openDirection}
          showCaret={showCaret}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDownShiftTab={onKeyDownShiftTab}
          onKeyDownTab={onKeyDownTab}
          onKeyDownArrowDown={onKeyDownArrowDown}
        />

        {showClearDate && (
          <button
            type="button"
            className={cx('SingleDatePickerInput__clear-date', {
              'SingleDatePickerInput__clear-date--hide': !displayValue,
              'SingleDatePickerInput__clear-date--hover': isClearDateHovered,
            })}
            disabled={disabled}
            aria-label={phrases.clearDate}
            onMouseEnter={this.onClearDateMouseEnter}
            onMouseLeave={this.onClearDateMouseLeave}
            onClick={onClearDate}
          >
            <div className="DateRangePickerInput__close">
              {closeIcon}
            </div>
          </button>
        )}

        {inputIconPosition === ICON_AFTER_POSITION && inputIcon}

      </div>
    );
  }
}

SingleDatePickerInput.propTypes = propTypes;
SingleDatePickerInput.defaultProps = defaultProps;
