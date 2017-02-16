import React from 'react';
import { storiesOf } from '@kadira/storybook';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

storiesOf('SDP - Input Props', module)
  .addWithInfo('default', () => (
    <SingleDatePickerWrapper />
  ))
  .addWithInfo('with clear dates button', () => (
    <SingleDatePickerWrapper
      showClearDate
    />
  ))
  .addWithInfo('reopens DayPicker on clear dates', () => (
    <SingleDatePickerWrapper
      showClearDate
      reopenPickerOnClearDate
    />
  ))
  .addWithInfo('with custom display format', () => (
    <SingleDatePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .addWithInfo('with screen reader message', () => (
    <SingleDatePickerWrapper
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  ));
