import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DayPicker from '../src/components/DayPicker';

import {
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../constants';

const TestPrevIcon = props => (
  <span style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px'
    }}
  >
    Prev
  </span>
);
const TestNextIcon = props => (
  <span style={{
    border: '1px solid #dce0e0',
    backgroundColor: '#fff',
    color: '#484848',
    padding: '3px'
    }}
  >
    Next
  </span>
);

storiesOf('DayPicker', module)
  .addWithInfo('default', () => (
    <DayPicker />
  ))
  .addWithInfo('more than one month', () => (
    <DayPicker numberOfMonths={2} />
  ))
  .addWithInfo('vertical', () => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .addWithInfo('vertically scrollable with 12 months', () => (
    <div style={{
      height: '568px',
      width: '320px',
    }}>
      <DayPicker
        numberOfMonths={12}
        orientation={VERTICAL_SCROLLABLE}
      />
    </div>
  ))
  .addWithInfo('with custom arrows', () => (
    <DayPicker
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .addWithInfo('vertical with fixed-width container', () => (
    <div style={{ width: '400px' }}>
      <DayPicker
        numberOfMonths={2}
        orientation={VERTICAL_ORIENTATION}
      />
    </div>
  ));
