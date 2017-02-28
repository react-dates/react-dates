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
} from '../../constants';

const propTypes = forbidExtraProps(SingleDatePickerShape);

const defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  selected: false,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,

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

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

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

    if (this.props.selected) {
      this.setState({
        isInputFocused: true,
      });
    }
  }

  componentWillUpdate() {
    this.today = moment();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.selected && this.props.selected) {
      this.responsivizePickerPosition();
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    removeEventListener(this.resizeHandle);
  }

  onChange(dateString) {
    const { isOutsideRange, keepOpenOnDateSelect, onDateChange, onSelectChange } = this.props;
    const date = toMomentObject(dateString, this.getDisplayFormat());

    const isValid = date && !isOutsideRange(date);
    if (isValid) {
      onDateChange(date);
      if (!keepOpenOnDateSelect) onSelectChange(false);
    } else {
      onDateChange(null);
    }
  }

  onDayClick(day, e) {
    if (e) e.preventDefault();
    if (this.isBlocked(day)) return;

    this.props.onDateChange(day);
    if (!this.props.keepOpenOnDateSelect) this.props.onSelectChange(false);
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
    this.setState({
      isInputFocused: true,
      isDayPickerFocused: false,
    });

    if (!this.props.disabled) {
      this.props.onSelectChange(true);
    }
  }

  onClearFocus() {
    const { selected, onSelectChange } = this.props;
    if (!selected) return;

    onSelectChange(false);
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

    let selectedDate = newMonth.clone().startOf('month');
    if (date) {
      selectedDate = date.clone();
    }

    if (this.isBlocked(selectedDate)) {
      const days = [];
      const lastVisibleDay = newMonth.clone().add(numberOfMonths - 1, 'months').endOf('month');
      let currentDay = selectedDate.clone();
      while (!currentDay.isAfter(lastVisibleDay)) {
        currentDay = currentDay.clone().add(1, 'day');
        days.push(currentDay);
      }

      const viableDays = days.filter(day => !this.isBlocked(day) && day.isAfter(selectedDate));
      if (viableDays.length > 0) selectedDate = viableDays[0];
    }

    return selectedDate;
  }

  clearDate() {
    const { onDateChange, reopenPickerOnClearDate, onSelectChange } = this.props;
    onDateChange(null);
    if (reopenPickerOnClearDate) {
      onSelectChange(true);
    }
  }

  /* istanbul ignore next */
  responsivizePickerPosition() {
    const {
      anchorDirection,
      horizontalMargin,
      withPortal,
      withFullScreenPortal,
      selected,
    } = this.props;
    const { dayPickerContainerStyles } = this.state;

    if (!selected) {
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
    const { selected, withPortal, withFullScreenPortal } = this.props;

    if (!selected) {
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
      selected,
      renderDay,
      date,
      initialVisibleMonth,
      phrases,
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
          onDayClick={this.onDayClick}
          onDayMouseEnter={this.onDayMouseEnter}
          onDayMouseLeave={this.onDayMouseLeave}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          monthFormat={monthFormat}
          withPortal={withPortal || withFullScreenPortal}
          hidden={!selected}
          initialVisibleMonth={initialVisibleMonthThunk}
          onOutsideClick={onOutsideClick}
          navPrev={navPrev}
          navNext={navNext}
          renderDay={renderDay}
          isFocused={isDayPickerFocused}
          getFirstFocusableDay={this.getFirstFocusableDay}
          onBlur={this.onDayPickerBlur}
          phrases={phrases}
        />

        {withFullScreenPortal &&
          <button
            aria-label={phrases.closeDatePicker}
            className="SingleDatePicker__close"
            type="button"
            onClick={this.onClearFocus}
          >
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
      selected,
      disabled,
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
            selected={selected}
            focused={isInputFocused}
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
