import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import { VERTICAL_ORIENTATION } from '../constants';

import DayPickerRangeControllerWrapper from '../examples/DayPickerRangeControllerWrapper';

const TestPrevIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Prev
  </span>
);

const TestNextIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Next
  </span>
);

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

storiesOf('DayPickerRangeController', module)
  .addWithInfo('default', () => (
    <DayPickerRangeControllerWrapper />
  ))
  .addWithInfo('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <DayPickerRangeControllerWrapper
        monthFormat="YYYY[年]MMMM"
      />
    );
  })
  .addWithInfo('single month', () => (
    <DayPickerRangeControllerWrapper numberOfMonths={1} />
  ))
  .addWithInfo('3 months', () => (
    <DayPickerRangeControllerWrapper numberOfMonths={3} />
  ))
  .addWithInfo('vertical', () => (
    <DayPickerRangeControllerWrapper
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('with custom month navigation', () => (
    <DayPickerRangeControllerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <DayPickerRangeControllerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <DayPickerRangeControllerWrapper
      initialVisibleMonth={() => moment('04 2017', 'MM YYYY')}
    />
  ))
  .addWithInfo('with minimum nights set', () => (
    <DayPickerRangeControllerWrapper
      minimumNights={3}
      initialStartDate={moment().add(3, 'days')}
      autoFocusEndDate
    />
  ))
  .addWithInfo('allows single day range', () => (
    <DayPickerRangeControllerWrapper
      minimumNights={0}
      initialStartDate={moment().add(3, 'days')}
      autoFocusEndDate
    />
  ))
  .addWithInfo('allows all days, including past days', () => (
    <DayPickerRangeControllerWrapper
      isOutsideRange={() => false}
    />
  ))
  .addWithInfo('allows next two weeks only', () => (
    <DayPickerRangeControllerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
    />
  ))
  .addWithInfo('with some blocked dates', () => (
    <DayPickerRangeControllerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('with some highlighted dates', () => (
    <DayPickerRangeControllerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('blocks fridays', () => (
    <DayPickerRangeControllerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
    />
  ))
  .addWithInfo('with custom daily details', () => (
    <DayPickerRangeControllerWrapper
      renderDay={day => day.format('ddd')}
    />
  ));
