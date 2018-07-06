Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureDateRangePicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactWithStyles = require('react-with-styles');

var _reactPortal = require('react-portal');

var _airbnbPropTypes = require('airbnb-prop-types');

var _consolidatedEvents = require('consolidated-events');

var _isTouchDevice = require('is-touch-device');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _reactOutsideClickHandler = require('react-outside-click-handler');

var _reactOutsideClickHandler2 = _interopRequireDefault(_reactOutsideClickHandler);

var _DateRangePickerShape = require('../shapes/DateRangePickerShape');

var _DateRangePickerShape2 = _interopRequireDefault(_DateRangePickerShape);

var _defaultPhrases = require('../defaultPhrases');

var _getResponsiveContainerStyles = require('../utils/getResponsiveContainerStyles');

var _getResponsiveContainerStyles2 = _interopRequireDefault(_getResponsiveContainerStyles);

var _getDetachedContainerStyles = require('../utils/getDetachedContainerStyles');

var _getDetachedContainerStyles2 = _interopRequireDefault(_getDetachedContainerStyles);

var _getInputHeight = require('../utils/getInputHeight');

var _getInputHeight2 = _interopRequireDefault(_getInputHeight);

var _isInclusivelyAfterDay = require('../utils/isInclusivelyAfterDay');

var _isInclusivelyAfterDay2 = _interopRequireDefault(_isInclusivelyAfterDay);

var _disableScroll2 = require('../utils/disableScroll');

var _disableScroll3 = _interopRequireDefault(_disableScroll2);

var _DateRangePickerInputController = require('./DateRangePickerInputController');

var _DateRangePickerInputController2 = _interopRequireDefault(_DateRangePickerInputController);

var _DayPickerRangeController = require('./DayPickerRangeController');

var _DayPickerRangeController2 = _interopRequireDefault(_DayPickerRangeController);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, _DateRangePickerShape2['default']));

var defaultProps = {
  // required props for a functional interactive DateRangePicker
  startDate: null,
  endDate: null,
  focusedInput: null,

  // input related props
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  inputIconPosition: _constants.ICON_BEFORE_POSITION,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: _constants.HORIZONTAL_ORIENTATION,
  anchorDirection: _constants.ANCHOR_LEFT,
  openDirection: _constants.OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  renderCalendarInfo: null,
  calendarInfoPosition: _constants.INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: _constants.DAY_SIZE,
  isRTL: false,
  firstDayOfWeek: null,
  verticalHeight: null,
  transitionDuration: undefined,
  verticalSpacing: _constants.DEFAULT_VERTICAL_SPACING,

  // navigation related props
  navPrev: null,
  navNext: null,

  onPrevMonthClick: function () {
    function onPrevMonthClick() {}

    return onPrevMonthClick;
  }(),
  onNextMonthClick: function () {
    function onNextMonthClick() {}

    return onNextMonthClick;
  }(),
  onClose: function () {
    function onClose() {}

    return onClose;
  }(),


  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: function () {
    function isDayBlocked() {
      return false;
    }

    return isDayBlocked;
  }(),
  isOutsideRange: function () {
    function isOutsideRange(day) {
      return !(0, _isInclusivelyAfterDay2['default'])(day, (0, _moment2['default'])());
    }

    return isOutsideRange;
  }(),
  isDayHighlighted: function () {
    function isDayHighlighted() {
      return false;
    }

    return isDayHighlighted;
  }(),

  // internationalization
  displayFormat: function () {
    function displayFormat() {
      return _moment2['default'].localeData().longDateFormat('L');
    }

    return displayFormat;
  }(),
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: _defaultPhrases.DateRangePickerPhrases,
  dayAriaLabelFormat: undefined
};

