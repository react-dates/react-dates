import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

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

storiesOf('SDP - Input Props', module)
  .addWithInfo('default', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
    />
  ))
  .addWithInfo('disabled', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      disabled
    />
  ))
  .addWithInfo('readOnly', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      readOnly
    />
  ))
  .addWithInfo('with clear dates button', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
    />
  ))
  .addWithInfo('reopens DayPicker on clear dates', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      reopenPickerOnClearDate
    />
  ))
  .addWithInfo('with custom display format', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      displayFormat="MMM D"
    />
  ))
  .addWithInfo('with show calendar icon', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showDefaultInputIcon
    />
  ))
  .addWithInfo('with custom show calendar icon', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      customInputIcon={<TestCustomInputIcon />}
    />
  ))
  .addWithInfo('with show calendar icon after input', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showDefaultInputIcon
      inputIconPosition="after"
    />
  ))
  .addWithInfo('with screen reader message', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  ))
  .addWithInfo('noBorder', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      noBorder
    />
  ))
  .addWithInfo('block styling', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      block
    />
  ))
  .addWithInfo('small styling', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      small
    />
  ))
  .addWithInfo('regular styling', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      regular
    />
  ));
