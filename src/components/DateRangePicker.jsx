import React from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import cx from 'classnames';
import Portal from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener, removeEventListener } from 'consolidated-events';

import { DateRangePickerPhrases } from '../defaultPhrases';

import OutsideClickHandler from './OutsideClickHandler';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import DateRangePickerInputController from './DateRangePickerInputController';
import DayPickerRangeController from './DayPickerRangeController';

import CloseButton from '../svg/close.svg';

import DateRangePickerShape from '../shapes/DateRangePickerShape';

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
} from '../../constants';

const propTypes = forbidExtraProps(DateRangePickerShape);

const defaultProps = {
  // required props for a functional interactive DateRangePicker
  startDate: null,
  endDate: null,
  focusedInput: null,

  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: 'Start Date',
  endDateId: END_DATE,
  endDatePlaceholderText: 'End Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
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
  reopenPickerOnClearDates: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: DateRangePickerPhrases,
};

export default class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayPickerContainerStyles: {},
    };

    this.onOutsideClick = this.onOutsideClick.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);
  }

  componentDidMount() {
    this.resizeHandle = addEventListener(
      window,
      'resize',
      this.responsivizePickerPosition,
      { passive: true },
    );
    this.responsivizePickerPosition();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.focusedInput && this.props.focusedInput && this.isOpened()) {
      // The date picker just changed from being closed to being open.
      this.responsivizePickerPosition();
    }
  }

  componentWillUnmount() {
    removeEventListener(this.resizeHandle);
  }

  onOutsideClick() {
    const { onFocusChange } = this.props;
    if (!this.isOpened()) return;

    onFocusChange(null);
  }

  getDayPickerContainerClasses() {
    const {
      orientation,
      withPortal,
      withFullScreenPortal,
      anchorDirection,
    } = this.props;
    const dayPickerClassName = cx('DateRangePicker__picker', {
      'DateRangePicker__picker--direction-left': anchorDirection === ANCHOR_LEFT,
      'DateRangePicker__picker--direction-right': anchorDirection === ANCHOR_RIGHT,
      'DateRangePicker__picker--horizontal': orientation === HORIZONTAL_ORIENTATION,
      'DateRangePicker__picker--vertical': orientation === VERTICAL_ORIENTATION,
      'DateRangePicker__picker--portal': withPortal || withFullScreenPortal,
      'DateRangePicker__picker--full-screen-portal': withFullScreenPortal,
    });

    return dayPickerClassName;
  }

  getDayPickerDOMNode() {
    return ReactDOM.findDOMNode(this.dayPicker); // eslint-disable-line react/no-find-dom-node
  }

  isOpened() {
    const { focusedInput } = this.props;
    return focusedInput === START_DATE || focusedInput === END_DATE;
  }

  responsivizePickerPosition() {
    if (!this.isOpened()) {
      return;
    }

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

  maybeRenderDayPickerWithPortal() {
    const { withPortal, withFullScreenPortal } = this.props;

    if (!this.isOpened()) {
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
      numberOfMonths,
      orientation,
      monthFormat,
      navPrev,
      navNext,
      onPrevMonthClick,
      onNextMonthClick,
      onDatesChange,
      onFocusChange,
      withPortal,
      withFullScreenPortal,
      enableOutsideDays,
      focusedInput,
      startDate,
      endDate,
      minimumNights,
      keepOpenOnDateSelect,
      renderDay,
      initialVisibleMonth,
      customCloseIcon,
    } = this.props;
    const { dayPickerContainerStyles } = this.state;

    const onOutsideClick = (!withFullScreenPortal && withPortal)
      ? this.onOutsideClick
      : undefined;
    const initialVisibleMonthThunk =
      initialVisibleMonth || (() => (startDate || endDate || moment()));

    const closeIcon = customCloseIcon || (<CloseButton />);

    return (
      <div
        ref={(ref) => { this.dayPickerContainer = ref; }}
        className={this.getDayPickerContainerClasses()}
        style={dayPickerContainerStyles}
      >
        <DayPickerRangeController
          ref={(ref) => { this.dayPicker = ref; }}
          orientation={orientation}
          enableOutsideDays={enableOutsideDays}
          numberOfMonths={numberOfMonths}
          onPrevMonthClick={onPrevMonthClick}
          onNextMonthClick={onNextMonthClick}
          onDatesChange={onDatesChange}
          onFocusChange={onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          monthFormat={monthFormat}
          withPortal={withPortal || withFullScreenPortal}
          initialVisibleMonth={initialVisibleMonthThunk}
          onOutsideClick={onOutsideClick}
          navPrev={navPrev}
          navNext={navNext}
          minimumNights={minimumNights}
          isOutsideRange={isOutsideRange}
          isDayHighlighted={isDayHighlighted}
          isDayBlocked={isDayBlocked}
          keepOpenOnDateSelect={keepOpenOnDateSelect}
          renderDay={renderDay}
        />

        {withFullScreenPortal &&
          <button
            className="DateRangePicker__close"
            type="button"
            onClick={this.onOutsideClick}
          >
            <span className="screen-reader-only">
              {this.props.phrases.closeDatePicker}
            </span>
            <div className="DateRangePicker__close">
              {closeIcon}
            </div>
          </button>
        }
      </div>
    );
  }

  render() {
    const {
      startDate,
      startDateId,
      startDatePlaceholderText,
      endDate,
      endDateId,
      endDatePlaceholderText,
      focusedInput,
      screenReaderInputMessage,
      showClearDates,
      showDefaultInputIcon,
      customInputIcon,
      customArrowIcon,
      customCloseIcon,
      disabled,
      required,
      phrases,
      isOutsideRange,
      withPortal,
      withFullScreenPortal,
      displayFormat,
      reopenPickerOnClearDates,
      keepOpenOnDateSelect,
      onDatesChange,
      onFocusChange,
    } = this.props;

    const onOutsideClick = (!withPortal && !withFullScreenPortal) ? this.onOutsideClick : undefined;

    return (
      <div className="DateRangePicker">
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <DateRangePickerInputController
            startDate={startDate}
            startDateId={startDateId}
            startDatePlaceholderText={startDatePlaceholderText}
            isStartDateFocused={focusedInput === START_DATE}
            endDate={endDate}
            endDateId={endDateId}
            endDatePlaceholderText={endDatePlaceholderText}
            isEndDateFocused={focusedInput === END_DATE}
            displayFormat={displayFormat}
            showClearDates={showClearDates}
            showCaret={!withPortal && !withFullScreenPortal}
            showDefaultInputIcon={showDefaultInputIcon}
            customInputIcon={customInputIcon}
            customArrowIcon={customArrowIcon}
            customCloseIcon={customCloseIcon}
            disabled={disabled}
            required={required}
            reopenPickerOnClearDates={reopenPickerOnClearDates}
            keepOpenOnDateSelect={keepOpenOnDateSelect}
            isOutsideRange={isOutsideRange}
            withFullScreenPortal={withFullScreenPortal}
            onDatesChange={onDatesChange}
            onFocusChange={onFocusChange}
            phrases={phrases}
            screenReaderMessage={screenReaderInputMessage}
          />

          {this.maybeRenderDayPickerWithPortal()}
        </OutsideClickHandler>
      </div>
    );
  }
}

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;