var DateRangePicker = function (_React$Component) {
  _inherits(DateRangePicker, _React$Component);

  function DateRangePicker(props) {
    _classCallCheck(this, DateRangePicker);

    var _this = _possibleConstructorReturn(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this, props));

    _this.state = {
      dayPickerContainerStyles: {},
      isDateRangePickerInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    };

    _this.isTouchDevice = false;

    _this.onOutsideClick = _this.onOutsideClick.bind(_this);
    _this.onDateRangePickerInputFocus = _this.onDateRangePickerInputFocus.bind(_this);
    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_this);
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_this);
    _this.showKeyboardShortcutsPanel = _this.showKeyboardShortcutsPanel.bind(_this);

    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);
    _this.disableScroll = _this.disableScroll.bind(_this);

    _this.setDayPickerContainerRef = _this.setDayPickerContainerRef.bind(_this);
    _this.setContainerRef = _this.setContainerRef.bind(_this);
    return _this;
  }

  _createClass(DateRangePicker, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.removeEventListener = (0, _consolidatedEvents.addEventListener)(window, 'resize', this.responsivizePickerPosition, { passive: true });
        this.responsivizePickerPosition();
        this.disableScroll();

        var focusedInput = this.props.focusedInput;

        if (focusedInput) {
          this.setState({
            isDateRangePickerInputFocused: true
          });
        }

        this.isTouchDevice = (0, _isTouchDevice2['default'])();
      }

      return componentDidMount;
    }()
  }, {
    key: 'shouldComponentUpdate',
    value: function () {
      function shouldComponentUpdate(nextProps, nextState) {
        return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        var focusedInput = this.props.focusedInput;

        if (!prevProps.focusedInput && focusedInput && this.isOpened()) {
          // The date picker just changed from being closed to being open.
          this.responsivizePickerPosition();
          this.disableScroll();
        } else if (prevProps.focusedInput && !focusedInput && !this.isOpened()) {
          // The date picker just changed from being open to being closed.
          if (this.enableScroll) this.enableScroll();
        }
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.removeEventListener) this.removeEventListener();
        if (this.enableScroll) this.enableScroll();
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'onOutsideClick',
    value: function () {
      function onOutsideClick(event) {
        var _props = this.props,
            onFocusChange = _props.onFocusChange,
            onClose = _props.onClose,
            startDate = _props.startDate,
            endDate = _props.endDate,
            appendToBody = _props.appendToBody;

        if (!this.isOpened()) return;
        if (appendToBody && this.dayPickerContainer.contains(event.target)) return;

        this.setState({
          isDateRangePickerInputFocused: false,
          isDayPickerFocused: false,
          showKeyboardShortcuts: false
        });

        onFocusChange(null);
        onClose({ startDate: startDate, endDate: endDate });
      }

      return onOutsideClick;
    }()
  }, {
    key: 'onDateRangePickerInputFocus',
    value: function () {
      function onDateRangePickerInputFocus(focusedInput) {
        var _props2 = this.props,
            onFocusChange = _props2.onFocusChange,
            readOnly = _props2.readOnly,
            withPortal = _props2.withPortal,
            withFullScreenPortal = _props2.withFullScreenPortal,
            keepFocusOnInput = _props2.keepFocusOnInput;


        if (focusedInput) {
          var withAnyPortal = withPortal || withFullScreenPortal;
          var moveFocusToDayPicker = withAnyPortal || readOnly && !keepFocusOnInput || this.isTouchDevice && !keepFocusOnInput;

          if (moveFocusToDayPicker) {
            this.onDayPickerFocus();
          } else {
            this.onDayPickerBlur();
          }
        }

        onFocusChange(focusedInput);
      }

      return onDateRangePickerInputFocus;
    }()
  }, {
    key: 'onDayPickerFocus',
    value: function () {
      function onDayPickerFocus() {
        var _props3 = this.props,
            focusedInput = _props3.focusedInput,
            onFocusChange = _props3.onFocusChange;

        if (!focusedInput) onFocusChange(_constants.START_DATE);

        this.setState({
          isDateRangePickerInputFocused: false,
          isDayPickerFocused: true,
          showKeyboardShortcuts: false
        });
      }

      return onDayPickerFocus;
    }()
  }, {
    key: 'onDayPickerBlur',
    value: function () {
      function onDayPickerBlur() {
        this.setState({
          isDateRangePickerInputFocused: true,
          isDayPickerFocused: false,
          showKeyboardShortcuts: false
        });
      }

      return onDayPickerBlur;
    }()
  }, {
    key: 'setDayPickerContainerRef',
    value: function () {
      function setDayPickerContainerRef(ref) {
        this.dayPickerContainer = ref;
      }

      return setDayPickerContainerRef;
    }()
  }, {
    key: 'setContainerRef',
    value: function () {
      function setContainerRef(ref) {
        this.container = ref;
      }

      return setContainerRef;
    }()
  }, {
    key: 'isOpened',
    value: function () {
      function isOpened() {
        var focusedInput = this.props.focusedInput;

        return focusedInput === _constants.START_DATE || focusedInput === _constants.END_DATE;
      }

      return isOpened;
    }()
  }, {
    key: 'disableScroll',
    value: function () {
      function disableScroll() {
        var _props4 = this.props,
            appendToBody = _props4.appendToBody,
            propDisableScroll = _props4.disableScroll;

        if (!appendToBody && !propDisableScroll) return;
        if (!this.isOpened()) return;

        // Disable scroll for every ancestor of this DateRangePicker up to the
        // document level. This ensures the input and the picker never move. Other
        // sibling elements or the picker itself can scroll.
        this.enableScroll = (0, _disableScroll3['default'])(this.container);
      }

      return disableScroll;
    }()
  }, {
    key: 'responsivizePickerPosition',
    value: function () {
      function responsivizePickerPosition() {
        // It's possible the portal props have been changed in response to window resizes
        // So let's ensure we reset this back to the base state each time
        this.setState({ dayPickerContainerStyles: {} });

        if (!this.isOpened()) {
          return;
        }

        var _props5 = this.props,
            openDirection = _props5.openDirection,
            anchorDirection = _props5.anchorDirection,
            horizontalMargin = _props5.horizontalMargin,
            withPortal = _props5.withPortal,
            withFullScreenPortal = _props5.withFullScreenPortal,
            appendToBody = _props5.appendToBody;
        var dayPickerContainerStyles = this.state.dayPickerContainerStyles;


        var isAnchoredLeft = anchorDirection === _constants.ANCHOR_LEFT;
        if (!withPortal && !withFullScreenPortal) {
          var containerRect = this.dayPickerContainer.getBoundingClientRect();
          var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
          var containerEdge = isAnchoredLeft ? containerRect[_constants.ANCHOR_RIGHT] : containerRect[_constants.ANCHOR_LEFT];

          this.setState({
            dayPickerContainerStyles: (0, _object2['default'])({}, (0, _getResponsiveContainerStyles2['default'])(anchorDirection, currentOffset, containerEdge, horizontalMargin), appendToBody && (0, _getDetachedContainerStyles2['default'])(openDirection, anchorDirection, this.container))
          });
        }
      }

      return responsivizePickerPosition;
    }()
  }, {
    key: 'showKeyboardShortcutsPanel',
    value: function () {
      function showKeyboardShortcutsPanel() {
        this.setState({
          isDateRangePickerInputFocused: false,
          isDayPickerFocused: true,
          showKeyboardShortcuts: true
        });
      }

      return showKeyboardShortcutsPanel;
    }()
  }, {
    key: 'maybeRenderDayPickerWithPortal',
    value: function () {
      function maybeRenderDayPickerWithPortal() {
        var _props6 = this.props,
            withPortal = _props6.withPortal,
            withFullScreenPortal = _props6.withFullScreenPortal,
            appendToBody = _props6.appendToBody;


        if (!this.isOpened()) {
          return null;
        }

        if (withPortal || withFullScreenPortal || appendToBody) {
          return _react2['default'].createElement(
            _reactPortal.Portal,
            null,
            this.renderDayPicker()
          );
        }

        return this.renderDayPicker();
      }

      return maybeRenderDayPickerWithPortal;
    }()
  }, {
    key: 'renderDayPicker',
    value: function () {
      function renderDayPicker() {
        var _props7 = this.props,
            anchorDirection = _props7.anchorDirection,
            openDirection = _props7.openDirection,
            isDayBlocked = _props7.isDayBlocked,
            isDayHighlighted = _props7.isDayHighlighted,
            isOutsideRange = _props7.isOutsideRange,
            numberOfMonths = _props7.numberOfMonths,
            orientation = _props7.orientation,
            monthFormat = _props7.monthFormat,
            renderMonthText = _props7.renderMonthText,
            navPrev = _props7.navPrev,
            navNext = _props7.navNext,
            onPrevMonthClick = _props7.onPrevMonthClick,
            onNextMonthClick = _props7.onNextMonthClick,
            onDatesChange = _props7.onDatesChange,
            onFocusChange = _props7.onFocusChange,
            withPortal = _props7.withPortal,
            withFullScreenPortal = _props7.withFullScreenPortal,
            daySize = _props7.daySize,
            enableOutsideDays = _props7.enableOutsideDays,
            focusedInput = _props7.focusedInput,
            startDate = _props7.startDate,
            endDate = _props7.endDate,
            minimumNights = _props7.minimumNights,
            keepOpenOnDateSelect = _props7.keepOpenOnDateSelect,
            renderCalendarDay = _props7.renderCalendarDay,
            renderDayContents = _props7.renderDayContents,
            renderCalendarInfo = _props7.renderCalendarInfo,
            renderMonthElement = _props7.renderMonthElement,
            calendarInfoPosition = _props7.calendarInfoPosition,
            firstDayOfWeek = _props7.firstDayOfWeek,
            initialVisibleMonth = _props7.initialVisibleMonth,
            hideKeyboardShortcutsPanel = _props7.hideKeyboardShortcutsPanel,
            customCloseIcon = _props7.customCloseIcon,
            onClose = _props7.onClose,
            phrases = _props7.phrases,
            dayAriaLabelFormat = _props7.dayAriaLabelFormat,
            isRTL = _props7.isRTL,
            weekDayFormat = _props7.weekDayFormat,
            styles = _props7.styles,
            verticalHeight = _props7.verticalHeight,
            transitionDuration = _props7.transitionDuration,
            verticalSpacing = _props7.verticalSpacing,
            small = _props7.small,
            disabled = _props7.disabled,
            reactDates = _props7.theme.reactDates;
        var _state = this.state,
            dayPickerContainerStyles = _state.dayPickerContainerStyles,
            isDayPickerFocused = _state.isDayPickerFocused,
            showKeyboardShortcuts = _state.showKeyboardShortcuts;


        var onOutsideClick = !withFullScreenPortal && withPortal ? this.onOutsideClick : undefined;
        var initialVisibleMonthThunk = initialVisibleMonth || function () {
          return startDate || endDate || (0, _moment2['default'])();
        };

        var closeIcon = customCloseIcon || _react2['default'].createElement(_CloseButton2['default'], (0, _reactWithStyles.css)(styles.DateRangePicker_closeButton_svg));

        var inputHeight = (0, _getInputHeight2['default'])(reactDates, small);

        var withAnyPortal = withPortal || withFullScreenPortal;

        return _react2['default'].createElement(
          'div',
          _extends({ // eslint-disable-line jsx-a11y/no-static-element-interactions
            ref: this.setDayPickerContainerRef
          }, (0, _reactWithStyles.css)(styles.DateRangePicker_picker, anchorDirection === _constants.ANCHOR_LEFT && styles.DateRangePicker_picker__directionLeft, anchorDirection === _constants.ANCHOR_RIGHT && styles.DateRangePicker_picker__directionRight, orientation === _constants.HORIZONTAL_ORIENTATION && styles.DateRangePicker_picker__horizontal, orientation === _constants.VERTICAL_ORIENTATION && styles.DateRangePicker_picker__vertical, !withAnyPortal && openDirection === _constants.OPEN_DOWN && {
            top: inputHeight + verticalSpacing
          }, !withAnyPortal && openDirection === _constants.OPEN_UP && {
            bottom: inputHeight + verticalSpacing
          }, withAnyPortal && styles.DateRangePicker_picker__portal, withFullScreenPortal && styles.DateRangePicker_picker__fullScreenPortal, isRTL && styles.DateRangePicker_picker__rtl, dayPickerContainerStyles), {
            onClick: onOutsideClick
          }),
          _react2['default'].createElement(_DayPickerRangeController2['default'], {
            orientation: orientation,
            enableOutsideDays: enableOutsideDays,
            numberOfMonths: numberOfMonths,
            onPrevMonthClick: onPrevMonthClick,
            onNextMonthClick: onNextMonthClick,
            onDatesChange: onDatesChange,
            onFocusChange: onFocusChange,
            onClose: onClose,
            focusedInput: focusedInput,
            startDate: startDate,
            endDate: endDate,
            monthFormat: monthFormat,
            renderMonthText: renderMonthText,
            withPortal: withAnyPortal,
            daySize: daySize,
            initialVisibleMonth: initialVisibleMonthThunk,
            hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
            navPrev: navPrev,
            navNext: navNext,
            minimumNights: minimumNights,
            isOutsideRange: isOutsideRange,
            isDayHighlighted: isDayHighlighted,
            isDayBlocked: isDayBlocked,
            keepOpenOnDateSelect: keepOpenOnDateSelect,
            renderCalendarDay: renderCalendarDay,
            renderDayContents: renderDayContents,
            renderCalendarInfo: renderCalendarInfo,
            renderMonthElement: renderMonthElement,
            calendarInfoPosition: calendarInfoPosition,
            isFocused: isDayPickerFocused,
            showKeyboardShortcuts: showKeyboardShortcuts,
            onBlur: this.onDayPickerBlur,
            phrases: phrases,
            dayAriaLabelFormat: dayAriaLabelFormat,
            isRTL: isRTL,
            firstDayOfWeek: firstDayOfWeek,
            weekDayFormat: weekDayFormat,
            verticalHeight: verticalHeight,
            transitionDuration: transitionDuration,
            disabled: disabled
          }),
          withFullScreenPortal && _react2['default'].createElement(
            'button',
            _extends({}, (0, _reactWithStyles.css)(styles.DateRangePicker_closeButton), {
              type: 'button',
              onClick: this.onOutsideClick,
              'aria-label': phrases.closeDatePicker
            }),
            closeIcon
          )
        );
      }

      return renderDayPicker;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props8 = this.props,
            startDate = _props8.startDate,
            startDateId = _props8.startDateId,
            startDatePlaceholderText = _props8.startDatePlaceholderText,
            endDate = _props8.endDate,
            endDateId = _props8.endDateId,
            endDatePlaceholderText = _props8.endDatePlaceholderText,
            focusedInput = _props8.focusedInput,
            screenReaderInputMessage = _props8.screenReaderInputMessage,
            showClearDates = _props8.showClearDates,
            showDefaultInputIcon = _props8.showDefaultInputIcon,
            inputIconPosition = _props8.inputIconPosition,
            customInputIcon = _props8.customInputIcon,
            customArrowIcon = _props8.customArrowIcon,
            customCloseIcon = _props8.customCloseIcon,
            disabled = _props8.disabled,
            required = _props8.required,
            readOnly = _props8.readOnly,
            openDirection = _props8.openDirection,
            phrases = _props8.phrases,
            isOutsideRange = _props8.isOutsideRange,
            minimumNights = _props8.minimumNights,
            withPortal = _props8.withPortal,
            withFullScreenPortal = _props8.withFullScreenPortal,
            displayFormat = _props8.displayFormat,
            reopenPickerOnClearDates = _props8.reopenPickerOnClearDates,
            keepOpenOnDateSelect = _props8.keepOpenOnDateSelect,
            onDatesChange = _props8.onDatesChange,
            onClose = _props8.onClose,
            isRTL = _props8.isRTL,
            noBorder = _props8.noBorder,
            block = _props8.block,
            verticalSpacing = _props8.verticalSpacing,
            small = _props8.small,
            regular = _props8.regular,
            styles = _props8.styles;
        var isDateRangePickerInputFocused = this.state.isDateRangePickerInputFocused;


        var onOutsideClick = !withPortal && !withFullScreenPortal ? this.onOutsideClick : undefined;

        var hideFang = verticalSpacing < _constants.FANG_HEIGHT_PX;

        return _react2['default'].createElement(
          'div',
          _extends({
            ref: this.setContainerRef
          }, (0, _reactWithStyles.css)(styles.DateRangePicker, block && styles.DateRangePicker__block)),
          _react2['default'].createElement(
            _reactOutsideClickHandler2['default'],
            { onOutsideClick: onOutsideClick },
            _react2['default'].createElement(_DateRangePickerInputController2['default'], {
              startDate: startDate,
              startDateId: startDateId,
              startDatePlaceholderText: startDatePlaceholderText,
              isStartDateFocused: focusedInput === _constants.START_DATE,
              endDate: endDate,
              endDateId: endDateId,
              endDatePlaceholderText: endDatePlaceholderText,
              isEndDateFocused: focusedInput === _constants.END_DATE,
              displayFormat: displayFormat,
              showClearDates: showClearDates,
              showCaret: !withPortal && !withFullScreenPortal && !hideFang,
              showDefaultInputIcon: showDefaultInputIcon,
              inputIconPosition: inputIconPosition,
              customInputIcon: customInputIcon,
              customArrowIcon: customArrowIcon,
              customCloseIcon: customCloseIcon,
              disabled: disabled,
              required: required,
              readOnly: readOnly,
              openDirection: openDirection,
              reopenPickerOnClearDates: reopenPickerOnClearDates,
              keepOpenOnDateSelect: keepOpenOnDateSelect,
              isOutsideRange: isOutsideRange,
              minimumNights: minimumNights,
              withFullScreenPortal: withFullScreenPortal,
              onDatesChange: onDatesChange,
              onFocusChange: this.onDateRangePickerInputFocus,
              onKeyDownArrowDown: this.onDayPickerFocus,
              onKeyDownQuestionMark: this.showKeyboardShortcutsPanel,
              onClose: onClose,
              phrases: phrases,
              screenReaderMessage: screenReaderInputMessage,
              isFocused: isDateRangePickerInputFocused,
              isRTL: isRTL,
              noBorder: noBorder,
              block: block,
              small: small,
              regular: regular,
              verticalSpacing: verticalSpacing
            }),
            this.maybeRenderDayPickerWithPortal()
          )
        );
      }

      return render;
    }()
  }]);

  return DateRangePicker;
}(_react2['default'].Component);

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;

