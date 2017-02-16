import React from 'react';
import { storiesOf } from '@kadira/storybook';

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

storiesOf('DRP - Input Props', module)
  .addWithInfo('default', () => (
    <DateRangePickerWrapper />
  ))
  .addWithInfo('with clear dates button', () => (
    <DateRangePickerWrapper
      showClearDates
    />
  ))
  .addWithInfo('reopens DayPicker on clear dates', () => (
    <DateRangePickerWrapper
      showClearDates
      reopenPickerOnClearDates
    />
  ))
  .addWithInfo('with custom display format', () => (
    <DateRangePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .addWithInfo('with show calendar icon', () => (
    <DateRangePickerWrapper
      showDefaultInputIcon
    />
  ))
  .addWithInfo('with custom show calendar icon', () => (
    <DateRangePickerWrapper
      customInputIcon={<TestCustomInputIcon />}
    />
  ))
  .addWithInfo('with custom arrow icon', () => (
    <DateRangePickerWrapper
      customArrowIcon={<TestCustomArrowIcon />}
    />
  ))
  .addWithInfo('with screen reader message', () => (
    <DateRangePickerWrapper
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  ));
