import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import isInclusivelyBeforeDay from '../src/utils/isInclusivelyBeforeDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

const TestCustomInputIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    C
  </span>
);

const TestCustomArrowIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    {'--->'}
  </span>
);

const TestCustomCloseIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >'X'</span>
);

storiesOf('DRP - Input Props', module)
  .add('default', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'months')}
      initialEndDate={moment().add(3, 'months').add(10, 'days')}
    />
  )))
  .add('disabled', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'months')}
      initialEndDate={moment().add(3, 'months').add(10, 'days')}
      disabled
    />
  )))
  .add('disabled start date', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'months')}
      initialEndDate={moment().add(3, 'months').add(10, 'days')}
      disabled="startDate"
      isOutsideRange={day => !isInclusivelyAfterDay(day, moment().add(3, 'months'))}
    />
  )))
  .add('disabled end date', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'months')}
      initialEndDate={moment().add(3, 'months').add(10, 'days')}
      disabled="endDate"
      isOutsideRange={day => !isInclusivelyAfterDay(day, moment()) ||
        !isInclusivelyBeforeDay(day, moment().add(3, 'months').add(10, 'days'))}
    />
  )))
  .add('readOnly', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'months')}
      initialEndDate={moment().add(3, 'months').add(10, 'days')}
      readOnly
    />
  )))
  .add('with clear dates button', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
    />
  )))
  .add('reopens DayPicker on clear dates', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
      reopenPickerOnClearDates
    />
  )))
  .add('with custom display format', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      displayFormat="MMM D"
    />
  )))
  .add('with show calendar icon', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showDefaultInputIcon
    />
  )))
  .add('with custom show calendar icon', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      customInputIcon={<TestCustomInputIcon />}
    />
  )))
  .add('with custom arrow icon', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      customArrowIcon={<TestCustomArrowIcon />}
    />
  )))
  .add('with custom arrow icon and RTL support', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      customArrowIcon={<TestCustomArrowIcon />}
      isRTL
    />
  )))
  .add('with custom close icon', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
      customCloseIcon={<TestCustomCloseIcon />}
    />
  )))
  .add('with show calendar icon after input', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showDefaultInputIcon
      inputIconPosition="after"
    />
  )))
  .add('with screen reader message', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  )))
  .add('with custom Start & End Date title attributes', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      startDateTitleText="Here you can set the title attribute of the Start input, which shows in the tooltip on :hover over the field"
      endDateTitleText="Here you can set the title attribute of the End input, which shows in the tooltip on :hover over the field"
    />
  )))
  .add('noBorder', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      noBorder
    />
  )))
  .add('block styling', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
      block
    />
  )))
  .add('small styling', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
      small
    />
  )))
  .add('regular styling', (() => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
      regular
    />
  )));
