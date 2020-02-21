"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _reactMomentProptypes = _interopRequireDefault(require("react-moment-proptypes"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _OpenDirectionShape = _interopRequireDefault(require("../shapes/OpenDirectionShape"));

var _defaultPhrases = require("../defaultPhrases");

var _getPhrasePropTypes = _interopRequireDefault(require("../utils/getPhrasePropTypes"));

var _DateRangePickerInput = _interopRequireDefault(require("./DateRangePickerInput"));

var _IconPositionShape = _interopRequireDefault(require("../shapes/IconPositionShape"));

var _DisabledShape = _interopRequireDefault(require("../shapes/DisabledShape"));

var _toMomentObject = _interopRequireDefault(require("../utils/toMomentObject"));

var _toLocalizedDateString = _interopRequireDefault(require("../utils/toLocalizedDateString"));

var _isBeforeDay = _interopRequireDefault(require("../utils/isBeforeDay"));

var _constants = require("../constants");

var propTypes = process.env.NODE_ENV !== "production" ? (0, _airbnbPropTypes.forbidExtraProps)({
  children: _propTypes["default"].node,
  startDate: _reactMomentProptypes["default"].momentObj,
  startDateId: _propTypes["default"].string,
  startDatePlaceholderText: _propTypes["default"].string,
  isStartDateFocused: _propTypes["default"].bool,
  startDateAriaLabel: _propTypes["default"].string,
  endDate: _reactMomentProptypes["default"].momentObj,
  endDateId: _propTypes["default"].string,
  endDatePlaceholderText: _propTypes["default"].string,
  isEndDateFocused: _propTypes["default"].bool,
  endDateAriaLabel: _propTypes["default"].string,
  screenReaderMessage: _propTypes["default"].string,
  showClearDates: _propTypes["default"].bool,
  showCaret: _propTypes["default"].bool,
  showDefaultInputIcon: _propTypes["default"].bool,
  inputIconPosition: _IconPositionShape["default"],
  disabled: _DisabledShape["default"],
  required: _propTypes["default"].bool,
  readOnly: _propTypes["default"].bool,
  openDirection: _OpenDirectionShape["default"],
  noBorder: _propTypes["default"].bool,
  block: _propTypes["default"].bool,
  small: _propTypes["default"].bool,
  regular: _propTypes["default"].bool,
  verticalSpacing: _airbnbPropTypes.nonNegativeInteger,
  keepOpenOnDateSelect: _propTypes["default"].bool,
  reopenPickerOnClearDates: _propTypes["default"].bool,
  withFullScreenPortal: _propTypes["default"].bool,
  minimumNights: _airbnbPropTypes.nonNegativeInteger,
  displayFormat: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  onFocusChange: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  onDatesChange: _propTypes["default"].func,
  onKeyDownArrowDown: _propTypes["default"].func,
  onKeyDownQuestionMark: _propTypes["default"].func,
  customInputIcon: _propTypes["default"].node,
  customArrowIcon: _propTypes["default"].node,
  customCloseIcon: _propTypes["default"].node,
  // accessibility
  isFocused: _propTypes["default"].bool,
  // i18n
  phrases: _propTypes["default"].shape((0, _getPhrasePropTypes["default"])(_defaultPhrases.DateRangePickerInputPhrases)),
  isRTL: _propTypes["default"].bool,
  isOutsideRange: _propTypes["default"].func
}) : {};
var defaultProps = {
  children: null,
  startDate: null,
  startDateId: _constants.START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateFocused: false,
  startDateAriaLabel: undefined,
  endDate: null,
  endDateId: _constants.END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateFocused: false,
  endDateAriaLabel: undefined,
  screenReaderMessage: '',
  showClearDates: false,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: _constants.OPEN_DOWN,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  minimumNights: 1,
  displayFormat: function displayFormat() {
    return _moment["default"].localeData().longDateFormat('L');
  },
  onFocusChange: function onFocusChange() {},
  onClose: function onClose() {},
  onDatesChange: function onDatesChange() {},
  onKeyDownArrowDown: function onKeyDownArrowDown() {},
  onKeyDownQuestionMark: function onKeyDownQuestionMark() {},
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  // accessibility
  isFocused: false,
  // i18n
  phrases: _defaultPhrases.DateRangePickerInputPhrases,
  isRTL: false,
  isOutsideRange: function isOutsideRange() {}
};

