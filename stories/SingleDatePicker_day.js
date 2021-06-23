import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import getDay from 'date-fns/getDay';

import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

const datesList = [
  new Date(),
  addDays(new Date(), 1),
  addDays(new Date(), 3),
  addDays(new Date(), 9),
  addDays(new Date(), 10),
  addDays(new Date(), 11),
  addDays(new Date(), 12),
  addDays(new Date(), 13),
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
      isOutsideRange={day => !isInclusivelyAfterDay(day, new Date())
        || isInclusivelyAfterDay(day, addWeeks(new Date(), 2))
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
      isDayBlocked={day => getDay(day) === 5}
      autoFocus
    />
  )))
  .add('with custom daily details', withInfo()(() => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      renderDayContents={day => format(day, 'ddd')}
      autoFocus
    />
  )));
