import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import Portal from 'react-portal';
import includes from 'array-includes';
import TetherComponent from 'react-tether';

import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';

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

  onDateChange() {},
  onFocusChange() {},

  isDayBlocked: () => false,
  disabledDays: [],
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  enableOutsideDays: false,
  numberOfMonths: 2,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
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
  },
};

export default class SingleDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverDate: null,
    };

    this.onDayMouseEnter = this.onDayMouseEnter.bind(this);
    this.onDayMouseLeave = this.onDayMouseLeave.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClearFocus = this.onClearFocus.bind(this);
  }

  onChange(dateString) {
    const { isOutsideRange, onDateChange, onFocusChange } = this.props;
    const date = toMomentObject(dateString, this.getDisplayFormat());

    const isValid = date && !isOutsideRange(date);
    if (isValid) {
      onDateChange(date);
      onFocusChange({ focused: false });
    } else {
      onDateChange(null);
    }
  }

  onDayClick(day, modifiers, e) {
    if (e) e.preventDefault();
    if (includes(modifiers, 'blocked')) return;

    this.props.onDateChange(day);
    this.props.onFocusChange({ focused: null });
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
    const { focused, orientation, withPortal, withFullScreenPortal, anchorDirection } = this.props;
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
      isOutsideRange,
      enableOutsideDays,
      numberOfMonths,
      orientation,
      monthFormat,
      onPrevMonthClick,
      onNextMonthClick,
      withPortal,
      withFullScreenPortal,
      focused,
      initialVisibleMonth,
    } = this.props;

    const modifiers = {
      blocked: day => this.isBlocked(day),
      'blocked-calendar': day => isDayBlocked(day),
      'blocked-out-of-range': day => isOutsideRange(day),
      valid: day => !this.isBlocked(day),
      hovered: day => this.isHovered(day),
      selected: day => this.isSelected(day),
    };

    const onOutsideClick = !withFullScreenPortal ? this.onClearFocus : undefined;

    return (
      <div className={this.getDayPickerContainerClasses()}>
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
      date,
      anchorDirection,
      withPortal,
      withFullScreenPortal,
    } = this.props;

    const dateString = this.getDateString(date);

    const tetherPinDirection = anchorDirection === ANCHOR_LEFT ? ANCHOR_RIGHT : ANCHOR_LEFT;

    return (
      <div className="SingleDatePicker">
        <TetherComponent
          attachment={`top ${anchorDirection}`}
          targetAttachment={`bottom ${anchorDirection}`}
          offset="-23px 0"
          constraints={[{
            to: 'scrollParent',
            attachment: 'none',
            pin: [tetherPinDirection],
          }]}
        >
          <SingleDatePickerInput
            id={id}
            placeholder={placeholder}
            focused={focused}
            disabled={disabled}
            showCaret={!withPortal && !withFullScreenPortal}
            dateValue={dateString}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onKeyDownShiftTab={this.onClearFocus}
            onKeyDownTab={this.onClearFocus}
            border
          />

          {this.maybeRenderDayPickerWithPortal()}
        </TetherComponent>
      </div>
    );
  }
}

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;
