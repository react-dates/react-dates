import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

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
      initialDate={moment().add(3, 'days')}
    />
  )))
  .add('disabled', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      disabled
    />
  )))
  .add('readOnly', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      readOnly
    />
  )))
  .add('with clear dates button', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
    />
  )))
  .add('reopens DayPicker on clear dates', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      reopenPickerOnClearDate
    />
  )))
  .add('with custom display format', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      displayFormat="MMM D"
    />
  )))
  .add('with show calendar icon', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showDefaultInputIcon
    />
  )))
  .add('with custom show calendar icon', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      customInputIcon={<TestCustomInputIcon />}
    />
  )))
  .add('with show calendar icon after input', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showDefaultInputIcon
      inputIconPosition="after"
    />
  )))
  .add('with screen reader message', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  )))
  .add('noBorder', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      noBorder
    />
  )))
  .add('block styling', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      block
    />
  )))
  .add('small styling', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      small
    />
  )))
  .add('regular styling', withInfo()(() => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      showClearDate
      regular
    />
  )));
