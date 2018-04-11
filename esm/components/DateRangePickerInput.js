var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import _objectAssign from 'object.assign';
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import openDirectionShape from '../shapes/OpenDirectionShape';

import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';

import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import CloseButton from './CloseButton';
import CalendarIcon from './CalendarIcon';

import { START_DATE, END_DATE, ICON_BEFORE_POSITION, ICON_AFTER_POSITION, OPEN_DOWN } from '../constants';

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, {
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
  disabled: DisabledShape,
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
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

  // accessibility
  isFocused: PropTypes.bool, // describes actual DOM focus

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),

  isRTL: PropTypes.bool
}));

var defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  screenReaderMessage: '',
  onStartDateFocus: function () {
    function onStartDateFocus() {}

    return onStartDateFocus;
  }(),
  onEndDateFocus: function () {
    function onEndDateFocus() {}

    return onEndDateFocus;
  }(),
  onStartDateChange: function () {
    function onStartDateChange() {}

    return onStartDateChange;
  }(),
  onEndDateChange: function () {
    function onEndDateChange() {}

    return onEndDateChange;
  }(),
  onStartDateShiftTab: function () {
    function onStartDateShiftTab() {}

    return onStartDateShiftTab;
  }(),
  onEndDateTab: function () {
    function onEndDateTab() {}

    return onEndDateTab;
  }(),
  onClearDates: function () {
    function onClearDates() {}

    return onClearDates;
  }(),
  onKeyDownArrowDown: function () {
    function onKeyDownArrowDown() {}

    return onKeyDownArrowDown;
  }(),
  onKeyDownQuestionMark: function () {
    function onKeyDownQuestionMark() {}

    return onKeyDownQuestionMark;
  }(),


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
  regular: false,
  verticalSpacing: undefined,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false
};

function DateRangePickerInput(_ref) {
  var startDate = _ref.startDate,
      startDateId = _ref.startDateId,
      startDatePlaceholderText = _ref.startDatePlaceholderText,
      screenReaderMessage = _ref.screenReaderMessage,
      isStartDateFocused = _ref.isStartDateFocused,
      onStartDateChange = _ref.onStartDateChange,
      onStartDateFocus = _ref.onStartDateFocus,
      onStartDateShiftTab = _ref.onStartDateShiftTab,
      endDate = _ref.endDate,
      endDateId = _ref.endDateId,
      endDatePlaceholderText = _ref.endDatePlaceholderText,
      isEndDateFocused = _ref.isEndDateFocused,
      onEndDateChange = _ref.onEndDateChange,
      onEndDateFocus = _ref.onEndDateFocus,
      onEndDateTab = _ref.onEndDateTab,
      onKeyDownArrowDown = _ref.onKeyDownArrowDown,
      onKeyDownQuestionMark = _ref.onKeyDownQuestionMark,
      onClearDates = _ref.onClearDates,
      showClearDates = _ref.showClearDates,
      disabled = _ref.disabled,
      required = _ref.required,
      readOnly = _ref.readOnly,
      showCaret = _ref.showCaret,
      openDirection = _ref.openDirection,
      showDefaultInputIcon = _ref.showDefaultInputIcon,
      inputIconPosition = _ref.inputIconPosition,
      customInputIcon = _ref.customInputIcon,
      customArrowIcon = _ref.customArrowIcon,
      customCloseIcon = _ref.customCloseIcon,
      isFocused = _ref.isFocused,
      phrases = _ref.phrases,
      isRTL = _ref.isRTL,
      noBorder = _ref.noBorder,
      block = _ref.block,
      verticalSpacing = _ref.verticalSpacing,
      small = _ref.small,
      regular = _ref.regular,
      styles = _ref.styles;

  var calendarIcon = customInputIcon || React.createElement(CalendarIcon, css(styles.DateRangePickerInput_calendarIcon_svg));
  var arrowIcon = customArrowIcon || (isRTL ? React.createElement(LeftArrow, css(styles.DateRangePickerInput_arrow_svg, small && styles.DateRangePickerInput_arrow_svg__small)) : React.createElement(RightArrow, css(styles.DateRangePickerInput_arrow_svg, small && styles.DateRangePickerInput_arrow_svg__small)));
  var closeIcon = customCloseIcon || React.createElement(CloseButton, css(styles.DateRangePickerInput_clearDates_svg, small && styles.DateRangePickerInput_clearDates_svg__small));
  var screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
  var inputIcon = (showDefaultInputIcon || customInputIcon !== null) && React.createElement(
    'button',
    _extends({}, css(styles.DateRangePickerInput_calendarIcon), {
      type: 'button',
      disabled: disabled,
      'aria-label': phrases.focusStartDate,
      onClick: onKeyDownArrowDown
    }),
    calendarIcon
  );
  var startDateDisabled = disabled === START_DATE || disabled;
  var endDateDisabled = disabled === END_DATE || disabled;

  return React.createElement(
    'div',
    css(styles.DateRangePickerInput, disabled && styles.DateRangePickerInput__disabled, isRTL && styles.DateRangePickerInput__rtl, !noBorder && styles.DateRangePickerInput__withBorder, block && styles.DateRangePickerInput__block, showClearDates && styles.DateRangePickerInput__showClearDates),
    inputIconPosition === ICON_BEFORE_POSITION && inputIcon,
    React.createElement(DateInput, {
      id: startDateId,
      placeholder: startDatePlaceholderText,
      displayValue: startDate,
      screenReaderMessage: screenReaderText,
      focused: isStartDateFocused,
      isFocused: isFocused,
      disabled: startDateDisabled,
      required: required,
      readOnly: readOnly,
      showCaret: showCaret,
      openDirection: openDirection,
      onChange: onStartDateChange,
      onFocus: onStartDateFocus,
      onKeyDownShiftTab: onStartDateShiftTab,
      onKeyDownArrowDown: onKeyDownArrowDown,
      onKeyDownQuestionMark: onKeyDownQuestionMark,
      verticalSpacing: verticalSpacing,
      small: small,
      regular: regular
    }),
    React.createElement(
      'div',
      _extends({}, css(styles.DateRangePickerInput_arrow), {
        'aria-hidden': 'true',
        role: 'presentation'
      }),
      arrowIcon
    ),
    React.createElement(DateInput, {
      id: endDateId,
      placeholder: endDatePlaceholderText,
      displayValue: endDate,
      screenReaderMessage: screenReaderText,
      focused: isEndDateFocused,
      isFocused: isFocused,
      disabled: endDateDisabled,
      required: required,
      readOnly: readOnly,
      showCaret: showCaret,
      openDirection: openDirection,
      onChange: onEndDateChange,
      onFocus: onEndDateFocus,
      onKeyDownTab: onEndDateTab,
      onKeyDownArrowDown: onKeyDownArrowDown,
      onKeyDownQuestionMark: onKeyDownQuestionMark,
      verticalSpacing: verticalSpacing,
      small: small,
      regular: regular
    }),
    showClearDates && React.createElement(
      'button',
      _extends({
        type: 'button',
        'aria-label': phrases.clearDates
      }, css(styles.DateRangePickerInput_clearDates, small && styles.DateRangePickerInput_clearDates__small, !customCloseIcon && styles.DateRangePickerInput_clearDates_default, !(startDate || endDate) && styles.DateRangePickerInput_clearDates__hide), {
        onClick: onClearDates,
        disabled: disabled
      }),
      closeIcon
    ),
    inputIconPosition === ICON_AFTER_POSITION && inputIcon
  );
}

DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;

export default withStyles(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      sizing = _ref2$reactDates.sizing;
  return {
    DateRangePickerInput: {
      backgroundColor: color.background,
      display: 'inline-block'
    },

    DateRangePickerInput__disabled: {
      background: color.disabled
    },

    DateRangePickerInput__withBorder: {
      border: '1px solid ' + String(color.core.grayLighter)
    },

    DateRangePickerInput__rtl: {
      direction: 'rtl'
    },

    DateRangePickerInput__block: {
      display: 'block'
    },

    DateRangePickerInput__showClearDates: {
      paddingRight: 30
    },

    DateRangePickerInput_arrow: {
      display: 'inline-block',
      verticalAlign: 'middle'
    },

    DateRangePickerInput_arrow_svg: {
      verticalAlign: 'middle',
      fill: color.text,
      height: sizing.arrowWidth,
      width: sizing.arrowWidth
    },

    DateRangePickerInput_arrow_svg__small: {
      height: sizing.arrowWidth_small,
      width: sizing.arrowWidth_small
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
      transform: 'translateY(-50%)'
    },

    DateRangePickerInput_clearDates__small: {
      padding: 6
    },

    DateRangePickerInput_clearDates_default: {
      ':focus': {
        background: color.core.border,
        borderRadius: '50%'
      },

      ':hover': {
        background: color.core.border,
        borderRadius: '50%'
      }
    },

    DateRangePickerInput_clearDates__hide: {
      visibility: 'hidden'
    },

    DateRangePickerInput_clearDates_svg: {
      fill: color.core.grayLight,
      height: 12,
      width: 15,
      verticalAlign: 'middle'
    },

    DateRangePickerInput_clearDates_svg__small: {
      height: 9
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
      margin: '0 5px 0 10px'
    },

    DateRangePickerInput_calendarIcon_svg: {
      fill: color.core.grayLight,
      height: 15,
      width: 14,
      verticalAlign: 'middle'
    }
  };
})(DateRangePickerInput);