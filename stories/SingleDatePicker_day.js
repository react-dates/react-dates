import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

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
  .add('default', withInfo()(() => (
    <SingleDatePickerWrapper autoFocus />
  )))
  .add('allows all days, including past days', withInfo()(() => (
    <SingleDatePickerWrapper
      isOutsideRange={() => false}
      autoFocus
    />
  )))
  .add('allows next two weeks only', withInfo()(() => (
    <SingleDatePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
      autoFocus
    />
  )))
  .add('with some blocked dates', withInfo()(() => (
    <SingleDatePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  )))
  .add('with some highlighted dates', withInfo()(() => (
    <SingleDatePickerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  )))
  .add('blocks fridays', withInfo()(() => (
    <SingleDatePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
      autoFocus
    />
  )))
  .add('with custom daily details', withInfo()(() => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      renderDayContents={day => day.format('ddd')}
      autoFocus
    />
  )));
