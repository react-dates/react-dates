Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _OpenDirectionShape = require('../shapes/OpenDirectionShape');

var _OpenDirectionShape2 = _interopRequireDefault(_OpenDirectionShape);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _DateRangePickerInput = require('./DateRangePickerInput');

var _DateRangePickerInput2 = _interopRequireDefault(_DateRangePickerInput);

var _IconPositionShape = require('../shapes/IconPositionShape');

var _IconPositionShape2 = _interopRequireDefault(_IconPositionShape);

var _DisabledShape = require('../shapes/DisabledShape');

var _DisabledShape2 = _interopRequireDefault(_DisabledShape);

var _toMomentObject = require('../utils/toMomentObject');

var _toMomentObject2 = _interopRequireDefault(_toMomentObject);

var _toLocalizedDateString = require('../utils/toLocalizedDateString');

var _toLocalizedDateString2 = _interopRequireDefault(_toLocalizedDateString);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _isBeforeDay = require('../utils/isBeforeDay');

var _isBeforeDay2 = _interopRequireDefault(_isBeforeDay);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)({
  startDate: _reactMomentProptypes2['default'].momentObj,
  startDateId: _propTypes2['default'].string,
  startDatePlaceholderText: _propTypes2['default'].string,
  isStartDateFocused: _propTypes2['default'].bool,

  endDate: _reactMomentProptypes2['default'].momentObj,
  endDateId: _propTypes2['default'].string,
  endDatePlaceholderText: _propTypes2['default'].string,
  isEndDateFocused: _propTypes2['default'].bool,

  screenReaderMessage: _propTypes2['default'].string,
  showClearDates: _propTypes2['default'].bool,
  showCaret: _propTypes2['default'].bool,
  showDefaultInputIcon: _propTypes2['default'].bool,
  inputIconPosition: _IconPositionShape2['default'],
  disabled: _DisabledShape2['default'],
  required: _propTypes2['default'].bool,
  readOnly: _propTypes2['default'].bool,
  openDirection: _OpenDirectionShape2['default'],
  noBorder: _propTypes2['default'].bool,
  block: _propTypes2['default'].bool,
  small: _propTypes2['default'].bool,
  regular: _propTypes2['default'].bool,
  verticalSpacing: _airbnbPropTypes.nonNegativeInteger,

  keepOpenOnDateSelect: _propTypes2['default'].bool,
  reopenPickerOnClearDates: _propTypes2['default'].bool,
  withFullScreenPortal: _propTypes2['default'].bool,
  minimumNights: _airbnbPropTypes.nonNegativeInteger,
  isOutsideRange: _propTypes2['default'].func,
  displayFormat: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),

  onFocusChange: _propTypes2['default'].func,
  onClose: _propTypes2['default'].func,
  onDatesChange: _propTypes2['default'].func,
  onKeyDownArrowDown: _propTypes2['default'].func,
  onKeyDownQuestionMark: _propTypes2['default'].func,

  customInputIcon: _propTypes2['default'].node,
  customArrowIcon: _propTypes2['default'].node,
  customCloseIcon: _propTypes2['default'].node,

  // accessibility
  isFocused: _propTypes2['default'].bool,

  // i18n
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.DateRangePickerInputPhrases)),

  isRTL: _propTypes2['default'].bool
});

var defaultProps = {
  startDate: null,
  startDateId: _constants.START_DATE,
  startDatePlaceholderText: 'Start Date',
  isStartDateFocused: false,

  endDate: null,
  endDateId: _constants.END_DATE,
  endDatePlaceholderText: 'End Date',
  isEndDateFocused: false,

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
  isOutsideRange: function () {
    function isOutsideRange(day) {
      return !(0, _isInclusivelyAfterDay2['default'])(day, (0, _moment2['default'])());
    }

    return isOutsideRange;
  }(),
  displayFormat: function () {
    function displayFormat() {
      return _moment2['default'].localeData().longDateFormat('L');
    }

    return displayFormat;
  }(),

  onFocusChange: function () {
    function onFocusChange() {}

    return onFocusChange;
  }(),
  onClose: function () {
    function onClose() {}

    return onClose;
  }(),
  onDatesChange: function () {
    function onDatesChange() {}

    return onDatesChange;
  }(),
  onKeyDownArrowDown: function () {
    function onKeyDownArrowDown() {}

    return onKeyDownArrowDown;
  }(),
  onKeyDownQuestionMark: function () {
    function onKeyDownQuestionMark() {}

    return onKeyDownQuestionMark;
  }(),


  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: _defaultPhrases.DateRangePickerInputPhrases,

  isRTL: false
};

