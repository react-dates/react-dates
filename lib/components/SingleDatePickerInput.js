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

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _IconPositionShape = require('../shapes/IconPositionShape');

var _IconPositionShape2 = _interopRequireDefault(_IconPositionShape);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _CalendarIcon = require('./CalendarIcon');

var _CalendarIcon2 = _interopRequireDefault(_CalendarIcon);

var _OpenDirectionShape = require('../shapes/OpenDirectionShape');

var _OpenDirectionShape2 = _interopRequireDefault(_OpenDirectionShape);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  id: _propTypes2['default'].string.isRequired,
  placeholder: _propTypes2['default'].string, // also used as label
  displayValue: _propTypes2['default'].string,
  screenReaderMessage: _propTypes2['default'].string,
  focused: _propTypes2['default'].bool,
  isFocused: _propTypes2['default'].bool, // describes actual DOM focus
  disabled: _propTypes2['default'].bool,
  required: _propTypes2['default'].bool,
  readOnly: _propTypes2['default'].bool,
  openDirection: _OpenDirectionShape2['default'],
  showCaret: _propTypes2['default'].bool,
  showClearDate: _propTypes2['default'].bool,
  customCloseIcon: _propTypes2['default'].node,
  showDefaultInputIcon: _propTypes2['default'].bool,
  inputIconPosition: _IconPositionShape2['default'],
  customInputIcon: _propTypes2['default'].node,
  isRTL: _propTypes2['default'].bool,
  noBorder: _propTypes2['default'].bool,
  block: _propTypes2['default'].bool,
  small: _propTypes2['default'].bool,
  regular: _propTypes2['default'].bool,
  verticalSpacing: _airbnbPropTypes.nonNegativeInteger,

  onChange: _propTypes2['default'].func,
  onClearDate: _propTypes2['default'].func,
  onFocus: _propTypes2['default'].func,
  onKeyDownShiftTab: _propTypes2['default'].func,
  onKeyDownTab: _propTypes2['default'].func,
  onKeyDownArrowDown: _propTypes2['default'].func,
  onKeyDownQuestionMark: _propTypes2['default'].func,

  // i18n
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.SingleDatePickerInputPhrases))
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
  openDirection: _constants.OPEN_DOWN,
  showCaret: false,
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
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
  phrases: _defaultPhrases.SingleDatePickerInputPhrases
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

  var calendarIcon = customInputIcon || _react2['default'].createElement(_CalendarIcon2['default'], (0, _reactWithStyles.css)(styles.SingleDatePickerInput_calendarIcon_svg));
  var closeIcon = customCloseIcon || _react2['default'].createElement(_CloseButton2['default'], (0, _reactWithStyles.css)(styles.SingleDatePickerInput_clearDate_svg, small && styles.SingleDatePickerInput_clearDate_svg__small));

  var screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
  var inputIcon = (showDefaultInputIcon || customInputIcon !== null) && _react2['default'].createElement(
    'button',
    _extends({}, (0, _reactWithStyles.css)(styles.SingleDatePickerInput_calendarIcon), {
      type: 'button',
      disabled: disabled,
      'aria-label': phrases.focusStartDate,
      onClick: onFocus
    }),
    calendarIcon
  );

  return _react2['default'].createElement(
    'div',
    (0, _reactWithStyles.css)(styles.SingleDatePickerInput, disabled && styles.SingleDatePickerInput__disabled, isRTL && styles.SingleDatePickerInput__rtl, !noBorder && styles.SingleDatePickerInput__withBorder, block && styles.SingleDatePickerInput__block, showClearDate && styles.SingleDatePickerInput__showClearDate),
    inputIconPosition === _constants.ICON_BEFORE_POSITION && inputIcon,
    _react2['default'].createElement(_DateInput2['default'], {
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
    showClearDate && _react2['default'].createElement(
      'button',
      _extends({}, (0, _reactWithStyles.css)(styles.SingleDatePickerInput_clearDate, small && styles.SingleDatePickerInput_clearDate__small, !customCloseIcon && styles.SingleDatePickerInput_clearDate__default, !displayValue && styles.SingleDatePickerInput_clearDate__hide), {
        type: 'button',
        'aria-label': phrases.clearDate,
        disabled: disabled,
        onMouseEnter: this.onClearDateMouseEnter,
        onMouseLeave: this.onClearDateMouseLeave,
        onClick: onClearDate
      }),
      closeIcon
    ),
    inputIconPosition === _constants.ICON_AFTER_POSITION && inputIcon
  );
}

SingleDatePickerInput.propTypes = propTypes;
SingleDatePickerInput.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
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