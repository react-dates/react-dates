import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

storiesOf('SDP - Input Props', module)
  .addWithInfo('default', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
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
  .addWithInfo('with screen reader message', () => (
    <SingleDatePickerWrapper
      initialDate={moment().add(3, 'days')}
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  ));
