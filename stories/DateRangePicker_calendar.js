import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT, OPEN_UP } from '../src/constants';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

function CustomMonthNav({ children, style }) {
  return (
    <span
      style={{
        border: '1px solid #dce0e0',
        borderRadius: 2,
        backgroundColor: '#fff',
        color: '#484848',
        fontSize: 24,
        padding: '0 3px',
        position: 'absolute',
        marginTop: -2,
        top: 30,
        left: 26,
        outline: 'inherit',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

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

storiesOf('DRP - Calendar Props', module)
  .add('default', withInfo()(() => (
    <DateRangePickerWrapper autoFocus />
  )))
  .add('open up', withInfo()(() => (
    <div style={{ marginTop: '450px' }}>
      <DateRangePickerWrapper
        openDirection={OPEN_UP}
        autoFocus
      />
    </div>
  )))
  .add('single month', withInfo()(() => (
    <DateRangePickerWrapper numberOfMonths={1} autoFocus />
  )))
  .add('3 months', withInfo()(() => (
    <DateRangePickerWrapper numberOfMonths={3} autoFocus />
  )))
  .add('with 7 days range selection', withInfo()(() => (
    <DateRangePickerWrapper
      startDateOffset={day => day.subtract(3, 'days')}
      endDateOffset={day => day.add(3, 'days')}
    />
  )))
  .add('with custom day size', withInfo()(() => (
    <DateRangePickerWrapper daySize={50} autoFocus />
  )))
  .add('anchored right', withInfo()(() => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  )))
  .add('vertical', withInfo()(() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      autoFocus
    />
  )))
  .add('vertical anchored right', withInfo()(() => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        orientation={VERTICAL_ORIENTATION}
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  )))
  .add('horizontal with portal', withInfo()(() => (
    <DateRangePickerWrapper
      withPortal
      autoFocus
    />
  )))
  .add('horizontal with fullscreen portal', withInfo()(() => (
    <DateRangePickerWrapper withFullScreenPortal autoFocus />
  )))
  .add('vertical with full screen portal', withInfo()(() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
      autoFocus
    />
  )))
  .add('disable scroll', withInfo()(() => (
    <div style={{ height: '100vh' }}>
      <div>This content scrolls.</div>
      <DateRangePickerWrapper preventScroll autoFocus />
    </div>
  )))
  .add('appended to body', withInfo()(() => <DateRangePickerWrapper appendToBody autoFocus />))
  .add('appended to body (in scrollable container)', withInfo()(() => (
    <div style={{ height: 200, overflow: 'auto', background: 'whitesmoke' }}>
      <div>This content scrolls.</div>
      <div style={{ marginBottom: 300 }}>
        <DateRangePickerWrapper appendToBody autoFocus />
      </div>
    </div>
  )))
  .add('does not autoclose the DayPicker on date selection', withInfo()(() => (
    <DateRangePickerWrapper
      keepOpenOnDateSelect
      autoFocus
    />
  )))
  .add('with custom month navigation', withInfo()(() => (
    <DateRangePickerWrapper
      navPrev={<CustomMonthNav>&#8249;</CustomMonthNav>}
      navNext={<CustomMonthNav style={{ left: 48 }}>&#8250;</CustomMonthNav>}
      numberOfMonths={1}
      autoFocus
    />
  )))
  .add('vertical with custom month navigation', withInfo()(() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      navPrev={<CustomMonthNav>&#8249;</CustomMonthNav>}
      navNext={<CustomMonthNav style={{ left: 48 }}>&#8250;</CustomMonthNav>}
      autoFocus
    />
  )))
  .add('with outside days enabled', withInfo()(() => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
      autoFocus
    />
  )))
  .add('with month specified on open', withInfo()(() => (
    <DateRangePickerWrapper
      initialVisibleMonth={() => moment().add(10, 'months')}
      autoFocus
    />
  )))
  .add('with info panel default', withInfo()(() => (
    <DateRangePickerWrapper
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel before', withInfo()(() => (
    <DateRangePickerWrapper
      calendarInfoPosition="before"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel after', withInfo()(() => (
    <DateRangePickerWrapper
      calendarInfoPosition="after"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel bottom', withInfo()(() => (
    <DateRangePickerWrapper
      calendarInfoPosition="bottom"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel top', withInfo()(() => (
    <DateRangePickerWrapper
      calendarInfoPosition="top"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with keyboard shortcuts panel hidden', withInfo()(() => (
    <DateRangePickerWrapper
      hideKeyboardShortcutsPanel
      autoFocus
    />
  )))
  .add('with RTL support (and anchor right)', withInfo()(() => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        isRTL
        autoFocus
      />
    </div>
  )))
  .add('vertical with RTL support', withInfo()(() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      isRTL
      autoFocus
    />
  )))
  .add('with custom first day of week', withInfo()(() => (
    <DateRangePickerWrapper
      firstDayOfWeek={3}
      autoFocus
    />
  )))
  .add('with onClose handler', withInfo()(() => (
    <DateRangePickerWrapper
      onClose={({ startDate, endDate }) => alert(`onClose: startDate = ${startDate}, endDate = ${endDate}`)}
      autoFocus
    />
  )))
  .add('with no animation', withInfo()(() => (
    <DateRangePickerWrapper
      transitionDuration={0}
      autoFocus
    />
  )))
  .add('with custom vertical spacing', withInfo()(() => (
    <DateRangePickerWrapper
      verticalSpacing={0}
      autoFocus
    />
  )));
