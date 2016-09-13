import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import { VERTICAL_ORIENTATION } from '../src/constants';

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

storiesOf('DateRangePicker', module)
  .add('default', () => (
    <DateRangePickerWrapper />
  ))
  .add('single month', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
    />
  ))
  .add('vertical', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .add('horizontal with portal', () => (
    <DateRangePickerWrapper
      withPortal
    />
  ))
  .add('horizontal with fullscreen portal', () => (
    <DateRangePickerWrapper withFullScreenPortal />
  ))
  .add('vertical with full screen portal', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
    />
  ))
  .add('with clear dates button', () => (
    <DateRangePickerWrapper
      showClearDates
    />
  ))
  .add('non-english locale', () => {
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
  .add('with custom display format', () => (
    <DateRangePickerWrapper
      displayFormat="MMM D"
    />
  ))
  .add('with minimum nights set', () => (
    <DateRangePickerWrapper
      minimumNights={3}
    />
  ))
  .add('allows previous three month only', () => (
    <DateRangePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment().startOf('month').subtract(3, 'months')) ||
        isInclusivelyAfterDay(day, moment().startOf('month'))
      }
    />
  ))
  .add('with outside days enabled', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .add('with some blocked dates', () => (
    <DateRangePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .add('blocks fridays', () => (
    <DateRangePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
    />
  ));
