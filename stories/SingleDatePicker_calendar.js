import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT, OPEN_UP } from '../src/constants';

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

const TestCustomInfoPanel = () => (
  <div
    style={{
      padding: '10px 21px',
      borderTop: '1px solid #dce0e0',
      color: '#484848',
    }}
  >
    &#x2755; Some useful info here
  </div>
);

storiesOf('SDP - Calendar Props', module)
  .addWithInfo('default', () => (
    <SingleDatePickerWrapper autoFocus />
  ))
  .addWithInfo('open up', () => (
    <div style={{ marginTop: '450px' }}>
      <SingleDatePickerWrapper
        openDirection={OPEN_UP}
        autoFocus
      />
    </div>
  ))
  .addWithInfo('single month', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      autoFocus
    />
  ))
  .addWithInfo('with custom day size', () => (
    <SingleDatePickerWrapper daySize={50} autoFocus />
  ))
  .addWithInfo('anchored right', () => (
    <div style={{ float: 'right' }}>
      <SingleDatePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  ))
  .addWithInfo('vertical', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      autoFocus
    />
  ))
  .addWithInfo('horizontal with portal', () => (
    <SingleDatePickerWrapper
      withPortal
      autoFocus
    />
  ))
  .addWithInfo('horizontal with fullscreen portal', () => (
    <SingleDatePickerWrapper withFullScreenPortal autoFocus />
  ))
  .addWithInfo('vertical with full screen portal', () => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
      autoFocus
    />
  ))
  .addWithInfo('does not autoclose the DayPicker on date selection', () => (
    <SingleDatePickerWrapper
      keepOpenOnDateSelect
      autoFocus
    />
  ))
  .addWithInfo('with month specified on open', () => (
    <SingleDatePickerWrapper
      initialVisibleMonth={() => moment().add(10, 'months')}
      autoFocus
    />
  ))
  .addWithInfo('with custom arrows', () => (
    <SingleDatePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
      autoFocus
    />
  ))
  .addWithInfo('with outside days enabled', () => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
      autoFocus
    />
  ))
  .addWithInfo('with info panel', () => (
    <SingleDatePickerWrapper
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  ))
  .addWithInfo('with keyboard shorcuts panel hidden', () => (
    <SingleDatePickerWrapper
      hideKeyboardShortcutsPanel
      autoFocus
    />
  ))
  .addWithInfo('with RTL support', () => (
    <SingleDatePickerWrapper
      isRTL
      autoFocus
    />
  ))
  .addWithInfo('with custom first day of week', () => (
    <SingleDatePickerWrapper
      firstDayOfWeek={3}
      autoFocus
    />
  ))
  .addWithInfo('with onClose handler', () => (
    <SingleDatePickerWrapper
      onClose={({ date }) => alert(`onClose: date = ${date}`)}
      autoFocus
    />
  ))
  .addWithInfo('with no animation', () => (
    <SingleDatePickerWrapper
      transitionDuration={0}
      autoFocus
    />
  ))
  .addWithInfo('with custom vertical spacing', () => (
    <SingleDatePickerWrapper
      verticalSpacing={0}
      autoFocus
    />
  ));

