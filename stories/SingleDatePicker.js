import React from 'react';
import moment from 'moment';
import momentJalaali from 'moment-jalaali';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import isInclusivelyBeforeDay from '../src/utils/isInclusivelyBeforeDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import {
  VERTICAL_ORIENTATION,
  ANCHOR_RIGHT,
} from '../src/constants';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

const TestInput = props => (
  <div style={{ marginTop: 16 }} >
    <input
      {...props}
      type="text"
      style={{
        height: 48,
        width: 284,
        fontSize: 18,
        fontWeight: 200,
        padding: '12px 16px',
      }}
    />
  </div>
);

storiesOf('SingleDatePicker (SDP)', module)
  .add('default', withInfo()(() => (
    <SingleDatePickerWrapper />
  )))
  .add('as part of a form', withInfo()(() => (
    <div>
      <SingleDatePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
   )))
  .add('non-english locale (Chinese)', withInfo()(() => {
    moment.locale('zh-cn');
    return (
      <SingleDatePickerWrapper
        placeholder="入住日期"
        monthFormat="YYYY[年]MMMM"
        phrases={{
          closeDatePicker: '关闭',
          clearDate: '清除日期',
        }}
      />
    );
  }))
  .add('non-english locale (Persian)', withInfo()(() => {
    moment.locale('fa');
    return (
      <SingleDatePickerWrapper
        placeholder="تقویم فارسی"
        renderMonthText={month => momentJalaali(month).format('jMMMM jYYYY')}
        renderDayContents={day => momentJalaali(day).format('jD')}
      />
    );
  }))
  .add('with DirectionProvider', withInfo()(() => (
    <DirectionProvider direction={DIRECTIONS.RTL}>
      <SingleDatePickerWrapper
        placeholder="تاریخ شروع"
        anchorDirection={ANCHOR_RIGHT}
        showDefaultInputIcon
        showClearDate
        isRTL
      />
    </DirectionProvider>
  )))
  .add('with custom month navigation and blocked navigation (minDate and maxDate)', withInfo()(() => (
    <SingleDatePickerWrapper
      minDate={moment().subtract(2, 'months').startOf('month')}
      maxDate={moment().add(2, 'months').endOf('month')}
    />
  )))
  .add('with custom isOutsideRange and month navigation and blocked navigation (minDate and maxDate)', withInfo()(() => {
    const minDate = moment().subtract(2, 'months').startOf('month')
    const maxDate = moment().add(2, 'months').endOf('month')
    const isOutsideRange = day => isInclusivelyBeforeDay(day, minDate) || isInclusivelyAfterDay(day, maxDate)
    return (
    <SingleDatePickerWrapper
      minDate={minDate}
      maxDate={maxDate}
      isOutsideRange={isOutsideRange}
    />
  )}))
  .add('vertical with custom height', withInfo()(() => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      verticalHeight={568}
    />
  )))
  .add('with custom autoComplete attribute', withInfo()(() => (
    <SingleDatePickerWrapper
    autoComplete="datePicker"
    />
  )));
