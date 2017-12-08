import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import CustomizableCalendarDay from '../src/components/CustomizableCalendarDay';

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

const selectedStyles = {
  background: '#590098',
  border: '1px solid #590098',
  color: '#fff',

  hover: {
    background: '#7A32AC',
    border: '1px solid #7A32AC',
    color: '#fff',
  },
};

const hoveredStyles = {
  background: '#cd99d0',
  border: '1px solid #cd99d0',
  color: '#fff',
};

const customDayStyles = {
  selectedStartStyles: selectedStyles,
  selectedEndStyles: selectedStyles,
  hoveredSpanStyles: hoveredStyles,
  afterHoveredStartStyles: hoveredStyles,

  selectedSpanStyles: {
    background: '#9b32a2',
    border: '1px solid #9b32a2',
    color: '#fff',

    hover: {
      background: '#83008b',
      border: '1px solid #83008b',
      color: '#fff',
    },
  },
};

storiesOf('DRP - Day Props', module)
  .addWithInfo('default', () => (
    <DateRangePickerWrapper autoFocus />
  ))
  .addWithInfo('with minimum nights set', () => (
    <DateRangePickerWrapper
      minimumNights={3}
      initialStartDate={moment().add(3, 'days')}
      autoFocusEndDate
    />
  ))
  .addWithInfo('allows single day range', () => (
    <DateRangePickerWrapper
      minimumNights={0}
      initialStartDate={moment().add(3, 'days')}
      autoFocusEndDate
    />
  ))
  .addWithInfo('allows all days, including past days', () => (
    <DateRangePickerWrapper
      isOutsideRange={() => false}
      autoFocus
    />
  ))
  .addWithInfo('allows next two weeks only', () => (
    <DateRangePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
      autoFocus
    />
  ))
  .addWithInfo('with some blocked dates', () => (
    <DateRangePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  ))
  .addWithInfo('with some highlighted dates', () => (
    <DateRangePickerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  ))
  .addWithInfo('blocks fridays', () => (
    <DateRangePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
      autoFocus
    />
  ))
  .addWithInfo('with custom daily details', () => (
    <DateRangePickerWrapper
      renderDayContents={day => <td className="foo-bar">{day.format('ddd')}</td>}
      autoFocus
    />
  ))
  .addWithInfo('one-off custom styling', () => (
    <DateRangePickerWrapper
      renderCalendarDay={props => <CustomizableCalendarDay {...props} {...customDayStyles} />}
      autoFocus
    />
  ));
