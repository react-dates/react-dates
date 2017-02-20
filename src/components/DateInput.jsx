import React, { PropTypes } from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import isTouchDevice from '../utils/isTouchDevice';

const propTypes = forbidExtraProps({
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  displayValue: PropTypes.string,
  inputValue: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  showCaret: PropTypes.bool,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
});

const defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
  inputValue: '',
  screenReaderMessage: '',
  focused: false,
  disabled: false,
  required: false,
  showCaret: false,

  onChange() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},
};

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
      isTouchDevice: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.setState({ isTouchDevice: isTouchDevice() });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.displayValue && nextProps.displayValue) {
      this.setState({
        dateString: '',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { focused } = this.props;
    if (prevProps.focused === focused) return;

    if (focused) {
      this.inputRef.focus();
      this.inputRef.select();
    } else {
      this.inputRef.blur();
    }
  }

  onChange(e) {
    const dateString = e.target.value;

    this.setState({ dateString });
    this.props.onChange(dateString);
  }

  onKeyDown(e) {
    const { onKeyDownShiftTab, onKeyDownTab } = this.props;
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        onKeyDownShiftTab(e);
      } else {
        onKeyDownTab(e);
      }
    }
  }

  render() {
    const {
      dateString,
      isTouchDevice: isTouch,
    } = this.state;
    const {
      id,
      placeholder,
      displayValue,
      inputValue,
      screenReaderMessage,
      focused,
      showCaret,
      onFocus,
      disabled,
      required,
    } = this.props;

    const displayText = displayValue || inputValue || dateString || placeholder || '';
    const value = inputValue || displayValue || dateString || '';
    const screenReaderMessageId = `DateInput__screen-reader-message-${id}`;

    return (
      <div
        className={cx('DateInput', {
          'DateInput--with-caret': showCaret && focused,
          'DateInput--disabled': disabled,
        })}
      >
        <input
          aria-label={placeholder}
          className="DateInput__input"
          type="text"
          id={id}
          name={id}
          ref={(ref) => { this.inputRef = ref; }}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          readOnly={isTouch}
          required={required}
          aria-describedby={screenReaderMessage && screenReaderMessageId}
        />

        {screenReaderMessage &&
          <p id={screenReaderMessageId} className="screen-reader-only">
            {screenReaderMessage}
          </p>
        }

        <div
          className={cx('DateInput__display-text', {
            'DateInput__display-text--has-input': !!value,
            'DateInput__display-text--focused': focused,
            'DateInput__display-text--disabled': disabled,
          })}
        >
          {displayText}
        </div>
      </div>
    );
  }
}

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;
