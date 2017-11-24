import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import throttle from 'lodash/throttle';
import isTouchDevice from 'is-touch-device';

import openDirectionShape from '../shapes/OpenDirectionShape';
import { OPEN_DOWN, OPEN_UP } from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  displayValue: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,

  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  // accessibility
  isFocused: PropTypes.bool, // describes actual DOM focus
});

const defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
  screenReaderMessage: '',
  focused: false,
  disabled: false,
  required: false,
  readOnly: null,
  openDirection: OPEN_DOWN,
  showCaret: false,

  onChange() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},

  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  // accessibility
  isFocused: false,
};

class DateInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateString: '',
      isTouchDevice: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
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
    const { focused, isFocused } = this.props;
    if (prevProps.focused === focused && prevProps.isFocused === isFocused) return;

    if (focused && isFocused) {
      this.inputRef.focus();
    } else {
      this.inputRef.blur();
    }
  }

  onChange(e) {
    const { onChange, onKeyDownQuestionMark } = this.props;
    const dateString = e.target.value;

    // In Safari, onKeyDown does not consistently fire ahead of onChange. As a result, we need to
    // special case the `?` key so that it always triggers the appropriate callback, instead of
    // modifying the input value
    if (dateString[dateString.length - 1] === '?') {
      onKeyDownQuestionMark(e);
    } else {
      this.setState({ dateString });
      onChange(dateString);
    }
  }

  onKeyDown(e) {
    e.stopPropagation();

    const {
      onKeyDownShiftTab,
      onKeyDownTab,
      onKeyDownArrowDown,
      onKeyDownQuestionMark,
    } = this.props;

    const { key } = e;
    if (key === 'Tab') {
      if (e.shiftKey) {
        onKeyDownShiftTab(e);
      } else {
        onKeyDownTab(e);
      }
    } else if (key === 'ArrowDown') {
      onKeyDownArrowDown(e);
    } else if (key === '?') {
      e.preventDefault();
      onKeyDownQuestionMark(e);
    }
  }

  setInputRef(ref) {
    this.inputRef = ref;
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
      screenReaderMessage,
      focused,
      showCaret,
      onFocus,
      disabled,
      required,
      readOnly,
      openDirection,
      styles,
    } = this.props;

    const value = displayValue || dateString || '';
    const screenReaderMessageId = `DateInput__screen-reader-message-${id}`;

    const withCaret = showCaret && focused;

    return (
      <div
        {...css(
          styles.DateInput,
          withCaret && styles.DateInput__withCaret,
          disabled && styles.DateInput__disabled,
          withCaret && openDirection === OPEN_DOWN && styles.DateInput__openDown,
          withCaret && openDirection === OPEN_UP && styles.DateInput__openUp,
        )}
      >
        <input
          {...css(
            styles.DateInput_input,
            readOnly && styles.DateInput_input__readOnly,
            focused && styles.DateInput_input__focused,
            disabled && styles.DateInput_input__disabled,
          )}
          aria-label={placeholder}
          type="text"
          id={id}
          name={id}
          ref={this.setInputRef}
          value={value}
          onChange={this.onChange}
          onKeyDown={throttle(this.onKeyDown, 300)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          readOnly={typeof readOnly === 'boolean' ? readOnly : isTouch}
          required={required}
          aria-describedby={screenReaderMessage && screenReaderMessageId}
        />

        {screenReaderMessage && (
          <p {...css(styles.DateInput_screenReaderMessage)} id={screenReaderMessageId}>
            {screenReaderMessage}
          </p>
        )}
      </div>
    );
  }
}

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;

export default withStyles(({
  reactDates: {
    border, color, sizing, spacing, font, zIndex,
  },
}) => {
  const inputHeight = parseInt(font.input.lineHeight, 10)
    + (2 * spacing.inputPadding)
    + (2 * spacing.displayTextPaddingVertical);

  return {
    DateInput: {
      fontWeight: 200,
      fontSize: font.input.size,
      lineHeight: font.input.lineHeight,
      color: color.placeholderText,
      margin: 0,
      padding: spacing.inputPadding,

      background: color.background,
      position: 'relative',
      display: 'inline-block',
      width: sizing.inputWidth,
      verticalAlign: 'middle',
    },

    DateInput__withCaret: {
      ':before': {
        content: '""',
        display: 'inline-block',
        position: 'absolute',
        bottom: 'auto',
        border: `${sizing.tooltipArrowWidth / 2}px solid transparent`,
        left: 22,
        zIndex: zIndex + 2,
      },

      ':after': {
        content: '""',
        display: 'inline-block',
        position: 'absolute',
        bottom: 'auto',
        border: `${sizing.tooltipArrowWidth / 2}px solid transparent`,
        left: 22,
        zIndex: zIndex + 2,
      },
    },

    DateInput__openUp: {
      ':before': {
        borderBottom: 0,
        top: inputHeight - spacing.inputMarginBottom,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
      },

      ':after': {
        borderBottom: 0,
        top: inputHeight - spacing.inputMarginBottom - 1,
        borderTopColor: color.background,
      },
    },

    DateInput__openDown: {
      ':before': {
        borderTop: 0,
        top: spacing.inputMarginBottom - (sizing.tooltipArrowWidth / 2),
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      },

      ':after': {
        borderTop: 0,
        top: spacing.inputMarginBottom - (sizing.tooltipArrowWidth / 2) + 1,
        borderBottomColor: color.background,
      },
    },

    DateInput__disabled: {
      background: color.disabled,
      color: color.textDisabled,
    },

    DateInput_input: {
      fontWeight: 200,
      fontSize: font.input.size,
      color: color.text,
      backgroundColor: color.background,
      width: '100%',
      padding: `${spacing.displayTextPaddingVertical}px ${spacing.displayTextPaddingHorizontal}px`,
      border: border.input.border,
      borderTop: border.input.borderTop,
      borderRight: border.input.borderRight,
      borderBottom: border.input.borderBottom,
      borderLeft: border.input.borderLeft,
    },

    DateInput_input__readOnly: {
      userSelect: 'none',
    },

    DateInput_input__focused: {
      outline: border.input.outlineFocused,
      background: color.backgroundFocused,
      border: border.input.borderFocused,
      borderTop: border.input.borderTopFocused,
      borderRight: border.input.borderRightFocused,
      borderBottom: border.input.borderBottomFocused,
      borderLeft: border.input.borderLeftFocused,
    },

    DateInput_input__disabled: {
      background: color.disabled,
      fontStyle: font.input.styleDisabled,
    },

    DateInput_screenReaderMessage: {
      border: 0,
      clip: 'rect(0, 0, 0, 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: 1,
    },
  };
})(DateInput);
