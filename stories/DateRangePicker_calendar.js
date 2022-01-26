import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import { VERTICAL_ORIENTATION, ANCHOR_RIGHT, OPEN_UP, NAV_POSITION_BOTTOM } from '../src/constants';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

function CustomMonthNav({ children, style }) {
  return (
    <div
      style={{
        border: '1px solid #dce0e0',
        borderRadius: 2,
        backgroundColor: '#fff',
        color: '#484848',
        fontSize: 24,
        padding: '0 3px',
        position: 'absolute',
        marginTop: -2,
        top: 19,
        left: 13,
        ...style,
      }}
      tabindex="0"
    >
      {children}
    </div>
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
  .add('default', (() => (
    <DateRangePickerWrapper autoFocus />
  )))
  .add('open up', (() => (
    <div style={{ marginTop: '450px' }}>
      <DateRangePickerWrapper
        openDirection={OPEN_UP}
        autoFocus
      />
    </div>
  )))
  .add('single month', (() => (
    <DateRangePickerWrapper numberOfMonths={1} autoFocus />
  )))
  .add('3 months', (() => (
    <DateRangePickerWrapper numberOfMonths={3} autoFocus />
  )))
  .add('with 7 days range selection', (() => (
    <DateRangePickerWrapper
      startDateOffset={day => day.subtract(3, 'days')}
      endDateOffset={day => day.add(3, 'days')}
    />
  )))
  .add('with custom day size', (() => (
    <DateRangePickerWrapper daySize={50} autoFocus />
  )))
  .add('anchored right', (() => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  )))
  .add('vertical', (() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      autoFocus
    />
  )))
  .add('vertical anchored right', (() => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        orientation={VERTICAL_ORIENTATION}
        anchorDirection={ANCHOR_RIGHT}
        autoFocus
      />
    </div>
  )))
  .add('horizontal with portal', (() => (
    <DateRangePickerWrapper
      withPortal
      autoFocus
    />
  )))
  .add('horizontal with fullscreen portal', (() => (
    <DateRangePickerWrapper withFullScreenPortal autoFocus />
  )))
  .add('vertical with full screen portal', (() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      withFullScreenPortal
      autoFocus
    />
  )))
  .add('disable scroll', (() => (
    <div style={{ height: '100vh' }}>
      <div>This content scrolls.</div>
      <DateRangePickerWrapper preventScroll autoFocus />
    </div>
  )))
  .add('appended to body', (() => <DateRangePickerWrapper appendToBody autoFocus />))
  .add('appended to body (in scrollable container)', (() => (
    <div style={{ height: 200, overflow: 'auto', background: 'whitesmoke' }}>
      <div>This content scrolls.</div>
      <div style={{ marginBottom: 300 }}>
        <DateRangePickerWrapper appendToBody autoFocus />
      </div>
    </div>
  )))
  .add('does not autoclose the DayPicker on date selection', (() => (
    <DateRangePickerWrapper
      keepOpenOnDateSelect
      autoFocus
    />
  )))
  .add('with custom month navigation', (() => (
    <DateRangePickerWrapper
      navPrev={<CustomMonthNav>&#8249;</CustomMonthNav>}
      navNext={<CustomMonthNav style={{ left: 33 }}>&#8250;</CustomMonthNav>}
      numberOfMonths={1}
      autoFocus
    />
  )))
  .add('vertical with custom month navigation', (() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      navPrev={<CustomMonthNav>&#8249;</CustomMonthNav>}
      navNext={<CustomMonthNav style={{ left: 33 }}>&#8250;</CustomMonthNav>}
      autoFocus
    />
  )))
  .add('with month navigation positioned at the bottom', (() => (
    <DateRangePickerWrapper
      navPosition={NAV_POSITION_BOTTOM}
      numberOfMonths={1}
      autoFocus
    />
  )))
  .add('with outside days enabled', (() => (
    <DateRangePickerWrapper
      numberOfMonths={1}
      enableOutsideDays
      autoFocus
    />
  )))
  .add('with month specified on open', (() => (
    <DateRangePickerWrapper
      initialVisibleMonth={() => moment().add(10, 'months')}
      autoFocus
    />
  )))
  .add('with info panel default', (() => (
    <DateRangePickerWrapper
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel before', (() => (
    <DateRangePickerWrapper
      calendarInfoPosition="before"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel after', (() => (
    <DateRangePickerWrapper
      calendarInfoPosition="after"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel bottom', (() => (
    <DateRangePickerWrapper
      calendarInfoPosition="bottom"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with info panel top', (() => (
    <DateRangePickerWrapper
      calendarInfoPosition="top"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
      autoFocus
    />
  )))
  .add('with keyboard shortcuts panel hidden', (() => (
    <DateRangePickerWrapper
      hideKeyboardShortcutsPanel
      autoFocus
    />
  )))
  .add('with RTL support (and anchor right)', (() => (
    <div style={{ float: 'right' }}>
      <DateRangePickerWrapper
        anchorDirection={ANCHOR_RIGHT}
        isRTL
        autoFocus
      />
    </div>
  )))
  .add('vertical with RTL support', (() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      isRTL
      autoFocus
    />
  )))
  .add('with custom first day of week', (() => (
    <DateRangePickerWrapper
      firstDayOfWeek={3}
      autoFocus
    />
  )))
  .add('with onClose handler', (() => (
    <DateRangePickerWrapper
      onClose={({ startDate, endDate }) => alert(`onClose: startDate = ${startDate}, endDate = ${endDate}`)}
      autoFocus
    />
  )))
  .add('with no animation', (() => (
    <DateRangePickerWrapper
      transitionDuration={0}
      autoFocus
    />
  )))
  .add('with custom vertical spacing', (() => (
    <DateRangePickerWrapper
      verticalSpacing={0}
      autoFocus
    />
  )))
  .add('without borders', (() => (
    <DateRangePickerWrapper
      verticalSpacing={0}
      noBorder
      autoFocus
    />
  )));
