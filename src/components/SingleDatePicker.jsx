import React from 'react';
import moment from 'moment';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import Portal from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener } from 'consolidated-events';
import isTouchDevice from 'is-touch-device';

import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';

import OutsideClickHandler from './OutsideClickHandler';
import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';

import SingleDatePickerInput from './SingleDatePickerInput';
import DayPickerSingleDateController from './DayPickerSingleDateController';

import CloseButton from './CloseButton';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
  OPEN_DOWN,
  OPEN_UP,
  DAY_SIZE,
  ICON_BEFORE_POSITION,
} from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  ...SingleDatePickerShape,
});

const defaultProps = {
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
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  verticalHeight: null,

  // navigation related props
  navPrev: null,
  navNext: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // month presentation and interaction related props
  renderMonth: null,

  // day presentation and interaction related props
  renderDay: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: SingleDatePickerPhrases,
};

class SingleDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.isTouchDevice = false;

    this.state = {
      dayPickerContainerStyles: {},
      isDayPickerFocused: false,
      isInputFocused: false,
      showKeyboardShortcuts: false,
    };

    this.onDayPickerFocus = this.onDayPickerFocus.bind(this);
    this.onDayPickerBlur = this.onDayPickerBlur.bind(this);
    this.showKeyboardShortcutsPanel = this.showKeyboardShortcutsPanel.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.clearDate = this.clearDate.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);

    this.setDayPickerContainerRef = this.setDayPickerContainerRef.bind(this);
  }

  /* istanbul ignore next */
  componentDidMount() {
    this.removeEventListener = addEventListener(
      window,
      'resize',
      this.responsivizePickerPosition,
      { passive: true },
    );
    this.responsivizePickerPosition();

    if (this.props.focused) {
      this.setState({
        isInputFocused: true,
      });
    }

    this.isTouchDevice = isTouchDevice();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.focused && this.props.focused) {
      this.responsivizePickerPosition();
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    if (this.removeEventListener) this.removeEventListener();
  }

  onChange(dateString) {
    const {
      isOutsideRange,
      keepOpenOnDateSelect,
      onDateChange,
      onFocusChange,
      onClose,
    } = this.props;
    const newDate = toMomentObject(dateString, this.getDisplayFormat());

    const isValid = newDate && !isOutsideRange(newDate);
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

  onFocus() {
    const {
      disabled,
      onFocusChange,
      withPortal,
      withFullScreenPortal,
    } = this.props;

    const moveFocusToDayPicker = withPortal || withFullScreenPortal || this.isTouchDevice;
    if (moveFocusToDayPicker) {
      this.onDayPickerFocus();
    } else {
      this.onDayPickerBlur();
    }

    if (!disabled) {
      onFocusChange({ focused: true });
    }
  }

  onClearFocus() {
    const {
      date,
      focused,
      onFocusChange,
      onClose,
    } = this.props;
    if (!focused) return;

    this.setState({
      isInputFocused: false,
      isDayPickerFocused: false,
    });

    onFocusChange({ focused: false });
    onClose({ date });
  }

  onDayPickerFocus() {
    this.setState({
      isInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: false,
    });
  }

  onDayPickerBlur() {
    this.setState({
      isInputFocused: true,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false,
    });
  }

  getDateString(date) {
    const displayFormat = this.getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date);
  }

  getDisplayFormat() {
    const { displayFormat } = this.props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  setDayPickerContainerRef(ref) {
    this.dayPickerContainer = ref;
  }

  clearDate() {
    const { onDateChange, reopenPickerOnClearDate, onFocusChange } = this.props;
    onDateChange(null);
    if (reopenPickerOnClearDate) {
      onFocusChange({ focused: true });
    }
  }

  /* istanbul ignore next */
  responsivizePickerPosition() {
    // It's possible the portal props have been changed in response to window resizes
    // So let's ensure we reset this back to the base state each time
    this.setState({ dayPickerContainerStyles: {} });

    const {
      anchorDirection,
      horizontalMargin,
      withPortal,
      withFullScreenPortal,
      focused,
    } = this.props;
    const { dayPickerContainerStyles } = this.state;

    if (!focused) {
      return;
    }

    const isAnchoredLeft = anchorDirection === ANCHOR_LEFT;

    if (!withPortal && !withFullScreenPortal) {
      const containerRect = this.dayPickerContainer.getBoundingClientRect();
      const currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
      const containerEdge = isAnchoredLeft
        ? containerRect[ANCHOR_RIGHT]
        : containerRect[ANCHOR_LEFT];

      this.setState({
        dayPickerContainerStyles: getResponsiveContainerStyles(
          anchorDirection,
          currentOffset,
          containerEdge,
          horizontalMargin,
        ),
      });
    }
  }

  showKeyboardShortcutsPanel() {
    this.setState({
      isInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: true,
    });
  }

  maybeRenderDayPickerWithPortal() {
    const { focused, withPortal, withFullScreenPortal } = this.props;

    if (!focused) {
      return null;
    }

    if (withPortal || withFullScreenPortal) {
      return (
        <Portal isOpened>
          {this.renderDayPicker()}
        </Portal>
      );
    }

    return this.renderDayPicker();
  }

  renderDayPicker() {
    const {
      anchorDirection,
      openDirection,
      onDateChange,
      date,
      onFocusChange,
      focused,
      enableOutsideDays,
      numberOfMonths,
      orientation,
      monthFormat,
      navPrev,
      navNext,
      onPrevMonthClick,
      onNextMonthClick,
      onClose,
      withPortal,
      withFullScreenPortal,
      keepOpenOnDateSelect,
      initialVisibleMonth,
      renderMonth,
      renderDay,
      renderCalendarInfo,
      hideKeyboardShortcutsPanel,
      firstDayOfWeek,
      customCloseIcon,
      phrases,
      daySize,
      isRTL,
      isOutsideRange,
      isDayBlocked,
      isDayHighlighted,
      weekDayFormat,
      styles,
      verticalHeight,
    } = this.props;
    const { dayPickerContainerStyles, isDayPickerFocused, showKeyboardShortcuts } = this.state;

    const onOutsideClick = (!withFullScreenPortal && withPortal) ? this.onClearFocus : undefined;
    const closeIcon = customCloseIcon || (<CloseButton />);

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        ref={this.setDayPickerContainerRef}
        {...css(
          styles.SingleDatePicker_picker,
          anchorDirection === ANCHOR_LEFT && styles.SingleDatePicker_picker__directionLeft,
          anchorDirection === ANCHOR_RIGHT && styles.SingleDatePicker_picker__directionRight,
          openDirection === OPEN_DOWN && styles.SingleDatePicker_picker__openDown,
          openDirection === OPEN_UP && styles.SingleDatePicker_picker__openUp,
          orientation === HORIZONTAL_ORIENTATION && styles.SingleDatePicker_picker__horizontal,
          orientation === VERTICAL_ORIENTATION && styles.SingleDatePicker_picker__vertical,
          (withPortal || withFullScreenPortal) && styles.SingleDatePicker_picker__portal,
          withFullScreenPortal && styles.SingleDatePicker_picker__fullScreenPortal,
          isRTL && styles.SingleDatePicker_picker__rtl,
        )}
        style={dayPickerContainerStyles}
        onClick={onOutsideClick}
      >
        <DayPickerSingleDateController
          date={date}
          onDateChange={onDateChange}
          onFocusChange={onFocusChange}
          orientation={orientation}
          enableOutsideDays={enableOutsideDays}
          numberOfMonths={numberOfMonths}
          monthFormat={monthFormat}
          withPortal={withPortal || withFullScreenPortal}
          focused={focused}
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          initialVisibleMonth={initialVisibleMonth}
          navPrev={navPrev}
          navNext={navNext}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          onClose={onClose}
          renderMonth={renderMonth}
          renderDay={renderDay}
          renderCalendarInfo={renderCalendarInfo}
          isFocused={isDayPickerFocused}
          showKeyboardShortcuts={showKeyboardShortcuts}
          onBlur={this.onDayPickerBlur}
          phrases={phrases}
          daySize={daySize}
          isRTL={isRTL}
          isOutsideRange={isOutsideRange}
          isDayBlocked={isDayBlocked}
          isDayHighlighted={isDayHighlighted}
          firstDayOfWeek={firstDayOfWeek}
          weekDayFormat={weekDayFormat}
          verticalHeight={verticalHeight}
        />

        {withFullScreenPortal && (
          <button
            aria-label={phrases.closeDatePicker}
            className="SingleDatePicker__close"
            type="button"
            onClick={this.onClearFocus}
          >
            <div className="SingleDatePicker__close-icon">
              {closeIcon}
            </div>
          </button>
        )}
      </div>
    );
  }

  render() {
    const {
      id,
      placeholder,
      disabled,
      focused,
      required,
      readOnly,
      openDirection,
      showClearDate,
      showDefaultInputIcon,
      inputIconPosition,
      customCloseIcon,
      customInputIcon,
      date,
      phrases,
      withPortal,
      withFullScreenPortal,
      screenReaderInputMessage,
      isRTL,
      noBorder,
      styles,
    } = this.props;

    const { isInputFocused } = this.state;

    const displayValue = this.getDateString(date);

    const onOutsideClick = (!withPortal && !withFullScreenPortal) ? this.onClearFocus : undefined;

    return (
      <div {...css(styles.SingleDatePicker)}>
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <SingleDatePickerInput
            id={id}
            placeholder={placeholder}
            focused={focused}
            isFocused={isInputFocused}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            openDirection={openDirection}
            showCaret={!withPortal && !withFullScreenPortal}
            onClearDate={this.clearDate}
            showClearDate={showClearDate}
            showDefaultInputIcon={showDefaultInputIcon}
            inputIconPosition={inputIconPosition}
            customCloseIcon={customCloseIcon}
            customInputIcon={customInputIcon}
            displayValue={displayValue}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onKeyDownShiftTab={this.onClearFocus}
            onKeyDownTab={this.onClearFocus}
            onKeyDownArrowDown={this.onDayPickerFocus}
            onKeyDownQuestionMark={this.showKeyboardShortcutsPanel}
            screenReaderMessage={screenReaderInputMessage}
            phrases={phrases}
            isRTL={isRTL}
            noBorder={noBorder}
          />

          {this.maybeRenderDayPickerWithPortal()}
        </OutsideClickHandler>
      </div>
    );
  }
}

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;

