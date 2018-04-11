var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

import _objectAssign from 'object.assign';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import moment from 'moment';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import { Portal } from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener } from 'consolidated-events';
import isTouchDevice from 'is-touch-device';

import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';

import OutsideClickHandler from './OutsideClickHandler';
import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';
import getInputHeight from '../utils/getInputHeight';

import SingleDatePickerInput from './SingleDatePickerInput';
import DayPickerSingleDateController from './DayPickerSingleDateController';

import CloseButton from './CloseButton';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, ANCHOR_LEFT, ANCHOR_RIGHT, OPEN_DOWN, OPEN_UP, DAY_SIZE, ICON_BEFORE_POSITION, INFO_POSITION_BOTTOM, FANG_HEIGHT_PX, DEFAULT_VERTICAL_SPACING } from '../constants';

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, SingleDatePickerShape));

var defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  focused: false,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  openDirection: OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  verticalHeight: null,
  transitionDuration: undefined,

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


  // month presentation and interaction related props
  renderMonth: null,

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: function () {
    function isDayBlocked() {
      return false;
    }

    return isDayBlocked;
  }(),
  isOutsideRange: function () {
    function isOutsideRange(day) {
      return !isInclusivelyAfterDay(day, moment());
    }

    return isOutsideRange;
  }(),
  isDayHighlighted: function () {
    function isDayHighlighted() {}

    return isDayHighlighted;
  }(),

  // internationalization props
  displayFormat: function () {
    function displayFormat() {
      return moment.localeData().longDateFormat('L');
    }

    return displayFormat;
  }(),
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: SingleDatePickerPhrases,
  dayAriaLabelFormat: undefined
};

