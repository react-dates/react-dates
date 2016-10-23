import React, { PropTypes } from 'react';

import DateInput from './DateInput';

const propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  dateValue: PropTypes.string,
  border: PropTypes.bool,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  showCaret: PropTypes.bool,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
};

const defaultProps = {
  placeholder: 'Select Date',
  dateValue: '',
  border: false,
  focused: false,
  disabled: false,
  required: false,
  showCaret: false,

  onChange() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},
};

export default function SingleDatePickerInput(props) {
  const {
    id,
    placeholder,
    dateValue,
    focused,
    disabled,
    required,
    showCaret,
    onChange,
    onFocus,
    onKeyDownShiftTab,
    onKeyDownTab,
  } = props;

  return (
    <div className="SingleDatePickerInput">
      <DateInput
        id={id}
        placeholder={placeholder} // also used as label
        dateValue={dateValue}
        focused={focused}
        disabled={disabled}
        required={required}
        showCaret={showCaret}

        onChange={onChange}
        onFocus={onFocus}
        onKeyDownShiftTab={onKeyDownShiftTab}
        onKeyDownTab={onKeyDownTab}
      />
    </div>
  );
}

SingleDatePickerInput.propTypes = propTypes;
SingleDatePickerInput.defaultProps = defaultProps;