export { SingleDatePicker as PureSingleDatePicker };
export default withStyles(({ reactDates: { color, spacing, zIndex } }) => ({
  SingleDatePicker: {
    position: 'relative',
    display: 'inline-block',
  },

  SingleDatePicker_picker: {
    zIndex: zIndex + 1,
    backgroundColor: color.background,
    position: 'absolute',
  },

  SingleDatePicker_picker__rtl: {
    direction: 'rtl',
  },

  SingleDatePicker_picker__directionLeft: {
    left: 0,
  },

  SingleDatePicker_picker__directionRight: {
    right: 0,
  },

  SingleDatePicker_picker__openDown: {
    top: spacing.inputMarginBottom,
  },

  SingleDatePicker_picker__openUp: {
    bottom: spacing.inputMarginBottom,
  },

  SingleDatePicker_picker__portal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },

  SingleDatePicker_picker__fullScreenPortal: {
    backgroundColor: color.background,
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
      color: `darken(${color.core.grayLighter}, 10%)`,
      textDecoration: 'none',
    },

    ':focus': {
      color: `darken(${color.core.grayLighter}, 10%)`,
      textDecoration: 'none',
    },
  },

  SingleDatePicker_closeButton_svg: {
    height: 15,
    width: 15,
    fill: color.core.grayLighter,
  },
}))(SingleDatePicker);
