import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import Portal from 'react-portal';
import includes from 'array-includes';

import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';

import SingleDatePickerInput from './SingleDatePickerInput';
import DayPicker from './DayPicker';

import CloseButton from '../svg/close.svg';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isSameDay from '../utils/isSameDay';

import SingleDatePickerShape from '../shapes/SingleDatePickerShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
} from '../../constants';

const propTypes = SingleDatePickerShape;

const defaultProps = {
  date: null,
  focused: false,
  disabled: false,
  required: false,
  showClearDate: false,
  reopenPickerOnClearDate: false,
  keepOpenOnDateSelect: false,

  navPrev: null,
  navNext: null,

  onDateChange() {},
  onFocusChange() {},

  isDayBlocked: () => false,
  isDayHighlighted: () => false,
  disabledDays: [],
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  enableOutsideDays: false,
  numberOfMonths: 2,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: () => moment(),

  onPrevMonthClick() {},
  onNextMonthClick() {},

  // i18n
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: {
    closeDatePicker: 'Close',
    clearDate: 'Clear Date',
  },
};

export default class SingleDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayPickerContainerStyles: {},
      hoverDate: null,
    };

    this.today = moment();

    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
    this.clearDate = this.clearDate.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);
  }

  /* istanbul ignore next */
  componentDidMount() {
    window.addEventListener('resize', this.responsivizePickerPosition);
    this.responsivizePickerPosition();
  }

  componentWillUpdate() {
    this.today = moment();
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    window.removeEventListener('resize', this.responsivizePickerPosition);
  }

  onChange(dateString) {
    const { isOutsideRange, keepOpenOnDateSelect, onDateChange, onFocusChange } = this.props;
    const date = toMomentObject(dateString, this.getDisplayFormat());

    const isValid = date && !isOutsideRange(date);
    if (isValid) {
      onDateChange(date);
      if (!keepOpenOnDateSelect) onFocusChange({ focused: false });
    } else {
      onDateChange(null);
    }
  }

  onDayClick(day, modifiers, e) {
    if (e) e.preventDefault();
    if (includes(modifiers, 'blocked')) return;

    this.props.onDateChange(day);
    if (!this.props.keepOpenOnDateSelect) this.props.onFocusChange({ focused: null });
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
    if (!this.props.disabled) {
      this.props.onFocusChange({ focused: true });
    }
  }

  onClearFocus() {
    const { focused, onFocusChange } = this.props;
    if (!focused) return;

    onFocusChange({ focused: false });
  }

  getDateString(date) {
    const displayFormat = this.getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date);
  }

  getDayPickerContainerClasses() {
    const { orientation, withPortal, withFullScreenPortal, anchorDirection, focused } = this.props;
    const { hoverDate } = this.state;

    const dayPickerClassName = cx('SingleDatePicker__picker', {
      'SingleDatePicker__picker--show': focused,
      'SingleDatePicker__picker--invisible': !focused,
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

  clearDate() {
    const { onDateChange, reopenPickerOnClearDate, onFocusChange } = this.props;
    onDateChange(null);
    if (reopenPickerOnClearDate) {
      onFocusChange({ focused: true });
    }
  }

  /* istanbul ignore next */
  responsivizePickerPosition() {
    const { anchorDirection, horizontalMargin, withPortal, withFullScreenPortal } = this.props;
    const { dayPickerContainerStyles } = this.state;

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

    if (withPortal || withFullScreenPortal) {
      return (
        <Portal isOpened={focused}>
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
      initialVisibleMonth,
    } = this.props;
    const { dayPickerContainerStyles } = this.state;

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

    const onOutsideClick = !withFullScreenPortal ? this.onClearFocus : undefined;

    return (
      <div
        ref={(ref) => { this.dayPickerContainer = ref; }}
        className={this.getDayPickerContainerClasses()}
        style={dayPickerContainerStyles}
      >
        <DayPicker
          orientation={orientation}
          enableOutsideDays={enableOutsideDays}
          modifiers={modifiers}
          numberOfMonths={numberOfMonths}
          onDayMouseEnter={this.onDayMouseEnter}
          onDayMouseLeave={this.onDayMouseLeave}
          onDayMouseDown={this.onDayClick}
          onDayTouchTap={this.onDayClick}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          monthFormat={monthFormat}
          withPortal={withPortal || withFullScreenPortal}
          hidden={!focused}
          initialVisibleMonth={initialVisibleMonth}
          onOutsideClick={onOutsideClick}
          navPrev={navPrev}
          navNext={navNext}
        />

        {withFullScreenPortal &&
          <button
            className="SingleDatePicker__close"
            type="button"
            onClick={this.onClearFocus}
          >
            <span className="screen-reader-only">
              {this.props.phrases.closeDatePicker}
            </span>
            <CloseButton />
          </button>
        }
      </div>
    );
  }

  render() {
    const {
      id,
      placeholder,
      focused,
      disabled,
      required,
      showClearDate,
      date,
      phrases,
      withPortal,
      withFullScreenPortal,
    } = this.props;

    const dateString = this.getDateString(date);

    return (
      <div className="SingleDatePicker">
        <SingleDatePickerInput
          id={id}
          placeholder={placeholder}
          focused={focused}
          disabled={disabled}
          required={required}
          showCaret={!withPortal && !withFullScreenPortal}
          phrases={phrases}
          onClearDate={this.clearDate}
          showClearDate={showClearDate}
          dateValue={dateString}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyDownShiftTab={this.onClearFocus}
          onKeyDownTab={this.onClearFocus}
          border
        />

        {this.maybeRenderDayPickerWithPortal()}
      </div>
    );
  }
}

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;
