import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import addDays from 'date-fns/addDays';
import getDay from 'date-fns/getDay';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import CustomizableCalendarDay from '../src/components/CustomizableCalendarDay';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';


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

const blockedStyles = {
  background: '#fff',
  border: '1px double #e4e7e7',
  color: '#dce0e0',

  hover: {
    background: '#fff',
    border: '1px double #e4e7e7',
    color: '#dce0e0',
  },
};

const customDayStyles = {
  selectedStartStyles: selectedStyles,
  selectedEndStyles: selectedStyles,
  hoveredSpanStyles: hoveredStyles,
  afterHoveredStartStyles: hoveredStyles,
  blockedMinNightsStyles: blockedStyles,
  blockedCalendarStyles: blockedStyles,
  blockedOutOfRangeStyles: blockedStyles,

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
  .add('default', withInfo()(() => (
    <DateRangePickerWrapper autoFocus />
  )))
  .add('with minimum nights set', withInfo()(() => (
    <DateRangePickerWrapper
      minimumNights={3}
      initialStartDate={addDays(new Date(), 3)}
      autoFocusEndDate
    />
  )))
  .add('allows single day range', withInfo()(() => (
    <DateRangePickerWrapper
      minimumNights={0}
      initialStartDate={addDays(new Date(), 3)}
      autoFocusEndDate
    />
  )))
  .add('allows all days, including past days', withInfo()(() => (
    <DateRangePickerWrapper
      isOutsideRange={() => false}
      autoFocus
    />
  )))
  .add('allows next two weeks only', withInfo()(() => (
    <DateRangePickerWrapper
      isOutsideRange={day => !isInclusivelyAfterDay(day, new Date())
        || isInclusivelyAfterDay(day, addDays(new Date(), 14))
      }
      autoFocus
    />
  )))
  .add('with some blocked dates', withInfo()(() => (
    <DateRangePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  )))
  .add('with some highlighted dates', withInfo()(() => (
    <DateRangePickerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  )))
  .add('blocks fridays', withInfo()(() => (
    <DateRangePickerWrapper
      isDayBlocked={day => getDay(day) === 5}
      autoFocus
    />
  )))
  .add('with custom daily details', withInfo()(() => (
    <DateRangePickerWrapper
      renderDayContents={day => <td className="foo-bar">{format(day, 'ddd')}</td>}
      autoFocus
    />
  )))
  .add('one-off custom styling', withInfo()(() => (
    <DateRangePickerWrapper
      minimumNights={3}
      renderCalendarDay={props => <CustomizableCalendarDay {...props} {...customDayStyles} />}
      autoFocus
    />
  )));
