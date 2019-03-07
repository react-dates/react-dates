import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT, OPEN_UP } from '../src/constants';

const TestPrevIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      left: '22px',
      padding: '3px',
      position: 'absolute',
      top: '20px',
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
      position: 'absolute',
      right: '22px',
      top: '20px',
    }}
  >
    Next
  </span>
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
  .add('default', withInfo()(() => (
    <SingleDatePickerWrapper autoFocus />
  )))
  .add('open up', withInfo()(() => (
    <div style={{ marginTop: '450px' }}>
      <SingleDatePickerWrapper
        openDirection={OPEN_UP}
        autoFocus
      />
    </div>
  )))
  .add('single month', withInfo()(() => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      autoFocus
    />
  )))
  .add('with custom day size', withInfo()(() => (
    <SingleDatePickerWrapper daySize={50} autoFocus />
  )))
  .add('anchored right', withInfo()(() => (
    <div style={{ float: 'right' }}>
      <SingleDatePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  )))
  .add('vertical', withInfo()(() => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      autoFocus
    />
  )))
  .add('horizontal with portal', withInfo()(() => (
    <SingleDatePickerWrapper
      withPortal
      autoFocus
    />
  )))
  .add('horizontal with portal and info panel', withInfo()(() => (
    <SingleDatePickerWrapper
      withPortal
      autoFocus
      calendarInfoPosition="after"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  )))
  .add('horizontal with fullscreen portal', withInfo()(() => (
    <SingleDatePickerWrapper withFullScreenPortal autoFocus />
  )))
  .add('vertical with full screen portal', withInfo()(() => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
      autoFocus
    />
  )))
  .add('disable scroll', withInfo()(() => (
    <div style={{ height: '100vh' }}>
      <div>This content scrolls.</div>
      <SingleDatePickerWrapper disableScroll autoFocus />
    </div>
  )))
  .add('appended to body', withInfo()(() => <SingleDatePickerWrapper appendToBody autoFocus />))
  .add('appended to body (in scrollable container)', withInfo()(() => (
    <div style={{ height: 200, overflow: 'auto', background: 'whitesmoke' }}>
      <div>This content scrolls.</div>
      <div style={{ marginBottom: 300 }}>
        <SingleDatePickerWrapper appendToBody autoFocus />
      </div>
    </div>
  )))
  .add('does not autoclose the DayPicker on date selection', withInfo()(() => (
    <SingleDatePickerWrapper
      keepOpenOnDateSelect
      autoFocus
    />
  )))
  .add('with month specified on open', withInfo()(() => (
    <SingleDatePickerWrapper
      initialVisibleMonth={() => moment().add(10, 'months')}
      autoFocus
    />
  )))
  .add('with custom arrows', withInfo()(() => (
    <SingleDatePickerWrapper
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
      autoFocus
    />
  )))
  .add('with outside days enabled', withInfo()(() => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
      autoFocus
    />
  )))
  .add('with info panel default', withInfo()(() => (
    <SingleDatePickerWrapper
      renderCalendarInfo={() => (
        <TestCustomInfoPanel borderPosition='borderBottom' />
      )}
      autoFocus
    />
  )))
  .add('with info panel before', withInfo()(() => (
    <SingleDatePickerWrapper
      calendarInfoPosition="before"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel after', withInfo()(() => (
    <SingleDatePickerWrapper
      calendarInfoPosition="after"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel bottom', withInfo()(() => (
    <SingleDatePickerWrapper
      calendarInfoPosition="bottom"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel top', withInfo()(() => (
    <SingleDatePickerWrapper
      calendarInfoPosition="top"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with keyboard shorcuts panel hidden', withInfo()(() => (
    <SingleDatePickerWrapper
      hideKeyboardShortcutsPanel
      autoFocus
    />
  )))
  .add('with RTL support', withInfo()(() => (
    <SingleDatePickerWrapper
      isRTL
      autoFocus
    />
  )))
  .add('with custom first day of week', withInfo()(() => (
    <SingleDatePickerWrapper
      firstDayOfWeek={3}
      autoFocus
    />
  )))
  .add('with onClose handler', withInfo()(() => (
    <SingleDatePickerWrapper
      onClose={({ date }) => alert(`onClose: date = ${date}`)}
      autoFocus
    />
  )))
  .add('with no animation', withInfo()(() => (
    <SingleDatePickerWrapper
      transitionDuration={0}
      autoFocus
    />
  )))
  .add('with custom vertical spacing', withInfo()(() => (
    <SingleDatePickerWrapper
      verticalSpacing={0}
      autoFocus
    />
  )));
