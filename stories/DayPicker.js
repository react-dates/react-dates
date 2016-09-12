import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DayPicker from '../src/components/DayPicker';

import { VERTICAL_ORIENTATION } from '../constants';

storiesOf('DayPicker', module)
  .add('default', () => (
    <DayPicker />
  ))
  .add('more than one month', () => (
    <DayPicker numberOfMonths={2} />
  ))
  .add('with week numbers', () => (
    <DayPicker
      numberOfMonths={2}
      withWeekNumbers
    />
  ))
  .add('vertical', () => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .add('vertical with fixed-width container', () => (
    <div style={{ width: '400px' }}>
      <DayPicker
        numberOfMonths={2}
        orientation={VERTICAL_ORIENTATION}
      />
    </div>
  ))
  .add('vertical with week numbers', () => (
    <DayPicker
      numberOfMonths={2}
      orientation={VERTICAL_ORIENTATION}
      withWeekNumbers
    />
  ));
