import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

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
  .addWithInfo('default', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'months')}
      initialEndDate={moment().add(3, 'months').add(10, 'days')}
    />
  ))
  .addWithInfo('disabled', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'months')}
      initialEndDate={moment().add(3, 'months').add(10, 'days')}
      disabled
    />
  ))
  .addWithInfo('readOnly', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'months')}
      initialEndDate={moment().add(3, 'months').add(10, 'days')}
      readOnly
    />
  ))
  .addWithInfo('with clear dates button', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
    />
  ))
  .addWithInfo('reopens DayPicker on clear dates', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
      reopenPickerOnClearDates
    />
  ))
  .addWithInfo('with custom display format', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      displayFormat="MMM D"
    />
  ))
  .addWithInfo('with show calendar icon', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showDefaultInputIcon
    />
  ))
  .addWithInfo('with custom show calendar icon', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      customInputIcon={<TestCustomInputIcon />}
    />
  ))
  .addWithInfo('with custom arrow icon', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      customArrowIcon={<TestCustomArrowIcon />}
    />
  ))
  .addWithInfo('with custom close icon', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      showClearDates
      customCloseIcon={<TestCustomCloseIcon />}
    />
  ))
  .addWithInfo('with screen reader message', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  ))
  .addWithInfo('noBorder', () => (
    <DateRangePickerWrapper
      initialStartDate={moment().add(3, 'days')}
      initialEndDate={moment().add(10, 'days')}
      noBorder
    />
  ));
