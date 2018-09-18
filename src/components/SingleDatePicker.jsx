import React from 'react';
import moment from 'moment';
import { forbidExtraProps } from 'airbnb-prop-types';

import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';

import BaseClass from '../utils/baseClass';
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

/** @extends React.Component */
export default class SingleDatePicker extends BaseClass {
  constructor(props) {
    super(props);
    this.cacheProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.cacheProps(nextProps);
  }

  cacheProps(props) {
    this.inputProps = SingleDatePickerInputControllerProps.reduce((acc, key) => ({
      ...acc,
      [key]: props[key],
    }), {});

    this.dropdownProps = DayPickerSingleDateControllerProps.reduce((acc, key) => ({
      ...acc,
      [key]: props[key],
    }), {});
    // TODO: figure out a better way to add the withPortal prop when it's not just passed through
    this.dropdownProps.withPortal = props.withPortal || props.withFullScreenPortal;
  }

  render() {
    const {
      anchorDirection,
      appendToBody,
      block,
      customCloseIcon,
      disableScroll,
      focused,
      horizontalMargin,
      isRTL,
      keepFocusOnInput,
      onFocusChange,
      openDirection,
      orientation,
      phrases, // only the closeDatePicker phrase is used
      readOnly,
      small,
      verticalSpacing,
      withFullScreenPortal,
      withPortal,
    } = this.props;

    return (
      <DropDownController
        anchorDirection={anchorDirection}
        appendToBody={appendToBody}
        block={block}
        customCloseIcon={customCloseIcon}
        disableScroll={disableScroll}
        focused={focused}
        horizontalMargin={horizontalMargin}
        isRTL={isRTL}
        keepFocusOnInput={keepFocusOnInput}
        onFocusChange={onFocusChange}
        openDirection={openDirection}
        orientation={orientation}
        phrases={phrases}
        readOnly={readOnly}
        small={small}
        verticalSpacing={verticalSpacing}
        withFullScreenPortal={withFullScreenPortal}
        withPortal={withPortal}

        input={SingleDatePickerInputController}
        inputProps={this.inputProps}
        dropdown={DayPickerSingleDateController}
        dropdownProps={this.dropdownProps}
      />
    );
  }
}

SingleDatePicker.propTypes = propTypes;
SingleDatePicker.defaultProps = defaultProps;
