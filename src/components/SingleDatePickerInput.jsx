import React, { PropTypes } from 'react';
import { css, withStyles } from 'react-with-styles';

import DateInput from './DateInput';

const propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  dateValue: PropTypes.string,
  border: PropTypes.bool,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  showCaret: PropTypes.bool,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  placeholder: 'Select Date',
  dateValue: '',
  border: false,
  focused: false,
  disabled: false,
  showCaret: false,

  onChange() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},
};

function SingleDatePickerInput(props) {
  const {
    id,
    placeholder,
    dateValue,
    focused,
    disabled,
    showCaret,
    onChange,
    onFocus,
    onKeyDownShiftTab,
    onKeyDownTab,
    styles,
  } = props;

  return (
    <div {...css(styles.component)}>
      <DateInput
        id={id}
        placeholder={placeholder} // also used as label
        dateValue={dateValue}
        focused={focused}
        disabled={disabled}
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

export default withStyles(({ reactDates }) => ({
  component: {
    border: `1px solid ${reactDates.color.border_input}`,
  },
}))(SingleDatePickerInput);
