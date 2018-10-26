import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
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
  .add('default', withInfo()(() => (
    <DayPicker />
  )))
  .add('with custom day size', withInfo()(() => (
    <DayPicker daySize={50} />
  )))
  .add('single month', withInfo()(() => (
    <DayPicker numberOfMonths={1} />
  )))
  .add('3 months', withInfo()(() => (
    <DayPicker numberOfMonths={3} />
  )))
  .add('vertical', withInfo()(() => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
    />
  )))
  .add('vertically scrollable with 12 months', withInfo()(() => (
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
  )))
  .add('vertical with custom day size', withInfo()(() => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
      daySize={50}
    />
  )))
  .add('vertical with custom height', withInfo()(() => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
      verticalHeight={568}
    />
  )))
  .add('with custom arrows', withInfo()(() => (
    <DayPicker
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  )))
  .add('with custom details', withInfo()(() => (
    <DayPicker
      renderDayContents={day => (day.day() % 6 === 5 ? '😻' : day.format('D'))}
    />
  )))
  .add('vertical with fixed-width container', withInfo()(() => (
    <div style={{ width: '400px' }}>
      <DayPicker
        numberOfMonths={2}
        orientation={VERTICAL_ORIENTATION}
      />
    </div>
  )))
  .add('with info panel', withInfo()(() => (
    <DayPicker
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  )))
  .add('with custom week day format', withInfo()(() => (
    <DayPicker
      weekDayFormat="ddd"
    />
  )))
  .add('with no animation', withInfo()(() => (
    <DayPicker
      transitionDuration={0}
    />
  )))
  .add('noBorder', withInfo()(() => (
    <DayPicker noBorder />
  )));