var SingleDatePicker = function (_React$Component) {
  _inherits(SingleDatePicker, _React$Component);

  function SingleDatePicker(props) {
    _classCallCheck(this, SingleDatePicker);

    var _this = _possibleConstructorReturn(this, (SingleDatePicker.__proto__ || Object.getPrototypeOf(SingleDatePicker)).call(this, props));

    _this.isTouchDevice = false;

    _this.state = {
      dayPickerContainerStyles: {},
      isDayPickerFocused: false,
      isInputFocused: false,
      showKeyboardShortcuts: false
    };

    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_this);
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_this);
    _this.showKeyboardShortcutsPanel = _this.showKeyboardShortcutsPanel.bind(_this);

    _this.onChange = _this.onChange.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onClearFocus = _this.onClearFocus.bind(_this);
    _this.clearDate = _this.clearDate.bind(_this);

    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_this);

    _this.setDayPickerContainerRef = _this.setDayPickerContainerRef.bind(_this);
    return _this;
  }

  /* istanbul ignore next */


  _createClass(SingleDatePicker, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.removeEventListener = addEventListener(window, 'resize', this.responsivizePickerPosition, { passive: true });
        this.responsivizePickerPosition();

        if (this.props.focused) {
          this.setState({
            isInputFocused: true
          });
        }

        this.isTouchDevice = isTouchDevice();
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        if (!prevProps.focused && this.props.focused) {
          this.responsivizePickerPosition();
        }
      }

      return componentDidUpdate;
    }()

    /* istanbul ignore next */

  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.removeEventListener) this.removeEventListener();
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'onChange',
    value: function () {
      function onChange(dateString) {
        var _props = this.props,
            isOutsideRange = _props.isOutsideRange,
            keepOpenOnDateSelect = _props.keepOpenOnDateSelect,
            onDateChange = _props.onDateChange,
            onFocusChange = _props.onFocusChange,
            onClose = _props.onClose;

        var newDate = toMomentObject(dateString, this.getDisplayFormat());

        var isValid = newDate && !isOutsideRange(newDate);
        if (isValid) {
          onDateChange(newDate);
          if (!keepOpenOnDateSelect) {
            onFocusChange({ focused: false });
            onClose({ date: newDate });
          }
        } else {
          onDateChange(null);
        }
      }

      return onChange;
    }()
  }, {
    key: 'onFocus',
    value: function () {
      function onFocus() {
        var _props2 = this.props,
            disabled = _props2.disabled,
            onFocusChange = _props2.onFocusChange,
            withPortal = _props2.withPortal,
            withFullScreenPortal = _props2.withFullScreenPortal,
            keepFocusOnInput = _props2.keepFocusOnInput;


        var withAnyPortal = withPortal || withFullScreenPortal;
        var moveFocusToDayPicker = withAnyPortal || this.isTouchDevice && !keepFocusOnInput;

        if (moveFocusToDayPicker) {
          this.onDayPickerFocus();
        } else {
          this.onDayPickerBlur();
        }

        if (!disabled) {
          onFocusChange({ focused: true });
        }
      }

      return onFocus;
    }()
  }, {
    key: 'onClearFocus',
    value: function () {
      function onClearFocus() {
        var _props3 = this.props,
            date = _props3.date,
            focused = _props3.focused,
            onFocusChange = _props3.onFocusChange,
            onClose = _props3.onClose;

        if (!focused) return;

        this.setState({
          isInputFocused: false,
          isDayPickerFocused: false
        });

        onFocusChange({ focused: false });
        onClose({ date: date });
      }

      return onClearFocus;
    }()
  }, {
    key: 'onDayPickerFocus',
    value: function () {
      function onDayPickerFocus() {
        this.setState({
          isInputFocused: false,
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
          isInputFocused: true,
          isDayPickerFocused: false,
          showKeyboardShortcuts: false
        });
      }

      return onDayPickerBlur;
    }()
  }, {
    key: 'getDateString',
    value: function () {
      function getDateString(date) {
        var displayFormat = this.getDisplayFormat();
        if (date && displayFormat) {
          return date && date.format(displayFormat);
        }
        return toLocalizedDateString(date);
      }

      return getDateString;
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
    key: 'setDayPickerContainerRef',
    value: function () {
      function setDayPickerContainerRef(ref) {
        this.dayPickerContainer = ref;
      }

      return setDayPickerContainerRef;
    }()
  }, {
    key: 'clearDate',
    value: function () {
      function clearDate() {
        var _props4 = this.props,
            onDateChange = _props4.onDateChange,
            reopenPickerOnClearDate = _props4.reopenPickerOnClearDate,
            onFocusChange = _props4.onFocusChange;

        onDateChange(null);
        if (reopenPickerOnClearDate) {
          onFocusChange({ focused: true });
        }
      }

      return clearDate;
    }()

    /* istanbul ignore next */

  }, {
    key: 'responsivizePickerPosition',
    value: function () {
      function responsivizePickerPosition() {
        // It's possible the portal props have been changed in response to window resizes
        // So let's ensure we reset this back to the base state each time
        this.setState({ dayPickerContainerStyles: {} });

        var _props5 = this.props,
            anchorDirection = _props5.anchorDirection,
            horizontalMargin = _props5.horizontalMargin,
            withPortal = _props5.withPortal,
            withFullScreenPortal = _props5.withFullScreenPortal,
            focused = _props5.focused;
        var dayPickerContainerStyles = this.state.dayPickerContainerStyles;


        if (!focused) {
          return;
        }

        var isAnchoredLeft = anchorDirection === ANCHOR_LEFT;

        if (!withPortal && !withFullScreenPortal) {
          var containerRect = this.dayPickerContainer.getBoundingClientRect();
          var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
          var containerEdge = isAnchoredLeft ? containerRect[ANCHOR_RIGHT] : containerRect[ANCHOR_LEFT];

          this.setState({
            dayPickerContainerStyles: getResponsiveContainerStyles(anchorDirection, currentOffset, containerEdge, horizontalMargin)
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
          isInputFocused: false,
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
            focused = _props6.focused,
            withPortal = _props6.withPortal,
            withFullScreenPortal = _props6.withFullScreenPortal;


        if (!focused) {
          return null;
        }

        if (withPortal || withFullScreenPortal) {
          return React.createElement(
            Portal,
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
            onDateChange = _props7.onDateChange,
            date = _props7.date,
            onFocusChange = _props7.onFocusChange,
            focused = _props7.focused,
            enableOutsideDays = _props7.enableOutsideDays,
            numberOfMonths = _props7.numberOfMonths,
            orientation = _props7.orientation,
            monthFormat = _props7.monthFormat,
            navPrev = _props7.navPrev,
            navNext = _props7.navNext,
            onPrevMonthClick = _props7.onPrevMonthClick,
            onNextMonthClick = _props7.onNextMonthClick,
            onClose = _props7.onClose,
            withPortal = _props7.withPortal,
            withFullScreenPortal = _props7.withFullScreenPortal,
            keepOpenOnDateSelect = _props7.keepOpenOnDateSelect,
            initialVisibleMonth = _props7.initialVisibleMonth,
            renderMonth = _props7.renderMonth,
            renderCalendarDay = _props7.renderCalendarDay,
            renderDayContents = _props7.renderDayContents,
            renderCalendarInfo = _props7.renderCalendarInfo,
            calendarInfoPosition = _props7.calendarInfoPosition,
            hideKeyboardShortcutsPanel = _props7.hideKeyboardShortcutsPanel,
            firstDayOfWeek = _props7.firstDayOfWeek,
            customCloseIcon = _props7.customCloseIcon,
            phrases = _props7.phrases,
            dayAriaLabelFormat = _props7.dayAriaLabelFormat,
            daySize = _props7.daySize,
            isRTL = _props7.isRTL,
            isOutsideRange = _props7.isOutsideRange,
            isDayBlocked = _props7.isDayBlocked,
            isDayHighlighted = _props7.isDayHighlighted,
            weekDayFormat = _props7.weekDayFormat,
            styles = _props7.styles,
            verticalHeight = _props7.verticalHeight,
            transitionDuration = _props7.transitionDuration,
            verticalSpacing = _props7.verticalSpacing,
            small = _props7.small,
            reactDates = _props7.theme.reactDates;
        var _state = this.state,
            dayPickerContainerStyles = _state.dayPickerContainerStyles,
            isDayPickerFocused = _state.isDayPickerFocused,
            showKeyboardShortcuts = _state.showKeyboardShortcuts;


        var onOutsideClick = !withFullScreenPortal && withPortal ? this.onClearFocus : undefined;
        var closeIcon = customCloseIcon || React.createElement(CloseButton, null);

        var inputHeight = getInputHeight(reactDates, small);

        var withAnyPortal = withPortal || withFullScreenPortal;

        return React.createElement(
          'div',
          _extends({ // eslint-disable-line jsx-a11y/no-static-element-interactions
            ref: this.setDayPickerContainerRef
          }, css(styles.SingleDatePicker_picker, anchorDirection === ANCHOR_LEFT && styles.SingleDatePicker_picker__directionLeft, anchorDirection === ANCHOR_RIGHT && styles.SingleDatePicker_picker__directionRight, openDirection === OPEN_DOWN && styles.SingleDatePicker_picker__openDown, openDirection === OPEN_UP && styles.SingleDatePicker_picker__openUp, !withAnyPortal && openDirection === OPEN_DOWN && {
            top: inputHeight + verticalSpacing
          }, !withAnyPortal && openDirection === OPEN_UP && {
            bottom: inputHeight + verticalSpacing
          }, orientation === HORIZONTAL_ORIENTATION && styles.SingleDatePicker_picker__horizontal, orientation === VERTICAL_ORIENTATION && styles.SingleDatePicker_picker__vertical, withAnyPortal && styles.SingleDatePicker_picker__portal, withFullScreenPortal && styles.SingleDatePicker_picker__fullScreenPortal, isRTL && styles.SingleDatePicker_picker__rtl, dayPickerContainerStyles), {
            onClick: onOutsideClick
          }),
          React.createElement(DayPickerSingleDateController, {
            date: date,
            onDateChange: onDateChange,
            onFocusChange: onFocusChange,
            orientation: orientation,
            enableOutsideDays: enableOutsideDays,
            numberOfMonths: numberOfMonths,
            monthFormat: monthFormat,
            withPortal: withAnyPortal,
            focused: focused,
            keepOpenOnDateSelect: keepOpenOnDateSelect,
            hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
            initialVisibleMonth: initialVisibleMonth,
            navPrev: navPrev,
            navNext: navNext,
            onPrevMonthClick: onPrevMonthClick,
            onNextMonthClick: onNextMonthClick,
            onClose: onClose,
            renderMonth: renderMonth,
            renderCalendarDay: renderCalendarDay,
            renderDayContents: renderDayContents,
            renderCalendarInfo: renderCalendarInfo,
            calendarInfoPosition: calendarInfoPosition,
            isFocused: isDayPickerFocused,
            showKeyboardShortcuts: showKeyboardShortcuts,
            onBlur: this.onDayPickerBlur,
            phrases: phrases,
            dayAriaLabelFormat: dayAriaLabelFormat,
            daySize: daySize,
            isRTL: isRTL,
            isOutsideRange: isOutsideRange,
            isDayBlocked: isDayBlocked,
            isDayHighlighted: isDayHighlighted,
            firstDayOfWeek: firstDayOfWeek,
            weekDayFormat: weekDayFormat,
            verticalHeight: verticalHeight,
            transitionDuration: transitionDuration
          }),
          withFullScreenPortal && React.createElement(
            'button',
            _extends({}, css(styles.SingleDatePicker_closeButton), {
              'aria-label': phrases.closeDatePicker,
              type: 'button',
              onClick: this.onClearFocus
            }),
            React.createElement(
              'div',
              css(styles.SingleDatePicker_closeButton_svg),
              closeIcon
            )
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
            id = _props8.id,
            placeholder = _props8.placeholder,
            disabled = _props8.disabled,
            focused = _props8.focused,
            required = _props8.required,
            readOnly = _props8.readOnly,
            openDirection = _props8.openDirection,
            showClearDate = _props8.showClearDate,
            showDefaultInputIcon = _props8.showDefaultInputIcon,
            inputIconPosition = _props8.inputIconPosition,
            customCloseIcon = _props8.customCloseIcon,
            customInputIcon = _props8.customInputIcon,
            date = _props8.date,
            phrases = _props8.phrases,
            withPortal = _props8.withPortal,
            withFullScreenPortal = _props8.withFullScreenPortal,
            screenReaderInputMessage = _props8.screenReaderInputMessage,
            isRTL = _props8.isRTL,
            noBorder = _props8.noBorder,
            block = _props8.block,
            small = _props8.small,
            regular = _props8.regular,
            verticalSpacing = _props8.verticalSpacing,
            styles = _props8.styles;
        var isInputFocused = this.state.isInputFocused;


        var displayValue = this.getDateString(date);

        var onOutsideClick = !withPortal && !withFullScreenPortal ? this.onClearFocus : undefined;

        var hideFang = verticalSpacing < FANG_HEIGHT_PX;

        return React.createElement(
          'div',
          css(styles.SingleDatePicker, block && styles.SingleDatePicker__block),
          React.createElement(
            OutsideClickHandler,
            { onOutsideClick: onOutsideClick },
            React.createElement(SingleDatePickerInput, {
              id: id,
              placeholder: placeholder,
              focused: focused,
              isFocused: isInputFocused,
              disabled: disabled,
              required: required,
              readOnly: readOnly,
              openDirection: openDirection,
              showCaret: !withPortal && !withFullScreenPortal && !hideFang,
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
              onKeyDownTab: this.onClearFocus,
              onKeyDownArrowDown: this.onDayPickerFocus,
              onKeyDownQuestionMark: this.showKeyboardShortcutsPanel,
              screenReaderMessage: screenReaderInputMessage,
              phrases: phrases,
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

  return SingleDatePicker;
}(React.Component);

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;

export { SingleDatePicker as PureSingleDatePicker };
export default withStyles(function (_ref) {
  var _ref$reactDates = _ref.reactDates,
      color = _ref$reactDates.color,
      zIndex = _ref$reactDates.zIndex;
  return {
    SingleDatePicker: {
      position: 'relative',
      display: 'inline-block'
    },

    SingleDatePicker__block: {
      display: 'block'
    },

    SingleDatePicker_picker: {
      zIndex: zIndex + 1,
      backgroundColor: color.background,
      position: 'absolute'
    },

    SingleDatePicker_picker__rtl: {
      direction: 'rtl'
    },

    SingleDatePicker_picker__directionLeft: {
      left: 0
    },

    SingleDatePicker_picker__directionRight: {
      right: 0
    },

    SingleDatePicker_picker__portal: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%'
    },

    SingleDatePicker_picker__fullScreenPortal: {
      backgroundColor: color.background
    },

    SingleDatePicker_closeButton: {
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

    SingleDatePicker_closeButton_svg: {
      height: 15,
      width: 15,
      fill: color.core.grayLighter
    }
  };
})(SingleDatePicker);