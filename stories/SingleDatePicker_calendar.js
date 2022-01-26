import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT, OPEN_UP } from '../src/constants';

const TestPrevIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      left: '22px',
      padding: '3px',
      position: 'absolute',
      top: '20px',
    }}
    tabindex="0"
  >
    Prev
  </div>
);

const TestNextIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
      position: 'absolute',
      right: '22px',
      top: '20px',
    }}
    tabindex="0"
  >
    Next
  </div>
);

const TestCustomInfoPanel = () => (
  <div
    style={{
      padding: '10px 21px',
      color: '#484848',
    }}
  >
    &#x2755; Some useful info here
  </div>
);

storiesOf('SDP - Calendar Props', module)
  .add('default', (() => (
    <SingleDatePickerWrapper autoFocus />
  )))
  .add('open up', (() => (
    <div style={{ marginTop: '450px' }}>
      <SingleDatePickerWrapper
        openDirection={OPEN_UP}
        autoFocus
      />
    </div>
  )))
  .add('single month', (() => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      autoFocus
    />
  )))
  .add('with custom day size', (() => (
    <SingleDatePickerWrapper daySize={50} autoFocus />
  )))
  .add('anchored right', (() => (
    <div style={{ float: 'right' }}>
      <SingleDatePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  )))
  .add('vertical', (() => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      autoFocus
    />
  )))
  .add('horizontal with portal', (() => (
    <SingleDatePickerWrapper
      withPortal
      autoFocus
    />
  )))
  .add('horizontal with portal and info panel', (() => (
    <SingleDatePickerWrapper
      withPortal
      autoFocus
      calendarInfoPosition="after"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  )))
  .add('horizontal with fullscreen portal', (() => (
    <SingleDatePickerWrapper withFullScreenPortal autoFocus />
  )))
  .add('vertical with full screen portal', (() => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
      autoFocus
    />
  )))
  .add('disable scroll', (() => (
    <div style={{ height: '100vh' }}>
      <div>This content scrolls.</div>
      <SingleDatePickerWrapper disableScroll autoFocus />
    </div>
  )))
  .add('appended to body', (() => <SingleDatePickerWrapper appendToBody autoFocus />))
  .add('appended to body (in scrollable container)', (() => (
    <div style={{ height: 200, overflow: 'auto', background: 'whitesmoke' }}>
      <div>This content scrolls.</div>
      <div style={{ marginBottom: 300 }}>
        <SingleDatePickerWrapper appendToBody autoFocus />
      </div>
    </div>
  )))
  .add('does not autoclose the DayPicker on date selection', (() => (
    <SingleDatePickerWrapper
      keepOpenOnDateSelect
      autoFocus
    />
  )))
  .add('with month specified on open', (() => (
    <SingleDatePickerWrapper
      initialVisibleMonth={() => moment().add(10, 'months')}
      autoFocus
    />
  )))
  .add('with custom arrows', (() => (
    <SingleDatePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
      autoFocus
    />
  )))
  .add('with outside days enabled', (() => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
      autoFocus
    />
  )))
  .add('with info panel default', (() => (
    <SingleDatePickerWrapper
      renderCalendarInfo={() => (
        <TestCustomInfoPanel borderPosition='borderBottom' />
      )}
      autoFocus
    />
  )))
  .add('with info panel before', (() => (
    <SingleDatePickerWrapper
      calendarInfoPosition="before"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel after', (() => (
    <SingleDatePickerWrapper
      calendarInfoPosition="after"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel bottom', (() => (
    <SingleDatePickerWrapper
      calendarInfoPosition="bottom"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel top', (() => (
    <SingleDatePickerWrapper
      calendarInfoPosition="top"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with keyboard shorcuts panel hidden', (() => (
    <SingleDatePickerWrapper
      hideKeyboardShortcutsPanel
      autoFocus
    />
  )))
  .add('with RTL support', (() => (
    <SingleDatePickerWrapper
      isRTL
      autoFocus
    />
  )))
  .add('with custom first day of week', (() => (
    <SingleDatePickerWrapper
      firstDayOfWeek={3}
      autoFocus
    />
  )))
  .add('with onClose handler', (() => (
    <SingleDatePickerWrapper
      onClose={({ date }) => alert(`onClose: date = ${date}`)}
      autoFocus
    />
  )))
  .add('with no animation', (() => (
    <SingleDatePickerWrapper
      transitionDuration={0}
      autoFocus
    />
  )))
  .add('with custom vertical spacing', (() => (
    <SingleDatePickerWrapper
      verticalSpacing={0}
      autoFocus
    />
  )));
