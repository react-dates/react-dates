import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT } from '../constants';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

const datesList = [
  moment(),
  moment().add(1, 'days'),
  moment().add(3, 'days'),
  moment().add(9, 'days'),
  moment().add(10, 'days'),
  moment().add(11, 'days'),
  moment().add(12, 'days'),
  moment().add(13, 'days'),
];

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
const TestPrevIcon = props => (
  <span style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px'
    }}
  >
    Prev
  </span>
);
const TestNextIcon = props => (
  <span style={{
    border: '1px solid #dce0e0',
    backgroundColor: '#fff',
    color: '#484848',
    padding: '3px'
    }}
  >
    Next
  </span>
);

storiesOf('DateRangePicker', module)
  .addWithInfo('default', () => (
    <DateRangePickerWrapper />
  ))
  .addWithInfo('as part of a form', () => (
    <div>
      <DateRangePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
  ))
  .addWithInfo('single month', () => (
    <DateRangePickerWrapper numberOfMonths={1} />
  ))
  .addWithInfo('anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
      />
    </div>
  ))
  .addWithInfo('vertical', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('vertical anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        orientation={VERTICAL_ORIENTATION}
        anchorDirection={ANCHOR_RIGHT}
      />
    </div>
  ))
  .addWithInfo('horizontal with portal', () => (
    <DateRangePickerWrapper
      withPortal
    />
  ))
  .addWithInfo('horizontal with fullscreen portal', () => (
    <DateRangePickerWrapper withFullScreenPortal />
  ))
  .addWithInfo('vertical with full screen portal', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
    />
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
  .addWithInfo('does not autoclose the DayPicker on date selection', () => (
    <DateRangePickerWrapper
      keepOpenOnDateSelect
    />
  ))
  .addWithInfo('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <DateRangePickerWrapper
        showClearDates
        startDatePlaceholderText="入住日期"
        endDatePlaceholderText="退房日期"
        monthFormat="YYYY[年]MMMM"
        phrases={{
          closeDatePicker: '关闭',
          clearDates: '清除日期',
        }}
      />
    );
  })
  .addWithInfo('with custom display format', () => (
    <DateRangePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .addWithInfo('with custom arrows', () => (
    <DateRangePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('with minimum nights set', () => (
    <DateRangePickerWrapper
      minimumNights={3}
    />
  ))
  .addWithInfo('allows a single night', () => (
    <DateRangePickerWrapper
      minimumNights={0}
    />
  ))
  .addWithInfo('allows all days', () => (
    <DateRangePickerWrapper
      isOutsideRange={day => false}
    />
  ))
  .addWithInfo('allows next two weeks only', () => (
    <DateRangePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .addWithInfo('with some blocked dates', () => (
    <DateRangePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <DateRangePickerWrapper
      initialVisibleMonth={() => moment('04 2017', 'MM YYYY')}
    />
  ))
  .addWithInfo('blocks fridays', () => (
    <DateRangePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
    />
  ));
