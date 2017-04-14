import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import Portal from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener, removeEventListener } from 'consolidated-events';

import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';

import OutsideClickHandler from './OutsideClickHandler';
import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';
import toISODateString from '../utils/toISODateString';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';
import isTouchDevice from '../utils/isTouchDevice';

import SingleDatePickerInput from './SingleDatePickerInput';
import DayPicker from './DayPicker';

import CloseButton from '../svg/close.svg';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isSameDay from '../utils/isSameDay';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
  DAY_SIZE,
} from '../../constants';

const propTypes = forbidExtraProps(SingleDatePickerShape);

const defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  focused: false,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  renderCalendarInfo: null,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,

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
  phrases: SingleDatePickerPhrases,
};

export default class SingleDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayPickerContainerStyles: {},
      hoverDate: null,
      isDayPickerFocused: false,
      isInputFocused: false,
    };

    this.today = moment();
    this.isTouchDevice = false;

    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.onDayPickerFocus = this.onDayPickerFocus.bind(this);
    this.onDayPickerBlur = this.onDayPickerBlur.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.clearDate = this.clearDate.bind(this);

    this.getFirstFocusableDay = this.getFirstFocusableDay.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);
  }

  /* istanbul ignore next */
  componentDidMount() {
    this.resizeHandle = addEventListener(
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

  componentWillUpdate() {
    this.today = moment();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.focused && this.props.focused) {
      this.responsivizePickerPosition();
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    removeEventListener(this.resizeHandle);
  }

  onChange(dateString) {
    const {
      startDate,
      isOutsideRange,
      keepOpenOnDateSelect,
      onDateChange,
      onFocusChange,
      onClose,
    } = this.props;
    const endDate = toMomentObject(dateString, this.getDisplayFormat());

    const isValid = endDate && !isOutsideRange(endDate);
    if (isValid) {
      onDateChange(endDate);
      if (!keepOpenOnDateSelect) {
        onFocusChange({ focused: false });
        onClose({ startDate, endDate });
      }
    } else {
      onDateChange(null);
    }
  }

  onDayClick(day, e) {
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;
    const {
      onDateChange,
      keepOpenOnDateSelect,
      onFocusChange,
      onClose,
      startDate,
      endDate,
    } = this.props;

    onDateChange(day);
    if (!keepOpenOnDateSelect) {
      onFocusChange({ focused: null });
      onClose({ startDate, endDate });
    }
  }

  onDayMouseEnter(day) {
    this.setState({
      hoverDate: day,
    });
  }

  onDayMouseLeave() {
    this.setState({
      hoverDate: null,
    });
  }

  onFocus() {
    const { disabled, onFocusChange, withPortal, withFullScreenPortal } = this.props;

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
    const { startDate, endDate, focused, onFocusChange, onClose } = this.props;
    if (!focused) return;

    this.setState({
      isInputFocused: false,
      isDayPickerFocused: false,
    });

    onFocusChange({ focused: false });
    onClose({ startDate, endDate });
  }

  onDayPickerFocus() {
    this.setState({
      isInputFocused: false,
      isDayPickerFocused: true,
    });
  }

  onDayPickerBlur() {
    this.setState({
      isInputFocused: true,
      isDayPickerFocused: false,
    });
  }

  getDateString(date) {
    const displayFormat = this.getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date);
  }

  getDayPickerContainerClasses() {
    const { orientation, withPortal, withFullScreenPortal, anchorDirection } = this.props;
    const { hoverDate } = this.state;

    const dayPickerClassName = cx('SingleDatePicker__picker', {
      'SingleDatePicker__picker--direction-left': anchorDirection === ANCHOR_LEFT,
      'SingleDatePicker__picker--direction-right': anchorDirection === ANCHOR_RIGHT,
      'SingleDatePicker__picker--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'SingleDatePicker__picker--vertical': orientation === VERTICAL_ORIENTATION,
      'SingleDatePicker__picker--portal': withPortal || withFullScreenPortal,
      'SingleDatePicker__picker--full-screen-portal': withFullScreenPortal,
      'SingleDatePicker__picker--valid-date-hovered': hoverDate && !this.isBlocked(hoverDate),
    });

    return dayPickerClassName;
  }

  getDisplayFormat() {
    const { displayFormat } = this.props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  getFirstFocusableDay(newMonth) {
    const { date, numberOfMonths } = this.props;

    let focusedDate = newMonth.clone().startOf('month');
    if (date) {
      focusedDate = date.clone();
    }

    if (this.isBlocked(focusedDate)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = focusedDate.clone();
      while (!currentDay.isAfter(lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter(day => !this.isBlocked(day) && day.isAfter(focusedDate));
      if (viableDays.length > 0) focusedDate = viableDays[0];
    }

    return focusedDate;
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
      const containerEdge =
        isAnchoredLeft ? containerRect[ANCHOR_RIGHT] : containerRect[ANCHOR_LEFT];

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

  isBlocked(day) {
    const { isDayBlocked, isOutsideRange } = this.props;
    return isDayBlocked(day) || isOutsideRange(day);
  }

  isHovered(day) {
    return isSameDay(day, this.state.hoverDate);
  }

  isSelected(day) {
    return isSameDay(day, this.props.date);
  }

  isToday(day) {
    return isSameDay(day, this.today);
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
      isDayBlocked,
      isDayHighlighted,
      isOutsideRange,
      enableOutsideDays,
      numberOfMonths,
      orientation,
      monthFormat,
      navPrev,
      navNext,
      onPrevMonthClick,
      onNextMonthClick,
      withPortal,
      withFullScreenPortal,
      focused,
      renderMonth,
      renderDay,
      renderCalendarInfo,
      date,
      initialVisibleMonth,
      hideKeyboardShortcutsPanel,
      customCloseIcon,
      phrases,
      daySize,
    } = this.props;
    const { dayPickerContainerStyles, isDayPickerFocused } = this.state;

    const modifiers = {
      today: day => this.isToday(day),
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => isDayBlocked(day),
      'blocked-out-of-range': day => isOutsideRange(day),
      'highlighted-calendar': day => isDayHighlighted(day),
      valid: day => !this.isBlocked(day),
      hovered: day => this.isHovered(day),
      selected: day => this.isSelected(day),
    };

    const onOutsideClick = (!withFullScreenPortal && withPortal) ? this.onClearFocus : undefined;
    const initialVisibleMonthThunk = initialVisibleMonth || (() => (date || moment()));
    const closeIcon = customCloseIcon || (<CloseButton />);

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        ref={(ref) => { this.dayPickerContainer = ref; }}
        className={this.getDayPickerContainerClasses()}
        style={dayPickerContainerStyles}
        onClick={onOutsideClick}
      >
        <DayPicker
          orientation={orientation}
          enableOutsideDays={enableOutsideDays}
          modifiers={modifiers}
          numberOfMonths={numberOfMonths}
          onDayClick={this.onDayClick}
          onDayMouseEnter={this.onDayMouseEnter}
          onDayMouseLeave={this.onDayMouseLeave}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          monthFormat={monthFormat}
          withPortal={withPortal || withFullScreenPortal}
          hidden={!focused}
          initialVisibleMonth={initialVisibleMonthThunk}
          hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
          navPrev={navPrev}
          navNext={navNext}
          renderMonth={renderMonth}
          renderDay={renderDay}
          renderCalendarInfo={renderCalendarInfo}
          isFocused={isDayPickerFocused}
          getFirstFocusableDay={this.getFirstFocusableDay}
          onBlur={this.onDayPickerBlur}
          phrases={phrases}
          daySize={daySize}
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
      showClearDate,
      date,
      phrases,
      withPortal,
      withFullScreenPortal,
      screenReaderInputMessage,
    } = this.props;

    const { isInputFocused } = this.state;

    const displayValue = this.getDateString(date);
    const inputValue = toISODateString(date);

    const onOutsideClick = (!withPortal && !withFullScreenPortal) ? this.onClearFocus : undefined;

    return (
      <div className="SingleDatePicker">
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <SingleDatePickerInput
            id={id}
            placeholder={placeholder}
            focused={focused}
            isFocused={isInputFocused}
            disabled={disabled}
            required={required}
            showCaret={!withPortal && !withFullScreenPortal}
            onClearDate={this.clearDate}
            showClearDate={showClearDate}
            displayValue={displayValue}
            inputValue={inputValue}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onKeyDownShiftTab={this.onClearFocus}
            onKeyDownTab={this.onClearFocus}
            onKeyDownArrowDown={this.onDayPickerFocus}
            screenReaderMessage={screenReaderInputMessage}
            phrases={phrases}
          />

          {this.maybeRenderDayPickerWithPortal()}
        </OutsideClickHandler>
      </div>
    );
  }
}

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;
