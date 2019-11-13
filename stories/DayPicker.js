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
      left: '22px',
      padding: '3px',
      position: 'absolute',
      top: '20px',
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
      right: '22px',
      top: '20px',
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

function renderNavPrevButton(buttonProps) {
  const {
    ariaLabel,
    disabled,
    onClick,
    onKeyUp,
    onMouseUp,
  } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{ position: 'absolute', top: 23, left: 22 }}
      type="button"
    >
    &lsaquo; Prev
    </button>
  );
}

function renderNavNextButton(buttonProps) {
  const {
    ariaLabel,
    disabled,
    onClick,
    onKeyUp,
    onMouseUp,
  } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{ position: 'absolute', top: 23, right: 22 }}
      type="button"
    >
          Next &rsaquo;
    </button>
  );
}

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
  .add('vertical with DirectionProvider', withInfo()(() => (
    <DirectionProvider direction={DIRECTIONS.RTL}>
      <DayPicker
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
          numberOfMonths={12}
          orientation={VERTICAL_SCROLLABLE}
        />
      </div>
    </DirectionProvider>
  )))
  .add('with custom arrows', withInfo()(() => (
    <DayPicker
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  )))
  .add('with custom navigation buttons', withInfo()(() => (
    <DayPicker
      renderNavPrevButton={renderNavPrevButton}
      renderNavNextButton={renderNavNextButton}
    />
  )))
  .add('with custom details', withInfo()(() => (
    <DayPicker
      renderDayContents={(day) => (day.day() % 6 === 5 ? '😻' : day.format('D'))}
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
  .add('with custom week header text', withInfo()(() => (
    <DayPicker
      renderWeekHeaderElement={(day) => (
        <strong style={{ color: '#FE01E5' }}><small>{day.toUpperCase()}</small></strong>
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
