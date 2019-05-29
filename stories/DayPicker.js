import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import DayPicker from '../src/components/DayPicker';

import {
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../src/constants';

const TestPrevIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      left: '24px',
      padding: '3px',
      position: 'absolute',
      width: '40px',
    }}
    tabIndex="0"
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
      right: '24px',
      width: '40px',
    }}
    tabIndex="0"
  >
    Next
  </div>
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
    <DayPicker id="storybook-daypicker" />
  )))
  .add('with custom day size', withInfo()(() => (
    <DayPicker id="storybook-daypicker" daySize={50} />
  )))
  .add('single month', withInfo()(() => (
    <DayPicker id="storybook-daypicker" numberOfMonths={1} />
  )))
  .add('3 months', withInfo()(() => (
    <DayPicker id="storybook-daypicker" numberOfMonths={3} />
  )))
  .add('vertical', withInfo()(() => (
    <DayPicker
      id="storybook-daypicker"
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
        id="storybook-daypicker"
        numberOfMonths={12}
        orientation={VERTICAL_SCROLLABLE}
      />
    </div>
  )))
  .add('vertical with custom day size', withInfo()(() => (
    <DayPicker
      id="storybook-daypicker"
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
      daySize={50}
    />
  )))
  .add('vertical with custom height', withInfo()(() => (
    <DayPicker
      id="storybook-daypicker"
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
      verticalHeight={568}
    />
  )))
  .add('vertical with DirectionProvider', withInfo()(() => (
    <DirectionProvider direction={DIRECTIONS.RTL}>
      <DayPicker
        id="storybook-daypicker"
        numberOfMonths={2}
        orientation={VERTICAL_ORIENTATION}
        isRTL
      />
    </DirectionProvider>
  )))
  .add('vertically scrollable with DirectionProvider', withInfo()(() => (
    <DirectionProvider direction={DIRECTIONS.RTL}>
      <div
        style={{
          height: 568,
          width: 320,
        }}
      >
        <DayPicker
          id="storybook-daypicker"
          numberOfMonths={12}
          orientation={VERTICAL_SCROLLABLE}
        />
      </div>
    </DirectionProvider>
  )))
  .add('with custom arrows', withInfo()(() => (
    <DayPicker
      id="storybook-daypicker"
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  )))
  .add('with custom details', withInfo()(() => (
    <DayPicker
      id="storybook-daypicker"
      renderDayContents={day => (day.day() % 6 === 5 ? '😻' : day.format('D'))}
    />
  )))
  .add('vertical with fixed-width container', withInfo()(() => (
    <div style={{ width: '400px' }}>
      <DayPicker
        id="storybook-daypicker"
        numberOfMonths={2}
        orientation={VERTICAL_ORIENTATION}
      />
    </div>
  )))
  .add('with info panel', withInfo()(() => (
    <DayPicker
      id="storybook-daypicker"
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  )))
  .add('with custom week day format', withInfo()(() => (
    <DayPicker
      id="storybook-daypicker"
      weekDayFormat="ddd"
    />
  )))
  .add('with no animation', withInfo()(() => (
    <DayPicker
      id="storybook-daypicker"
      transitionDuration={0}
    />
  )))
  .add('noBorder', withInfo()(() => (
    <DayPicker id="storybook-daypicker" noBorder />
  )));
