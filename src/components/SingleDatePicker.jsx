import React from 'react';
import moment from 'moment';
import { forbidExtraProps } from 'airbnb-prop-types';

import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import SingleDatePickerInputController from './SingleDatePickerInputController';
import DayPickerSingleDateController from './DayPickerSingleDateController';
import DropDownController from './DropDownController';

import {
  HORIZONTAL_ORIENTATION,
  ANCHOR_LEFT,
  OPEN_DOWN,
  DAY_SIZE,
  ICON_BEFORE_POSITION,
  INFO_POSITION_BOTTOM,
  FANG_HEIGHT_PX,
  DEFAULT_VERTICAL_SPACING,
} from '../constants';

const propTypes = forbidExtraProps({
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
  appendToBody: false,
  disableScroll: false,
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
  horizontalMonthPadding: 13,

  // navigation related props
  navPrev: null,
  navNext: null,

  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // month presentation and interaction related props
  renderMonthText: null,

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: SingleDatePickerPhrases,
  dayAriaLabelFormat: undefined,
};

export default function SingleDatePicker({
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
  onDateChange,
  displayFormat,
  phrases,
  withPortal,
  withFullScreenPortal,
  screenReaderInputMessage,
  isRTL,
  noBorder,
  block,
  small,
  regular,
  verticalSpacing,
  reopenPickerOnClearDate,
  keepOpenOnDateSelect,
  anchorDirection,
  onFocusChange,
  enableOutsideDays,
  numberOfMonths,
  orientation,
  monthFormat,
  navPrev,
  navNext,
  onPrevMonthClick,
  onNextMonthClick,
  initialVisibleMonth,
  renderMonthText,
  renderCalendarDay,
  renderDayContents,
  renderCalendarInfo,
  renderMonthElement,
  calendarInfoPosition,
  hideKeyboardShortcutsPanel,
  firstDayOfWeek,
  dayAriaLabelFormat,
  daySize,
  isOutsideRange,
  isDayBlocked,
  isDayHighlighted,
  weekDayFormat,
  verticalHeight,
  transitionDuration,
  horizontalMonthPadding,
  onClose,
  appendToBody,
  disableScroll,
}) {
  const hideFang = verticalSpacing < FANG_HEIGHT_PX;
  const withAnyPortal = withPortal || withFullScreenPortal;

  const input = (
    <SingleDatePickerInputController
      id={id}
      placeholder={placeholder}
      focused={focused}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      openDirection={openDirection}
      showCaret={!withPortal && !withFullScreenPortal && !hideFang}
      showClearDate={showClearDate}
      showDefaultInputIcon={showDefaultInputIcon}
      inputIconPosition={inputIconPosition}
      customCloseIcon={customCloseIcon}
      customInputIcon={customInputIcon}
      date={date}
      onDateChange={onDateChange}
      displayFormat={displayFormat}
      onFocusChange={onFocusChange}
      screenReaderMessage={screenReaderInputMessage}
      phrases={phrases}
      isRTL={isRTL}
      noBorder={noBorder}
      block={block}
      small={small}
      regular={regular}
      verticalSpacing={verticalSpacing}
      reopenPickerOnClearDate={reopenPickerOnClearDate}
      keepOpenOnDateSelect={keepOpenOnDateSelect}
    />
  );

  const dropdown = (
    <DayPickerSingleDateController
      date={date}
      onDateChange={onDateChange}
      onFocusChange={onFocusChange}
      orientation={orientation}
      enableOutsideDays={enableOutsideDays}
      numberOfMonths={numberOfMonths}
      monthFormat={monthFormat}
      withPortal={withAnyPortal}
      focused={focused}
      keepOpenOnDateSelect={keepOpenOnDateSelect}
      hideKeyboardShortcutsPanel={hideKeyboardShortcutsPanel}
      initialVisibleMonth={initialVisibleMonth}
      navPrev={navPrev}
      navNext={navNext}
      onPrevMonthClick={onPrevMonthClick}
      onNextMonthClick={onNextMonthClick}
      onClose={onClose}
      renderMonthText={renderMonthText}
      renderCalendarDay={renderCalendarDay}
      renderDayContents={renderDayContents}
      renderCalendarInfo={renderCalendarInfo}
      renderMonthElement={renderMonthElement}
      calendarInfoPosition={calendarInfoPosition}
      phrases={phrases}
      dayAriaLabelFormat={dayAriaLabelFormat}
      daySize={daySize}
      isRTL={isRTL}
      isOutsideRange={isOutsideRange}
      isDayBlocked={isDayBlocked}
      isDayHighlighted={isDayHighlighted}
      firstDayOfWeek={firstDayOfWeek}
      weekDayFormat={weekDayFormat}
      verticalHeight={verticalHeight}
      transitionDuration={transitionDuration}
      horizontalMonthPadding={horizontalMonthPadding}
    />
  );

  return (
    <DropDownController
      anchorDirection={anchorDirection}
      appendToBody={appendToBody}
      block={block}
      closeDatePickerPhrase={(phrases || {}).closeDatePicker}
      customCloseIcon={customCloseIcon}
      disableScroll={disableScroll}
      focused={focused}
      isRTL={isRTL}
      onFocusChange={onFocusChange}
      openDirection={openDirection}
      orientation={orientation}
      readOnly={readOnly}
      small={small}
      verticalSpacing={verticalSpacing}
      withFullScreenPortal={withFullScreenPortal}
      withPortal={withPortal}
      input={input}
      dropdown={dropdown}
    />
  );
}

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;
