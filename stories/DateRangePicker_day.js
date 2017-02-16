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

storiesOf('DRP - Day Props', module)
  .addWithInfo('default', () => (
    <DateRangePickerWrapper />
  ))
  .addWithInfo('with minimum nights set', () => (
    <DateRangePickerWrapper
      minimumNights={3}
    />
  ))
  .addWithInfo('allows single day range', () => (
    <DateRangePickerWrapper
      minimumNights={0}
    />
  ))
  .addWithInfo('allows all days, including past days', () => (
    <DateRangePickerWrapper
      isOutsideRange={() => false}
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
  .addWithInfo('with some blocked dates', () => (
    <DateRangePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('with some highlighted dates', () => (
    <DateRangePickerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .addWithInfo('blocks fridays', () => (
    <DateRangePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
    />
  ))
  .addWithInfo('with custom daily details', () => (
    <DateRangePickerWrapper
      renderDay={day => day.format('ddd')}
    />
  ));

