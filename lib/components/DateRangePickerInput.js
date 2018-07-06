Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _OpenDirectionShape = require('../shapes/OpenDirectionShape');

var _OpenDirectionShape2 = _interopRequireDefault(_OpenDirectionShape);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _IconPositionShape = require('../shapes/IconPositionShape');

var _IconPositionShape2 = _interopRequireDefault(_IconPositionShape);

var _DisabledShape = require('../shapes/DisabledShape');

var _DisabledShape2 = _interopRequireDefault(_DisabledShape);

var _RightArrow = require('./RightArrow');

var _RightArrow2 = _interopRequireDefault(_RightArrow);

var _LeftArrow = require('./LeftArrow');

var _LeftArrow2 = _interopRequireDefault(_LeftArrow);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _CalendarIcon = require('./CalendarIcon');

var _CalendarIcon2 = _interopRequireDefault(_CalendarIcon);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  startDateId: _propTypes2['default'].string,
  startDatePlaceholderText: _propTypes2['default'].string,
  screenReaderMessage: _propTypes2['default'].string,

  endDateId: _propTypes2['default'].string,
  endDatePlaceholderText: _propTypes2['default'].string,

  onStartDateFocus: _propTypes2['default'].func,
  onEndDateFocus: _propTypes2['default'].func,
  onStartDateChange: _propTypes2['default'].func,
  onEndDateChange: _propTypes2['default'].func,
  onStartDateShiftTab: _propTypes2['default'].func,
  onEndDateTab: _propTypes2['default'].func,
  onClearDates: _propTypes2['default'].func,
  onKeyDownArrowDown: _propTypes2['default'].func,
  onKeyDownQuestionMark: _propTypes2['default'].func,

  startDate: _propTypes2['default'].string,
  endDate: _propTypes2['default'].string,

  isStartDateFocused: _propTypes2['default'].bool,
  isEndDateFocused: _propTypes2['default'].bool,
  showClearDates: _propTypes2['default'].bool,
  disabled: _DisabledShape2['default'],
  required: _propTypes2['default'].bool,
  readOnly: _propTypes2['default'].bool,
  openDirection: _OpenDirectionShape2['default'],
  showCaret: _propTypes2['default'].bool,
  showDefaultInputIcon: _propTypes2['default'].bool,
  inputIconPosition: _IconPositionShape2['default'],
  customInputIcon: _propTypes2['default'].node,
  customArrowIcon: _propTypes2['default'].node,
  customCloseIcon: _propTypes2['default'].node,
  noBorder: _propTypes2['default'].bool,
  block: _propTypes2['default'].bool,
  small: _propTypes2['default'].bool,
  regular: _propTypes2['default'].bool,
  verticalSpacing: _airbnbPropTypes.nonNegativeInteger,

  // accessibility
  isFocused: _propTypes2['default'].bool, // describes actual DOM focus

  // i18n
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.DateRangePickerInputPhrases)),

  isRTL: _propTypes2['default'].bool
}));

var defaultProps = {
  startDateId: _constants.START_DATE,
  endDateId: _constants.END_DATE,
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
  openDirection: _constants.OPEN_DOWN,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
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
  phrases: _defaultPhrases.DateRangePickerInputPhrases,

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

  var calendarIcon = customInputIcon || _react2['default'].createElement(_CalendarIcon2['default'], (0, _reactWithStyles.css)(styles.DateRangePickerInput_calendarIcon_svg));

  var arrowIcon = customArrowIcon || _react2['default'].createElement(_RightArrow2['default'], (0, _reactWithStyles.css)(styles.DateRangePickerInput_arrow_svg));
  if (isRTL) arrowIcon = _react2['default'].createElement(_LeftArrow2['default'], (0, _reactWithStyles.css)(styles.DateRangePickerInput_arrow_svg));
  if (small) arrowIcon = '-';

  var closeIcon = customCloseIcon || _react2['default'].createElement(_CloseButton2['default'], (0, _reactWithStyles.css)(styles.DateRangePickerInput_clearDates_svg, small && styles.DateRangePickerInput_clearDates_svg__small));
  var screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
  var inputIcon = (showDefaultInputIcon || customInputIcon !== null) && _react2['default'].createElement(
    'button',
    _extends({}, (0, _reactWithStyles.css)(styles.DateRangePickerInput_calendarIcon), {
      type: 'button',
      disabled: disabled,
      'aria-label': phrases.focusStartDate,
      onClick: onKeyDownArrowDown
    }),
    calendarIcon
  );
  var startDateDisabled = disabled === _constants.START_DATE || disabled === true;
  var endDateDisabled = disabled === _constants.END_DATE || disabled === true;

  return _react2['default'].createElement(
    'div',
    (0, _reactWithStyles.css)(styles.DateRangePickerInput, disabled && styles.DateRangePickerInput__disabled, isRTL && styles.DateRangePickerInput__rtl, !noBorder && styles.DateRangePickerInput__withBorder, block && styles.DateRangePickerInput__block, showClearDates && styles.DateRangePickerInput__showClearDates),
    inputIconPosition === _constants.ICON_BEFORE_POSITION && inputIcon,
    _react2['default'].createElement(_DateInput2['default'], {
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
    _react2['default'].createElement(
      'div',
      _extends({}, (0, _reactWithStyles.css)(styles.DateRangePickerInput_arrow), {
        'aria-hidden': 'true',
        role: 'presentation'
      }),
      arrowIcon
    ),
    _react2['default'].createElement(_DateInput2['default'], {
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
    showClearDates && _react2['default'].createElement(
      'button',
      _extends({
        type: 'button',
        'aria-label': phrases.clearDates
      }, (0, _reactWithStyles.css)(styles.DateRangePickerInput_clearDates, small && styles.DateRangePickerInput_clearDates__small, !customCloseIcon && styles.DateRangePickerInput_clearDates_default, !(startDate || endDate) && styles.DateRangePickerInput_clearDates__hide), {
        onClick: onClearDates,
        disabled: disabled
      }),
      closeIcon
    ),
    inputIconPosition === _constants.ICON_AFTER_POSITION && inputIcon
  );
}

DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      border = _ref2$reactDates.border,
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
      borderColor: color.border,
      borderWidth: border.pickerInput.borderWidth,
      borderStyle: border.pickerInput.borderStyle,
      borderRadius: border.pickerInput.borderRadius
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
      verticalAlign: 'middle',
      color: color.text
    },

    DateRangePickerInput_arrow_svg: {
      verticalAlign: 'middle',
      fill: color.text,
      height: sizing.arrowWidth,
      width: sizing.arrowWidth
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