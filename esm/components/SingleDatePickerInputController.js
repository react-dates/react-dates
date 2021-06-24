import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import shallowEqual from "enzyme-shallow-equal";
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import format from 'date-fns/format';
import addHours from 'date-fns/addHours';
import startOfDay from 'date-fns/startOfDay';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import isValid from 'date-fns/isValid';
import openDirectionShape from '../shapes/OpenDirectionShape';
import { SingleDatePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import SingleDatePickerInput from './SingleDatePickerInput';
import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';
import toLocalizedDateString from '../utils/toLocalizedDateString';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import getLocale from '../utils/getLocale';
import { ICON_BEFORE_POSITION, OPEN_DOWN } from '../constants';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  children: PropTypes.node,
  date: PropTypes.object,
  onDateChange: PropTypes.func,
  focused: PropTypes.bool,
  onFocusChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  screenReaderMessage: PropTypes.string,
  showClearDate: PropTypes.bool,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  disabled: DisabledShape,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,
  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDate: PropTypes.bool,
  isOutsideRange: PropTypes.func,
  isDayBlocked: PropTypes.func,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onClose: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,
  customInputIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,
  // accessibility
  isFocused: PropTypes.bool,
  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerInputPhrases)),
  locale: PropTypes.string,
  isRTL: PropTypes.bool
}) : {};
var defaultProps = {
  children: null,
  date: null,
  onDateChange: function onDateChange() {},
  focused: false,
  placeholder: '',
  ariaLabel: undefined,
  screenReaderMessage: 'Date',
  showClearDate: false,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isOutsideRange: function isOutsideRange(day) {
    return !isInclusivelyAfterDay(day, addHours(startOfDay(new Date()), 12));
  },
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  displayFormat: function displayFormat() {
    return 'P';
  },
  onClose: function onClose() {},
  onKeyDownArrowDown: function onKeyDownArrowDown() {},
  onKeyDownQuestionMark: function onKeyDownQuestionMark() {},
  customInputIcon: null,
  customCloseIcon: null,
  // accessibility
  isFocused: false,
  // i18n
  phrases: SingleDatePickerInputPhrases,
  locale: null,
  isRTL: false
};

