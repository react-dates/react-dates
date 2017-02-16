import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT } from '../constants';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

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

storiesOf('DRP - Calendar Props', module)
  .addWithInfo('default', () => (
    <DateRangePickerWrapper autoFocus />
  ))
  .addWithInfo('single month', () => (
    <DateRangePickerWrapper numberOfMonths={1} autoFocus />
  ))
  .addWithInfo('3 months', () => (
    <DateRangePickerWrapper numberOfMonths={3} autoFocus />
  ))
  .addWithInfo('anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  ))
  .addWithInfo('vertical', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      autoFocus
    />
  ))
  .addWithInfo('vertical anchored right', () => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        orientation={VERTICAL_ORIENTATION}
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  ))
  .addWithInfo('horizontal with portal', () => (
    <DateRangePickerWrapper
      withPortal
      autoFocus
    />
  ))
  .addWithInfo('horizontal with fullscreen portal', () => (
    <DateRangePickerWrapper withFullScreenPortal autoFocus />
  ))
  .addWithInfo('vertical with full screen portal', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
      autoFocus
    />
  ))
  .addWithInfo('does not autoclose the DayPicker on date selection', () => (
    <DateRangePickerWrapper
      keepOpenOnDateSelect
      autoFocus
    />
  ))
  .addWithInfo('with custom month navigation', () => (
    <DateRangePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
      autoFocus
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
      autoFocus
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <DateRangePickerWrapper
      initialVisibleMonth={() => moment('04 2017', 'MM YYYY')}
      autoFocus
    />
  ));
