import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT } from '../constants';

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

storiesOf('SDP - Calendar Props', module)
  .addWithInfo('default', () => (
    <SingleDatePickerWrapper />
  ))
  .addWithInfo('single month', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
    />
  ))
  .addWithInfo('anchored right', () => (
    <div style={{ float: 'right' }}>
      <SingleDatePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
      />
    </div>
  ))
  .addWithInfo('vertical', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('horizontal with portal', () => (
    <SingleDatePickerWrapper
      withPortal
    />
  ))
  .addWithInfo('horizontal with fullscreen portal', () => (
    <SingleDatePickerWrapper withFullScreenPortal />
  ))
  .addWithInfo('vertical with full screen portal', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
    />
  ))
  .addWithInfo('does not autoclose the DayPicker on date selection', () => (
    <SingleDatePickerWrapper
      keepOpenOnDateSelect
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <SingleDatePickerWrapper
      initialVisibleMonth={() => moment('01 2017', 'MM YYYY')}
    />
  ))
  .addWithInfo('with custom arrows', () => (
    <SingleDatePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
    />
  ));
