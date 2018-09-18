import React from 'react';
import moment from 'moment';
import { forbidExtraProps } from 'airbnb-prop-types';

import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';

import SingleDatePickerInputController, { SingleDatePickerInputControllerProps } from './SingleDatePickerInputController';
import DayPickerSingleDateController, { DayPickerSingleDateControllerProps } from './DayPickerSingleDateController';
import DropDownController from './DropDownController';

import {
  HORIZONTAL_ORIENTATION,
  ANCHOR_LEFT,
  OPEN_DOWN,
  DAY_SIZE,
  ICON_BEFORE_POSITION,
  INFO_POSITION_BOTTOM,
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

export default function SingleDatePicker(props) {
  return (
    <DropDownController
      {...props}
      input={SingleDatePickerInputController}
      inputProps={SingleDatePickerInputControllerProps}
      dropdown={DayPickerSingleDateController}
      dropdownProps={DayPickerSingleDateControllerProps}
    />
  );
}

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;
