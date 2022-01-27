import React, { useState } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';

import DateRangePicker from '../src/components/DateRangePicker';

import { DateRangePickerPhrases } from '../src/defaultPhrases';
import DateRangePickerShape from '../src/shapes/DateRangePickerShape';
import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  ANCHOR_LEFT,
  NAV_POSITION_TOP,
  OPEN_DOWN,
} from '../src/constants';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

const propTypes = {
  // example props for the demo
  autoFocus: PropTypes.bool,
  autoFocusEndDate: PropTypes.bool,
  stateDateWrapper: PropTypes.func,
  initialStartDate: momentPropTypes.momentObj,
  initialEndDate: momentPropTypes.momentObj,

  ...omit(DateRangePickerShape, [
    'startDate',
    'endDate',
    'onDatesChange',
    'focusedInput',
    'onFocusChange',
  ]),
};

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,

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
  block: false,
  small: false,
  regular: false,
  autoComplete: 'off',

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: false,
  openDirection: OPEN_DOWN,

  // navigation related props
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: DateRangePickerPhrases,

  stateDateWrapper: date => date,
};

function DateRangePickerWrapper(props) {
  const { autoFocus, autoFocusEndDate } = props;

  let initialFocusedInput = null;
  if (autoFocus) {
    initialFocusedInput = START_DATE;
  } else if (autoFocusEndDate) {
    initialFocusedInput = END_DATE;
  }
  
  const [focusedInput, setFocusedInput] = useState(initialFocusedInput);
  const [startDate, setStartDate] = useState(startDate);
  const [endDate, setEndDate] = useState(endDate);

  const handleDatesChange = ({ startDate, endDate }) => {
    const { stateDateWrapper } = props;
    setStartDate(startDate && stateDateWrapper(startDate));
    setEndDate(endDate && stateDateWrapper(endDate));
  }

  // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
  // example wrapper but are not props on the SingleDatePicker itself and
  // thus, have to be omitted.
  const filteredProps = omit(props, [
    'autoFocus',
    'autoFocusEndDate',
    'initialStartDate',
    'initialEndDate',
    'stateDateWrapper',
  ]);

  return (
    <div>
      <DateRangePicker
        {...filteredProps}
        onDatesChange={handleDatesChange}
        onFocusChange={setFocusedInput}
        focusedInput={focusedInput}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;