var DateRangePickerInputController =
/*#__PURE__*/
function (_ref) {
  (0, _inheritsLoose2["default"])(DateRangePickerInputController, _ref);
  var _proto = DateRangePickerInputController.prototype;

  _proto[!_react["default"].PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !(0, _enzymeShallowEqual["default"])(this.props, nextProps) || !(0, _enzymeShallowEqual["default"])(this.state, nextState);
  };

  function DateRangePickerInputController(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    _this.state = {
      resetStatus: false
    };
    _this.onClearFocus = _this.onClearFocus.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onStartDateChange = _this.onStartDateChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onStartDateFocus = _this.onStartDateFocus.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onStartDateTab = _this.onStartDateTab.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onEndDateChange = _this.onEndDateChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onEndDateFocus = _this.onEndDateFocus.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onEndDateTab = _this.onEndDateTab.bind((0, _assertThisInitialized2["default"])(_this));
    _this.clearDates = _this.clearDates.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  _proto.onClearFocus = function onClearFocus() {
    var _this$props = this.props,
        onFocusChange = _this$props.onFocusChange,
        onClose = _this$props.onClose,
        startDate = _this$props.startDate,
        endDate = _this$props.endDate;
    onFocusChange(null);
    onClose({
      startDate: startDate,
      endDate: endDate
    });
  };

  _proto.onEndDateChange = function onEndDateChange(endDateString) {
    var _this$props2 = this.props,
        startDate = _this$props2.startDate,
        keepOpenOnDateSelect = _this$props2.keepOpenOnDateSelect,
        onDatesChange = _this$props2.onDatesChange;
    onDatesChange({
      startDate: startDate,
      endDate: endDateString
    });

    if (!keepOpenOnDateSelect) {
      this.onClearFocus();
    }

    onDatesChange({
      startDate: startDate,
      endDate: endDateString
    });

    if (!keepOpenOnDateSelect) {
      this.onClearFocus();
    }
  };

  _proto.onEndDateFocus = function onEndDateFocus() {
    var _this$props3 = this.props,
        startDate = _this$props3.startDate,
        onFocusChange = _this$props3.onFocusChange,
        withFullScreenPortal = _this$props3.withFullScreenPortal,
        disabled = _this$props3.disabled;

    if (!startDate && withFullScreenPortal && (!disabled || disabled === _constants.END_DATE)) {
      // When the datepicker is full screen, we never want to focus the end date first
      // because there's no indication that that is the case once the datepicker is open and it
      // might confuse the user
      onFocusChange(_constants.START_DATE);
    } else if (!disabled || disabled === _constants.START_DATE) {
      onFocusChange(_constants.END_DATE);
    }
  };

  _proto.onEndDateTab = function onEndDateTab() {
    var _this$props4 = this.props,
        onFocusChange = _this$props4.onFocusChange,
        onClose = _this$props4.onClose,
        startDate = _this$props4.startDate,
        endDate = _this$props4.endDate;
    onFocusChange(null);
    if (!this.isOpened()) return;
    onFocusChange(null);
    onClose({
      startDate: startDate,
      endDate: endDate
    });
  };

  _proto.onStartDateChange = function onStartDateChange(startDateString) {
    var endDate = this.props.endDate;
    var _this$props5 = this.props,
        minimumNights = _this$props5.minimumNights,
        onDatesChange = _this$props5.onDatesChange;
    var startDate = (0, _toMomentObject["default"])(startDateString, this.getDisplayFormat());
    var isEndDateBeforeStartDate = startDate && (0, _isBeforeDay["default"])(endDate, startDate.clone().add(minimumNights, 'days'));

    if (isEndDateBeforeStartDate) {
      endDate = null;
    }

    onDatesChange({
      startDate: startDateString,
      endDate: endDate
    });

    if (isEndDateBeforeStartDate) {
      endDate = null;
    }

    onDatesChange({
      startDate: startDateString,
      endDate: endDate
    });
  };

  _proto.onStartDateFocus = function onStartDateFocus() {
    var _this$props6 = this.props,
        disabled = _this$props6.disabled,
        onFocusChange = _this$props6.onFocusChange;

    if (!disabled || disabled === _constants.END_DATE) {
      onFocusChange(_constants.START_DATE);
    }
  };

  _proto.onStartDateTab = function onStartDateTab() {
    var _this$props7 = this.props,
        disabled = _this$props7.disabled,
        onFocusChange = _this$props7.onFocusChange;

    if (!disabled || disabled === _constants.START_DATE) {
      onFocusChange(_constants.END_DATE);
    }
  };

  _proto.getDisplayFormat = function getDisplayFormat() {
    var displayFormat = this.props.displayFormat;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  };

  _proto.getDateString = function getDateString(date) {
    var displayFormat = this.getDisplayFormat();

    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }

    return (0, _toLocalizedDateString["default"])(date);
  };

  _proto.clearDates = function clearDates() {
    var _this$props8 = this.props,
        onDatesChange = _this$props8.onDatesChange,
        reopenPickerOnClearDates = _this$props8.reopenPickerOnClearDates,
        onFocusChange = _this$props8.onFocusChange;
    onDatesChange({
      startDate: null,
      endDate: null
    });

    if (reopenPickerOnClearDates) {
      onFocusChange('CLOSE');
    }

    this.setState(function (_ref2) {
      var resetStatus = _ref2.resetStatus;
      return {
        resetStatus: !resetStatus
      };
    });
  };

  _proto.render = function render() {
    var _this$props9 = this.props,
        children = _this$props9.children,
        startDate = _this$props9.startDate,
        startDateId = _this$props9.startDateId,
        startDatePlaceholderText = _this$props9.startDatePlaceholderText,
        isStartDateFocused = _this$props9.isStartDateFocused,
        startDateAriaLabel = _this$props9.startDateAriaLabel,
        endDate = _this$props9.endDate,
        endDateId = _this$props9.endDateId,
        endDatePlaceholderText = _this$props9.endDatePlaceholderText,
        endDateAriaLabel = _this$props9.endDateAriaLabel,
        isEndDateFocused = _this$props9.isEndDateFocused,
        screenReaderMessage = _this$props9.screenReaderMessage,
        showClearDates = _this$props9.showClearDates,
        showCaret = _this$props9.showCaret,
        showDefaultInputIcon = _this$props9.showDefaultInputIcon,
        inputIconPosition = _this$props9.inputIconPosition,
        customInputIcon = _this$props9.customInputIcon,
        customArrowIcon = _this$props9.customArrowIcon,
        customCloseIcon = _this$props9.customCloseIcon,
        disabled = _this$props9.disabled,
        required = _this$props9.required,
        readOnly = _this$props9.readOnly,
        openDirection = _this$props9.openDirection,
        isFocused = _this$props9.isFocused,
        phrases = _this$props9.phrases,
        onKeyDownArrowDown = _this$props9.onKeyDownArrowDown,
        onKeyDownQuestionMark = _this$props9.onKeyDownQuestionMark,
        isRTL = _this$props9.isRTL,
        noBorder = _this$props9.noBorder,
        block = _this$props9.block,
        small = _this$props9.small,
        regular = _this$props9.regular,
        verticalSpacing = _this$props9.verticalSpacing;
    var resetStatus = this.state.resetStatus;
    var startDateString = this.getDateString(startDate);
    var endDateString = this.getDateString(endDate);
    return _react["default"].createElement(_DateRangePickerInput["default"], {
      startDate: startDateString,
      startDateId: startDateId,
      startDatePlaceholderText: startDatePlaceholderText,
      isStartDateFocused: isStartDateFocused,
      startDateAriaLabel: startDateAriaLabel,
      endDate: endDateString,
      endDateId: endDateId,
      endDatePlaceholderText: endDatePlaceholderText,
      isEndDateFocused: isEndDateFocused,
      endDateAriaLabel: endDateAriaLabel,
      isFocused: isFocused,
      disabled: disabled,
      required: required,
      readOnly: readOnly,
      openDirection: openDirection,
      showCaret: showCaret,
      showDefaultInputIcon: showDefaultInputIcon,
      inputIconPosition: inputIconPosition,
      customInputIcon: customInputIcon,
      customArrowIcon: customArrowIcon,
      customCloseIcon: customCloseIcon,
      phrases: phrases,
      onStartDateChange: this.onStartDateChange,
      onStartDateFocus: this.onStartDateFocus,
      onStartDateShiftTab: this.onClearFocus,
      onStartDateTab: this.onStartDateTab,
      onEndDateChange: this.onEndDateChange,
      onEndDateFocus: this.onEndDateFocus,
      onEndDateTab: this.onEndDateTab,
      showClearDates: showClearDates,
      onClearDates: this.clearDates,
      screenReaderMessage: screenReaderMessage,
      onKeyDownArrowDown: onKeyDownArrowDown,
      onKeyDownQuestionMark: onKeyDownQuestionMark,
      isRTL: isRTL,
      noBorder: noBorder,
      block: block,
      small: small,
      regular: regular,
      verticalSpacing: verticalSpacing,
      resetStatus: resetStatus
    }, children);
  };

  return DateRangePickerInputController;
}(_react["default"].PureComponent || _react["default"].Component);

exports["default"] = DateRangePickerInputController;
DateRangePickerInputController.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
DateRangePickerInputController.defaultProps = defaultProps;