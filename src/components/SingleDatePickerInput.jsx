import React, { PropTypes } from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { SingleDatePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateInput from './DateInput';
import CloseButton from '../svg/close.svg';

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
  showCaret: PropTypes.bool,
  showClearDate: PropTypes.bool,
  customCloseIcon: PropTypes.node,

  onChange: PropTypes.func,
  onClearDate: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,

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
  showCaret: false,
  showClearDate: false,
  customCloseIcon: null,

  onChange() {},
  onClearDate() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},

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
      showCaret,
      showClearDate,
      phrases,
      onClearDate,
      onChange,
      onFocus,
      onKeyDownShiftTab,
      onKeyDownTab,
      screenReaderMessage,
      customCloseIcon,
    } = this.props;

    const closeIcon = customCloseIcon || (<CloseButton />);

    return (
      <div className="SingleDatePickerInput">
        <DateInput
          id={id}
          placeholder={placeholder} // also used as label
          displayValue={displayValue}
          inputValue={inputValue}
          screenReaderMessage={screenReaderMessage}
          focused={focused}
          isFocused={isFocused}
          disabled={disabled}
          required={required}
          showCaret={showCaret}

          onChange={onChange}
          onFocus={onFocus}
          onKeyDownShiftTab={onKeyDownShiftTab}
          onKeyDownTab={onKeyDownTab}
        />

        {showClearDate && (
          <button
            type="button"
            className={cx('SingleDatePickerInput__clear-date', {
              'SingleDatePickerInput__clear-date--hide': !displayValue,
              'SingleDatePickerInput__clear-date--hover': isClearDateHovered,
            })}
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
      </div>
    );
  }
}

SingleDatePickerInput.propTypes = propTypes;
SingleDatePickerInput.defaultProps = defaultProps;
