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
    <DateRangePickerWrapper />
  ))
  .addWithInfo('single month', () => (
    <DateRangePickerWrapper numberOfMonths={1} />
  ))
  .addWithInfo('3 months', () => (
    <DateRangePickerWrapper numberOfMonths={3} />
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
  .addWithInfo('does not autoclose the DayPicker on date selection', () => (
    <DateRangePickerWrapper
      keepOpenOnDateSelect
    />
  ))
  .addWithInfo('with custom month navigation', () => (
    <DateRangePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <DateRangePickerWrapper
      initialVisibleMonth={() => moment('04 2017', 'MM YYYY')}
    />
  ));