var SingleDatePickerInputController = /*#__PURE__*/function (_ref) {
  _inheritsLoose(SingleDatePickerInputController, _ref);

  var _proto = SingleDatePickerInputController.prototype;

  _proto[!React.PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };

  function SingleDatePickerInputController(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onClearFocus = _this.onClearFocus.bind(_assertThisInitialized(_this));
    _this.clearDate = _this.clearDate.bind(_assertThisInitialized(_this));
    return _this;
  }

  _proto.onChange = function onChange(dateString) {
    var _this$props = this.props,
        isOutsideRange = _this$props.isOutsideRange,
        isDayBlocked = _this$props.isDayBlocked,
        keepOpenOnDateSelect = _this$props.keepOpenOnDateSelect,
        onDateChange = _this$props.onDateChange,
        onFocusChange = _this$props.onFocusChange,
        onClose = _this$props.onClose,
        displayFormat = _this$props.displayFormat;
    var newDate;

    if (typeof displayFormat === 'string' && displayFormat !== 'P') {
      newDate = parse(dateString, displayFormat, new Date());
    } else {
      newDate = parseISO(dateString);
    }

    if (!isValid(newDate)) {
      newDate = null;
    }

    var isNewDateValid = newDate && !isOutsideRange(newDate) && !isDayBlocked(newDate);

    if (isNewDateValid) {
      onDateChange(newDate);

      if (!keepOpenOnDateSelect) {
        onFocusChange({
          focused: false
        });
        onClose({
          date: newDate
        });
      }
    } else {
      onDateChange(null);
    }
  };

  _proto.onFocus = function onFocus() {
    var _this$props2 = this.props,
        onFocusChange = _this$props2.onFocusChange,
        disabled = _this$props2.disabled;

    if (!disabled) {
      onFocusChange({
        focused: true
      });
    }
  };

  _proto.onClearFocus = function onClearFocus() {
    var _this$props3 = this.props,
        focused = _this$props3.focused,
        onFocusChange = _this$props3.onFocusChange,
        onClose = _this$props3.onClose,
        date = _this$props3.date;
    if (!focused) return;
    onFocusChange({
      focused: false
    });
    onClose({
      date: date
    });
  };

  _proto.getDisplayFormat = function getDisplayFormat() {
    var displayFormat = this.props.displayFormat;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  };

  _proto.getDateString = function getDateString(date) {
    var displayFormat = this.getDisplayFormat();
    var locale = this.props.locale;

    if (date && displayFormat) {
      return format(date, displayFormat, {
        locale: getLocale(locale)
      });
    }

    return toLocalizedDateString(date, null, locale);
  };

  _proto.clearDate = function clearDate() {
    var _this$props4 = this.props,
        onDateChange = _this$props4.onDateChange,
        reopenPickerOnClearDate = _this$props4.reopenPickerOnClearDate,
        onFocusChange = _this$props4.onFocusChange;
    onDateChange(null);

    if (reopenPickerOnClearDate) {
      onFocusChange({
        focused: true
      });
    }
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        children = _this$props5.children,
        id = _this$props5.id,
        placeholder = _this$props5.placeholder,
        ariaLabel = _this$props5.ariaLabel,
        disabled = _this$props5.disabled,
        focused = _this$props5.focused,
        isFocused = _this$props5.isFocused,
        required = _this$props5.required,
        readOnly = _this$props5.readOnly,
        openDirection = _this$props5.openDirection,
        showClearDate = _this$props5.showClearDate,
        showCaret = _this$props5.showCaret,
        showDefaultInputIcon = _this$props5.showDefaultInputIcon,
        inputIconPosition = _this$props5.inputIconPosition,
        customCloseIcon = _this$props5.customCloseIcon,
        customInputIcon = _this$props5.customInputIcon,
        date = _this$props5.date,
        phrases = _this$props5.phrases,
        onKeyDownArrowDown = _this$props5.onKeyDownArrowDown,
        onKeyDownQuestionMark = _this$props5.onKeyDownQuestionMark,
        screenReaderMessage = _this$props5.screenReaderMessage,
        isRTL = _this$props5.isRTL,
        noBorder = _this$props5.noBorder,
        block = _this$props5.block,
        small = _this$props5.small,
        regular = _this$props5.regular,
        verticalSpacing = _this$props5.verticalSpacing;
    var displayValue = this.getDateString(date);
    return /*#__PURE__*/React.createElement(SingleDatePickerInput, {
      id: id,
      placeholder: placeholder,
      ariaLabel: ariaLabel,
      focused: focused,
      isFocused: isFocused,
      disabled: disabled,
      required: required,
      readOnly: readOnly,
      openDirection: openDirection,
      showCaret: showCaret,
      onClearDate: this.clearDate,
      showClearDate: showClearDate,
      showDefaultInputIcon: showDefaultInputIcon,
      inputIconPosition: inputIconPosition,
      customCloseIcon: customCloseIcon,
      customInputIcon: customInputIcon,
      displayValue: displayValue,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onKeyDownShiftTab: this.onClearFocus,
      onKeyDownArrowDown: onKeyDownArrowDown,
      onKeyDownQuestionMark: onKeyDownQuestionMark,
      screenReaderMessage: screenReaderMessage,
      phrases: phrases,
      isRTL: isRTL,
      noBorder: noBorder,
      block: block,
      small: small,
      regular: regular,
      verticalSpacing: verticalSpacing
    }, children);
  };

  return SingleDatePickerInputController;
}(React.PureComponent || React.Component);

export { SingleDatePickerInputController as default };
SingleDatePickerInputController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
SingleDatePickerInputController.defaultProps = defaultProps;