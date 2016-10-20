import React, { PropTypes } from 'react';
import { css, withStyles } from 'react-with-styles';

import isTouchDevice from '../utils/isTouchDevice';

const propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  dateValue: PropTypes.string,
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
  focused: false,
  disabled: false,
  showCaret: false,

  onChange() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},
};

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.isTouchDevice = isTouchDevice();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.dateValue && nextProps.dateValue) {
      this.setState({
        dateString: '',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { focused } = this.props;
    if (prevProps.focused !== focused && focused) {
      this.inputRef.focus();
      this.inputRef.select();
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
    const { dateString } = this.state;
    const {
      id,
      placeholder,
      dateValue,
      focused,
      showCaret,
      onFocus,
      disabled,
      styles,
    } = this.props;

    const value = dateValue || dateString;

    return (
      <div
        {...css(
          styles.container,
          showCaret && focused && styles.container_caret,
          disabled && styles.container_disabled
        )}
        onClick={onFocus}
      >
        <label {...css(styles.label)} htmlFor={id}>
          {placeholder}
        </label>

        <input
          {...css(styles.input)}
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
          maxLength={10}
          disabled={disabled || this.isTouchDevice}
        />

        <div
          {...css(
            styles.displaytext,
            !!value && styles.displaytext_has_input,
            focused && styles.displaytext_focused,
            disabled && styles.displaytext_disabled
          )}
        >
          {value || placeholder}
        </div>
      </div>
    );
  }
}

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;

export default withStyles(({ reactDates }) => ({
  container: {
    fontWeight: 200,
    fontSize: 18,
    lineHeight: '24px',
    color: reactDates.color.input_placeholder_color,
    margin: 0,
    padding: 8,

    background: reactDates.color.input_background,
    position: 'relative',
    display: 'inline-block',
    width: reactDates.size.input_width,
    verticalAlign: 'middle',
  },

  container_caret: {
    // this isn't working for some reason?
    ':before': {
      content: '',
      display: 'inline-block',
      position: 'absolute',
      top: reactDates.size.input_vertical_spacing -
        (reactDates.size.input_caret_width / 2),
      bottom: 'auto',
      border: `${reactDates.size.input_caret_width / 2}px solid transparent`,
      borderTop: 0,
      zIndex: 2,
      left: 22,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },

    ':after': {
      content: '',
      display: 'inline-block',
      position: 'absolute',
      top: reactDates.size.input_vertical_spacing -
        (reactDates.size.input_caret_width / 2),
      bottom: 'auto',
      border: `${reactDates.size.input_caret_width / 2}px solid transparent`,
      borderTop: 0,
      zIndex: 2,
      left: 23,
      borderBottomColor: '#fff',
    },
  },

  container_disabled: {
    background: reactDates.color.input_background_disabled,
  },

  label: {
    border: 0,
    clip: 'rect(0, 0, 0, 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
  },

  input: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    border: 0,
    height: '100%',
    width: '100%',
  },

  displaytext: {
    padding: '4px 8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  displaytext_has_input: {
    color: reactDates.color.input_text_color,
  },

  displaytext_focused: {
    background: reactDates.color.input_background_focused,
    borderColor: reactDates.color.input_background_focused,
    borderRadius: 3,
    color: reactDates.color.input_text_color_focused,
  },

  displaytext_disabled: {
    fontStyle: 'italic',
  },
}))(DateInput);

