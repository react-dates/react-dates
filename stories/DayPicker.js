import React from 'react';
import { storiesOf } from '@storybook/react';
import DayPicker from '../src/components/DayPicker';

import {
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../src/constants';

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

storiesOf('DayPicker', module)
  .addWithInfo('default', () => (
    <DayPicker />
  ))
  .addWithInfo('with custom day size', () => (
    <DayPicker daySize={50} />
  ))
  .addWithInfo('single month', () => (
    <DayPicker numberOfMonths={1} />
  ))
  .addWithInfo('3 months', () => (
    <DayPicker numberOfMonths={3} />
  ))
  .addWithInfo('vertical', () => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('vertically scrollable with 12 months', () => (
    <div
      style={{
        height: 568,
        width: 320,
      }}
    >
      <DayPicker
        numberOfMonths={12}
        orientation={VERTICAL_SCROLLABLE}
      />
    </div>
  ))
  .addWithInfo('vertical with custom day size', () => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
      daySize={50}
    />
  ))
  .addWithInfo('vertical with custom height', () => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
      verticalHeight={568}
    />
  ))
  .addWithInfo('with custom arrows', () => (
    <DayPicker
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('with custom details', () => (
    <DayPicker
      renderDay={day => (day.day() % 6 === 5 ? '😻' : day.format('D'))}
    />
  ))
  .addWithInfo('vertical with fixed-width container', () => (
    <div style={{ width: '400px' }}>
      <DayPicker
        numberOfMonths={2}
        orientation={VERTICAL_ORIENTATION}
      />
    </div>
  ))
  .addWithInfo('with info panel', () => (
    <DayPicker
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  ))
  .addWithInfo('with custom week day format', () => (
    <DayPicker
      weekDayFormat="ddd"
    />
  ))
  .addWithInfo('noBorder', () => (
    <DayPicker noBorder />
  ));
