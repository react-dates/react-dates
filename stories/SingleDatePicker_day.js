import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
import isSameDay from '../src/utils/isSameDay';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

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

storiesOf('SDP - Day Props', module)
  .addWithInfo('default', () => (
    <SingleDatePickerWrapper autoFocus />
  ))
  .addWithInfo('allows all days, including past days', () => (
    <SingleDatePickerWrapper
      isOutsideRange={() => false}
      autoFocus
    />
  ))
  .addWithInfo('allows next two weeks only', () => (
    <SingleDatePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
      autoFocus
    />
  ))
  .addWithInfo('with some blocked dates', () => (
    <SingleDatePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  ))
  .addWithInfo('with some highlighted dates', () => (
    <SingleDatePickerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  ))
  .addWithInfo('blocks fridays', () => (
    <SingleDatePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
      autoFocus
    />
  ))
  .addWithInfo('with custom daily details', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      renderDayContents={day => day.format('ddd')}
      autoFocus
    />
  ));
