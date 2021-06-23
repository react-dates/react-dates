import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import addDays from 'date-fns/addDays';

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
  .add('default', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
    />
  )))
  .add('disabled', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      disabled
    />
  )))
  .add('readOnly', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      readOnly
    />
  )))
  .add('with clear dates button', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      showClearDate
    />
  )))
  .add('reopens DayPicker on clear dates', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      showClearDate
      reopenPickerOnClearDate
    />
  )))
  .add('with custom display format', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      displayFormat="MMM d"
    />
  )))
  .add('with show calendar icon', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      showDefaultInputIcon
    />
  )))
  .add('with custom show calendar icon', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      customInputIcon={<TestCustomInputIcon />}
    />
  )))
  .add('with show calendar icon after input', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      showDefaultInputIcon
      inputIconPosition="after"
    />
  )))
  .add('with screen reader message', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  )))
  .add('noBorder', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      noBorder
    />
  )))
  .add('block styling', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      showClearDate
      block
    />
  )))
  .add('small styling', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      showClearDate
      small
    />
  )))
  .add('regular styling', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={addDays(new Date(), 3)}
      showClearDate
      regular
    />
  )));
