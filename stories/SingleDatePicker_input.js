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
  .add('default', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
    />
  )))
  .add('disabled', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      disabled
    />
  )))
  .add('readOnly', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      readOnly
    />
  )))
  .add('with clear dates button', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
    />
  )))
  .add('reopens DayPicker on clear dates', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      reopenPickerOnClearDate
    />
  )))
  .add('with custom display format', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      displayFormat="MMM D"
    />
  )))
  .add('with show calendar icon', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showDefaultInputIcon
    />
  )))
  .add('with custom show calendar icon', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      customInputIcon={<TestCustomInputIcon />}
    />
  )))
  .add('with show calendar icon after input', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showDefaultInputIcon
      inputIconPosition="after"
    />
  )))
  .add('with screen reader message', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  )))
  .add('with custom title attribute', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      titleText="Here you can set the title attribute of the input, which shows in the tooltip on :hover over the field"
    />
  )))
  .add('noBorder', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      noBorder
    />
  )))
  .add('block styling', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      block
    />
  )))
  .add('small styling', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      small
    />
  )))
  .add('regular styling', (() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      regular
    />
  )));
