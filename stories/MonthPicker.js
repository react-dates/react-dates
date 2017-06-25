import React from 'react';
import moment from 'moment';
import { storiesOf } from '@kadira/storybook';
import MonthPicker from '../src/components/MonthPicker';
import toISODateString from '../src/utils/toISODateString';
import toISOYearString from '../src/utils/toISOYearString';

import {
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../constants';

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

const modifiers = {
  [toISOYearString(moment().startOf('year'))]: {
    [toISODateString(moment().startOf('month'))]: new Set(['selected']),
  },
};

storiesOf('MonthPicker', module)
  .addWithInfo('default', () => (
    <MonthPicker />
  ))
  .addWithInfo('different initial year', () => (
    <MonthPicker initialVisibleYear={() => moment('1984')} />
  ))
  .addWithInfo('highlight actual month', () => (
    <MonthPicker
      modifiers={modifiers}
    />
  ))
  .addWithInfo('with custom month size', () => (
    <MonthPicker monthWidthSize={150} monthHeightSize={50} />
  ))
  .addWithInfo('more than one year', () => (
    <MonthPicker numberOfYears={2} />
  ))
  .addWithInfo('vertical', () => (
    <MonthPicker
      numberOfYears={2}
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('vertically scrollable with 10 years', () => (
    <div
      style={{
        height: 568,
        width: 400,
      }}
    >
      <MonthPicker
        numberOfYears={10}
        orientation={VERTICAL_SCROLLABLE}
      />
    </div>
  ))
  .addWithInfo('vertical with custom month size', () => (
    <MonthPicker
      numberOfYears={2}
      orientation={VERTICAL_ORIENTATION}
      monthWidthSize={80}
      monthHeightSize={30}
    />
  ))
  .addWithInfo('with custom arrows', () => (
    <MonthPicker
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('vertical with fixed-width container', () => (
    <div style={{ width: '400px' }}>
      <MonthPicker
        numberOfYears={2}
        orientation={VERTICAL_ORIENTATION}
      />
    </div>
  ))
  .addWithInfo('with info panel', () => (
    <MonthPicker
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  ));