var DateRangePickerInputController = function (_React$Component) {
  _inherits(DateRangePickerInputController, _React$Component);

  function DateRangePickerInputController(props) {
    _classCallCheck(this, DateRangePickerInputController);

    var _this = _possibleConstructorReturn(this, (DateRangePickerInputController.__proto__ || Object.getPrototypeOf(DateRangePickerInputController)).call(this, props));

    _this.onClearFocus = _this.onClearFocus.bind(_this);
    _this.onStartDateChange = _this.onStartDateChange.bind(_this);
    _this.onStartDateFocus = _this.onStartDateFocus.bind(_this);
    _this.onEndDateChange = _this.onEndDateChange.bind(_this);
    _this.onEndDateFocus = _this.onEndDateFocus.bind(_this);
    _this.clearDates = _this.clearDates.bind(_this);
    return _this;
  }

  _createClass(DateRangePickerInputController, [{
    key: 'onClearFocus',
    value: function () {
      function onClearFocus() {
        var _props = this.props,
            onFocusChange = _props.onFocusChange,
            onClose = _props.onClose,
            startDate = _props.startDate,
            endDate = _props.endDate;


        onFocusChange(null);
        onClose({ startDate: startDate, endDate: endDate });
      }

      return onClearFocus;
    }()
  }, {
    key: 'onEndDateChange',
    value: function () {
      function onEndDateChange(endDateString) {
        var _props2 = this.props,
            startDate = _props2.startDate,
            isOutsideRange = _props2.isOutsideRange,
            minimumNights = _props2.minimumNights,
            keepOpenOnDateSelect = _props2.keepOpenOnDateSelect,
            onDatesChange = _props2.onDatesChange;


        var endDate = (0, _toMomentObject2['default'])(endDateString, this.getDisplayFormat());

        var isEndDateValid = endDate && !isOutsideRange(endDate) && !(startDate && (0, _isBeforeDay2['default'])(endDate, startDate.clone().add(minimumNights, 'days')));
        if (isEndDateValid) {
          onDatesChange({ startDate: startDate, endDate: endDate });
          if (!keepOpenOnDateSelect) this.onClearFocus();
        } else {
          onDatesChange({
            startDate: startDate,
            endDate: null
          });
        }
      }

      return onEndDateChange;
    }()
  }, {
    key: 'onEndDateFocus',
    value: function () {
      function onEndDateFocus() {
        var _props3 = this.props,
            startDate = _props3.startDate,
            onFocusChange = _props3.onFocusChange,
            withFullScreenPortal = _props3.withFullScreenPortal,
            disabled = _props3.disabled;


        if (!startDate && withFullScreenPortal && (!disabled || disabled === _constants.END_DATE)) {
          // When the datepicker is full screen, we never want to focus the end date first
          // because there's no indication that that is the case once the datepicker is open and it
          // might confuse the user
          onFocusChange(_constants.START_DATE);
        } else if (!disabled || disabled === _constants.START_DATE) {
          onFocusChange(_constants.END_DATE);
        }
      }

      return onEndDateFocus;
    }()
  }, {
    key: 'onStartDateChange',
    value: function () {
      function onStartDateChange(startDateString) {
        var endDate = this.props.endDate;
        var _props4 = this.props,
            isOutsideRange = _props4.isOutsideRange,
            minimumNights = _props4.minimumNights,
            onDatesChange = _props4.onDatesChange,
            onFocusChange = _props4.onFocusChange,
            disabled = _props4.disabled;


        var startDate = (0, _toMomentObject2['default'])(startDateString, this.getDisplayFormat());
        var isEndDateBeforeStartDate = startDate && (0, _isBeforeDay2['default'])(endDate, startDate.clone().add(minimumNights, 'days'));
        var isStartDateValid = startDate && !isOutsideRange(startDate) && !(disabled === _constants.END_DATE && isEndDateBeforeStartDate);

        if (isStartDateValid) {
          if (isEndDateBeforeStartDate) {
            endDate = null;
          }

          onDatesChange({ startDate: startDate, endDate: endDate });
          onFocusChange(_constants.END_DATE);
        } else {
          onDatesChange({
            startDate: null,
            endDate: endDate
          });
        }
      }

      return onStartDateChange;
    }()
  }, {
    key: 'onStartDateFocus',
    value: function () {
      function onStartDateFocus() {
        var _props5 = this.props,
            disabled = _props5.disabled,
            onFocusChange = _props5.onFocusChange;

        if (!disabled || disabled === _constants.END_DATE) {
          onFocusChange(_constants.START_DATE);
        }
      }

      return onStartDateFocus;
    }()
  }, {
    key: 'getDisplayFormat',
    value: function () {
      function getDisplayFormat() {
        var displayFormat = this.props.displayFormat;

        return typeof displayFormat === 'string' ? displayFormat : displayFormat();
      }

      return getDisplayFormat;
    }()
  }, {
    key: 'getDateString',
    value: function () {
      function getDateString(date) {
        var displayFormat = this.getDisplayFormat();
        if (date && displayFormat) {
          return date && date.format(displayFormat);
        }
        return (0, _toLocalizedDateString2['default'])(date);
      }

      return getDateString;
    }()
  }, {
    key: 'clearDates',
    value: function () {
      function clearDates() {
        var _props6 = this.props,
            onDatesChange = _props6.onDatesChange,
            reopenPickerOnClearDates = _props6.reopenPickerOnClearDates,
            onFocusChange = _props6.onFocusChange;

        onDatesChange({ startDate: null, endDate: null });
        if (reopenPickerOnClearDates) {
          onFocusChange(_constants.START_DATE);
        }
      }

      return clearDates;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props7 = this.props,
            startDate = _props7.startDate,
            startDateId = _props7.startDateId,
            startDatePlaceholderText = _props7.startDatePlaceholderText,
            isStartDateFocused = _props7.isStartDateFocused,
            endDate = _props7.endDate,
            endDateId = _props7.endDateId,
            endDatePlaceholderText = _props7.endDatePlaceholderText,
            isEndDateFocused = _props7.isEndDateFocused,
            screenReaderMessage = _props7.screenReaderMessage,
            showClearDates = _props7.showClearDates,
            showCaret = _props7.showCaret,
            showDefaultInputIcon = _props7.showDefaultInputIcon,
            inputIconPosition = _props7.inputIconPosition,
            customInputIcon = _props7.customInputIcon,
            customArrowIcon = _props7.customArrowIcon,
            customCloseIcon = _props7.customCloseIcon,
            disabled = _props7.disabled,
            required = _props7.required,
            readOnly = _props7.readOnly,
            openDirection = _props7.openDirection,
            isFocused = _props7.isFocused,
            phrases = _props7.phrases,
            onKeyDownArrowDown = _props7.onKeyDownArrowDown,
            onKeyDownQuestionMark = _props7.onKeyDownQuestionMark,
            isRTL = _props7.isRTL,
            noBorder = _props7.noBorder,
            block = _props7.block,
            small = _props7.small,
            regular = _props7.regular,
            verticalSpacing = _props7.verticalSpacing;


        var startDateString = this.getDateString(startDate);
        var endDateString = this.getDateString(endDate);

        return _react2['default'].createElement(_DateRangePickerInput2['default'], {
          startDate: startDateString,
          startDateId: startDateId,
          startDatePlaceholderText: startDatePlaceholderText,
          isStartDateFocused: isStartDateFocused,
          endDate: endDateString,
          endDateId: endDateId,
          endDatePlaceholderText: endDatePlaceholderText,
          isEndDateFocused: isEndDateFocused,
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
          onEndDateChange: this.onEndDateChange,
          onEndDateFocus: this.onEndDateFocus,
          onEndDateTab: this.onClearFocus,
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
          verticalSpacing: verticalSpacing
        });
      }

      return render;
    }()
  }]);

  return DateRangePickerInputController;
}(_react2['default'].Component);

exports['default'] = DateRangePickerInputController;


DateRangePickerInputController.propTypes = propTypes;
DateRangePickerInputController.defaultProps = defaultProps;