exports.PureDateRangePicker = DateRangePicker;
exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref) {
  var _ref$reactDates = _ref.reactDates,
      color = _ref$reactDates.color,
      zIndex = _ref$reactDates.zIndex;
  return {
    DateRangePicker: {
      position: 'relative',
      display: 'inline-block'
    },

    DateRangePicker__block: {
      display: 'block'
    },

    DateRangePicker_picker: {
      zIndex: zIndex + 1,
      backgroundColor: color.background,
      position: 'absolute'
    },

    DateRangePicker_picker__rtl: {
      direction: 'rtl'
    },

    DateRangePicker_picker__directionLeft: {
      left: 0
    },

    DateRangePicker_picker__directionRight: {
      right: 0
    },

    DateRangePicker_picker__portal: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%'
    },

    DateRangePicker_picker__fullScreenPortal: {
      backgroundColor: color.background
    },

    DateRangePicker_closeButton: {
      background: 'none',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',

      position: 'absolute',
      top: 0,
      right: 0,
      padding: 15,
      zIndex: zIndex + 2,

      ':hover': {
        color: 'darken(' + String(color.core.grayLighter) + ', 10%)',
        textDecoration: 'none'
      },

      ':focus': {
        color: 'darken(' + String(color.core.grayLighter) + ', 10%)',
        textDecoration: 'none'
      }
    },

    DateRangePicker_closeButton_svg: {
      height: 15,
      width: 15,
      fill: color.core.grayLighter
    }
  };
})(DateRangePicker);