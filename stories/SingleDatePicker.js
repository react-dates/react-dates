import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

import { VERTICAL_ORIENTATION } from '../constants';

storiesOf('SingleDatePicker', module)
  .add('default', () => (
    <SingleDatePickerWrapper />
  ))
  .add('single month', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
    />
  ))
  .add('vertical', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .add('horizontal with portal', () => (
    <SingleDatePickerWrapper
      withPortal
    />
  ))
  .add('horizontal with fullscreen portal', () => (
    <SingleDatePickerWrapper withFullScreenPortal />
  ))
  .add('vertical with full screen portal', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
    />
  ))
  .add('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <SingleDatePickerWrapper
        placeholder="入住日期"
        monthFormat="YYYY[年]MMMM"
        phrases={{
          closeDatePicker: '关闭',
        }}
      />
    );
  })
  .add('with custom display format', () => (
    <SingleDatePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .add('with outside days enabled', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ));
