var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import _objectAssign from 'object.assign';
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import { SingleDatePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';

import CloseButton from './CloseButton';
import CalendarIcon from './CalendarIcon';

import openDirectionShape from '../shapes/OpenDirectionShape';
import { ICON_BEFORE_POSITION, ICON_AFTER_POSITION, OPEN_DOWN } from '../constants';

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  displayValue: PropTypes.string,
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
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

  onChange: PropTypes.func,
  onClearDate: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerInputPhrases))
}));

var defaultProps = {
  placeholder: 'Select Date',
  displayValue: '',
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
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,

  onChange: function () {
    function onChange() {}

    return onChange;
  }(),
  onClearDate: function () {
    function onClearDate() {}

    return onClearDate;
  }(),
  onFocus: function () {
    function onFocus() {}

    return onFocus;
  }(),
  onKeyDownShiftTab: function () {
    function onKeyDownShiftTab() {}

    return onKeyDownShiftTab;
  }(),
  onKeyDownTab: function () {
    function onKeyDownTab() {}

    return onKeyDownTab;
  }(),
  onKeyDownArrowDown: function () {
    function onKeyDownArrowDown() {}

    return onKeyDownArrowDown;
  }(),
  onKeyDownQuestionMark: function () {
    function onKeyDownQuestionMark() {}

    return onKeyDownQuestionMark;
  }(),


  // i18n
  phrases: SingleDatePickerInputPhrases
};

function SingleDatePickerInput(_ref) {
  var id = _ref.id,
      placeholder = _ref.placeholder,
      displayValue = _ref.displayValue,
      focused = _ref.focused,
      isFocused = _ref.isFocused,
      disabled = _ref.disabled,
      required = _ref.required,
      readOnly = _ref.readOnly,
      showCaret = _ref.showCaret,
      showClearDate = _ref.showClearDate,
      showDefaultInputIcon = _ref.showDefaultInputIcon,
      inputIconPosition = _ref.inputIconPosition,
      phrases = _ref.phrases,
      onClearDate = _ref.onClearDate,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onKeyDownShiftTab = _ref.onKeyDownShiftTab,
      onKeyDownTab = _ref.onKeyDownTab,
      onKeyDownArrowDown = _ref.onKeyDownArrowDown,
      onKeyDownQuestionMark = _ref.onKeyDownQuestionMark,
      screenReaderMessage = _ref.screenReaderMessage,
      customCloseIcon = _ref.customCloseIcon,
      customInputIcon = _ref.customInputIcon,
      openDirection = _ref.openDirection,
      isRTL = _ref.isRTL,
      noBorder = _ref.noBorder,
      block = _ref.block,
      small = _ref.small,
      regular = _ref.regular,
      verticalSpacing = _ref.verticalSpacing,
      styles = _ref.styles;

  var calendarIcon = customInputIcon || React.createElement(CalendarIcon, css(styles.SingleDatePickerInput_calendarIcon_svg));
  var closeIcon = customCloseIcon || React.createElement(CloseButton, css(styles.SingleDatePickerInput_clearDate_svg, small && styles.SingleDatePickerInput_clearDate_svg__small));

  var screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
  var inputIcon = (showDefaultInputIcon || customInputIcon !== null) && React.createElement(
    'button',
    _extends({}, css(styles.SingleDatePickerInput_calendarIcon), {
      type: 'button',
      disabled: disabled,
      'aria-label': phrases.focusStartDate,
      onClick: onFocus
    }),
    calendarIcon
  );

  return React.createElement(
    'div',
    css(styles.SingleDatePickerInput, disabled && styles.SingleDatePickerInput__disabled, isRTL && styles.SingleDatePickerInput__rtl, !noBorder && styles.SingleDatePickerInput__withBorder, block && styles.SingleDatePickerInput__block, showClearDate && styles.SingleDatePickerInput__showClearDate),
    inputIconPosition === ICON_BEFORE_POSITION && inputIcon,
    React.createElement(DateInput, {
      id: id,
      placeholder: placeholder // also used as label
      , displayValue: displayValue,
      screenReaderMessage: screenReaderText,
      focused: focused,
      isFocused: isFocused,
      disabled: disabled,
      required: required,
      readOnly: readOnly,
      showCaret: showCaret,
      onChange: onChange,
      onFocus: onFocus,
      onKeyDownShiftTab: onKeyDownShiftTab,
      onKeyDownTab: onKeyDownTab,
      onKeyDownArrowDown: onKeyDownArrowDown,
      onKeyDownQuestionMark: onKeyDownQuestionMark,
      openDirection: openDirection,
      verticalSpacing: verticalSpacing,
      small: small,
      regular: regular,
      block: block
    }),
    showClearDate && React.createElement(
      'button',
      _extends({}, css(styles.SingleDatePickerInput_clearDate, small && styles.SingleDatePickerInput_clearDate__small, !customCloseIcon && styles.SingleDatePickerInput_clearDate__default, !displayValue && styles.SingleDatePickerInput_clearDate__hide), {
        type: 'button',
        'aria-label': phrases.clearDate,
        disabled: disabled,
        onMouseEnter: this.onClearDateMouseEnter,
        onMouseLeave: this.onClearDateMouseLeave,
        onClick: onClearDate
      }),
      closeIcon
    ),
    inputIconPosition === ICON_AFTER_POSITION && inputIcon
  );
}

SingleDatePickerInput.propTypes = propTypes;
SingleDatePickerInput.defaultProps = defaultProps;

export default withStyles(function (_ref2) {
  var color = _ref2.reactDates.color;
  return {
    SingleDatePickerInput: {
      display: 'inline-block',
      backgroundColor: color.background
    },

    SingleDatePickerInput__withBorder: {
      border: '1px solid ' + String(color.core.border)
    },

    SingleDatePickerInput__rtl: {
      direction: 'rtl'
    },

    SingleDatePickerInput__disabled: {
      backgroundColor: color.disabled
    },

    SingleDatePickerInput__block: {
      display: 'block'
    },

    SingleDatePickerInput__showClearDate: {
      paddingRight: 30
    },

    SingleDatePickerInput_clearDate: {
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
      transform: 'translateY(-50%)'
    },

    SingleDatePickerInput_clearDate__default: {
      ':focus': {
        background: color.core.border,
        borderRadius: '50%'
      },

      ':hover': {
        background: color.core.border,
        borderRadius: '50%'
      }
    },

    SingleDatePickerInput_clearDate__small: {
      padding: 6
    },

    SingleDatePickerInput_clearDate__hide: {
      visibility: 'hidden'
    },

    SingleDatePickerInput_clearDate_svg: {
      fill: color.core.grayLight,
      height: 12,
      width: 15,
      verticalAlign: 'middle'
    },

    SingleDatePickerInput_clearDate_svg__small: {
      height: 9
    },

    SingleDatePickerInput_calendarIcon: {
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
      margin: '0 5px 0 10px'
    },

    SingleDatePickerInput_calendarIcon_svg: {
      fill: color.core.grayLight,
      height: 15,
      width: 14,
      verticalAlign: 'middle'
    }
  };
})(SingleDatePickerInput);